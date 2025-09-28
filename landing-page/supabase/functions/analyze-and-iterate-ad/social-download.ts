import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const STORAGE_BUCKET_FALLBACK = "ai-ad-iteration-assets" as const;
const DEFAULT_TIKTOK_ENDPOINT = "https://www.tikwm.com/api/" as const;
const APIFY_API_BASE = "https://api.apify.com/v2" as const;
const APIFY_FACEBOOK_ACTOR_ID = "apify~facebook-ads-scraper" as const;
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export type SupportedPlatform = "facebook" | "instagram" | "tiktok" | "youtube" | "unknown";

export interface SocialIngestionOptions {
  supabaseAdmin: SupabaseClient;
  socialUrl: URL;
  requestedAssetType: "image" | "video" | "url";
  bucket?: string;
}

export interface SocialIngestionResult {
  signedUrl: string;
  storagePath: string;
  assetType: "image" | "video";
  contentType: string;
  originalDownloadUrl: string;
}

interface ApifyFacebookActorInput {
  startUrls: Array<{
    url: string;
    method: "GET";
  }>;
  isDetailsPerAd?: boolean;
  onlyTotal?: boolean;
  resultsLimit?: number;
}

interface ApifyFacebookActorResult {
  adArchiveID?: number;
  snapshot?: {
    images?: Array<{
      original_image_url?: string;
      resized_image_url?: string;
    }>;
    videos?: Array<{
      video_hd_url?: string;
      video_sd_url?: string;
    }>;
    cards?: Array<{
      original_image_url?: string;
      resized_image_url?: string;
      video_url?: string;
      video_sd_url?: string;
      video_hd_url?: string;
    }>;
    display_format?: string;
  };
  // Legacy fields for backward compatibility
  ad_archive_id?: string;
  ad_id?: string;
  video_hd_url?: string;
  video_sd_url?: string;
  image_url?: string;
  preview_image_url?: string;
  original_image_url?: string;
  media_type?: string;
  creative_bodies?: Array<{ text?: string }>;
}

class SocialIngestionError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "SocialIngestionError";
    this.status = status;
  }
}

export function detectPlatform(url: URL): SupportedPlatform {
  const host = url.hostname.toLowerCase();

  if (host.includes("facebook.com") || host.includes("fb.com")) {
    return "facebook";
  }

  if (host.includes("instagram.com")) {
    return "instagram";
  }

  if (host.includes("tiktok.com")) {
    return "tiktok";
  }

  if (host.includes("youtube.com") || host.includes("youtu.be")) {
    return "youtube";
  }

  return "unknown";
}

export async function ingestSocialAsset(options: SocialIngestionOptions): Promise<SocialIngestionResult> {
  const bucketName = options.bucket ?? Deno.env.get("AD_ITERATION_ASSET_BUCKET") ?? STORAGE_BUCKET_FALLBACK;
  const platform = detectPlatform(options.socialUrl);

  if (platform === "unknown") {
    throw new SocialIngestionError("Unsupported social media platform.");
  }

  switch (platform) {
    case "facebook":
    case "instagram":
      return await ingestMetaAsset(options.supabaseAdmin, bucketName, options.socialUrl);
    case "tiktok":
      return await ingestTikTokAsset(options.supabaseAdmin, bucketName, options.socialUrl);
    case "youtube":
      throw new SocialIngestionError("YouTube assets must be uploaded directly for now.");
    default:
      throw new SocialIngestionError("Unsupported social media platform.");
  }
}

async function ingestMetaAsset(supabaseAdmin: SupabaseClient, bucketName: string, pageUrl: URL): Promise<SocialIngestionResult> {
  const apifyToken = Deno.env.get("APIFY_TOKEN");

  // Try Apify first if token is available
  if (apifyToken) {
    try {
      console.log("Attempting Meta asset ingestion via Apify");
      return await fetchMetaAssetViaApify(pageUrl, supabaseAdmin, bucketName);
    } catch (error) {
      console.warn("Apify ingestion failed, falling back to direct scraping:", error);
    }
  } else {
    console.log("No APIFY_TOKEN found, using direct scraping method");
  }

  // Fallback to direct scraping (legacy method)
  return await ingestMetaAssetDirect(supabaseAdmin, bucketName, pageUrl);
}

/**
 * Legacy direct scraping implementation (kept as fallback)
 */
async function ingestMetaAssetDirect(supabaseAdmin: SupabaseClient, bucketName: string, pageUrl: URL): Promise<SocialIngestionResult> {
  const metaCookie = normalizeCookie(
    Deno.env.get("FACEBOOK_ADS_LIBRARY_COOKIE") ?? Deno.env.get("META_AD_DOWNLOADER_TOKEN")
  );

  const pageHeaders: Record<string, string> = {
    "User-Agent": BROWSER_UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
  };

  if (metaCookie) {
    pageHeaders.Cookie = metaCookie;
  }

  const pageResponse = await fetch(pageUrl.toString(), {
    headers: pageHeaders,
  });

  if (!pageResponse.ok) {
    throw new SocialIngestionError("Could not load Meta Ad Library page.");
  }

  const html = await pageResponse.text();
  const videoUrl = extractMetaMediaUrl(html, "video_url");
  const imageUrl = extractMetaMediaUrl(html, "image_url");

  const mediaUrl = videoUrl ?? imageUrl;
  if (!mediaUrl) {
    throw new SocialIngestionError("Unable to locate downloadable media on the Meta page.");
  }

  const suspectedType: "video" | "image" = videoUrl ? "video" : "image";

  const assetHeaders: Record<string, string> = {
    "User-Agent": BROWSER_UA,
    "Accept": suspectedType === "video" ? "video/mp4,video/*;q=0.9,*/*;q=0.8" : "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    "Referer": pageUrl.toString(),
  };

  if (metaCookie) {
    assetHeaders.Cookie = metaCookie;
  }

  const assetResponse = await fetch(mediaUrl, {
    headers: assetHeaders,
  });

  if (!assetResponse.ok) {
    throw new SocialIngestionError("Meta asset download failed. Try again later.");
  }

  const arrayBuffer = await assetResponse.arrayBuffer();
  const contentType = assetResponse.headers.get("content-type") ?? (suspectedType === "video" ? "video/mp4" : "image/jpeg");
  const fileExtension = pickExtension(mediaUrl, contentType, suspectedType);

  const storagePath = `ingested/meta-direct/${crypto.randomUUID()}.${fileExtension}`;

  const uploadResult = await supabaseAdmin.storage.from(bucketName).upload(storagePath, new Uint8Array(arrayBuffer), {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadResult.error) {
    console.error("Meta asset upload failed", uploadResult.error);
    throw new SocialIngestionError("Failed to persist Meta asset.", 500);
  }

  const signed = await supabaseAdmin.storage.from(bucketName).createSignedUrl(storagePath, 60 * 30);
  if (signed.error || !signed.data?.signedUrl) {
    console.error("Meta signed URL error", signed.error);
    throw new SocialIngestionError("Failed to generate secure Meta asset link.", 500);
  }

  return {
    signedUrl: signed.data.signedUrl,
    storagePath,
    assetType: suspectedType,
    contentType,
    originalDownloadUrl: mediaUrl,
  };
}

async function ingestTikTokAsset(supabaseAdmin: SupabaseClient, bucketName: string, pageUrl: URL): Promise<SocialIngestionResult> {
  const sessionId = Deno.env.get("PYKTOK_SESSION_ID")?.trim();

  const primaryAttempt = await tryTikTokDirectDownload(pageUrl, sessionId);
  const { mediaUrl, contentType: directContentType, suspectType } =
    primaryAttempt ?? (await tryTikwmDownloader(pageUrl));

  const assetResponse = await fetch(mediaUrl, {
    headers: {
      "User-Agent": BROWSER_UA,
      "Referer": "https://www.tiktok.com/",
      "Accept": "video/mp4,video/*;q=0.9,*/*;q=0.8",
    },
  });

  if (!assetResponse.ok) {
    throw new SocialIngestionError("TikTok asset download failed. Retry in a few minutes.");
  }

  const arrayBuffer = await assetResponse.arrayBuffer();
  const contentType = assetResponse.headers.get("content-type") ?? directContentType ?? "video/mp4";
  const fileExtension = pickExtension(mediaUrl, contentType, "video");
  const storagePath = `ingested/tiktok/${crypto.randomUUID()}.${fileExtension}`;

  const uploadResult = await supabaseAdmin.storage.from(bucketName).upload(storagePath, new Uint8Array(arrayBuffer), {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadResult.error) {
    console.error("TikTok asset upload failed", uploadResult.error);
    throw new SocialIngestionError("Failed to persist TikTok asset.", 500);
  }

  const signed = await supabaseAdmin.storage.from(bucketName).createSignedUrl(storagePath, 60 * 30);
  if (signed.error || !signed.data?.signedUrl) {
    console.error("TikTok signed URL error", signed.error);
    throw new SocialIngestionError("Failed to generate secure TikTok asset link.", 500);
  }

  return {
    signedUrl: signed.data.signedUrl,
    storagePath,
    assetType: suspectType,
    contentType,
    originalDownloadUrl: mediaUrl,
  };
}

async function tryTikTokDirectDownload(pageUrl: URL, sessionId?: string | null): Promise<
  { mediaUrl: string; contentType?: string; suspectType: "video" } | null
> {
  if (!sessionId) {
    return null;
  }

  try {
    const pageResponse = await fetch(pageUrl.toString(), {
      headers: {
        "User-Agent": BROWSER_UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: `sessionid=${sessionId}`,
      },
    });

    if (!pageResponse.ok) {
      return null;
    }

    const html = await pageResponse.text();
    const sigiMatch = html.match(/<script id="SIGI_STATE" type="application\/json">([^<]+)<\/script>/);

    if (!sigiMatch) {
      return null;
    }

    const sigiJson = JSON.parse(sigiMatch[1]);
    const itemModule = sigiJson?.ItemModule as Record<string, any> | undefined;

    if (!itemModule) {
      return null;
    }

    const item = Object.values(itemModule)[0] as { video?: { downloadAddr?: string; playAddr?: string } } | undefined;

    if (!item?.video) {
      return null;
    }

    const mediaUrl = normalizeTikTokUrl(item.video.downloadAddr ?? item.video.playAddr);

    if (!mediaUrl) {
      return null;
    }

    return { mediaUrl, contentType: "video/mp4", suspectType: "video" };
  } catch (error) {
    console.warn("Direct TikTok scrape failed", error);
    return null;
  }
}

async function tryTikwmDownloader(pageUrl: URL): Promise<{ mediaUrl: string; contentType?: string; suspectType: "video" }> {
  const endpoint = Deno.env.get("TIKTOK_DOWNLOAD_ENDPOINT") ?? DEFAULT_TIKTOK_ENDPOINT;
  const url = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
  const requestUrl = `${url}?url=${encodeURIComponent(pageUrl.toString())}`;

  const response = await fetch(requestUrl, {
    headers: {
      "User-Agent": BROWSER_UA,
      Accept: "application/json",
      Referer: "https://www.tikwm.com/",
    },
  });

  if (!response.ok) {
    throw new SocialIngestionError("TikTok downloader service is unavailable.", 502);
  }

  const payload = await response.json() as { data?: { play?: string; wmplay?: string }; status?: number; msg?: string };

  if (typeof payload?.status !== "number" || payload.status !== 0 || !payload.data) {
    throw new SocialIngestionError(payload?.msg ?? "Unable to retrieve TikTok media.");
  }

  const mediaUrl = normalizeTikTokUrl(payload.data.play ?? payload.data.wmplay);

  if (!mediaUrl) {
    throw new SocialIngestionError("Downloader returned an invalid TikTok URL.");
  }

  return { mediaUrl, suspectType: "video" };
}

function extractMetaMediaUrl(html: string, key: "video_url" | "image_url"): string | null {
  const regex = new RegExp(`\\"${key}\\":\\"([^\"]+)\\"`);
  const match = html.match(regex);
  if (!match) {
    return null;
  }
  return decodeMetaUrl(match[1]);
}

function decodeMetaUrl(value: string): string {
  let decoded = value
    .replace(/\\\//g, "/")
    .replace(/\\u003d/gi, "=")
    .replace(/\\u0026/gi, "&")
    .replace(/\\u003f/gi, "?")
    .replace(/&amp;/gi, "&");

  // Replace unicode percent encoding before decodeURIComponent to avoid throwing
  decoded = decoded.replace(/\\u0025/gi, "%25");

  try {
    return decodeURIComponent(decoded);
  } catch (_error) {
    return decoded;
  }
}

function normalizeTikTokUrl(url?: string | null): string | null {
  if (!url) {
    return null;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

function pickExtension(mediaUrl: string, contentType: string, fallbackType: "image" | "video"): string {
  const fromUrl = mediaUrl.split("?")[0].split("#")[0];
  const urlExt = fromUrl.includes(".") ? fromUrl.substring(fromUrl.lastIndexOf(".") + 1).toLowerCase() : "";

  if (urlExt && /^[a-z0-9]{2,4}$/.test(urlExt)) {
    return urlExt;
  }

  if (contentType.includes("mp4")) {
    return "mp4";
  }

  if (contentType.includes("webm")) {
    return "webm";
  }

  if (contentType.includes("png")) {
    return "png";
  }

  if (contentType.includes("jpeg")) {
    return "jpg";
  }

  return fallbackType === "video" ? "mp4" : "jpg";
}

function normalizeCookie(rawToken?: string | null): string | null {
  if (!rawToken) {
    return null;
  }

  const trimmed = rawToken.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.replace(/^Cookie:\s*/i, "");
}

export function isSocialIngestionError(error: unknown): error is SocialIngestionError {
  return error instanceof SocialIngestionError;
}

/**
 * Extract ad ID from Facebook Ad Library URL
 * Supports URLs like: https://www.facebook.com/ads/library/?id=123456789
 */
function extractAdIdFromUrl(url: URL): string | null {
  // Check for 'id' parameter in query string
  const adId = url.searchParams.get('id');
  if (adId) {
    return adId;
  }

  // Check for ad ID in path segments (alternative format)
  const pathMatch = url.pathname.match(/\/ads\/library\/([0-9]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  return null;
}

/**
 * Call Apify Facebook Ads Library actor to extract ad data and media URLs
 */
async function callApifyActor(adId: string, apifyToken: string): Promise<ApifyFacebookActorResult | null> {
  const actorEndpoint = `${APIFY_API_BASE}/acts/${APIFY_FACEBOOK_ACTOR_ID}/run-sync-get-dataset-items`;

  // Create search URL for the specific ad ID
  const searchUrl = `https://www.facebook.com/ads/library/?id=${adId}`;

  const input: ApifyFacebookActorInput = {
    startUrls: [
      {
        url: searchUrl,
        method: "GET"
      }
    ],
    isDetailsPerAd: true,
    onlyTotal: false,
    resultsLimit: 1
  };

  console.log(`Calling Apify actor: ${actorEndpoint}?token=${apifyToken.substring(0, 8)}...`);
  console.log(`Input:`, JSON.stringify(input, null, 2));

  const response = await fetch(`${actorEndpoint}?token=${apifyToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Apify actor failed with status ${response.status}`);
    console.error(`Error response:`, errorText);
    return null;
  }

  const results = await response.json() as ApifyFacebookActorResult[];

  if (!results || results.length === 0) {
    console.error('Apify actor returned no results');
    return null;
  }

  return results[0];
}

/**
 * Fetch Meta asset via Apify (new implementation)
 * This replaces the direct HTML scraping approach with Apify actor integration
 */
async function fetchMetaAssetViaApify(pageUrl: URL, supabaseAdmin: SupabaseClient, bucketName: string): Promise<SocialIngestionResult> {
  const apifyToken = Deno.env.get("APIFY_TOKEN");

  if (!apifyToken) {
    throw new SocialIngestionError("APIFY_TOKEN environment variable is required for Meta asset ingestion");
  }

  // Extract ad ID from the Facebook Ad Library URL
  const adId = extractAdIdFromUrl(pageUrl);
  if (!adId) {
    throw new SocialIngestionError("Could not extract ad ID from Facebook Ad Library URL");
  }

  console.log(`Extracting Meta asset via Apify for ad ID: ${adId}`);

  // Call Apify actor to get ad data
  const actorResult = await callApifyActor(adId, apifyToken);
  if (!actorResult) {
    throw new SocialIngestionError("Apify actor failed to extract ad data");
  }

  console.log(`Apify actor result:`, JSON.stringify(actorResult, null, 2));

  // Extract media URLs from nested structure
  let mediaUrl: string | null = null;
  let suspectedType: "video" | "image" = "image";

  // Check for videos first
  if (actorResult.snapshot?.videos && actorResult.snapshot.videos.length > 0) {
    const video = actorResult.snapshot.videos[0];
    mediaUrl = video.video_sd_url || video.video_hd_url;
    if (mediaUrl) {
      suspectedType = "video";
    }
  }

  // Check for images if no video found
  if (!mediaUrl && actorResult.snapshot?.images && actorResult.snapshot.images.length > 0) {
    const image = actorResult.snapshot.images[0];
    mediaUrl = image.original_image_url || image.resized_image_url;
    suspectedType = "image";
  }

  // Check for carousel cards (Meta often populates this array instead of snapshot.images)
  if (!mediaUrl && actorResult.snapshot?.cards && actorResult.snapshot.cards.length > 0) {
    const cardWithVideo = actorResult.snapshot.cards.find((card) =>
      Boolean(card.video_hd_url || card.video_sd_url || card.video_url)
    );

    if (cardWithVideo) {
      mediaUrl = cardWithVideo.video_hd_url || cardWithVideo.video_sd_url || cardWithVideo.video_url || null;
      if (mediaUrl) {
        suspectedType = "video";
      }
    }

    if (!mediaUrl) {
      const cardWithImage = actorResult.snapshot.cards.find((card) =>
        Boolean(card.original_image_url || card.resized_image_url)
      );

      if (cardWithImage) {
        mediaUrl = cardWithImage.original_image_url || cardWithImage.resized_image_url || null;
        if (mediaUrl) {
          suspectedType = "image";
        }
      }
    }
  }

  // Fallback to legacy fields
  if (!mediaUrl) {
    mediaUrl = actorResult.video_sd_url || actorResult.video_hd_url || actorResult.original_image_url || actorResult.image_url || actorResult.preview_image_url;
    suspectedType = (actorResult.video_sd_url || actorResult.video_hd_url) ? "video" : "image";
  }

  if (!mediaUrl) {
    console.error('No media URLs found in Apify response:', {
      snapshot: actorResult.snapshot,
      cards: actorResult.snapshot?.cards,
      legacy_fields: {
        video_sd_url: actorResult.video_sd_url,
        video_hd_url: actorResult.video_hd_url,
        original_image_url: actorResult.original_image_url,
        image_url: actorResult.image_url,
        preview_image_url: actorResult.preview_image_url
      }
    });
    throw new SocialIngestionError(
      "We couldn’t fetch the ad media from Meta. Email brian@apsicsmedia.com with the Ad Library link and we’ll help you troubleshoot."
    );
  }

  // suspectedType is already determined above

  console.log(`Downloading ${suspectedType} from: ${mediaUrl}`);

  // Download the media file
  const assetResponse = await fetch(mediaUrl, {
    headers: {
      "User-Agent": BROWSER_UA,
      "Accept": suspectedType === "video" ? "video/mp4,video/*;q=0.9,*/*;q=0.8" : "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      "Referer": pageUrl.toString(),
    },
  });

  if (!assetResponse.ok) {
    throw new SocialIngestionError(`Media download failed with status ${assetResponse.status}`);
  }

  const arrayBuffer = await assetResponse.arrayBuffer();
  const contentType = assetResponse.headers.get("content-type") ?? (suspectedType === "video" ? "video/mp4" : "image/jpeg");
  const fileExtension = pickExtension(mediaUrl, contentType, suspectedType);

  const storagePath = `ingested/meta-apify/${crypto.randomUUID()}.${fileExtension}`;

  // Upload to Supabase storage
  const uploadResult = await supabaseAdmin.storage.from(bucketName).upload(storagePath, new Uint8Array(arrayBuffer), {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadResult.error) {
    console.error("Meta asset upload failed", uploadResult.error);
    throw new SocialIngestionError("Failed to persist Meta asset.", 500);
  }

  // Generate signed URL
  const signed = await supabaseAdmin.storage.from(bucketName).createSignedUrl(storagePath, 60 * 30);
  if (signed.error || !signed.data?.signedUrl) {
    console.error("Meta signed URL error", signed.error);
    throw new SocialIngestionError("Failed to generate secure Meta asset link.", 500);
  }

  return {
    signedUrl: signed.data.signedUrl,
    storagePath,
    assetType: suspectedType,
    contentType,
    originalDownloadUrl: mediaUrl,
  };
}

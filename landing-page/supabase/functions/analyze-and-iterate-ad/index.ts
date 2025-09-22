import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { buildIterationPrompt, type OutputFormat } from "./prompt-builder.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");
const anonymousUsagePepper = Deno.env.get("ANON_USAGE_PEPPER");

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for analyze-and-iterate-ad function");
}

if (!openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

if (!anonymousUsagePepper) {
  throw new Error("ANON_USAGE_PEPPER environment variable is required");
}

const ALLOWED_OUTPUT_FORMATS: OutputFormat[] = ["same", "video", "static", "carousel"];
const ALLOWED_PLATFORMS = new Set(["facebook", "instagram", "tiktok", "youtube", "linkedin"]);
const ALLOWED_GOALS = new Set(["performance", "engagement", "conversion", "awareness", "retention"]);
const SOCIAL_DOMAINS = ["facebook.com", "instagram.com", "tiktok.com", "youtube.com"];
const MAX_ANON_CREDITS = 1;

interface IterationRequestPayload {
  companyName?: string;
  brandVoice?: string;
  primaryPlatform?: string;
  iterationGoal?: string;
  referenceUrl?: string | null;
  additionalContext?: string | null;
  inputMethod?: "upload" | "url";
  assetUrl?: string;
  assetType?: "image" | "video" | "url";
  uploadedPath?: string | null;
  outputFormats?: OutputFormat[];
}

interface IterationAnalysis {
  performanceScore?: number;
  summary?: string;
  topWins?: string[];
  topRisks?: string[];
  scenes?: Array<{
    timecode: string;
    observation: string;
    recommendation: string;
    impact: "high" | "medium" | "low";
  }>;
  iterations: Array<{
    id: OutputFormat;
    headline: string;
    angleSummary: string;
    script?: Array<{
      scene: string;
      description: string;
      voiceover?: string;
      overlay?: string;
      cta?: string;
    }>;
    staticCopy?: {
      headline?: string;
      body?: string;
      cta?: string;
      designNotes?: string[];
    };
    testingNotes?: string[];
  }>;
  exportArtifacts?: {
    markdown?: string;
    json?: Record<string, unknown>;
  };
  error?: string;
  message?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  const supabaseClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let user = null;
  try {
    const authResult = await supabaseClient.auth.getUser();
    user = authResult.data.user ?? null;
  } catch (authError) {
    console.error("Failed to read auth context", authError);
    return new Response(JSON.stringify({ error: "Unable to verify session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: IterationRequestPayload;
  try {
    payload = await req.json();
  } catch (parseError) {
    console.error("Failed to parse JSON payload", parseError);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const validation = validatePayload(payload);
  if (validation.error) {
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const {
    companyName,
    brandVoice,
    primaryPlatform,
    iterationGoal,
    referenceUrl,
    additionalContext,
    inputMethod,
    assetUrl,
    assetType,
    uploadedPath,
    outputFormats,
  } = validation.sanitized;

  if (inputMethod === "url") {
    const domainValid = SOCIAL_DOMAINS.some((domain) => assetUrl.hostname.toLowerCase().includes(domain));
    if (!domainValid) {
      return new Response(JSON.stringify({ error: "Only Facebook, Instagram, TikTok, or YouTube URLs are supported." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  const startedAt = Date.now();

  let creditsRemaining = 0;
  let anonymousUsage: { ip_address: string; usage_count: number | null } | null = null;
  let anonymousIp: string | null = null;
  let ipHash: string | null = null;

  if (user) {
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("id, credits_remaining")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Failed to load profile", profileError);
      return new Response(JSON.stringify({ error: "Unable to load profile" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let effectiveProfile = profile;

    if (!effectiveProfile) {
      const { data: createdProfile, error: createError } = await adminClient
        .from("profiles")
        .insert({ id: user.id })
        .select("id, credits_remaining")
        .maybeSingle();

      if (createError && createError.code !== "23505") {
        console.error("Failed to create profile", createError);
        return new Response(JSON.stringify({ error: "Unable to initialize profile" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (createError?.code === "23505" || !createdProfile) {
        const { data: reloadedProfile, error: reloadError } = await adminClient
          .from("profiles")
          .select("id, credits_remaining")
          .eq("id", user.id)
          .maybeSingle();

        if (reloadError) {
          console.error("Failed to reload profile after initialization", reloadError);
          return new Response(JSON.stringify({ error: "Unable to load profile" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        effectiveProfile = reloadedProfile ?? null;
      } else {
        effectiveProfile = createdProfile;
      }
    }

    creditsRemaining = effectiveProfile?.credits_remaining ?? 0;

    if (creditsRemaining <= 0) {
      return new Response(JSON.stringify({ error: "Out of credits" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } else {
    anonymousIp = extractIpAddress(req.headers);

    if (!anonymousIp) {
      return new Response(JSON.stringify({ error: "Anonymous usage requires an IP address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      ipHash = await hashIp(anonymousIp);
    } catch (hashError) {
      console.error("Failed to hash anonymous IP", hashError);
      return new Response(JSON.stringify({ error: "Unable to process anonymous request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error: usageError } = await adminClient
      .from("anonymous_usage")
      .select("ip_address, usage_count")
      .eq("ip_address", ipHash)
      .maybeSingle();

    if (usageError) {
      console.error("Failed to check anonymous usage", usageError);
      return new Response(JSON.stringify({ error: "Unable to check anonymous usage" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    anonymousUsage = data ?? null;
    const usageCount = data?.usage_count ?? 0;
    const remaining = MAX_ANON_CREDITS - usageCount;

    if (remaining <= 0) {
      return new Response(JSON.stringify({ error: "Out of credits" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    creditsRemaining = remaining;
  }

  let referenceUrlString: string | null = null;
  if (referenceUrl) {
    referenceUrlString = referenceUrl.toString();
  }

  const prompt = await buildIterationPrompt({
    companyName,
    brandVoice,
    primaryPlatform,
    iterationGoal,
    referenceUrl: referenceUrlString,
    additionalContext,
    inputMethod,
    assetUrl: assetUrl.toString(),
    assetType,
    outputFormats,
  });

  let completion: Response;

  try {
    completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://openrouter.ai",
        "X-Title": "AI Ad Iteration Tool",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp",
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "iteration_analysis",
            schema: prompt.jsonSchema,
            strict: true,
          },
        },
        temperature: 0.4,
        max_tokens: 2000,
        messages: [
          {
            role: "system",
            content: prompt.systemPrompt,
          },
          {
            role: "user",
            content: prompt.userPrompt,
          },
        ],
      }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter", networkError);
    return new Response(JSON.stringify({ error: "OpenRouter request failed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
    console.error("OpenRouter returned non-200", completion.status, errorBody);
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: errorBody }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const completionData = await completion.json();
  const messageContent = completionData?.choices?.[0]?.message?.content ?? null;
  const parsedAnalysis = parseAnalysis(messageContent);

  if (!parsedAnalysis.success) {
    console.error("Failed to parse analysis JSON", parsedAnalysis.error, messageContent);
    return new Response(JSON.stringify({ error: "Model response could not be parsed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const analysis = parsedAnalysis.analysis;

  if (analysis.error === "competitor_detected") {
    return new Response(
      JSON.stringify({ error: "Competitor content detected", message: analysis.message ?? "The asset appears to belong to a different brand." }),
      {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const iterationsValid = Array.isArray(analysis.iterations) && analysis.iterations.length > 0;
  if (!iterationsValid) {
    console.error("Analysis missing iterations", analysis);
    return new Response(JSON.stringify({ error: "Model response missing iterations" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let updatedCredits = creditsRemaining;

  if (user) {
    const { data: updatedProfile, error: creditError } = await adminClient
      .from("profiles")
      .update({ credits_remaining: creditsRemaining - 1 })
      .eq("id", user.id)
      .eq("credits_remaining", creditsRemaining)
      .select("credits_remaining")
      .maybeSingle();

    if (creditError || !updatedProfile) {
      console.error("Failed to decrement credits", creditError);
      return new Response(JSON.stringify({ error: "Failed to decrement credits" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    updatedCredits = updatedProfile.credits_remaining ?? 0;
  } else {
    if (anonymousUsage) {
      const { error: updateError } = await adminClient
        .from("anonymous_usage")
        .update({ usage_count: (anonymousUsage.usage_count ?? 0) + 1, last_used_at: new Date().toISOString() })
        .eq("ip_address", anonymousUsage.ip_address);

      if (updateError) {
        console.error("Failed to update anonymous usage", updateError);
        return new Response(JSON.stringify({ error: "Unable to update anonymous usage" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else if (ipHash) {
      const { error: insertError } = await adminClient
        .from("anonymous_usage")
        .insert({ ip_address: ipHash, usage_count: 1, last_used_at: new Date().toISOString() });

      if (insertError) {
        console.error("Failed to insert anonymous usage", insertError);
        return new Response(JSON.stringify({ error: "Unable to record anonymous usage" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    updatedCredits = Math.max(0, creditsRemaining - 1);
  }

  const processingMs = Date.now() - startedAt;

  const runRecord = {
    user_id: user?.id ?? null,
    request: {
      companyName,
      brandVoice,
      primaryPlatform,
      iterationGoal,
      referenceUrl: referenceUrlString,
      additionalContext,
      inputMethod,
      assetUrl: assetUrl.toString(),
      assetType,
      uploadedPath,
      outputFormats,
    },
    result: analysis,
    credits_spent: 1,
    processing_ms: processingMs,
    source: "web",
  };

  const { error: logError } = await adminClient.from("ad_iteration_runs").insert(runRecord);
  if (logError) {
    console.error("Failed to log iteration run", logError);
  }

  return new Response(
    JSON.stringify({
      analysis,
      creditsRemaining: updatedCredits,
      exportArtifacts: analysis.exportArtifacts ?? null,
      rawOutput: completionData,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

type SanitizedPayload = {
  companyName: string;
  brandVoice: string;
  primaryPlatform: string;
  iterationGoal: string;
  referenceUrl: URL | null;
  additionalContext: string | null;
  inputMethod: "upload" | "url";
  assetUrl: URL;
  assetType: "image" | "video" | "url";
  uploadedPath: string | null;
  outputFormats: OutputFormat[];
};

type ValidationResult =
  | { error: string; sanitized?: undefined }
  | { error?: undefined; sanitized: SanitizedPayload };

function validatePayload(payload: IterationRequestPayload): ValidationResult {
  const companyName = sanitizeInline(payload.companyName);
  if (!companyName) {
    return { error: "Company name is required." };
  }

  const brandVoice = sanitizeInline(payload.brandVoice);
  if (!brandVoice) {
    return { error: "Brand voice is required." };
  }

  const primaryPlatform = sanitizeKey(payload.primaryPlatform);
  if (!primaryPlatform || !ALLOWED_PLATFORMS.has(primaryPlatform)) {
    return { error: "Primary platform is invalid." };
  }

  const iterationGoal = sanitizeKey(payload.iterationGoal);
  if (!iterationGoal || !ALLOWED_GOALS.has(iterationGoal)) {
    return { error: "Iteration goal is invalid." };
  }

  const inputMethod = payload.inputMethod === "upload" || payload.inputMethod === "url" ? payload.inputMethod : null;
  if (!inputMethod) {
    return { error: "Input method must be 'upload' or 'url'." };
  }

  const assetType = payload.assetType === "image" || payload.assetType === "video" || payload.assetType === "url" ? payload.assetType : null;
  if (!assetType) {
    return { error: "Asset type must be 'image', 'video', or 'url'." };
  }

  const assetUrlString = typeof payload.assetUrl === "string" ? payload.assetUrl.trim() : "";
  if (!assetUrlString) {
    return { error: "Asset URL is required." };
  }

  let assetUrl: URL;
  try {
    assetUrl = new URL(assetUrlString);
  } catch (_error) {
    return { error: "Asset URL is invalid." };
  }

  if (inputMethod === "upload" && assetType === "url") {
    return { error: "Uploaded assets must include image or video metadata." };
  }

  let referenceUrl: URL | null = null;
  if (typeof payload.referenceUrl === "string" && payload.referenceUrl.trim().length > 0) {
    try {
      referenceUrl = new URL(payload.referenceUrl.trim());
    } catch (_error) {
      return { error: "Reference URL is invalid." };
    }
  }

  const additionalContext = sanitizeMultiline(payload.additionalContext);

  const requestedFormats = Array.isArray(payload.outputFormats) ? payload.outputFormats.filter((format): format is OutputFormat => ALLOWED_OUTPUT_FORMATS.includes(format)) : [];

  if (requestedFormats.length === 0) {
    return { error: "Select at least one output format." };
  }

  const uniqueFormats = Array.from(new Set(requestedFormats));

  return {
    sanitized: {
      companyName,
      brandVoice,
      primaryPlatform,
      iterationGoal,
      referenceUrl,
      additionalContext,
      inputMethod,
      assetUrl,
      assetType,
      uploadedPath: payload.uploadedPath ? payload.uploadedPath.trim() : null,
      outputFormats: uniqueFormats,
    },
  };
}

function sanitizeInline(value?: string | null): string {
  if (!value) {
    return "";
  }
  return value.replace(/\s+/g, " ").trim().slice(0, 200);
}

function sanitizeKey(value?: string | null): string {
  if (!value) {
    return "";
  }
  return value.toLowerCase().trim();
}

function sanitizeMultiline(value?: string | null): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.slice(0, 2000);
}

function parseAnalysis(content: unknown):
  | { success: true; analysis: IterationAnalysis }
  | { success: false; error: string } {
  if (!content) {
    return { success: false, error: "Empty content" };
  }

  let text: string;

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("\n");
  } else if (typeof content === "object" && "text" in (content as Record<string, unknown>)) {
    const maybeText = (content as { text?: unknown }).text;
    text = typeof maybeText === "string" ? maybeText : JSON.stringify(content);
  } else {
    text = JSON.stringify(content);
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return { success: false, error: "Empty string" };
  }

  const cleaned = stripJsonFence(trimmed);

  try {
    const parsed = JSON.parse(cleaned) as IterationAnalysis;
    return { success: true, analysis: parsed };
  } catch (error) {
    return { success: false, error: `JSON parse error: ${String(error)}` };
  }
}

function stripJsonFence(value: string): string {
  if (value.startsWith("```")) {
    const withoutFence = value.replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    return withoutFence.trim();
  }
  return value;
}

async function safeReadJson(response: Response) {
  try {
    return await response.json();
  } catch (_error) {
    return await response.text();
  }
}

function extractIpAddress(headers: Headers) {
  const xForwardedFor = headers.get("x-forwarded-for") ?? headers.get("X-Forwarded-For");
  if (xForwardedFor) {
    const ip = xForwardedFor.split(",")[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  const cfConnectingIp = headers.get("cf-connecting-ip") ?? headers.get("CF-Connecting-IP");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const realIp = headers.get("x-real-ip") ?? headers.get("X-Real-IP");
  if (realIp) {
    return realIp;
  }

  return null;
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`${anonymousUsagePepper}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

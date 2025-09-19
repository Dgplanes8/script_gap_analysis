import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { basePrompt } from "./prompt.ts";

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
  throw new Error("Missing Supabase configuration for edge function");
}

if (!openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

if (!anonymousUsagePepper) {
  throw new Error("ANON_USAGE_PEPPER environment variable is required for hashing anonymous usage");
}

type RequestPayload = {
  companyName?: string;
  websiteUrl?: string;
  productDescription?: string;
  platform?: string;
  objective?: string;
};

const MAX_ANON_CREDITS = 1;

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook / Instagram',
  tiktok: 'TikTok / Reels',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  display: 'Display / Programmatic',
  ugc: 'UGC / Creator ads',
};

const OBJECTIVE_LABELS: Record<string, string> = {
  awareness: 'Awareness',
  leads: 'Leads',
  sales: 'Sales',
  engagement: 'Engagement',
  downloads: 'Downloads',
  installs: 'Installs',
};

serve(async (req) => {
  console.log("generate-script invoked", { method: req.method, url: req.url });

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
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
    user = authResult.data.user;
  } catch (authError) {
    console.error("Failed to read auth context", authError);
    return new Response(JSON.stringify({ error: "Unable to verify session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: RequestPayload;

  try {
    payload = await req.json();
  } catch (parseError) {
    console.error("Failed to parse JSON", parseError);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { companyName, websiteUrl, productDescription, platform, objective } = payload;

  if (!companyName || !companyName.trim() || !websiteUrl || !websiteUrl.trim()) {
    return new Response(JSON.stringify({ error: "Company name and website URL are required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let normalizedWebsiteUrl: string;

  try {
    const withScheme = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    const parsedUrl = new URL(withScheme);
    normalizedWebsiteUrl = parsedUrl.toString();
  } catch (urlError) {
    console.error('Invalid website URL provided', websiteUrl, urlError);
    return new Response(JSON.stringify({ error: "Website URL is invalid" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

let creditsRemaining = 0;
let anonymousUsage: { ip_address: string; usage_count: number | null } | null = null;
let anonymousIp: string | null = null;
let ipHash: string | null = null;

  if (user) {
    const { data: profile, error } = await adminClient
      .from("profiles")
      .select("id, credits_remaining")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to load profile", error);
      return new Response(JSON.stringify({ error: "Unable to load profile" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    creditsRemaining = profile?.credits_remaining ?? 0;

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

    const { data, error } = await adminClient
      .from("anonymous_usage")
      .select("ip_address, usage_count")
      .eq("ip_address", ipHash)
      .maybeSingle();

    if (error) {
      console.error("Failed to check anonymous usage", error);
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

  const prompt = buildPrompt({
    companyName: companyName.trim(),
    websiteUrl: normalizedWebsiteUrl,
    productDescription: productDescription?.trim() ?? '',
    platform: platform?.trim() ?? '',
    objective: objective?.trim() ?? '',
  });

  let completion: Response;
  try {
    completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openRouterApiKey}`,
      "HTTP-Referer": "https://openrouter.ai",
      "X-Title": "AI Ad Script Generator",
    },
    body: JSON.stringify({
      model: "openrouter/sonoma-dusk-alpha",
      messages: [
        {
          role: "system",
          content:
            "You are a direct-response marketing strategist. Produce concise, high-performing video ad scripts with hooks, narrative structure, and platform-native pacing.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 800,
    }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter", networkError);
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: String(networkError) }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
    console.error("OpenRouter request returned non-200", completion.status, errorBody);
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: errorBody }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const completionData = await completion.json();
  const script = completionData?.choices?.[0]?.message?.content;

  if (!script) {
    return new Response(JSON.stringify({ error: "OpenRouter returned an empty response" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (user) {
    const { data: updatedProfile, error } = await adminClient
      .from("profiles")
      .update({ credits_remaining: creditsRemaining - 1 })
      .eq("id", user.id)
      .eq("credits_remaining", creditsRemaining)
      .select("credits_remaining")
      .maybeSingle();

    if (error || !updatedProfile) {
      console.error("Failed to decrement credits", error);
      return new Response(JSON.stringify({ error: "Failed to decrement credits" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ script, creditsRemaining: updatedProfile.credits_remaining ?? 0 }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (anonymousUsage) {
    const { error } = await adminClient
      .from("anonymous_usage")
      .update({ usage_count: (anonymousUsage.usage_count ?? 0) + 1, last_used_at: new Date().toISOString() })
      .eq("ip_address", anonymousUsage.ip_address);

    if (error) {
      console.error("Failed to update anonymous usage", error);
      return new Response(JSON.stringify({ error: "Unable to update anonymous usage" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } else {
    const hashedIp = ipHash;
    if (hashedIp) {
      const { error } = await adminClient
        .from("anonymous_usage")
        .insert({ ip_address: hashedIp, usage_count: 1, last_used_at: new Date().toISOString() });

      if (error) {
        console.error("Failed to insert anonymous usage", error);
        return new Response(JSON.stringify({ error: "Unable to record anonymous usage" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
  }

  return new Response(JSON.stringify({ script }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

type PromptParams = Required<RequestPayload>;

function buildPrompt({
  companyName,
  websiteUrl,
  productDescription,
  platform,
  objective,
}: PromptParams) {
  const descriptionLine = productDescription.length > 0 ? productDescription : 'Product description was not provided.';
  const platformLabel = platform.length > 0 ? PLATFORM_LABELS[platform] ?? humanize(platform) : 'Strategist can choose the optimal placement';
  const objectiveLabel = objective.length > 0 ? OBJECTIVE_LABELS[objective] ?? humanize(objective) : 'Drive measurable conversions';

  return `${basePrompt.trim()}

---
Use the above strategic workflow to craft a finished advertising script. Reference the following campaign brief:

Company Name: ${companyName}
Website URL: ${websiteUrl}
Product Description: ${descriptionLine}
Primary Platform: ${platformLabel}
Campaign Objective: ${objectiveLabel}

Output Requirements:
1. Select the optimal framework based on the campaign brief and platform.
2. Provide a concise, platform-native script that follows the chosen framework.
3. Include any critical stage directions or on-screen text cues needed for production.
4. Close with an explicit CTA aligned to the brand’s buyer journey.
5. Return only the finished script. Do not include research notes, numbered steps, or multiple concepts—deliver exactly one script.

Formatting Instructions:
- Begin the response with the line 'Script:'.
- After that line, output the complete script (including scene/stage directions if relevant) as continuous text or Markdown.
- Do not add any introductions, summaries, or sections outside the script itself.
`;
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

async function safeReadJson(response: Response) {
  try {
    return await response.json();
  } catch (_error) {
    return await response.text();
  }
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`${anonymousUsagePepper}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function humanize(value: string) {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

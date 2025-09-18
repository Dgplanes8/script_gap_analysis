import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");
const anonymousUsagePepper = Deno.env.get("ANON_USAGE_PEPPER");

let basePrompt = "";

try {
  const promptPath = new URL("./prompts/script_bot_prompt.md", import.meta.url);
  basePrompt = await Deno.readTextFile(promptPath);
} catch (promptError) {
  console.error("Failed to load base prompt", promptError);
  throw new Error("Unable to load script prompt instructions");
}

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
  productDescription?: string;
  targetAudience?: string;
  platform?: string;
  tone?: string;
  callToAction?: string;
};

const MAX_ANON_CREDITS = 1;

serve(async (req) => {
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

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  let payload: RequestPayload;

  try {
    payload = await req.json();
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { companyName, productDescription, targetAudience, platform, tone, callToAction } = payload;

  if (!companyName || !productDescription || !targetAudience || !platform || !tone || !callToAction) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
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
    companyName,
    productDescription,
    targetAudience,
    platform,
    tone,
    callToAction,
  });

  const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
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
  productDescription,
  targetAudience,
  platform,
  tone,
  callToAction,
}: PromptParams) {
  return `${basePrompt.trim()}

---
Use the above strategic workflow to craft a finished advertising script. Reference the following campaign brief:

Company Name: ${companyName}
Product Description: ${productDescription}
Target Audience: ${targetAudience}
Primary Platform: ${platform}
Desired Tone: ${tone}
Call to Action: ${callToAction}

Output Requirements:
1. Select the optimal framework based on the campaign brief and platform.
2. Provide a concise, platform-native script that follows the chosen framework.
3. Include any critical stage directions or on-screen text cues needed for production.
4. Close with an explicit CTA aligned to "${callToAction}".
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

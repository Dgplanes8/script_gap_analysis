import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
const anonymousUsagePepper = Deno.env.get("ANON_USAGE_PEPPER");

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!anonymousUsagePepper) {
  throw new Error("ANON_USAGE_PEPPER environment variable is required");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let jobId: string | null = null;

  if (req.method === "GET") {
    const url = new URL(req.url);
    jobId = url.searchParams.get("jobId");
  } else if (req.method === "POST") {
    try {
      const body = await req.json();
      jobId = typeof body?.jobId === "string" ? body.jobId : null;
    } catch (error) {
      console.error("Failed to parse brief-status request body", error);
      return jsonError("Invalid JSON body", 400);
    }
  } else {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  if (!jobId) {
    return jsonError("jobId is required", 400);
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  const supabaseClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let userId: string | null = null;
  try {
    const { data } = await supabaseClient.auth.getUser();
    userId = data.user?.id ?? null;
  } catch (error) {
    console.error("Unable to evaluate auth context", error);
    return jsonError("Unable to verify session", 401);
  }

  let anonymousKey: string | null = null;
  if (!userId) {
    const ip = extractIpAddress(req.headers);
    if (!ip) {
      return jsonError("Unable to determine request origin", 401);
    }
    anonymousKey = await hashIp(ip);
  }

  const { data: record, error } = await adminClient
    .from("creative_brief_requests")
    .select("id, user_id, anonymous_key, status, brief_response, error_message")
    .eq("id", jobId)
    .maybeSingle();

  if (error || !record) {
    console.error("Unable to load brief request", jobId, error);
    return jsonError("Request not found", 404);
  }

  if (record.user_id) {
    if (!userId || record.user_id !== userId) {
      return jsonError("Not authorized to view this request", 403);
    }
  } else if (record.anonymous_key) {
    if (!anonymousKey || record.anonymous_key !== anonymousKey) {
      return jsonError("Not authorized to view this request", 403);
    }
  } else {
    return jsonError("Request missing ownership", 500);
  }

  const briefResponse = (record.brief_response ?? {}) as {
    structuredBrief?: Record<string, unknown>;
    researchSummary?: string | null;
    processedMode?: string;
    requestedMode?: string;
    includePdf?: boolean;
  };

  const structuredBrief = typeof briefResponse?.structuredBrief === 'object'
    ? briefResponse.structuredBrief
    : null;

  return new Response(
    JSON.stringify({
      jobId: record.id,
      status: record.status,
      brief: structuredBrief,
      researchSummary: briefResponse?.researchSummary ?? null,
      processedMode: briefResponse?.processedMode ?? null,
      requestedMode: briefResponse?.requestedMode ?? null,
      includePdf: briefResponse?.includePdf ?? false,
      error: record.error_message,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

function extractIpAddress(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for") ?? headers.get("X-Forwarded-For");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  const cfConnect = headers.get("cf-connecting-ip") ?? headers.get("CF-Connecting-IP");
  if (cfConnect) {
    return cfConnect;
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

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

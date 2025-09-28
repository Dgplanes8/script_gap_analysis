import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const convertKitApiSecret = Deno.env.get("CONVERTKIT_API_SECRET");
const convertKitApiKey = Deno.env.get("CONVERTKIT_API_KEY");
const convertKitFormId = Deno.env.get("CONVERTKIT_FORM_ID");

if (!convertKitApiSecret && !convertKitApiKey) {
  throw new Error("CONVERTKIT_API_SECRET or CONVERTKIT_API_KEY must be set");
}

if (!convertKitFormId) {
  throw new Error("CONVERTKIT_FORM_ID must be set");
}

type SubscribePayload = {
  email?: string;
  firstName?: string;
};

type ConvertKitResponse = {
  subscription?: unknown;
  error?: string;
};

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

  try {

  let payload: SubscribePayload;

  try {
    payload = await req.json();
  } catch (error) {
    console.error("subscribe-convertkit: invalid JSON", error);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const email = payload.email?.trim();
  const firstName = payload.firstName?.trim();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const requestBody: Record<string, string> = {
    email,
    first_name: firstName ?? "",
  };

  if (convertKitApiSecret) {
    requestBody.api_secret = convertKitApiSecret;
  }

  if (convertKitApiKey) {
    requestBody.api_key = convertKitApiKey;
  }

  let response: Response;
  try {
    response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error("subscribe-convertkit: network error", error);
    return new Response(JSON.stringify({ error: "Unable to reach ConvertKit" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    console.error("subscribe-convertkit: ConvertKit error", response.status, details);
    return new Response(JSON.stringify({ error: "ConvertKit subscription failed", details }), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let convertKitResponse: ConvertKitResponse | string = "";
  try {
    convertKitResponse = await response.json();
  } catch (error) {
    console.error("subscribe-convertkit: failed to parse response", error);
  }

  return new Response(
    JSON.stringify({ success: true, data: convertKitResponse }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );

  } catch (error) {
    console.error("ConvertKit subscription failed", error);
    captureEdgeFunctionError(error, {
      functionName: 'subscribe-convertkit',
      additionalTags: {
        error_type: 'subscription_failed'
      }
    });

    return new Response(
      JSON.stringify({ success: false, error: "Subscription failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

export {};

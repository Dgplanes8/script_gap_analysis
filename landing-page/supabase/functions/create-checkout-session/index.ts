import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import Stripe from "https://esm.sh/stripe@14.17.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const stripePriceId = Deno.env.get("STRIPE_PRICE_ID");
const successUrl = Deno.env.get("STRIPE_SUCCESS_URL") ?? Deno.env.get("SITE_URL")?.concat("/ai-ad-script-generator?checkout=success");
const cancelUrl = Deno.env.get("STRIPE_CANCEL_URL") ?? Deno.env.get("SITE_URL")?.concat("/ai-ad-script-generator?checkout=cancel");

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!stripeSecretKey || !stripePriceId) {
  throw new Error("Stripe configuration is incomplete");
}

if (!successUrl || !cancelUrl) {
  throw new Error("Define STRIPE_SUCCESS_URL and STRIPE_CANCEL_URL or provide SITE_URL");
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

type CheckoutResponse = {
  checkout_url: string;
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

  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id, stripe_customer_id, credits_remaining")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return new Response(JSON.stringify({ error: "Unable to load profile" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!profile) {
    return new Response(JSON.stringify({ error: "Profile not initialized" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let customerId = profile.stripe_customer_id ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email ?? undefined });
    customerId = customer.id;

    const { error: updateError } = await adminClient
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Unable to persist Stripe customer" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  const response: CheckoutResponse = {
    checkout_url: session.url ?? "",
  };

  if (!response.checkout_url) {
    return new Response(JSON.stringify({ error: "Stripe session missing URL" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

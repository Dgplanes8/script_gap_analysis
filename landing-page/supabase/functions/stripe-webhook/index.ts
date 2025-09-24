import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import Stripe from "https://esm.sh/stripe@14.17.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const defaultCreditsPerPurchase = Number(Deno.env.get("STRIPE_PURCHASE_CREDIT_AMOUNT") ?? "50");
const briefCreditPackSize = Number(Deno.env.get("BRIEF_CREDIT_PACK_SIZE") ?? `${defaultCreditsPerPurchase}`);

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!stripeSecretKey || !stripeWebhookSecret) {
  throw new Error("Stripe webhook configuration is incomplete");
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400, headers: corsHeaders });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    console.error("Stripe signature verification failed", error);
    return new Response("Invalid signature", { status: 400, headers: corsHeaders });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

    if (customerId) {
      await applyCreditGrant(customerId, session.metadata ?? {});
    } else {
      console.warn("Checkout session missing customer reference", session.id);
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;

    if (customerId) {
      await applyCreditGrant(customerId, subscription.metadata ?? {});
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

async function applyCreditGrant(customerId: string, metadata: Record<string, string>) {
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: profile, error } = await adminClient
    .from("profiles")
    .select("id, credits_remaining, research_mode_unlocked")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error || !profile) {
    console.error("Unable to locate profile for Stripe customer", customerId, error);
    return;
  }

  const metadataProduct = metadata?.product ?? "";
  const creditOverride = metadata?.credit_amount ? Number(metadata.credit_amount) : NaN;
  const creditIncrement = Number.isFinite(creditOverride)
    ? Number(creditOverride)
    : metadataProduct === "creative_brief"
      ? briefCreditPackSize
      : defaultCreditsPerPurchase;

  const unlockResearch = [metadata?.unlock_research_mode, metadata?.research_mode, metadata?.grant_research_mode]
    .filter(Boolean)
    .map((value) => value?.toLowerCase())
    .includes("true");

  const payload: Record<string, unknown> = {
    credits_remaining: (profile.credits_remaining ?? 0) + creditIncrement,
    updated_at: new Date().toISOString(),
  };

  if (unlockResearch && !profile.research_mode_unlocked) {
    payload.research_mode_unlocked = true;
  }

  const { error: updateError } = await adminClient
    .from("profiles")
    .update(payload)
    .eq("id", profile.id);

  if (updateError) {
    console.error("Unable to update profile after Stripe grant", updateError);
  }
}

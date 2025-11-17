import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import Stripe from "https://esm.sh/stripe@14.17.0?target=deno";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, baggage, sentry-trace",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const defaultStripePriceId = Deno.env.get("STRIPE_PRICE_ID");
const defaultSuccessUrl = Deno.env.get("STRIPE_SUCCESS_URL") ?? Deno.env.get("SITE_URL")?.concat("/ai-ad-script-generator?checkout=success");
const defaultCancelUrl = Deno.env.get("STRIPE_CANCEL_URL") ?? Deno.env.get("SITE_URL")?.concat("/ai-ad-script-generator?checkout=cancel");

const essentialsPriceId = Deno.env.get("STRIPE_ESSENTIALS_PRICE_ID") ?? defaultStripePriceId;
const studioFoundingPriceId = Deno.env.get("STRIPE_STUDIO_FOUNDING_PRICE_ID") ?? undefined;
const studioStandardPriceId = Deno.env.get("STRIPE_STUDIO_STANDARD_PRICE_ID") ?? undefined;
const conciergePriceId = Deno.env.get("STRIPE_CONCIERGE_PRICE_ID") ?? undefined;

const briefPriceId = Deno.env.get("BRIEF_STRIPE_PRICE_ID") ?? defaultStripePriceId;
const briefSuccessUrl = Deno.env.get("BRIEF_SUCCESS_URL");
const briefCancelUrl = Deno.env.get("BRIEF_CANCEL_URL");
const briefCheckoutMode = Deno.env.get("BRIEF_CHECKOUT_MODE");

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!stripeSecretKey || !defaultStripePriceId) {
  throw new Error("Stripe configuration is incomplete");
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

type CheckoutResponse = {
  checkout_url: string;
  session_id: string;
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

  let parsedBody: { product?: string; priceId?: string; tier?: string; checkoutMode?: "payment" | "subscription"; metadata?: Record<string, string>; quantity?: number } = {};
  if (req.headers.get("content-type")?.includes("application/json")) {
    try {
      parsedBody = await req.json();
    } catch (_error) {
      parsedBody = {};
    }
  }

  const product = parsedBody.product ?? "default";
  const isCreativeBriefCheckout = product === "creative_brief";
  const requestedTierRaw = typeof parsedBody.tier === 'string' ? parsedBody.tier.toLowerCase() : undefined;
  const tierSelection = requestedTierRaw ?? (isCreativeBriefCheckout ? 'studio' : 'essentials');

  let checkoutPriceId = typeof parsedBody.priceId === 'string' ? parsedBody.priceId : undefined;
  let mappedCreditAmount: number | undefined;
  let canonicalTier = tierSelection;
  let studioRate: 'founding' | 'standard' | undefined;

  if (!checkoutPriceId) {
    switch (tierSelection) {
      case 'essentials':
        checkoutPriceId = essentialsPriceId;
        mappedCreditAmount = 100;
        break;
      case 'studio':
        checkoutPriceId = studioFoundingPriceId ?? studioStandardPriceId ?? essentialsPriceId;
        mappedCreditAmount = 500;
        if (checkoutPriceId === studioFoundingPriceId && studioFoundingPriceId) {
          studioRate = 'founding';
        } else if (checkoutPriceId === studioStandardPriceId && studioStandardPriceId) {
          studioRate = 'standard';
        }
        break;
      case 'studio_standard':
        canonicalTier = 'studio';
        checkoutPriceId = studioStandardPriceId ?? studioFoundingPriceId ?? essentialsPriceId;
        mappedCreditAmount = 500;
        studioRate = checkoutPriceId === studioStandardPriceId && studioStandardPriceId ? 'standard' : 'founding';
        break;
      case 'concierge':
        checkoutPriceId = conciergePriceId ?? defaultStripePriceId;
        mappedCreditAmount = 1500;
        break;
      case 'explore':
        checkoutPriceId = essentialsPriceId;
        mappedCreditAmount = 10;
        break;
      default:
        checkoutPriceId = essentialsPriceId;
        mappedCreditAmount = 100;
        break;
    }
  }

  if (!checkoutPriceId) {
    return new Response(JSON.stringify({ error: "Stripe price is not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const successUrl = isCreativeBriefCheckout ? (briefSuccessUrl ?? defaultSuccessUrl) : defaultSuccessUrl;
  const cancelUrl = isCreativeBriefCheckout ? (briefCancelUrl ?? defaultCancelUrl) : defaultCancelUrl;

  if (!successUrl || !cancelUrl) {
    return new Response(JSON.stringify({ error: "Checkout redirect URLs are not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const checkoutMode = parsedBody.checkoutMode ?? (isCreativeBriefCheckout ? (briefCheckoutMode as "payment" | "subscription" | undefined) ?? "payment" : "subscription");
  const quantity = parsedBody.quantity && parsedBody.quantity > 0 ? parsedBody.quantity : 1;
  const metadata: Record<string, string> = { ...(parsedBody.metadata ?? (isCreativeBriefCheckout ? { product: 'creative_brief' } : {})) };

  if (!metadata.plan_tier) {
    metadata.plan_tier = canonicalTier;
  }

  if (studioRate) {
    metadata.studio_rate = studioRate;
  }

  if (!metadata.credit_amount && typeof mappedCreditAmount === 'number') {
    metadata.credit_amount = String(mappedCreditAmount);
  }

  const session = await stripe.checkout.sessions.create({
    mode: checkoutMode,
    customer: customerId,
    line_items: [
      {
        price: checkoutPriceId,
        quantity,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    ...(checkoutMode === 'subscription' ? { subscription_data: { metadata } } : {}),
  });

  const response: CheckoutResponse = {
    checkout_url: session.url ?? "",
    session_id: session.id,
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

  } catch (error) {
    console.error("Create checkout session failed", error);
    captureEdgeFunctionError(error, {
      functionName: 'create-checkout-session',
      additionalTags: {
        error_type: 'checkout_creation_failed'
      }
    });

    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

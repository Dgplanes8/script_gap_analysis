import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import Stripe from "https://esm.sh/stripe@14.17.0?target=deno";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";

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
const adminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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
      captureEdgeFunctionError(error, {
        functionName: 'stripe-webhook',
        additionalTags: {
          error_type: 'signature_verification_failed',
          stripe_signature_present: !!signature
        }
      });
      return new Response("Invalid signature", { status: 400, headers: corsHeaders });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

      await updatePackageLeadStatus(session, "checkout_completed");

      if (customerId) {
        await applyCreditGrant(customerId, session.metadata ?? {});

        // Send confirmation email to customer
        if (session.customer_details?.email) {
          await sendConfirmationEmail(
            session.customer_details.email,
            session.metadata?.package_interest || 'Studio',
            session.metadata?.user_id
          );
        }
      } else {
        console.warn("Checkout session missing customer reference", session.id);
        captureEdgeFunctionError(new Error("Checkout session missing customer reference"), {
          functionName: 'stripe-webhook',
          additionalTags: {
            error_type: 'missing_customer_id',
            session_id: session.id,
            event_type: event.type
          }
        });
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await updatePackageLeadStatus(session, "checkout_expired");
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await updatePackageLeadStatus(session, "checkout_failed");
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

  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    captureEdgeFunctionError(error, {
      functionName: 'stripe-webhook',
      additionalTags: {
        error_type: 'webhook_processing_failed'
      }
    });

    return new Response("Webhook processing failed", {
      status: 500,
      headers: corsHeaders
    });
  }
});

async function applyCreditGrant(customerId: string, metadata: Record<string, string>) {
  try {
    // First, try to find profile by stripe_customer_id
    let { data: profile, error } = await adminClient
      .from("profiles")
      .select("id, credits_remaining, research_mode_unlocked, stripe_customer_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    // If not found by stripe_customer_id, try to find by user_id from metadata and link it
    if (!profile && metadata?.user_id) {
      const { data: userProfile, error: userError } = await adminClient
        .from("profiles")
        .select("id, credits_remaining, research_mode_unlocked, stripe_customer_id")
        .eq("id", metadata.user_id)
        .maybeSingle();

      if (userProfile && !userProfile.stripe_customer_id) {
        // Link this profile to the Stripe customer
        const { error: updateError } = await adminClient
          .from("profiles")
          .update({ stripe_customer_id: customerId })
          .eq("id", metadata.user_id);

        if (updateError) {
          console.error("Failed to link Stripe customer to user profile", updateError);
        } else {
          profile = { ...userProfile, stripe_customer_id: customerId };
        }
      }
    }

    if (error || !profile) {
      console.error("Unable to locate profile for Stripe customer", customerId, error);
      captureEdgeFunctionError(error || new Error("Profile not found"), {
        functionName: 'stripe-webhook',
        additionalTags: {
          error_type: 'profile_lookup_failed',
          stripe_customer_id: customerId
        }
      });
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
      captureEdgeFunctionError(updateError, {
        functionName: 'stripe-webhook',
        additionalTags: {
          error_type: 'credit_grant_failed',
          stripe_customer_id: customerId,
          profile_id: profile.id,
          credit_increment: String(creditIncrement)
        }
      });
    }
  } catch (error) {
    console.error("Credit grant function failed", error);
    captureEdgeFunctionError(error, {
      functionName: 'stripe-webhook',
      additionalTags: {
        error_type: 'credit_grant_exception',
        stripe_customer_id: customerId
      }
    });
  }
}

async function updatePackageLeadStatus(session: Stripe.Checkout.Session, status: string) {
  const leadId = session.metadata?.lead_id;

  if (!leadId) {
    return;
  }

  const { data: existingLead, error: fetchError } = await adminClient
    .from("package_leads")
    .select("metadata")
    .eq("id", leadId)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to load package lead for Stripe webhook", leadId, fetchError);
    return;
  }

  const mergedMetadata: Record<string, unknown> = {
    ...(existingLead?.metadata as Record<string, unknown> | null | undefined ?? {}),
    stripe_session_status: status,
  };

  if (session.id) {
    mergedMetadata.stripe_session_id = session.id;
  }

  if (session.payment_intent) {
    mergedMetadata.payment_intent = typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent.id;
  }

  if (session.subscription) {
    mergedMetadata.subscription_id = typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id;
  }

  if (session.customer) {
    mergedMetadata.stripe_customer_id = typeof session.customer === "string"
      ? session.customer
      : session.customer.id;
  }

  const { error: updateError } = await adminClient
    .from("package_leads")
    .update({
      status,
      stripe_session_id: session.id,
      metadata: mergedMetadata,
    })
    .eq("id", leadId);

  if (updateError) {
    console.error("Failed to update package lead status", leadId, updateError);
  }
}

async function sendConfirmationEmail(email: string, packageName: string, userId: string | undefined) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const siteUrl = Deno.env.get("SITE_URL") || "https://apsicsmedia.com";
  const fromAddress = Deno.env.get("RESEND_FROM_EMAIL") || "Brian at APSICS Media <brian@apsicsmedia.com>";

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured, skipping confirmation email");
    return;
  }

  const toolsLinks = [
    { name: "AI Ad Script Generator", url: `${siteUrl}/ai-ad-script-generator` },
    { name: "AI Ad Iteration Tool", url: `${siteUrl}/ai-ad-iteration-tool` },
    { name: "Creative Brief Generator", url: `${siteUrl}/creative-brief-generator` },
  ];

  const emailText = `
Welcome to APSICS Media!

Your ${packageName} subscription is now active. Here's what you can do next:

1. Sign in to access your credits
   Email: ${email}
   Password: The password you created during checkout
   Login: ${siteUrl}/ai-ad-script-generator

2. Explore your tools:
${toolsLinks.map(tool => `   • ${tool.name}: ${tool.url}`).join('\n')}

3. Get support
   Email: brian@apsicsmedia.com
   We're here to help you get the most out of your subscription.

Your credits are ready to use. Start creating scroll-stopping ads today!

Best,
Brian & the APSICS Media Team
`;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #126DFB 0%, #0F5AD6 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px 20px; border: 1px solid #e0e0e0; border-top: none; }
    .button { display: inline-block; background: #126DFB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
    .tools-list { background: #f8f8f8; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .tool-link { color: #126DFB; text-decoration: none; display: block; margin: 8px 0; }
    .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">Welcome to APSICS Media! 🚀</h1>
    </div>
    <div class="content">
      <p>Your ${packageName} subscription is now active and your credits are ready to use.</p>

      <h2>Get Started in 3 Steps:</h2>

      <div style="background: #f0f7ff; padding: 20px; border-left: 4px solid #126DFB; margin: 20px 0;">
        <h3 style="margin-top:0;">1. Sign in to your account</h3>
        <p><strong>Email:</strong> ${email}<br>
        <strong>Password:</strong> The password you created during checkout</p>
        <a href="${siteUrl}/ai-ad-script-generator" class="button">Access Your Tools →</a>
      </div>

      <div class="tools-list">
        <h3 style="margin-top:0;">2. Explore your AI tools:</h3>
        ${toolsLinks.map(tool => `<a href="${tool.url}" class="tool-link">→ ${tool.name}</a>`).join('')}
      </div>

      <div style="margin: 20px 0;">
        <h3>3. Need help?</h3>
        <p>Email us at <a href="mailto:brian@apsicsmedia.com" style="color: #126DFB;">brian@apsicsmedia.com</a><br>
        We're here to help you create breakthrough ads.</p>
      </div>
    </div>
    <div class="footer">
      <p>APSICS Media<br>
      Turning ad spend into revenue growth</p>
    </div>
  </div>
</body>
</html>
`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [email],
        subject: `Welcome to APSICS Media - Your ${packageName} Account is Active!`,
        text: emailText,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send confirmation email", await response.text());
    } else {
      console.log(`Confirmation email sent to ${email}`);
    }
  } catch (error) {
    console.error("Error sending confirmation email", error);
  }
}

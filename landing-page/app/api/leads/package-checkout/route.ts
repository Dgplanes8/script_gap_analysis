import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import {
  checkRateLimit,
  getClientIdentifier,
  handlePreflight,
  rateLimitResponse,
  resolveAllowedOrigin,
  withCors,
} from '@/lib/security/request-guard';
import { buildLeadMetadata, normaliseLeadType } from '@/lib/server/lead-helpers';
import { getSupabaseServerClient } from '@/lib/server/supabase-admin';
import { sendInternalEmail } from '@/lib/server/resend';

const checkoutSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
  name: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  packageInterest: z.string().min(1),
  package_interest: z.string().optional(),
  source: z.string().optional(),
  priceId: z.string().optional(),
  checkoutMode: z.enum(['payment', 'subscription']).optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
  quantity: z.number().int().positive().optional(),
  metadata: z.record(z.any()).optional(),
});

const PACKAGE_PRICE_ENV_MAP: Record<string, string | undefined> = {
  essentials: process.env.STRIPE_ESSENTIALS_PRICE_ID,
  studio: process.env.STRIPE_STUDIO_FOUNDING_PRICE_ID,
  studio_founding: process.env.STRIPE_STUDIO_FOUNDING_PRICE_ID,
  studio_standard: process.env.STRIPE_STUDIO_STANDARD_PRICE_ID,
  concierge: process.env.STRIPE_CONCIERGE_PRICE_ID,
  // Legacy mappings
  founders_special: process.env.STRIPE_FOUNDERS_SPECIAL_PRICE_ID,
  trend_tracker: process.env.STRIPE_TREND_TRACKER_PRICE_ID,
  competitive_edge: process.env.STRIPE_COMPETITIVE_EDGE_PRICE_ID,
  market_intelligence: process.env.STRIPE_MARKET_INTELLIGENCE_PRICE_ID,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  growth: process.env.STRIPE_GROWTH_PRICE_ID,
  scale: process.env.STRIPE_SCALE_PRICE_ID,
};

function resolvePackageKey(raw: string) {
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

function resolvePriceId({ packageInterest, priceId }: { packageInterest: string; priceId?: string | null }) {
  if (priceId) {
    return priceId;
  }

  const key = resolvePackageKey(packageInterest);
  return PACKAGE_PRICE_ENV_MAP[key] || process.env.STRIPE_PRICE_ID || null;
}

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }

  return new Stripe(secretKey, { apiVersion: '2023-10-16' });
}

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  const allowedOrigin = resolveAllowedOrigin(request);
  if (!allowedOrigin) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }

  const clientIdentifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientIdentifier, 5, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfter, allowedOrigin);
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch (error) {
    return withCors(
      NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 }),
      allowedOrigin
    );
  }

  const parseResult = checkoutSchema.safeParse(rawPayload);
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0];
    const message = firstError?.message || 'Invalid payload.';

    return withCors(
      NextResponse.json({ error: message }, { status: 400 }),
      allowedOrigin
    );
  }

  const payload = parseResult.data;
  const email = payload.email.trim().toLowerCase();
  const password = payload.password?.trim();
  const name = payload.name?.trim() || null;
  const company = payload.company?.trim() || null;
  const website = payload.website?.trim() || null;
  const packageInterest = (payload.packageInterest || payload.package_interest || '').trim();
  const source = payload.source?.trim();
  const desiredPriceId = resolvePriceId({ packageInterest, priceId: payload.priceId });

  if (!desiredPriceId) {
    return withCors(
      NextResponse.json({ error: 'Stripe price ID is not configured for this package.' }, { status: 500 }),
      allowedOrigin
    );
  }

  const supabase = getSupabaseServerClient();
  const metadata = buildLeadMetadata(payload, request, source);
  const leadType = normaliseLeadType('paid_package');

  // Create user account if password is provided
  let userId: string | null = null;
  if (password) {
    try {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email since they're paying
        user_metadata: {
          name,
          company,
          package_interest: packageInterest,
        },
      });

      if (authError) {
        console.error('Failed to create user account', authError);
        return withCors(
          NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 }),
          allowedOrigin
        );
      }

      userId = authData.user?.id || null;
    } catch (error) {
      console.error('User creation exception', error);
      return withCors(
        NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 }),
        allowedOrigin
      );
    }
  }

  let insertedLead: { id: string; created_at: string } | null = null;
  let insertError: any = null;

  try {
    const { data, error } = await supabase
      .from('package_leads')
      .insert({
        email,
        name,
        company,
        website,
        package_interest: packageInterest,
        lead_type: leadType,
        source: source || null,
        status: 'checkout_pending',
        metadata,
      })
      .select('id, created_at')
      .single();

    insertedLead = data;
    insertError = error;
  } catch (error) {
    console.warn('Package leads table not available, proceeding without persistence:', error);
    insertedLead = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
    };
  }

  if (insertError && insertError.code !== 'PGRST205') {
    console.error('Failed to persist package lead before checkout', insertError);
    return withCors(
      NextResponse.json({ error: 'Failed to record submission.' }, { status: 500 }),
      allowedOrigin
    );
  }

  if (!insertedLead) {
    insertedLead = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
    };
  }

  try {
    const stripe = getStripeClient();
    const successUrl = payload.successUrl || process.env.STRIPE_SUCCESS_URL || process.env.SITE_URL;
    const cancelUrl = payload.cancelUrl || process.env.STRIPE_CANCEL_URL || process.env.SITE_URL;

    if (!successUrl || !cancelUrl) {
      throw new Error('Stripe success or cancel URL is not configured.');
    }

    const checkoutMode = payload.checkoutMode || 'subscription';
    const quantity = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;

    const session = await stripe.checkout.sessions.create({
      mode: checkoutMode,
      customer_email: email,
      line_items: [
        {
          price: desiredPriceId,
          quantity,
        },
      ],
      success_url: successUrl.includes('?')
        ? `${successUrl}&lead=${insertedLead.id}`
        : `${successUrl}?lead=${insertedLead.id}`,
      cancel_url: cancelUrl,
      metadata: {
        lead_id: insertedLead.id,
        user_id: userId || '',
        package_interest: packageInterest,
        source: source || 'unknown',
        ...(payload.metadata ? Object.fromEntries(Object.entries(payload.metadata).map(([key, value]) => [key, String(value)])) : {}),
      },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error(`Stripe session ${session.id} is missing a checkout URL.`);
    }

    if (!insertedLead.id.startsWith('temp-')) {
      await supabase
        .from('package_leads')
        .update({
          status: 'checkout_created',
          stripe_session_id: session.id,
        })
        .eq('id', insertedLead.id);
    }

    const emailResult = await sendInternalEmail({
      subject: `Stripe checkout created for ${packageInterest}`,
      text: `Lead ${insertedLead.id} (${email}) requested ${packageInterest}.\nCheckout session: ${session.id}\nCheckout URL: ${session.url}`,
    });

    if (!emailResult.success) {
      console.error('Failed to send checkout alert email', emailResult.error);
    }

    return withCors(
      NextResponse.json({ success: true, checkoutUrl: session.url, leadId: insertedLead.id }),
      allowedOrigin
    );
  } catch (error) {
    console.error('Stripe checkout creation failed', error);

    if (!insertedLead.id.startsWith('temp-')) {
      await supabase
        .from('package_leads')
        .update({ status: 'checkout_error' })
        .eq('id', insertedLead.id);
    }

    return withCors(
      NextResponse.json({ error: 'Failed to start checkout session.' }, { status: 500 }),
      allowedOrigin
    );
  }
}

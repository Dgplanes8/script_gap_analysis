import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkRateLimit,
  getClientIdentifier,
  handlePreflight,
  rateLimitResponse,
  resolveAllowedOrigin,
  withCors,
} from '@/lib/security/request-guard';
import { getSupabaseServerClient } from '@/lib/server/supabase-admin';
import { sendInternalEmail } from '@/lib/server/resend';
import { buildLeadMetadata, normaliseLeadType } from '@/lib/server/lead-helpers';

const leadSchema = z
  .object({
    email: z.string().email(),
    name: z.string().optional(),
    company: z.string().optional(),
    website: z.string().optional(),
    packageInterest: z.string().optional(),
    package_interest: z.string().optional(),
    type: z.string().optional(),
    leadType: z.string().optional(),
    source: z.string().optional(),
    metadata: z.record(z.any()).optional(),
  })
  .passthrough();

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

  const parseResult = leadSchema.safeParse(rawPayload);
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
  const name = payload.name?.trim() || null;
  const company = payload.company?.trim() || null;
  const website = payload.website?.trim() || null;
  const packageInterest = (payload.packageInterest || payload.package_interest)?.trim() || null;
  const source = payload.source?.trim();

  const leadType = normaliseLeadType(payload.leadType || payload.type);
  const metadata = buildLeadMetadata(payload, request, source);

  try {
    const supabase = getSupabaseServerClient();

    // Check if email already exists
    const { data: existingLead } = await supabase
      .from('package_leads')
      .select('id, email, package_interest, created_at')
      .eq('email', email)
      .single();

    if (existingLead) {
      // Email already exists, return success but with existing lead info
      return withCors(
        NextResponse.json({
          success: true,
          leadId: (existingLead as { id: string; email: string; package_interest: string; created_at: string } | null)?.id,
          message: 'Welcome back! You already have an account with us.',
          existing: true
        }),
        allowedOrigin
      );
    }

    const { data: insertedLead, error: insertError } = await supabase
      .from('package_leads')
      .insert({
        email,
        name,
        company,
        website,
        package_interest: packageInterest,
        lead_type: leadType,
        source: source || null,
        status: 'new',
        metadata,
      })
      .select('id, created_at')
      .single();

    if (insertError) {
      // Handle unique constraint violation gracefully
      if (insertError.code === '23505') {
        return withCors(
          NextResponse.json({
            success: true,
            message: 'Welcome back! You already have an account with us.',
            existing: true
          }),
          allowedOrigin
        );
      }

      console.error('Failed to insert lead into Supabase', insertError);
      return withCors(
        NextResponse.json({ error: 'Failed to record submission.' }, { status: 500 }),
        allowedOrigin
      );
    }

    const leadOverview = [
      `Type: ${leadType}`,
      `Name: ${name || 'N/A'}`,
      `Email: ${email}`,
      `Company: ${company || 'N/A'}`,
      packageInterest ? `Package: ${packageInterest}` : null,
      source ? `Source: ${source}` : null,
      website ? `Website: ${website}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const metadataPreview = metadata ? `\n\nMetadata:\n${JSON.stringify(metadata, null, 2)}` : '';

    const emailResult = await sendInternalEmail({
      subject: `New ${leadType.replace('_', ' ')} lead captured`,
      text: `A new lead was captured at ${insertedLead.created_at}.\n\n${leadOverview}${metadataPreview}`,
    });

    if (!emailResult.success) {
      console.error('Failed to send lead alert email', emailResult.error);
    }

    return withCors(
      NextResponse.json({ success: true, leadId: insertedLead.id }),
      allowedOrigin
    );
  } catch (error) {
    console.error('Unhandled error during lead capture', error);
    return withCors(
      NextResponse.json({ error: 'Failed to process submission.' }, { status: 500 }),
      allowedOrigin
    );
  }
}

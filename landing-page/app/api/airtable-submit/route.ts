import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  handlePreflight,
  resolveAllowedOrigin,
  rateLimitResponse,
  withCors,
} from '@/lib/security/request-guard';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

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

  try {
    const data = await request.json();

    const submittedName = [data?.name, [data?.firstName, data?.lastName].filter(Boolean).join(' ').trim()]
      .find((value) => typeof value === 'string' && value.trim().length > 0) || 'Unknown';
    const submittedEmail = typeof data?.email === 'string' ? data.email.trim() : '';

    if (!submittedEmail) {
      return withCors(
        NextResponse.json(
          { error: 'Valid email is required' },
          { status: 400 }
        ),
        allowedOrigin
      );
    }

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      console.error('Missing Airtable configuration');
      return withCors(
        NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        ),
        allowedOrigin
      );
    }

    // Handle different submission types
    let fields: Record<string, any> = {
      'Name': submittedName,
      'Email': submittedEmail,
      'Company': data.company || '',
      'Submitted': new Date().toISOString(),
      'Status': 'New',
      'Source': data.source || 'unknown',
      'Type': data.type || 'general'
    };

    // Add type-specific fields
    if (data.type === 'consultation_booking') {
      fields = {
        ...fields,
        'App Type': data.appType || '',
        'Current CTR': data.currentCTR || '',
        'Current TSR': data.currentTSR || '',
        'Pain Points': data.painPoints || '',
        'Goals': data.goals || '',
        'Budget': data.budget || '',
        'Timeline': data.timeline || ''
      };
    } else if (data.type === 'strategy_assessment') {
      fields = {
        ...fields,
        'Current ARR': data.currentARR || '',
        'Target ARR': data.targetARR || '',
        'Current CAC': data.currentCAC || '',
        'Primary Challenge': data.primaryChallenge || '',
        'Current Channels': data.currentChannels?.join(', ') || '',
        'Timeline': data.timeline || '',
        'Budget': data.budget || ''
      };
    } else if (data.type === 'strategic_consultation') {
      fields = {
        'Name': submittedName,
        'Email': submittedEmail,
        'Company': data.company || '',
        'Monthly Ad Spend': data.monthlyAdSpend || '',
        'Package Interest': data.packageInterest || '',
        'Source': data.source || 'apsics_media_landing',
        'Type': 'Strategic Consultation',
        'Status': 'New',
        'Submitted': new Date().toISOString()
      };
    } else if (data.type === 'service_tier_signup') {
      fields = {
        ...fields,
        'Type': 'Service Tier Signup',
        'Tier': data.tier || '',
        'Status': 'New'
      };
    } else if (data.type === 'free_week_trial') {
      fields = {
        'Name': submittedName,
        'Email': submittedEmail,
        'Company': data.company || '',
        'Monthly Budget': data.monthlyBudget || '',
        'Goals': data.goals || '',
        'Source': data.source || 'landing_page',
        'Type': 'Free Credits',
        'Status': 'New',
        'Submitted': new Date().toISOString()
      };
    }

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: fields,
            },
          ],
        }),
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Failed to submit to Airtable: ${JSON.stringify(errorData)}`);
    }

    return withCors(
      NextResponse.json(
        { message: 'Successfully submitted!' },
        { status: 200 }
      ),
      allowedOrigin
    );
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return withCors(
      NextResponse.json(
        { error: 'Failed to submit. Please try again.' },
        { status: 500 }
      ),
      allowedOrigin
    );
  }
}

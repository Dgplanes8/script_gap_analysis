import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  handlePreflight,
  resolveAllowedOrigin,
  rateLimitResponse,
  withCors,
} from '@/lib/security/request-guard';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_TABLE_NAME = 'Newsletter'; // Can create a separate table for newsletter signups

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  const allowedOrigin = resolveAllowedOrigin(request);
  if (!allowedOrigin) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }

  const clientIdentifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientIdentifier, 10, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfter, allowedOrigin);
  }

  try {
    const { name, email, source } = await request.json();

    if (!name || !email) {
      return withCors(
        NextResponse.json(
          { error: 'Name and email are required' },
          { status: 400 }
        ),
        allowedOrigin
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return withCors(
        NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        ),
        allowedOrigin
      );
    }

    // If Airtable is configured, send to Airtable
    if (AIRTABLE_BASE_ID && AIRTABLE_API_KEY) {
      const airtableData = {
        records: [
          {
            fields: {
              'Name': name,
              'Email': email,
              'Source': source || 'newsletter',
              'Date': new Date().toISOString(),
              'Status': 'Active',
            }
          }
        ]
      };

      const airtableResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!airtableResponse.ok) {
        const errorData = await airtableResponse.text();
        console.error('Airtable error:', errorData);
        // Continue to success even if Airtable fails
      }
    }

    // TODO: Add ConvertKit or email service integration here
    // Example ConvertKit integration:
    /*
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      const convertKitResponse = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email: email,
            first_name: name,
            tags: [source || 'newsletter']
          }),
        }
      );
    }
    */

    return withCors(
      NextResponse.json(
        { 
          message: 'Successfully subscribed to newsletter',
          email,
          name,
          source 
        },
        { status: 200 }
      ),
      allowedOrigin
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return withCors(
      NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      ),
      allowedOrigin
    );
  }
}

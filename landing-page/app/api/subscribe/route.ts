import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIdentifier,
  handlePreflight,
  resolveAllowedOrigin,
  rateLimitResponse,
  withCors,
} from '@/lib/security/request-guard';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  const allowedOrigin = resolveAllowedOrigin(request);
  if (!allowedOrigin) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    );
  }

  const clientIdentifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientIdentifier, 10, 60_000);
  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.retryAfter, allowedOrigin);
  }

  try {
    const { email, source, formId } = await request.json();

    if (!email) {
      return withCors(
        NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        ),
        allowedOrigin
      );
    }

    // ConvertKit API integration
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const resolvedFormId = formId || CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !resolvedFormId) {
      console.error('ConvertKit configuration missing');
      console.error('CONVERTKIT_API_KEY present:', !!CONVERTKIT_API_KEY);
      console.error('CONVERTKIT_FORM_ID present:', !!CONVERTKIT_FORM_ID);
      console.error('Form ID provided in request:', !!formId);
      // Fallback to logging if ConvertKit not configured
      console.log('Subscription received (ConvertKit not configured).', {
        source: source || 'unknown',
        timestamp: new Date().toISOString(),
      });
      return withCors(
        NextResponse.json(
          { message: 'Successfully subscribed! We will be in touch soon.' },
          { status: 200 }
        ),
        allowedOrigin
      );
    }

    const maskedEmail = email.includes('@')
      ? `${email.slice(0, 1)}***@${email.split('@')[1]}`
      : 'masked';

    // Determine tags based on source
    console.log('Submitting to ConvertKit:', { email: maskedEmail, source, formId: resolvedFormId });

    // Subscribe to ConvertKit
    const convertKitResponse = await fetch(`https://api.convertkit.com/v3/forms/${resolvedFormId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email
      }),
    });

    const responseBody = await convertKitResponse.json().catch(() => ({}));

    if (!convertKitResponse.ok) {
      // ConvertKit returns 422 if the subscriber already exists
      if (convertKitResponse.status === 422) {
        console.warn('ConvertKit duplicate subscriber response:', responseBody);
        return withCors(
          NextResponse.json(
            { message: 'You are already subscribed! Check your inbox for the latest templates.' },
            { status: 200 }
          ),
          allowedOrigin
        );
      }

      console.error('ConvertKit API Error:', responseBody);
      throw new Error('Failed to subscribe to newsletter');
    }

    const subscriberData = responseBody;
    console.log('ConvertKit subscription successful:', {
      email: maskedEmail,
      source,
      subscriberId: subscriberData.subscription?.subscriber?.id,
    });

    // Return different messages based on source
    const messages = {
      'cac-calculator-page': 'Successfully subscribed! Check your email for the CAC Optimization Playbook.',
      'cac-calculator-results': 'Successfully subscribed! Check your email for your detailed action plan.',
      '1m-arr-playbook-download': 'Successfully subscribed! Check your email for The $1M ARR Marketing Playbook.',
      'creative-roi-calculator-results': 'Successfully subscribed! Check your email for the Creative Strategy Implementation Guide.',
      'creative-strategy-guide': 'Successfully subscribed! Check your email for the Creative Intelligence Framework Guide.',
      'alytics-newsletter-section': 'Successfully subscribed! Get ready for weekly content intelligence insights every Monday morning.',
      'alytics-exit-popup': 'Successfully subscribed! Welcome to our weekly content intelligence newsletter.',
      'exit-intent-popup': 'Successfully subscribed! Check your email for your Free Templates PDF and weekly insights.',
      'alytics-hero': 'Successfully subscribed! Welcome to strategic content intelligence.',
      'alytics-pricing': 'Successfully subscribed! Check your email for next steps and pricing details.',
      'alytics-final-conversion': 'Successfully subscribed! Get ready for game-changing content insights.',
      'alytics-free-hooks': 'Successfully subscribed! Check your email for your free content hooks and templates.',
      'free-hooks-main': 'Successfully subscribed! Check your email for your free hooks download.',
      'alytics-founder-section': 'Successfully subscribed! Welcome to the founder community - check your email for exclusive insights.'
    };
    
    const message = messages[source as keyof typeof messages] || 'Successfully subscribed! Check your email for your download.';

    return withCors(
      NextResponse.json(
        { message },
        { status: 200 }
      ),
      allowedOrigin
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return withCors(
      NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      ),
      allowedOrigin
    );
  }
}

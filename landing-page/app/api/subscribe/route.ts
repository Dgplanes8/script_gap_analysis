import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source, formId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
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
      console.log('New subscription:', { email, source, timestamp: new Date().toISOString() });
      return NextResponse.json(
        { message: 'Successfully subscribed! We will be in touch soon.' },
        { status: 200 }
      );
    }

    // Determine tags based on source
    console.log('Submitting to ConvertKit:', { email, source, formId: resolvedFormId });

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
        return NextResponse.json(
          { message: 'You are already subscribed! Check your inbox for the latest templates.' },
          { status: 200 }
        );
      }

      console.error('ConvertKit API Error:', responseBody);
      throw new Error('Failed to subscribe to newsletter');
    }

    const subscriberData = responseBody;
    console.log('ConvertKit subscription successful:', { email, source, subscriberId: subscriberData.subscription?.subscriber?.id });

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

    return NextResponse.json(
      { message },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

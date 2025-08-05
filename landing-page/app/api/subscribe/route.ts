import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // ConvertKit API integration
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      console.error('ConvertKit configuration missing');
      console.error('CONVERTKIT_API_KEY present:', !!CONVERTKIT_API_KEY);
      console.error('CONVERTKIT_FORM_ID present:', !!CONVERTKIT_FORM_ID);
      // Fallback to logging if ConvertKit not configured
      console.log('New subscription:', { email, source, timestamp: new Date().toISOString() });
      return NextResponse.json(
        { message: 'Successfully subscribed! We will be in touch soon.' },
        { status: 200 }
      );
    }

    // Determine tags based on source
    const baseTags = ['strategic-ad-intelligence'];
    const sourceTags = {
      'cac-calculator-page': ['cac-optimization', 'calculator-lead'],
      'cac-calculator-results': ['cac-optimization', 'calculator-results-lead'],
      '1m-arr-playbook-download': ['1m-arr-playbook', 'playbook-download'],
      'creative-roi-calculator-results': ['creative-strategy', 'roi-calculator-lead'],
      'creative-strategy-guide': ['creative-strategy', 'guide-download']
    };
    
    const tags = [...baseTags, ...(sourceTags[source as keyof typeof sourceTags] || ['general-signup'])];

    console.log('Submitting to ConvertKit:', { email, source, tags });

    // Subscribe to ConvertKit
    const convertKitResponse = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
        tags: tags
      }),
    });

    if (!convertKitResponse.ok) {
      const errorData = await convertKitResponse.json();
      console.error('ConvertKit API Error:', errorData);
      throw new Error('Failed to subscribe to newsletter');
    }

    const subscriberData = await convertKitResponse.json();
    console.log('ConvertKit subscription successful:', { email, source, subscriberId: subscriberData.subscription?.subscriber?.id });

    // Return different messages based on source
    const messages = {
      'cac-calculator-page': 'Successfully subscribed! Check your email for the CAC Optimization Playbook.',
      'cac-calculator-results': 'Successfully subscribed! Check your email for your detailed action plan.',
      '1m-arr-playbook-download': 'Successfully subscribed! Check your email for The $1M ARR Marketing Playbook.',
      'creative-roi-calculator-results': 'Successfully subscribed! Check your email for the Creative Strategy Implementation Guide.',
      'creative-strategy-guide': 'Successfully subscribed! Check your email for the Creative Intelligence Framework Guide.'
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
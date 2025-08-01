import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

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
      // Fallback to logging if ConvertKit not configured
      console.log('New subscription:', { email, firstName, timestamp: new Date().toISOString() });
      return NextResponse.json(
        { message: 'Successfully subscribed! We will be in touch soon.' },
        { status: 200 }
      );
    }

    // Subscribe to ConvertKit
    const convertKitResponse = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
        first_name: firstName || '',
        tags: ['monday-morning-marketer', 'landing-page-signup']
      }),
    });

    if (!convertKitResponse.ok) {
      const errorData = await convertKitResponse.json();
      console.error('ConvertKit API Error:', errorData);
      throw new Error('Failed to subscribe to newsletter');
    }

    const subscriberData = await convertKitResponse.json();
    console.log('ConvertKit subscription successful:', { email, subscriberId: subscriberData.subscription?.subscriber?.id });

    // Track the subscription event
    // You can add analytics tracking here

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email for the 20 Proven Hooks download.' },
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
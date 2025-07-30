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

    // Log the subscription for now - you can integrate with your preferred email service later
    console.log('New subscription:', { email, firstName, timestamp: new Date().toISOString() });

    // Track the subscription event
    // You can add analytics tracking here

    return NextResponse.json(
      { message: 'Successfully subscribed! We will be in touch soon.' },
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
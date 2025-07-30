import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend only when needed to avoid build-time errors
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  // Import Resend dynamically to avoid build-time initialization
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get Resend client
    const resend = getResendClient();

    // Add to email list (using Resend as example)
    // You can replace this with your preferred email service
    await resend.contacts.create({
      email,
      firstName,
      audienceId: process.env.RESEND_AUDIENCE_ID || '',
    });

    // Send welcome email
    await resend.emails.send({
      from: process.env.NEXT_PUBLIC_FROM_EMAIL || 'hello@mondaymorningmarketer.com',
      to: email,
      subject: 'Welcome to Monday Morning Ideas — your first hooks arrive Monday 8am ET',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1f2937; margin-bottom: 20px;">Welcome to Monday Morning Ideas</h1>
          
          <p>Hi${firstName ? ` ${firstName}` : ''} — thanks for subscribing.</p>
          
          <p>Every Monday you'll get <strong>3 hooks worth testing</strong>, <strong>1 creative teardown</strong>, and <strong>1 mini test idea</strong> for subscription apps.</p>
          
          <p>Here's a small gift to get started: a 1-page <strong>Hook Bank 10</strong> PDF built from real reviews/Reddit pains.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin-top: 0; color: #1f2937;">🎁 Your Hook Bank 10 PDF</h3>
            <p style="margin-bottom: 15px;">10 proven hooks from real customer language that you can adapt for your fitness/sports app.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/resources/hook-bank-10.pdf" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Download Now</a>
          </div>
          
          <p><strong>What to expect:</strong></p>
          <ul style="line-height: 1.8;">
            <li>Your first Monday Morning Ideas arrives next Monday at 8am ET</li>
            <li>3 hooks you can test immediately</li>
            <li>1 teardown of a winning ad with breakdown</li>
            <li>1 mini test idea (30-second implementation)</li>
          </ul>
          
          <p>Want to fast-track your results? Check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/pilot" style="color: #1f2937; font-weight: bold;">free 7-day scripts pilot</a> or go straight to the <a href="${process.env.NEXT_PUBLIC_APP_URL}/990" style="color: #1f2937; font-weight: bold;">$990 / 72-hour system</a>.</p>
          
          <p>— MMM</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Monday Morning Marketer<br>
            Contact: <a href="mailto:mondaymorningmarketer@gmail.com">mondaymorningmarketer@gmail.com</a><br>
            <a href="#">Unsubscribe</a> | <a href="#">Update preferences</a>
          </p>
        </div>
      `,
    });

    // Track the subscription event
    // You can add analytics tracking here

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error subscribing user:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
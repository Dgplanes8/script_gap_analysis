import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

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
      subject: 'Welcome to Monday Morning Marketer!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9; text-align: center;">Welcome to Monday Morning Marketer!</h1>
          
          <p>Hi${firstName ? ` ${firstName}` : ''},</p>
          
          <p>Thank you for joining our community of growth-focused marketers! You're now part of 2,847+ businesses that have transformed their marketing results.</p>
          
          <h2>What happens next?</h2>
          <ul>
            <li><strong>Monday Morning:</strong> You'll receive your first strategic marketing insight</li>
            <li><strong>Throughout the week:</strong> Access to exclusive frameworks and case studies</li>
            <li><strong>Community access:</strong> Join our private group for networking and Q&A</li>
          </ul>
          
          <p>In the meantime, here are some resources to get you started:</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🎯 Free Marketing Audit Checklist</h3>
            <p>Identify the gaps in your current marketing strategy with our comprehensive 47-point audit.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/resources/audit-checklist" style="background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Download Now</a>
          </div>
          
          <p>Ready to take your marketing to the next level? <a href="${process.env.NEXT_PUBLIC_APP_URL}/pilot">Book a strategy call</a> to discuss your specific goals.</p>
          
          <p>To your success,<br>The Monday Morning Marketer Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Monday Morning Marketer<br>
            You're receiving this because you subscribed to our marketing insights.<br>
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
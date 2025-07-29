import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Get Featured Submissions';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Name': data.name,
                'Email': data.email,
                'Company': data.company,
                'App Type': data.appType,
                'Current CTR': data.currentCTR || '',
                'Current TSR': data.currentTSR || '',
                'Pain Points': data.painPoints,
                'Goals': data.goals,
                'Budget': data.budget || '',
                'Timeline': data.timeline || '',
                'Submitted': new Date().toISOString(),
                'Status': 'New',
              },
            },
          ],
        }),
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Airtable API Error:', errorData);
      throw new Error('Failed to submit to Airtable');
    }

    // Send notification email to team
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.NEXT_PUBLIC_FROM_EMAIL || 'hello@mondaymorningmarketer.com',
          to: 'mondaymorningmarketer@gmail.com',
          subject: `New "Get Featured" Submission from ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">New Get Featured Submission</h2>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Company:</strong> ${data.company}</p>
                <p><strong>App Type:</strong> ${data.appType}</p>
              </div>

              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Performance Metrics</h3>
                <p><strong>Current CTR:</strong> ${data.currentCTR || 'Not provided'}</p>
                <p><strong>Current TSR:</strong> ${data.currentTSR || 'Not provided'}</p>
                <p><strong>Budget:</strong> ${data.budget || 'Not provided'}</p>
                <p><strong>Timeline:</strong> ${data.timeline || 'Not provided'}</p>
              </div>

              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Pain Points</h3>
                <p>${data.painPoints}</p>
              </div>

              <div style="background: #fef3f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Goals</h3>
                <p>${data.goals}</p>
              </div>

              <p><a href="https://airtable.com/app/${AIRTABLE_BASE_ID}" style="background: #1f2937; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View in Airtable</a></p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: 'Successfully submitted!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
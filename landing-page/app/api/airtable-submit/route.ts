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

    // Log the submission for now - you can add email notifications later
    console.log('New Get Featured submission:', {
      name: data.name,
      email: data.email,
      company: data.company,
      appType: data.appType,
      timestamp: new Date().toISOString()
    });

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
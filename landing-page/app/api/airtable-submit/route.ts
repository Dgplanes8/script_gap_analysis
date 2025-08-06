import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
// Use table ID if available, otherwise fall back to table name
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tblmHGwp3SBo8KSLF';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Lead Management';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Received form submission:', data);

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration');
      console.error('AIRTABLE_API_KEY present:', !!AIRTABLE_API_KEY);
      console.error('AIRTABLE_BASE_ID present:', !!AIRTABLE_BASE_ID);
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Handle different submission types
    let fields: Record<string, any> = {
      'Name': data.name,
      'Email': data.email,
      'Company': data.company || '',
      'Submitted': new Date().toISOString(),
      'Status': 'New',
      'Source': data.source || 'unknown',
      'Type': data.type || 'general'
    };

    // Add type-specific fields
    if (data.type === 'consultation_booking') {
      fields = {
        ...fields,
        'App Type': data.appType || '',
        'Current CTR': data.currentCTR || '',
        'Current TSR': data.currentTSR || '',
        'Pain Points': data.painPoints || '',
        'Goals': data.goals || '',
        'Budget': data.budget || '',
        'Timeline': data.timeline || ''
      };
    } else if (data.type === 'strategy_assessment') {
      fields = {
        ...fields,
        'Current ARR': data.currentARR || '',
        'Target ARR': data.targetARR || '',
        'Current CAC': data.currentCAC || '',
        'Primary Challenge': data.primaryChallenge || '',
        'Current Channels': data.currentChannels?.join(', ') || '',
        'Timeline': data.timeline || '',
        'Budget': data.budget || ''
      };
    } else if (data.type === 'strategic_consultation') {
      fields = {
        'Name': data.fullName || '',
        'Email': data.email || '',
        'Company': data.company || '',
        'Monthly Ad Spend': data.monthlyAdSpend || '',
        'Package Interest': data.packageInterest || '',
        'Source': data.source || 'apsics_media_landing',
        'Type': 'Strategic Consultation',
        'Status': 'New',
        'Submitted': new Date().toISOString()
      };
    }

    console.log('Submitting to Airtable with fields:', fields);
    
    // Use table ID directly (more reliable than table name)
    const tableIdentifier = AIRTABLE_TABLE_ID;
    console.log('Airtable URL:', `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableIdentifier}`);

    // Submit to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableIdentifier}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: fields,
            },
          ],
        }),
      }
    );

    console.log('Airtable response status:', airtableResponse.status);

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Failed to submit to Airtable: ${JSON.stringify(errorData)}`);
    }

    const airtableData = await airtableResponse.json();
    console.log('Airtable submission successful:', airtableData);

    // Log the submission
    console.log('New submission:', {
      name: data.name || `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: data.company,
      type: data.type,
      source: data.source,
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
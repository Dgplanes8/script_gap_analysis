import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { fetchUserSubmissions } from '@/lib/supabase/custom-ads';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * GET /api/custom-ads
 * Fetch authenticated user's saved ad submissions with generation metadata
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Create Supabase client with user's session
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Verify user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Fetch submissions using helper
    const { data: submissions, error: fetchError } = await fetchUserSubmissions(
      supabase,
      user.id
    );

    if (fetchError) {
      return NextResponse.json({ error: fetchError }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      submissions: submissions || [],
      count: submissions?.length || 0,
    });
  } catch (error) {
    console.error('Custom ads fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/custom-ads
 * Web fallback for creating ad submissions (alternative to iOS Shortcut)
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Create Supabase client with user's session
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Verify user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { adUrl, platform, companyName } = body;

    // Validate required fields
    if (!adUrl) {
      return NextResponse.json({ error: 'adUrl is required' }, { status: 400 });
    }

    // Normalize platform
    const normalizedPlatform = (platform || 'facebook').toLowerCase();
    const validPlatforms = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin', 'other'];
    const finalPlatform = validPlatforms.includes(normalizedPlatform)
      ? normalizedPlatform
      : 'facebook';

    // Upsert submission
    const { data: submission, error: upsertError } = await supabase
      .from('custom_ad_submissions')
      .upsert(
        {
          user_id: user.id,
          ad_url: adUrl,
          platform: finalPlatform,
          company_name: companyName?.trim() || null,
          source: 'web',
        },
        {
          onConflict: 'user_id,ad_url',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (upsertError) {
      console.error('Upsert error:', upsertError);
      return NextResponse.json({ error: 'Failed to save ad submission' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      submission,
      message: 'Ad saved successfully',
    });
  } catch (error) {
    console.error('Custom ads creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/custom-ads?submissionId=<id>
 * Delete a saved ad submission
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Create Supabase client with user's session
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Verify user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Get submission ID from query params
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'submissionId query parameter required' },
        { status: 400 }
      );
    }

    // Delete submission (cascade deletes creations)
    const { error: deleteError } = await supabase
      .from('custom_ad_submissions')
      .delete()
      .eq('id', submissionId)
      .eq('user_id', user.id); // Ensure user owns it

    if (deleteError) {
      console.error('Deletion error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Ad submission deleted successfully',
    });
  } catch (error) {
    console.error('Custom ads deletion error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/custom-ads/tokens
 * Generate a new share token for authenticated user
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
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
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { label, expiresInDays } = body;

    // Call database function to generate token
    const { data: tokenData, error: tokenError } = await supabase.rpc(
      'generate_custom_ad_share_token',
      {
        p_user_id: user.id,
        p_label: label || 'iOS Shortcut Token',
        p_expires_days: expiresInDays || null,
      }
    );

    if (tokenError) {
      console.error('Token generation error:', tokenError);
      return NextResponse.json(
        { error: 'Failed to generate share token' },
        { status: 500 }
      );
    }

    // Return token data
    // IMPORTANT: raw_token should only be shown once - client must save it
    return NextResponse.json({
      success: true,
      token: tokenData.raw_token,
      tokenId: tokenData.token_id,
      expiresAt: tokenData.expires_at,
      label: tokenData.label,
      message: 'Save this token securely - it cannot be retrieved again',
    });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/custom-ads/tokens
 * List user's active share tokens (without raw tokens)
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
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
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Fetch user's tokens (excluding raw token hash)
    const { data: tokens, error: fetchError } = await supabase
      .from('custom_ad_share_tokens')
      .select('id, label, created_at, expires_at, last_used_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Token fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch tokens' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      tokens,
    });
  } catch (error) {
    console.error('Token list error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/custom-ads/tokens?tokenId=<id>
 * Revoke a share token
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user from cookie session
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
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
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Get token ID from query params
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');

    if (!tokenId) {
      return NextResponse.json(
        { error: 'tokenId query parameter required' },
        { status: 400 }
      );
    }

    // Delete token (RLS ensures user owns it)
    const { error: deleteError } = await supabase
      .from('custom_ad_share_tokens')
      .delete()
      .eq('id', tokenId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Token deletion error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to revoke token' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Token revoked successfully',
    });
  } catch (error) {
    console.error('Token revocation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
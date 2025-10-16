import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Auth callback handler for email confirmations, password resets, and magic links
 * Handles the redirect from Supabase auth emails
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/ai-ad-script-generator';
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle error from Supabase
  if (error) {
    console.error('Auth callback error:', error, errorDescription);
    return NextResponse.redirect(
      new URL(`/auth/error?message=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  // Exchange code for session
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Failed to exchange code for session:', exchangeError);
      return NextResponse.redirect(
        new URL(`/auth/error?message=${encodeURIComponent(exchangeError.message)}`, request.url)
      );
    }

    // Check if this is a password reset flow
    // Password reset requires the user to be redirected to a password update page
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // For password resets, check if we need to show password update form
      const isPasswordReset = requestUrl.searchParams.get('type') === 'recovery';

      if (isPasswordReset) {
        return NextResponse.redirect(new URL('/auth/reset-password', request.url));
      }
    }

    // Successful authentication - redirect to requested page
    return NextResponse.redirect(new URL(next, request.url));
  }

  // No code provided - redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}

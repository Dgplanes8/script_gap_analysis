/**
 * Shared Supabase utilities for APSICS AI Tools
 * Provides consistent patterns for auth, profile queries, and data handling
 */

import type { User } from '@supabase/supabase-js';
import type { BrowserClient, ProfileRow } from '@/lib/supabase/browser-client';

export interface ProfileData {
  credits_remaining: number;
  research_mode_unlocked: boolean;
  brief_exports: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

/**
 * Standard profile query that works across all AI tools
 * Returns consistent profile data structure
 */
export async function fetchUserProfile(
  supabase: BrowserClient,
  userId: string
): Promise<{ data: ProfileData | null; error: string | null }> {
  const runQuery = async (columns: string) =>
    supabase
      .from('profiles')
      .select(columns)
      .eq('id', userId)
      .maybeSingle();

  try {
    let { data, error } = await runQuery('credits_remaining, research_mode_unlocked, brief_exports');

    if (error && error.code === '42703') {
      // Legacy profile schema without optional columns, retry selecting only credits
      console.warn('Profile schema missing optional columns, falling back to credits-only query');
      ({ data, error } = await runQuery('credits_remaining'));
    }

    if (error) {
      console.error('Profile fetch error:', error);
      return {
        data: null,
        error: "We couldn't load your remaining credits. Contact brian@apsicsmedia.com if this persists."
      };
    }

    if (!data) {
      return {
        data: null,
        error: 'Profile not found. Please refresh or contact support to initialize your account.'
      };
    }

    return {
      data: {
        credits_remaining: (data as { credits_remaining?: number | null }).credits_remaining ?? 0,
        research_mode_unlocked: (data as { research_mode_unlocked?: boolean | null }).research_mode_unlocked ?? false,
        brief_exports: (data as { brief_exports?: number | null }).brief_exports ?? 0
      },
      error: null
    };
  } catch (fetchError) {
    console.error('Unexpected profile fetch error:', fetchError);
    return {
      data: null,
      error: "We couldn't load your remaining credits. Contact brian@apsicsmedia.com if this persists."
    };
  }
}

/**
 * Standard auth success handler with optional ConvertKit subscription
 * Maintains consistency across tools while allowing for tool-specific behavior
 */
export async function handleAuthSuccess(
  supabase: BrowserClient,
  email: string,
  subscribeToConvertKit = false
): Promise<{ error: string | null }> {
  if (!subscribeToConvertKit) {
    return { error: null };
  }

  try {
    const { error: subscribeError } = await supabase.functions.invoke('subscribe-convertkit', {
      body: { email },
    });

    if (subscribeError) {
      console.error('ConvertKit subscription failed:', subscribeError);
      // Don't return error for subscription failures - auth was successful
    }

    return { error: null };
  } catch (error) {
    console.error('ConvertKit subscription error:', error);
    return { error: null }; // Don't fail auth for subscription issues
  }
}

/**
 * Standard auth initialization hook pattern
 * Returns consistent auth state across all tools
 */
export function createAuthStateManager(supabase: BrowserClient) {
  return {
    async initializeAuth(): Promise<User | null> {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user ?? null;
    },

    createAuthListener(onAuthChange: (user: User | null) => void) {
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        onAuthChange(session?.user ?? null);
      });
      return listener;
    },

    async signOut(): Promise<{ error: string | null }> {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Sign out error:', error);
          return { error: 'Sign out failed. Please try refreshing the page.' };
        }
        return { error: null };
      } catch (error) {
        console.error('Unexpected sign out error:', error);
        return { error: 'Sign out failed. Please try refreshing the page.' };
      }
    }
  };
}

/**
 * Standard URL normalization for consistent URL handling
 * Accepts: "example.com", "www.example.com", "https://example.com"
 */
export function normalizeWebsiteUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Already has protocol
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Add https:// prefix
  return `https://${trimmed}`;
}

/**
 * Standard URL validation that accepts flexible formats
 */
export function validateWebsiteUrl(url: string): { isValid: boolean; error?: string } {
  if (!url.trim()) {
    return { isValid: false, error: 'Website URL is required.' };
  }

  try {
    const normalizedUrl = normalizeWebsiteUrl(url);
    const parsed = new URL(normalizedUrl);

    if (!parsed.host) {
      throw new Error('Invalid host');
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Enter a valid website URL (e.g., example.com or https://example.com).'
    };
  }
}

/**
 * Standard email validation
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Enter a valid email address.' };
  }

  return { isValid: true };
}

/**
 * Standard contact message for consistent support information
 */
export const CONTACT_MESSAGE = "Contact brian@apsicsmedia.com with any questions or feature requests";

/**
 * Standard error fallback message
 */
export const ERROR_FALLBACK_MESSAGE = `Something went wrong. Try again or contact brian@apsicsmedia.com.`;

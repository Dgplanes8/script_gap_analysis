import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type BrowserClient = SupabaseClient;

export type ProfileRow = {
  id: string;
  credits_remaining: number | null;
  research_mode_unlocked: boolean | null;
  brief_exports: number | null;
  last_brief_preview: string | null;
  stripe_customer_id: string | null;
  updated_at: string | null;
};

let client: BrowserClient | null = null;

export function getSupabaseBrowserClient(): BrowserClient {
  // Ensure this only runs in browser context
  if (typeof window === 'undefined') {
    throw new Error('getSupabaseBrowserClient can only be called in browser context');
  }

  if (client) {
    return client;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase public environment variables');
  }

  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return client;
}

// Alias for compatibility
export const createBrowserClient = getSupabaseBrowserClient;


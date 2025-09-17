import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type BrowserClient = SupabaseClient<Database>;

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          credits_remaining: number | null;
          stripe_customer_id: string | null;
          updated_at: string | null;
        };
      };
    };
  };
};

let client: BrowserClient | null = null;

export function getSupabaseBrowserClient(): BrowserClient {
  if (client) {
    return client;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase public environment variables');
  }

  client = createClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return client;
}

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

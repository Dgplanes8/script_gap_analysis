import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type LeadType = 'free_trial' | 'paid_package' | 'assessment' | 'content_download' | 'marketing';

export interface PackageLeadRow {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  website: string | null;
  package_interest: string | null;
  lead_type: LeadType;
  source: string | null;
  status: string;
  stripe_session_id: string | null;
  metadata: Record<string, unknown> | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PackageLeadInsert {
  email: string;
  name?: string | null;
  company?: string | null;
  website?: string | null;
  package_interest?: string | null;
  lead_type?: LeadType;
  source?: string | null;
  status?: string;
  stripe_session_id?: string | null;
  metadata?: Record<string, unknown> | null;
  notes?: string | null;
}

type PackageLeadUpdate = Partial<PackageLeadInsert>;

type Database = {
  public: {
    Tables: {
      package_leads: {
        Row: PackageLeadRow;
        Insert: PackageLeadInsert;
        Update: PackageLeadUpdate;
      };
      [key: string]: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
    Views: {
      [key: string]: {
        Row: any;
      };
    };
    Functions: {
      [key: string]: {
        Args: any;
        Returns: any;
      };
    };
    Enums: {
      [key: string]: string;
    };
  };
};

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseServerClient) {
    return supabaseServerClient;
  }

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server environment variables.');
  }

  supabaseServerClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseServerClient;
}

export type SupabaseServerClient = SupabaseClient;

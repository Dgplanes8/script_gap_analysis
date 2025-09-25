import type { SupabaseClient } from '@supabase/supabase-js';

export type BriefMode = 'simple' | 'advanced';
export type BriefFormat = 'ugc' | 'static' | 'video' | 'hybrid';

export type BriefGeneratorPayload = {
  mode: BriefMode;
  brief_format: BriefFormat;
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  campaignObjective: string;
  audienceProfile: string;
  keyMessages?: string;
  brandVoice?: string;
  primaryPlatform?: string;
  budgetRange?: string;
  creativeConstraints?: string;
  include_pdf?: boolean;
};

export type StructuredBrief = {
  executiveSummary: string;
  strategicFoundation: string;
  creativeDirection: string;
  deliverables: string;
  successMetrics: string;
};

export type BriefResponse = {
  jobId: string;
  mode: BriefMode;
  requestedMode: BriefMode;
  creditCost: number;
  brief?: StructuredBrief;
  researchSummary?: string | null;
  includePdf?: boolean;
};

export type BriefStatusResponse = {
  jobId: string;
  status: string;
  brief?: StructuredBrief;
  processedMode?: BriefMode | null;
  requestedMode?: BriefMode | null;
  researchSummary?: string | null;
  includePdf?: boolean;
  error?: string;
};

export async function generateBrief(
  supabase: SupabaseClient,
  payload: BriefGeneratorPayload,
) {
  return supabase.functions.invoke<BriefResponse>('generate-brief', {
    body: payload,
  });
}

export async function fetchBriefStatus(
  supabase: SupabaseClient,
  jobId: string,
) {
  return supabase.functions.invoke<BriefStatusResponse>('brief-status', {
    body: { jobId },
  });
}

export async function startCreativeBriefCheckout(
  supabase: SupabaseClient,
  options: {
    unlockResearch?: boolean;
    creditAmount?: number;
    tier?: 'essentials' | 'studio' | 'concierge';
  } = {},
) {
  const {
    unlockResearch = true,
    creditAmount,
    tier = 'studio',
  } = options;

  const metadata: Record<string, string> = {
    product: 'creative_brief',
    unlock_research_mode: unlockResearch ? 'true' : 'false',
  };

  if (typeof creditAmount === 'number') {
    metadata.credit_amount = String(creditAmount);
  }

  return supabase.functions.invoke<{ checkout_url?: string }>('create-checkout-session', {
    body: {
      tier,
      metadata,
    },
  });
}

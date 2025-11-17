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
  campaignOverview: {
    campaignName: string;
    primaryObjective: string;
    targetAudience: string;
    keyMessage: string;
    uniqueValueProposition: string;
  };
  conceptSummary: {
    conceptName: string;
    strategicApproach: string;
    targetPersona: string;
    coreEmotion: string;
    lifeForce8: string;
    awarenessLevel: string;
    formats: string;
    performancePredictionScore: string;
  };
  formatExecutions: Array<{
    formatType: string;
    primaryHook: string;
    keyVisuals: string;
    talentNotes: string;
    goldenPainAddressed: string;
    dreamOutcomePromised: string;
  }>;
  brandGuidelines: {
    voicePositioning: string;
    powerWords: string;
    forbiddenLanguage: string;
    requiredDisclaimers: string;
  };
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

type InvokeOptions = {
  headers?: Record<string, string>;
};

export async function generateBrief(
  supabase: SupabaseClient,
  payload: BriefGeneratorPayload,
  options: InvokeOptions = {},
) {
  const invokeOptions: {
    body: BriefGeneratorPayload;
    headers?: Record<string, string>;
  } = {
    body: payload,
  };

  if (options.headers) {
    invokeOptions.headers = options.headers;
  }

  return supabase.functions.invoke('generate-brief', invokeOptions) as Promise<{
    data: BriefResponse | null;
    error: any;
  }>;
}

export async function fetchBriefStatus(
  supabase: SupabaseClient,
  jobId: string,
  options: InvokeOptions = {},
) {
  const invokeOptions: {
    body: { jobId: string };
    headers?: Record<string, string>;
  } = {
    body: { jobId },
  };

  if (options.headers) {
    invokeOptions.headers = options.headers;
  }

  return supabase.functions.invoke('brief-status', invokeOptions) as Promise<{
    data: BriefStatusResponse | null;
    error: any;
  }>;
}

export async function startCreativeBriefCheckout(
  supabase: SupabaseClient,
  options: {
    unlockResearch?: boolean;
    creditAmount?: number;
    tier?: 'essentials' | 'studio' | 'concierge';
  } = {},
  invokeOptions: InvokeOptions = {},
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

  const request: {
    body: {
      tier: 'essentials' | 'studio' | 'concierge';
      metadata: Record<string, string>;
    };
    headers?: Record<string, string>;
  } = {
    body: {
      tier,
      metadata,
    },
  };

  if (invokeOptions.headers) {
    request.headers = invokeOptions.headers;
  }

  return supabase.functions.invoke('create-checkout-session', request) as Promise<{
    data: { checkout_url?: string } | null;
    error: any;
  }>;
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Loader2, Lock, Sparkles, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import {
  type BriefMode,
  type BriefFormat,
  type StructuredBrief,
  type BriefResponse,
  generateBrief,
  fetchBriefStatus,
  startCreativeBriefCheckout,
} from './creative-brief-generator';
import { buildSupabaseInvokeHeaders } from '@/utils/build-supabase-invoke-headers';

const STORAGE_KEY = 'creative-brief-generator-form';

// Animation variants for brand-compliant interactions
const buttonHoverVariants = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 12px 30px rgba(18, 109, 251, 0.4)",
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.98 }
};

const cardVariants = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

const brandVoiceOptions = [
  { value: '', label: 'Let AI infer from website' },
  { value: 'professional', label: 'Professional & Authoritative' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'playful', label: 'Playful & Fun' },
  { value: 'premium', label: 'Premium & Sophisticated' },
  { value: 'urgent', label: 'Direct & Urgent' },
];

const platformOptions = [
  { value: '', label: 'Multi-platform approach' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const budgetOptions = [
  { value: '', label: 'Prefer not to specify' },
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: 'over-50k', label: 'Over $50,000' },
];

type FormState = {
  briefMode: BriefMode;
  briefFormat: BriefFormat;
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  campaignObjective: string;
  audienceProfile: string;
  keyMessages: string;
  brandVoice: string;
  primaryPlatform: string;
  budgetRange: string;
  creativeConstraints: string;
  includePdf: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type ProfileSnapshot = {
  credits_remaining: number | null;
  research_mode_unlocked: boolean | null;
  brief_exports: number | null;
  last_brief_preview: string | null;
};

const defaultFormState: FormState = {
  briefMode: 'simple',
  briefFormat: 'ugc',
  companyName: '',
  websiteUrl: '',
  productDescription: '',
  campaignObjective: '',
  audienceProfile: '',
  keyMessages: '',
  brandVoice: '',
  primaryPlatform: '',
  budgetRange: '',
  creativeConstraints: '',
  includePdf: false,
};

const requiredFields: Array<keyof FormState> = [
  'companyName',
  'websiteUrl',
  'productDescription',
  'campaignObjective',
  'audienceProfile',
];

function restoreFormState(): FormState {
  if (typeof window === 'undefined') {
    return defaultFormState;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultFormState;
    }

    const parsed = JSON.parse(stored) as Partial<FormState>;
    return { ...defaultFormState, ...parsed };
  } catch (error) {
    console.warn('Failed to restore form state', error);
    return defaultFormState;
  }
}

function persistFormState(nextState: FormState) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch (error) {
    console.warn('Failed to persist form state', error);
  }
}

function normalizeWebsiteUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return '';
  }

  // Remove common prefixes if present
  const cleaned = trimmed.replace(/^(https?:\/\/)?(www\.)?/i, '');

  // Add https:// and www. prefix
  return `https://www.${cleaned}`;
}

function toMarkdown(brief: StructuredBrief) {
  let markdown = `# Creative Brief\n\n`;

  // Campaign Overview
  markdown += `## 1. CAMPAIGN OVERVIEW\n\n`;
  markdown += `**Campaign Name:** ${brief.campaignOverview.campaignName}\n\n`;
  markdown += `**Primary Objective:** ${brief.campaignOverview.primaryObjective}\n\n`;
  markdown += `**Target Audience:** ${brief.campaignOverview.targetAudience}\n\n`;
  markdown += `**Key Message:** ${brief.campaignOverview.keyMessage}\n\n`;
  markdown += `**Unique Value Proposition:** ${brief.campaignOverview.uniqueValueProposition}\n\n`;

  // Concept Summary
  markdown += `## 2. CONCEPT SUMMARY (Highest Scoring Concept)\n\n`;
  markdown += `**Concept Name:** ${brief.conceptSummary.conceptName}\n\n`;
  markdown += `**Strategic Approach:** ${brief.conceptSummary.strategicApproach}\n\n`;
  markdown += `**Target Persona:** ${brief.conceptSummary.targetPersona}\n\n`;
  markdown += `**Core Emotion:** ${brief.conceptSummary.coreEmotion}\n\n`;
  markdown += `**Life Force 8:** ${brief.conceptSummary.lifeForce8}\n\n`;
  markdown += `**Awareness Level:** ${brief.conceptSummary.awarenessLevel}\n\n`;
  markdown += `**Formats:** ${brief.conceptSummary.formats}\n\n`;
  markdown += `**Performance Prediction Score:** ${brief.conceptSummary.performancePredictionScore}\n\n`;

  // Format Executions
  markdown += `## 3. FORMAT EXECUTIONS\n\n`;
  brief.formatExecutions.forEach((execution, index) => {
    markdown += `### Format ${index + 1}: ${execution.formatType}\n\n`;
    markdown += `**Primary Hook/Headline:** ${execution.primaryHook}\n\n`;
    markdown += `**Key Visuals:** ${execution.keyVisuals}\n\n`;
    markdown += `**Talent Notes:** ${execution.talentNotes}\n\n`;
    markdown += `**Golden Pain Addressed:** ${execution.goldenPainAddressed}\n\n`;
    markdown += `**Dream Outcome Promised:** ${execution.dreamOutcomePromised}\n\n`;
    markdown += `---\n\n`;
  });

  // Brand Guidelines
  markdown += `## 4. BRAND GUIDELINES\n\n`;
  markdown += `**Voice Positioning:** ${brief.brandGuidelines.voicePositioning}\n\n`;
  markdown += `**Power Words:** ${brief.brandGuidelines.powerWords}\n\n`;
  markdown += `**Forbidden Language:** ${brief.brandGuidelines.forbiddenLanguage}\n\n`;
  markdown += `**Required Disclaimers:** ${brief.brandGuidelines.requiredDisclaimers}\n\n`;

  return markdown;
}

function renderParagraphsCopy(copy: string) {
  return copy
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

async function extractEdgeFunctionError(error: unknown): Promise<{
  statusCode?: number;
  message?: string;
}> {
  if (!error || typeof error !== 'object') {
    return {};
  }

  const normalizeStatus = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
  };

  const maybeError = error as {
    status?: unknown;
    code?: unknown;
    message?: unknown;
    context?: unknown;
  };

  const statusCandidates: Array<unknown> = [maybeError.status, maybeError.code];
  let contextMessage = '';

  const context = maybeError.context as
    | undefined
    | null
    | (Response & {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
      })
    | {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
        response?: { status?: unknown };
      };

  if (context && typeof context === 'object') {
    statusCandidates.push((context as { status?: unknown }).status);
    statusCandidates.push((context as { statusCode?: unknown }).statusCode);
    statusCandidates.push((context as { response?: { status?: unknown } }).response?.status);

    const rawContextError = (context as { error?: unknown }).error;
    if (typeof rawContextError === 'string') {
      contextMessage = rawContextError;
    } else if (rawContextError && typeof rawContextError === 'object') {
      const nested = rawContextError as { message?: unknown; error?: unknown };
      if (typeof nested.message === 'string') {
        contextMessage = nested.message;
      } else if (typeof nested.error === 'string') {
        contextMessage = nested.error;
      }
    }
  }

  let statusCode: number | undefined;
  for (const candidate of statusCandidates) {
    const normalized = normalizeStatus(candidate);
    if (typeof normalized === 'number') {
      statusCode = normalized;
      break;
    }
  }

  let message: string | undefined = typeof maybeError.message === 'string' ? maybeError.message : undefined;
  if (!message && contextMessage) {
    message = contextMessage;
  }

  if (!message && context && typeof Response !== 'undefined' && context instanceof Response) {
    try {
      const cloned = context.clone();
      const contentType = cloned.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        const json = await cloned.json();
        if (json) {
          if (typeof (json as { error?: unknown }).error === 'string') {
            message = (json as { error: string }).error;
          } else if (typeof (json as { message?: unknown }).message === 'string') {
            message = (json as { message: string }).message;
          }
        }
      } else {
        const text = await cloned.text();
        if (text) {
          message = text;
        }
      }
    } catch {
      // ignore parsing failures
    }
  }

  return { statusCode, message };
}

export default function CreativeBriefGeneratorClient() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [formState, setFormState] = useState<FormState>(() => restoreFormState());
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileSnapshot | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileReloadKey, setProfileReloadKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [pollingJobId, setPollingJobId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [structuredBrief, setStructuredBrief] = useState<StructuredBrief | null>(null);
  const [researchSummary, setResearchSummary] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [downgradedMode, setDowngradedMode] = useState<BriefMode | null>(null);
  const [requestedPdf, setRequestedPdf] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const creditCost = formState.briefMode === 'advanced' ? 3 : 1;

  const handleFormChange = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => {
      const nextState = { ...prev, [key]: value };
      persistFormState(nextState);
      return nextState;
    });
    setFormErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }, []);

  const loadProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    setProfileError(null);

    const { data, error } = await supabase
      .from('profiles')
      .select('credits_remaining, research_mode_unlocked, brief_exports, last_brief_preview')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      setProfileError(error.message || 'Unable to load profile');
      setProfile(null);
    } else {
      setProfile(data ?? null);
    }

    setProfileLoading(false);
  }, [supabase, user]);

  const validate = useCallback(() => {
    const errors: FormErrors = {};
    requiredFields.forEach((field) => {
      const value = formState[field];
      if (typeof value === 'string' && !value.trim()) {
        errors[field] = 'Required field';
      }
    });

    const websiteCandidate = formState.websiteUrl.trim();
    if (websiteCandidate) {
      // Basic domain validation - accepts nike.com, www.nike.com, or https://nike.com
      const domainPattern = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/.*)?$/;
      if (!domainPattern.test(websiteCandidate)) {
        errors.websiteUrl = 'Enter a valid domain or URL';
      }
    } else {
      errors.websiteUrl = 'Enter a valid domain or URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formState]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    setDowngradedMode(null);
    setRequestedPdf(false);
    setPollingJobId(null);
    setStructuredBrief(null);
    setResearchSummary(null);

    try {
      const payload = {
        mode: formState.briefMode,
        brief_format: formState.briefFormat,
        companyName: formState.companyName.trim(),
        websiteUrl: normalizeWebsiteUrl(formState.websiteUrl),
        productDescription: formState.productDescription.trim(),
        campaignObjective: formState.campaignObjective.trim(),
        audienceProfile: formState.audienceProfile.trim(),
        keyMessages: formState.keyMessages.trim() || undefined,
        brandVoice: formState.brandVoice || undefined,
        primaryPlatform: formState.primaryPlatform || undefined,
        budgetRange: formState.budgetRange || undefined,
        creativeConstraints: formState.creativeConstraints.trim() || undefined,
        include_pdf: formState.includePdf,
      };

      const headers = buildSupabaseInvokeHeaders({ accessToken });

      const { data, error } = await generateBrief(supabase, payload, {
        headers,
      });

      if (error) {
        const { statusCode, message } = await extractEdgeFunctionError(error);
        if (statusCode === 402) {
          setShowPurchasePrompt(true);
          setErrorMessage(message || 'Purchase credits to continue.');
        } else {
          setErrorMessage(
            message ||
              'We could not generate your brief right now. Please try again in a minute or email brian@apsicsmedia.com.',
          );
        }
        return;
      }

      if (!data) {
        setErrorMessage('No response from brief generator.');
        return;
      }

      if (data.requestedMode !== data.mode) {
        setDowngradedMode(data.mode);
      }

      if (data.brief) {
        setStructuredBrief(data.brief);
      }

      if (data.researchSummary) {
        setResearchSummary(data.researchSummary);
      }

      if (data.includePdf) {
        setRequestedPdf(true);
      }

      if (!data.brief && data.jobId) {
        setPollingJobId(data.jobId);
      }

      if (user) {
        loadProfile();
      }
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error
          ? submitError.message
          : 'Unexpected error. Please try again later or email brian@apsicsmedia.com for help.',
      );
    } finally {
      setSubmitting(false);
    }
  }, [accessToken, formState, loadProfile, supabase, user, validate]);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setAccessToken(session.access_token ?? null);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    };

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setAccessToken(session.access_token ?? null);
      } else {
        setUser(null);
        setAccessToken(null);
      }
      setProfileReloadKey((value) => value + 1);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [accessToken, supabase]);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }

    loadProfile();
  }, [loadProfile, profileReloadKey, user]);

  useEffect(() => {
    if (!pollingJobId) {
      return;
    }

    let cancelled = false;
    setPolling(true);

    const poll = async (attempt = 0) => {
      if (cancelled) {
        return;
      }

      if (attempt > 15) {
        setPolling(false);
        setErrorMessage('Still generating your brief. Please refresh the page or try again shortly.');
        return;
      }

      const headers = buildSupabaseInvokeHeaders({ accessToken });

      const { data, error } = await fetchBriefStatus(supabase, pollingJobId, {
        headers,
      });

      if (cancelled) {
        return;
      }

      if (error) {
        const { message } = await extractEdgeFunctionError(error);
        setErrorMessage(message || 'Unable to read brief status.');
        setPolling(false);
        return;
      }

      if (!data) {
        setPolling(false);
        setErrorMessage('Brief status response missing.');
        return;
      }

      if (data.status === 'completed' && data.brief) {
        setStructuredBrief(data.brief);
        if (data.researchSummary) {
          setResearchSummary(data.researchSummary);
        }
        if (data.processedMode && data.requestedMode && data.processedMode !== data.requestedMode) {
          setDowngradedMode(data.processedMode as BriefMode);
        }
        if (data.includePdf) {
          setRequestedPdf(true);
        }
        setPolling(false);
        setPollingJobId(null);
        if (user) {
          loadProfile();
        }
        return;
      }

      if (data.status === 'failed') {
        setPolling(false);
        setPollingJobId(null);
        setErrorMessage(data.error || 'Brief generation failed. Please try again.');
        return;
      }

      setTimeout(() => poll(attempt + 1), 2000);
    };

    poll();

    return () => {
      cancelled = true;
      setPolling(false);
    };
  }, [accessToken, loadProfile, pollingJobId, supabase, user]);

  const handlePurchase = useCallback(async () => {
    setErrorMessage(null);
    setShowPurchasePrompt(false);

    try {
      const headers = buildSupabaseInvokeHeaders({ accessToken });

      const { data, error } = await startCreativeBriefCheckout(supabase, {
        unlockResearch: true,
        creditAmount: 50,
      }, {
        headers,
      });

      if (error) {
        const { message } = await extractEdgeFunctionError(error);
        setErrorMessage(message || 'Unable to start checkout.');
        return;
      }

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setErrorMessage('Checkout session missing redirect URL.');
      }
    } catch (purchaseError) {
      setErrorMessage(purchaseError instanceof Error ? purchaseError.message : 'Unexpected error during checkout.');
    }
  }, [accessToken, supabase]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setStructuredBrief(null);
      setResearchSummary(null);
      setShowPurchasePrompt(false);
      setErrorMessage(null);
      setDowngradedMode(null);
      setRequestedPdf(false);
      setAccessToken(null);
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  }, [supabase]);

  const handleDownloadBrief = useCallback(() => {
    if (!structuredBrief) {
      return;
    }

    const markdown = toMarkdown(structuredBrief);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formState.companyName || 'creative-brief'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [formState.companyName, structuredBrief]);

  return (
    <>
      <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white" id="overview">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Trust badge */}
          <motion.div
            className="trust-badge"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Sparkles className="trust-badge-icon" />
            <span className="trust-badge-text">APSICS Performance Intelligence</span>
          </motion.div>
        </div>
        <motion.div
          className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            id="brief-form"
            className="card form-card space-y-6"
            variants={cardVariants}
            whileHover="whileHover"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <header className="space-y-2">
              <h1 className="page-title">Brief Generator</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Turn campaign ideas into complete briefs for UGC, static, video, or hybrid formats.
                Choose simple mode for instant results or unlock advanced mode for full research.
              </p>
              <div className="rounded-md border border-dashed border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                <strong className="font-semibold text-gray-900">Credits:</strong> Simple briefs cost 1 credit. Advanced
                briefs cost 3 credits and include competitive & audience research. Anonymous visitors get one simple
                brief on us.
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="brief-mode">
                  Brief Complexity
                </label>
                <select
                  id="brief-mode"
                  className="form-control"
                  value={formState.briefMode}
                  onChange={(event) => handleFormChange('briefMode', event.target.value as BriefMode)}
                >
                  <option value="simple">Simple (I&apos;ll provide context, we enhance)</option>
                  <option value="advanced">Advanced (Full research included)</option>
                </select>
                {profile && !profile.research_mode_unlocked && formState.briefMode === 'advanced' && (
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4" /> Advanced mode unlocks with the Growth plan.
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="brief-format">
                  Brief Format
                </label>
                <select
                  id="brief-format"
                  className="form-control"
                  value={formState.briefFormat}
                  onChange={(event) => handleFormChange('briefFormat', event.target.value as BriefFormat)}
                >
                  <option value="ugc">UGC / Influencer</option>
                  <option value="static">Static / Display</option>
                  <option value="video">Video</option>
                  <option value="hybrid">Hybrid (Static + Video)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="companyName">
                  Company / Brand Name
                </label>
                <input
                  id="companyName"
                  className="form-control"
                  value={formState.companyName}
                  onChange={(event) => handleFormChange('companyName', event.target.value)}
                />
                {formErrors.companyName && <p className="text-xs text-destructive">{formErrors.companyName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="websiteUrl">
                  Website URL
                </label>
                <input
                  id="websiteUrl"
                  className="form-control"
                  value={formState.websiteUrl}
                  onChange={(event) => handleFormChange('websiteUrl', event.target.value)}
                  placeholder="nike.com or www.nike.com"
                />
                {formErrors.websiteUrl && <p className="text-xs text-destructive">{formErrors.websiteUrl}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900" htmlFor="productDescription">
                Product / Service Description
              </label>
              <textarea
                id="productDescription"
                className="form-control"
                rows={3}
                value={formState.productDescription}
                onChange={(event) => handleFormChange('productDescription', event.target.value)}
                placeholder="Describe what you sell, key benefits, differentiators"
              />
              {formErrors.productDescription && <p className="text-xs text-destructive">{formErrors.productDescription}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900" htmlFor="campaignObjective">
                Campaign Objective
              </label>
              <textarea
                id="campaignObjective"
                className="form-control"
                rows={3}
                value={formState.campaignObjective}
                onChange={(event) => handleFormChange('campaignObjective', event.target.value)}
                placeholder="Launch, evergreen scaling, specific KPI targets, etc."
              />
              {formErrors.campaignObjective && <p className="text-xs text-destructive">{formErrors.campaignObjective}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900" htmlFor="audienceProfile">
                Audience Profile
              </label>
              <textarea
                id="audienceProfile"
                className="form-control"
                rows={3}
                value={formState.audienceProfile}
                onChange={(event) => handleFormChange('audienceProfile', event.target.value)}
                placeholder="Demographics, psychographics, pain points, purchase triggers"
              />
              {formErrors.audienceProfile && <p className="text-xs text-destructive">{formErrors.audienceProfile}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900" htmlFor="keyMessages">
                Key Messages (optional)
              </label>
              <textarea
                id="keyMessages"
                className="form-control"
                rows={3}
                value={formState.keyMessages}
                onChange={(event) => handleFormChange('keyMessages', event.target.value)}
                placeholder="List 3-5 must-have messages or proof points"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="brandVoice">
                  Brand Voice
                </label>
                <select
                  id="brandVoice"
                  className="form-control"
                  value={formState.brandVoice}
                  onChange={(event) => handleFormChange('brandVoice', event.target.value)}
                >
                  {brandVoiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="primaryPlatform">
                  Primary Platform
                </label>
                <select
                  id="primaryPlatform"
                  className="form-control"
                  value={formState.primaryPlatform}
                  onChange={(event) => handleFormChange('primaryPlatform', event.target.value)}
                >
                  {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="budgetRange">
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  className="form-control"
                  value={formState.budgetRange}
                  onChange={(event) => handleFormChange('budgetRange', event.target.value)}
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-900" htmlFor="creativeConstraints">
                  Creative Constraints (optional)
                </label>
                <textarea
                  id="creativeConstraints"
                  className="form-control"
                  rows={3}
                  value={formState.creativeConstraints}
                  onChange={(event) => handleFormChange('creativeConstraints', event.target.value)}
                  placeholder="Brand guidelines, compliance notes, technical requirements"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="include-pdf"
                className="h-4 w-4"
                checked={formState.includePdf}
                onChange={(event) => handleFormChange('includePdf', event.target.checked)}
              />
              Send me a PDF export via the APSICS renderer
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <motion.button
                type="submit"
                className="btn btn-primary inline-flex items-center gap-2"
                disabled={submitting || polling}
                variants={buttonHoverVariants}
                whileHover={!submitting && !polling ? "whileHover" : undefined}
                whileTap={!submitting && !polling ? "whileTap" : undefined}
              >
                {(submitting || polling) && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Generate Brief
              </motion.button>
              <span className="text-sm text-muted-foreground">
                Expected credit cost: <strong className="text-foreground">{creditCost}</strong>
              </span>
            </div>

            {errorMessage && <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{errorMessage}</p>}

            {showPurchasePrompt && (
              <div className="rounded-md border border-primary/40 bg-primary/5 p-4 text-sm">
                <p className="font-medium text-primary">Need more credits or advanced mode?</p>
                <p className="mt-1 text-muted-foreground">
                  Upgrade to the Growth plan for unlimited exports, APSICS research mode, and PDF automations.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <motion.button
                    className="btn btn-primary"
                    type="button"
                    onClick={handlePurchase}
                    variants={buttonHoverVariants}
                    whileHover="whileHover"
                    whileTap="whileTap"
                  >
                    Unlock Research Mode
                  </motion.button>
                  <motion.button
                    className="btn"
                    type="button"
                    onClick={() => setShowPurchasePrompt(false)}
                    variants={buttonHoverVariants}
                    whileHover="whileHover"
                    whileTap="whileTap"
                  >
                    Not now
                  </motion.button>
                </div>
              </div>
            )}

            {downgradedMode === 'simple' && (
              <div className="rounded-md border border-warning/20 bg-warning/10 p-3 text-sm text-warning">
                Advanced mode is available with the Growth plan. We delivered a simple brief so you can keep momentum going.
              </div>
            )}
          </motion.form>

          <motion.aside
            className="card result-card space-y-4"
            variants={cardVariants}
            whileHover="whileHover"
          >
            <section id="user-status" className="space-y-2">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Account & Credits</h2>
                {user ? (
                  <button className="text-sm text-muted-foreground hover:text-foreground" onClick={handleSignOut}>
                    Sign out
                  </button>
                ) : (
                  <Link className="text-sm text-primary" href="/ai-ad-script-generator#login">
                    Log in for more briefs
                  </Link>
                )}
              </header>

              {user ? (
                <div className="rounded-md border border-muted bg-muted/30 p-3 text-sm">
                  <p className="font-medium text-foreground">{user.email}</p>
                  {profileLoading ? (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading credits…
                    </p>
                  ) : profileError ? (
                    <p className="text-destructive">{profileError}</p>
                  ) : profile ? (
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>
                        Credits remaining:{' '}
                        <strong className="text-foreground">{profile.credits_remaining ?? 0}</strong>
                      </li>
                      <li>
                        Research mode:{' '}
                        <strong className="text-foreground">
                          {profile.research_mode_unlocked ? 'Unlocked' : 'Locked'}
                        </strong>
                      </li>
                      <li>
                        Brief exports:{' '}
                        <strong className="text-foreground">{profile.brief_exports ?? 0}</strong>
                      </li>
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Profile initializing…</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sign up to store credits, unlock advanced mode, and export unlimited briefs.
                </p>
              )}
            </section>

            <section className="space-y-2">
              <div id="progress-indicator" className={`flex items-center gap-2 text-sm ${submitting || polling ? '' : 'hidden'}`}>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Generating high-performance brief…</span>
              </div>

              {requestedPdf && (
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-4 w-4" /> PDF export queued via APSICS renderer. You&apos;ll receive it as soon as it&apos;s ready.
                </p>
              )}
            </section>

            {researchSummary && (
              <section className="space-y-1 rounded-md border border-primary/30 bg-primary/5 p-3">
                <h3 className="text-sm font-semibold text-primary">Research Highlights</h3>
                {renderParagraphsCopy(researchSummary).map((paragraph, index) => (
                  <p key={index} className="text-sm text-primary/90">
                    {paragraph}
                  </p>
                ))}
              </section>
            )}

            <section id="brief-preview" className="space-y-8">
              {structuredBrief ? (
                <motion.div
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* 1. Campaign Overview */}
                  <motion.div
                    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                    variants={cardVariants}
                    whileHover="whileHover"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F3F8FF] text-[#126DFB]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[#111827] leading-tight">1. Campaign Overview</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Campaign Name</p>
                          <p className="text-xl font-semibold text-[#111827] leading-relaxed">{structuredBrief.campaignOverview.campaignName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Primary Objective</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.campaignOverview.primaryObjective}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Target Audience</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.campaignOverview.targetAudience}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Key Message</p>
                          <div className="bg-[#F3F8FF] border-l-4 border-[#126DFB] p-4 rounded-xl">
                            <p className="text-base font-medium text-[#111827] leading-relaxed">{structuredBrief.campaignOverview.keyMessage}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Unique Value Proposition</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.campaignOverview.uniqueValueProposition}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2. Concept Summary */}
                  <motion.div
                    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                    variants={cardVariants}
                    whileHover="whileHover"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D1FAE5] text-[#10B981]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[#111827] leading-tight">2. Concept Summary</h3>
                      <span className="bg-[#D1FAE5] text-[#10B981] px-4 py-2 rounded-full text-sm font-semibold">Highest Scoring</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Concept Name</p>
                          <p className="text-xl font-bold text-[#10B981] leading-relaxed">{structuredBrief.conceptSummary.conceptName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Core Emotion</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.coreEmotion}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Awareness Level</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.awarenessLevel}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Life Force 8</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.lifeForce8}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Formats</p>
                          <p className="text-base text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.formats}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Performance Score</p>
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-[#10B981]">{structuredBrief.conceptSummary.performancePredictionScore}</div>
                            <div className="text-sm text-[#6B7280]">/25</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Strategic Approach</p>
                          <div className="bg-[#F8F8F8] p-4 rounded-xl">
                            <p className="text-sm text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.strategicApproach}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Target Persona</p>
                          <p className="text-sm text-[#4B5563] leading-relaxed">{structuredBrief.conceptSummary.targetPersona}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3. Format Executions */}
                  <motion.div
                    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                    variants={cardVariants}
                    whileHover="whileHover"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#F59E0B]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H12m1.125 2.625h7.5m-7.5 0V8.25m0 11.25v-3.375c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v3.375m-8.25-6h.008v.008H12v-.008z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[#111827] leading-tight">3. Format Executions</h3>
                    </div>
                    <div className="space-y-6">
                      {structuredBrief.formatExecutions.map((execution, index) => (
                        <motion.div
                          key={index}
                          className="border border-[#E5E7EB] rounded-2xl p-6 bg-[#F8F8F8]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="mb-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="bg-[#126DFB] text-white px-3 py-1 rounded-xl text-sm font-semibold">
                                Format {index + 1}
                              </span>
                              <h4 className="text-xl font-bold text-[#111827]">{execution.formatType}</h4>
                            </div>
                          </div>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Primary Hook/Headline</p>
                                <div className="bg-white border-l-4 border-[#126DFB] p-4 rounded-xl shadow-sm">
                                  <p className="text-base font-medium text-[#111827] leading-relaxed">
                                    "{execution.primaryHook}"
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Key Visuals</p>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{execution.keyVisuals}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Talent Notes</p>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{execution.talentNotes}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EF4444] mb-2">🎯 Golden Pain Addressed</p>
                                <div className="bg-red-50 border-l-4 border-[#EF4444] p-4 rounded-xl">
                                  <p className="text-sm text-[#374151] leading-relaxed">{execution.goldenPainAddressed}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#10B981] mb-2">✨ Dream Outcome Promised</p>
                                <div className="bg-green-50 border-l-4 border-[#10B981] p-4 rounded-xl">
                                  <p className="text-sm text-[#374151] leading-relaxed">{execution.dreamOutcomePromised}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 4. Brand Guidelines */}
                  <motion.div
                    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                    variants={cardVariants}
                    whileHover="whileHover"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#F59E0B]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3.75-6.75h3.75v-3.75m0 0L12 2.25m0 0L9.75 5.25m2.25-3V12" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[#111827] leading-tight">4. Brand Guidelines</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Voice Positioning</p>
                          <div className="bg-[#FEF3C7] p-4 rounded-xl">
                            <p className="text-base text-[#374151] leading-relaxed">{structuredBrief.brandGuidelines.voicePositioning}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#10B981] mb-2">✅ Power Words</p>
                          <div className="bg-green-50 border-l-4 border-[#10B981] p-4 rounded-xl">
                            <p className="text-sm text-[#374151] leading-relaxed">{structuredBrief.brandGuidelines.powerWords}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EF4444] mb-2">❌ Forbidden Language</p>
                          <div className="bg-red-50 border-l-4 border-[#EF4444] p-4 rounded-xl">
                            <p className="text-sm text-[#374151] leading-relaxed">{structuredBrief.brandGuidelines.forbiddenLanguage}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-2">Required Disclaimers</p>
                          <div className="bg-[#F8F8F8] p-4 rounded-xl">
                            <p className="text-sm text-[#4B5563] leading-relaxed">{structuredBrief.brandGuidelines.requiredDisclaimers}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#E5E7EB] p-8 text-center bg-[#F8F8F8]">
                  <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#126DFB]" />
                  <p className="text-base text-[#6B7280] font-medium">Your brief preview will appear here once generated.</p>
                </div>
              )}
            </section>

            <motion.button
              id="download-brief"
              type="button"
              className="btn btn-secondary inline-flex items-center gap-2"
              disabled={!structuredBrief}
              onClick={handleDownloadBrief}
              variants={buttonHoverVariants}
              whileHover={structuredBrief ? "whileHover" : undefined}
              whileTap={structuredBrief ? "whileTap" : undefined}
            >
              <Download className="h-4 w-4" /> Download Markdown
            </motion.button>
          </motion.aside>
        </motion.div>
      </section>

      <section className="py-20 bg-[#F8F8F8] relative" id="workflow">
        <div className="max-w-4xl mx-auto px-6 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="section-title">Battle-tested creative workflow</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              APSICS combines brand inputs with strategic intelligence to eliminate guesswork for creators. We filter your
              context through frameworks used to scale paid social, email, and lifecycle campaigns across hundreds of DTC
              launches.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Collect brand inputs',
                  description: 'Answer a focused set of questions to capture positioning, offer, and constraints.',
                },
                {
                  title: 'Run APSICS optimization',
                  description:
                    'Our AI augments your inputs with audience, competitive, and performance insights to craft a crystal-clear brief.',
                },
                {
                  title: 'Deploy to creators fast',
                  description:
                    'Download the brief as Markdown or PDF, share with creators, and track exports from your dashboard.',
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border border-muted bg-white p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-muted bg-background p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Why creators love APSICS briefs</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• Clear hooks, angles, and buyer psychology upfront</li>
              <li>• Format-specific direction for TikTok, Meta, YouTube, and more</li>
              <li>• KPI alignment so revisions drop by 40%+</li>
              <li>• Optional PDF packages for immediate handoff</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Need a custom workflow or agency deployment?{' '}
              <Link href="/how-it-works" className="text-primary underline">
                Talk with our team
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative" id="plans">
        <div className="max-w-4xl mx-auto px-6">
          <SimplePricingSection />
        </div>
      </section>

    </>
  );
}

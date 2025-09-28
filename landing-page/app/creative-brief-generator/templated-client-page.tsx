'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, X, FileText } from 'lucide-react';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { useFreeWeek } from '@/components/contexts/free-week-context';
import { getToolConfig } from '@/lib/template-configs';
import ResultActionsPanel from '@/components/shared/result-actions-panel';
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

type FormState = {
  companyName: string;
  websiteUrl: string;
  briefFormat: BriefFormat;
  productDescription: string;
  campaignObjective: string;
  audienceProfile: string;
  keyMessages?: string;
  primaryPlatform?: string;
  budgetRange?: string;
  creativeConstraints?: string;
};

const defaultFormState: FormState = {
  companyName: '',
  websiteUrl: '',
  briefFormat: 'ugc',
  productDescription: '',
  campaignObjective: '',
  audienceProfile: '',
  keyMessages: '',
  primaryPlatform: '',
  budgetRange: '',
  creativeConstraints: '',
};

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
      // ignore parsing failures, fall back to existing message
    }
  }

  return { statusCode, message };
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

function parseCreativeConcepts(copy: string) {
  const conceptRegex = /Concept\s+(\d+):\s*([^–-]+)[–-]\s*(.*?)(?=Concept\s+\d+:|$)/g;
  const concepts: Array<{ id: string; title: string; description: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = conceptRegex.exec(copy)) !== null) {
    concepts.push({
      id: match[1].trim(),
      title: match[2].trim(),
      description: match[3].replace(/\s+/g, ' ').trim(),
    });
  }

  return concepts.length ? concepts : null;
}

type DefinitionItem = {
  label: string;
  value: string;
};

function normalizeLabel(label: string) {
  return label
    .replace(/^["'\-•\s]+/, '')
    .replace(/["'\s]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\.$/, '');
}

function extractDefinitionItems(copy: string): DefinitionItem[] {
  const segments = copy
    .split(/(?:\n|;)+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const orderedLabels: string[] = [];
  const accumulator = new Map<string, string[]>();

  for (const segment of segments) {
    const colonIndex = segment.indexOf(':');
    if (colonIndex <= 0) {
      continue;
    }

    const rawLabel = normalizeLabel(segment.slice(0, colonIndex));
    const value = segment.slice(colonIndex + 1).trim();

    if (!rawLabel || !value) {
      continue;
    }

    if (!accumulator.has(rawLabel)) {
      orderedLabels.push(rawLabel);
      accumulator.set(rawLabel, []);
    }

    accumulator.get(rawLabel)!.push(value);
  }

  return orderedLabels.map((label) => ({
    label,
    value: accumulator.get(label)!.join(' '),
  }));
}

type DefinitionGridOptions = {
  columns?: 1 | 2 | 3;
  emphasizeNumeric?: boolean;
  className?: string;
};

function DefinitionGrid({ items, columns = 2, emphasizeNumeric = false, className }: { items: DefinitionItem[]; columns?: 1 | 2 | 3; emphasizeNumeric?: boolean; className?: string }) {
  if (!items.length) {
    return null;
  }

  const layoutClasses =
    columns === 1
      ? 'space-y-4'
      : columns === 3
        ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
        : 'grid gap-4 sm:grid-cols-2';

  return (
    <div className={`${layoutClasses}${className ? ` ${className}` : ''}`}>
      {items.map((item, index) => {
        const showLargeValue = emphasizeNumeric && /\d+\s*\/\s*\d+/.test(item.value);
        return (
          <div
            key={`${item.label}-${index}`}
            className={`flex h-full flex-col rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm ${showLargeValue ? 'items-start justify-between' : ''}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
            <p
              className={`mt-2 text-sm leading-relaxed text-gray-700 ${showLargeValue ? 'text-2xl font-semibold text-brand-700' : ''}`}
            >
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function renderDefinitionSection(copy: string, options: DefinitionGridOptions = {}) {
  const items = extractDefinitionItems(copy);

  if (items.length) {
    return <DefinitionGrid items={items} columns={options.columns} emphasizeNumeric={options.emphasizeNumeric} className={options.className} />;
  }

  const paragraphs = renderParagraphsCopy(copy);

  if (!paragraphs.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="rounded-2xl border border-gray-100 bg-white/90 p-5 text-sm leading-relaxed text-gray-700">
          {paragraph}
        </div>
      ))}
    </div>
  );
}

function extractConceptScores(copy: string) {
  const pattern = /Concept\s*(\d+)[:\-]?\s*(\d{1,2}\s*\/\s*\d{1,2})/gi;
  const scores: DefinitionItem[] = [];
  let match: RegExpExecArray | null;
  const consumed: string[] = [];

  while ((match = pattern.exec(copy)) !== null) {
    const conceptId = match[1]?.trim();
    const score = match[2]?.replace(/\s+/g, '');
    if (!conceptId || !score) {
      continue;
    }

    scores.push({ label: `Concept ${conceptId}`, value: score });
    consumed.push(match[0]);
  }

  const sanitizedCopy = consumed
    .reduce((acc, snippet) => acc.replace(snippet, ''), copy)
    .replace(/\s{2,}/g, ' ')
    .trim();

  return { scores, sanitizedCopy };
}

function ConceptScoreGrid({ scores }: { scores: DefinitionItem[] }) {
  if (!scores.length) {
    return null;
  }

  const columnsClass = scores.length >= 3 ? 'sm:grid-cols-3' : scores.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

  return (
    <div className={`grid gap-3 ${columnsClass}`}>
      {scores.map((score) => (
        <div key={score.label} className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/40 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{score.label}</p>
          <p className="mt-2 text-2xl font-semibold text-brand-800">{score.value}</p>
          <p className="text-xs font-medium text-brand-500">Performance score</p>
        </div>
      ))}
    </div>
  );
}

function renderDeliverablesSection(copy: string) {
  const { scores, sanitizedCopy } = extractConceptScores(copy);
  const items = extractDefinitionItems(sanitizedCopy);

  return (
    <div className="space-y-6">
      <ConceptScoreGrid scores={scores} />
      {items.length ? <DefinitionGrid items={items} columns={2} /> : renderDefinitionSection(sanitizedCopy, { columns: 2 })}
    </div>
  );
}

function renderConceptCards(copy: string) {
  const concepts = parseCreativeConcepts(copy);

  if (!concepts) {
    return renderDefinitionSection(copy, { columns: 1 });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {concepts.map((concept) => {
        const details = extractDefinitionItems(concept.description);
        let performanceScore: string | undefined;
        const filteredDetails = details.filter((detail) => {
          if (/score/i.test(detail.label)) {
            performanceScore = detail.value;
            return false;
          }
          return true;
        });

        return (
          <article key={concept.id} className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-sm font-semibold text-brand-700">
                  {concept.id}
                </span>
                <h4 className="text-sm font-semibold text-gray-900">{concept.title}</h4>
              </div>
              {performanceScore ? (
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {performanceScore}
                </span>
              ) : null}
            </div>
            {filteredDetails.length ? (
              <dl className="mt-4 grid gap-3">
                {filteredDetails.map((detail, index) => (
                  <div key={`${concept.id}-${detail.label}-${index}`} className="rounded-xl bg-gray-50/80 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{detail.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-gray-700">{concept.description}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default function TemplatedCreativeBriefGeneratorClient() {
  // All hooks must be called before any conditional returns
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useFreeWeek();
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [structuredBrief, setStructuredBrief] = useState<StructuredBrief | null>(null);
  const [researchSummary, setResearchSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profileCredits, setProfileCredits] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileReloadKey, setProfileReloadKey] = useState(0);
  const [pollingJobId, setPollingJobId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [downgradedMode, setDowngradedMode] = useState<BriefMode | null>(null);
  const [requestedPdf, setRequestedPdf] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'success' | 'error' | null>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [lastFormData, setLastFormData] = useState<FormState | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const triggerProfileReload = useCallback(() => {
    setProfileReloadKey((value) => value + 1);
  }, []);

  useEffect(() => {
    let mounted = true;

    const bootstrapAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
        setAccessToken(session.access_token ?? null);
      } else {
        setUser(null);
        setEmailAddress('');
        setAccessToken(null);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
        setAccessToken(session.access_token ?? null);
      } else {
        setUser(null);
        setEmailAddress('');
        setAccessToken(null);
      }
    });

    bootstrapAuth();

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const checkoutParam = searchParams?.get('checkout');
    if (!checkoutParam || checkoutMessageDismissed) {
      return;
    }

    if (checkoutParam === 'success' || checkoutParam === 'cancel') {
      setCheckoutStatus(checkoutParam);
    }
  }, [checkoutMessageDismissed, searchParams]);

  useEffect(() => {
    if (!user) {
      setProfileCredits(null);
      setProfileError(null);
      setProfileLoading(false);
      return;
    }

    let active = true;
    setProfileLoading(true);
    setProfileError(null);

    (async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('credits_remaining')
          .eq('id', user.id)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (error) {
          console.error('Failed to load profile credits', error);
          setProfileCredits(null);
          setProfileError("We couldn't load your remaining credits.");
        } else {
          setProfileCredits((data as { credits_remaining: number } | null)?.credits_remaining ?? 0);
          setProfileError(null);
        }
      } catch (loadError: any) {
        if (!active) {
          return;
        }

        console.error('Unexpected error loading profile credits', loadError);
        setProfileCredits(null);
        setProfileError("We couldn't load your remaining credits.");
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [supabase, user, profileReloadKey]);

  useEffect(() => {
    if (checkoutStatus === 'success' && user) {
      triggerProfileReload();
    }
  }, [checkoutStatus, triggerProfileReload, user]);

  // Polling effect for async brief generation
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
        setError('Still generating your brief. Please refresh the page or try again shortly.');
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
        setError(message || 'Unable to read brief status.');
        setPolling(false);
        return;
      }

      if (!data) {
        setPolling(false);
        setError('Brief status response missing.');
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
          triggerProfileReload();
        }
        return;
      }

      if (data.status === 'failed') {
        setPolling(false);
        setPollingJobId(null);
        setError(data.error || 'Brief generation failed. Please try again.');
        return;
      }

      setTimeout(() => poll(attempt + 1), 2000);
    };

    poll();

    return () => {
      cancelled = true;
      setPolling(false);
    };
  }, [accessToken, pollingJobId, supabase, triggerProfileReload, user]);

  const handleSubmit = useCallback(
    async (formData: Record<string, any>) => {
      const briefFormat = typeof formData.briefFormat === 'string' ? (formData.briefFormat as BriefFormat) : defaultFormState.briefFormat;

      const normalizedFormData: FormState = {
        companyName: typeof formData.companyName === 'string' ? formData.companyName.trim() : '',
        websiteUrl: typeof formData.websiteUrl === 'string' ? formData.websiteUrl.trim() : '',
        briefFormat,
        productDescription: typeof formData.productDescription === 'string' ? formData.productDescription.trim() : '',
        campaignObjective: typeof formData.campaignObjective === 'string' ? formData.campaignObjective.trim() : '',
        audienceProfile: typeof formData.audienceProfile === 'string' ? formData.audienceProfile.trim() : '',
        keyMessages: typeof formData.keyMessages === 'string' ? formData.keyMessages.trim() : '',
        primaryPlatform: typeof formData.primaryPlatform === 'string' ? formData.primaryPlatform : '',
        budgetRange: typeof formData.budgetRange === 'string' ? formData.budgetRange : '',
        creativeConstraints: typeof formData.creativeConstraints === 'string' ? formData.creativeConstraints.trim() : '',
      };

      setError(null);
      setShowPurchasePrompt(false);
      setShowAuthModal(false);
      setStructuredBrief(null);
      setResearchSummary(null);
      setSubmitting(true);
      setPollingJobId(null);
      setDowngradedMode(null);
      setRequestedPdf(false);
      setEmailStatus(null);
      setEmailStatusMessage('');
      setLastFormData(normalizedFormData);

      const normalizedWebsiteUrl = normalizedFormData.websiteUrl.startsWith('http')
        ? normalizedFormData.websiteUrl
        : `https://${normalizedFormData.websiteUrl}`;

      try {
        const payload = {
          mode: 'simple' as BriefMode, // Start with simple mode for all users
          brief_format: normalizedFormData.briefFormat,
          companyName: normalizedFormData.companyName,
          websiteUrl: normalizedWebsiteUrl,
          productDescription: normalizedFormData.productDescription,
          campaignObjective: normalizedFormData.campaignObjective,
          audienceProfile: normalizedFormData.audienceProfile,
          keyMessages: normalizedFormData.keyMessages || undefined,
          primaryPlatform: normalizedFormData.primaryPlatform || undefined,
          budgetRange: normalizedFormData.budgetRange || undefined,
          creativeConstraints: normalizedFormData.creativeConstraints || undefined,
          include_pdf: false, // For template simplicity, no PDF checkbox
        };

        const headers = buildSupabaseInvokeHeaders({ accessToken });

        const { data, error: invokeError } = await generateBrief(supabase, payload, {
          headers,
        });

        if (invokeError) {
          console.error('generate-brief error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const messageText = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError('Double-check the company name and website URL, then try again.');
              break;
            case 401:
              setError('Please sign in again to continue generating briefs.');
              setShowAuthModal(true);
              break;
            case 402:
              if (user) {
                setShowPurchasePrompt(true);
                setError('You\'re out of credits. Upgrade to Essentials or Studio to keep generating briefs.');
                setProfileCredits(0);
              } else {
                setShowAuthModal(true);
                setError('Create a free APSICS account to access your 10 monthly credits.');
              }
              break;
            case 502:
              setError('The AI model is busy. Wait a few seconds and try again.');
              break;
            default:
              if (messageText.toLowerCase().includes('out of credit') && !user) {
                setShowAuthModal(true);
                setError('Create a free APSICS account to access your 10 monthly credits.');
              } else if (statusCode === 402 && user) {
                setShowPurchasePrompt(true);
                setError('You\'re out of credits. Upgrade to Essentials or Studio to keep generating briefs.');
              } else {
                setError(
                  messageText && !messageText.toLowerCase().includes('edge function returned a non-2xx status code') && !messageText.toLowerCase().includes('edge function')
                    ? messageText
                    : 'Something went wrong. Please try again.',
                );
              }
          }

          return;
        }

        if (!data) {
          setError('No response from brief generator.');
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
          triggerProfileReload();
        }
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : 'We couldn\'t reach the AI right now. Try again in a minute or email brian@apsicsmedia.com.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [accessToken, supabase, triggerProfileReload, user],
  );

  const handlePurchase = useCallback((tier: 'essentials' | 'studio' | 'concierge' = 'studio') => {
    const tierTitles = {
      essentials: 'Upgrade to Essentials',
      studio: 'Unlock Studio Founding Offer',
      concierge: 'Talk to a Strategist'
    };

    const tierSubtitles = {
      essentials: 'Lock in 150 credits per month with priority processing for your entire team.',
      studio: 'Founding members secure $29/mo pricing for six months plus an expert-crafted concept for 6 months.',
      concierge: 'Schedule time with our senior team to tailor Concierge access to your roadmap.'
    };

    openModal({
      title: tierTitles[tier],
      subtitle: tierSubtitles[tier],
      source: 'creative-brief-generator',
      tier: tier
    });
  }, [openModal]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setShowPurchasePrompt(false);
      setStructuredBrief(null);
      setResearchSummary(null);
      setProfileCredits(null);
      setError(null);
      setDowngradedMode(null);
      setRequestedPdf(false);
      setEmailAddress('');
      setEmailStatus(null);
      setEmailStatusMessage('');
      setAccessToken(null);
    } catch (signOutError) {
      console.error('Failed to sign out', signOutError);
    }
  }, [supabase]);

  const handleDownloadPdf = useCallback(async () => {
    if (!structuredBrief || pdfGenerating) {
      return;
    }

    setPdfGenerating(true);
    try {
      const markdown = toMarkdown(structuredBrief);
      const response = await fetch('/api/generate-brief-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: markdown,
          companyName: lastFormData?.companyName || 'Company',
          documentType: 'creative-brief',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `creative-brief-${(lastFormData?.companyName || 'company').toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  }, [structuredBrief, pdfGenerating, lastFormData?.companyName]);

  const handleEmailAddressChange = useCallback(
    (value: string) => {
      setEmailAddress(value);
      if (emailStatus) {
        setEmailStatus(null);
        setEmailStatusMessage('');
      }
    },
    [emailStatus],
  );

  const handleCopyBrief = useCallback(() => {
    if (!structuredBrief) {
      return;
    }

    if (typeof navigator !== 'undefined') {
      const markdown = toMarkdown(structuredBrief);
      navigator.clipboard
        .writeText(markdown)
        .catch(() => setError('Unable to copy to clipboard.'));
    }
  }, [structuredBrief]);

  const handleSendEmail = useCallback(async () => {
    if (!structuredBrief) {
      return;
    }

    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailStatus('error');
      setEmailStatusMessage('Enter a valid email address to send the brief.');
      return;
    }

    setEmailSending(true);
    setEmailStatus(null);
    setEmailStatusMessage('');

    try {
      const markdown = toMarkdown(structuredBrief);
      const response = await fetch('/api/send-brief-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          content: markdown,
          companyName: lastFormData?.companyName || 'Company',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailStatus('success');
      setEmailStatusMessage('Sent! Check your inbox for the brief.');
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailStatus('error');
      setEmailStatusMessage('Failed to send the email. Please try again in a minute.');
    } finally {
      setEmailSending(false);
    }
  }, [emailAddress, structuredBrief, lastFormData?.companyName]);

  // Config check after all hooks are declared
  const config = getToolConfig('creative-brief-generator');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  // User section component
  const userSection = (
    <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {user ? (
          <>
            <p className="font-semibold text-gray-900">
              Signed in as <span className="text-brand-700">{user.email}</span>
            </p>
            <p className="mt-1 text-xs text-gray-600">
              Credits remaining:{' '}
              {profileLoading ? (
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Updating…
                </span>
              ) : typeof profileCredits === 'number' ? (
                <span className={profileCredits > 0 ? 'text-success-600' : 'text-red-600'}>{profileCredits}</span>
              ) : profileError ? (
                <span className="text-red-600">—</span>
              ) : (
                <span>—</span>
              )}
            </p>
            {profileError ? (
              <p className="mt-1 text-xs text-red-600">{profileError}</p>
            ) : null}
          </>
        ) : (
          <>
            <p className="font-semibold text-gray-900">Guest access active</p>
            <p className="mt-1 text-xs text-gray-600">
              Enjoy one complimentary brief. Sign in to access your 10 monthly credits and advanced features.
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white"
          >
            Sign out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAuthModal(true)}
            className="inline-flex items-center justify-center rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 transition hover:bg-white"
          >
            Sign in / Create account
          </button>
        )}
        {user ? (
          <button
            type="button"
            onClick={triggerProfileReload}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white"
            disabled={profileLoading}
          >
            Refresh
          </button>
        ) : null}
      </div>
    </div>
  );

  // Custom result component for brief display
  const resultComponent = structuredBrief ? (
    <ResultActionsPanel
      title="Generated Creative Brief"
      onCopy={handleCopyBrief}
      downloads={[
        {
          id: 'brief-pdf',
          label: 'Download PDF',
          onClick: handleDownloadPdf,
          disabled: !structuredBrief,
          loading: pdfGenerating,
        },
      ]}
      emailConfig={{
        description: 'We’ll email the full creative brief straight to your inbox.',
        value: emailAddress,
        onChange: handleEmailAddressChange,
        onSubmit: handleSendEmail,
        submitting: emailSending,
        statusMessage: emailStatusMessage,
        statusType: emailStatus,
      }}
    >
      <div className="space-y-6">
        {researchSummary && (
          <div className="rounded-3xl border border-[#D0E3FF] bg-[#F3F8FF] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#126DFB] shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FD6]">Research Highlights</p>
                <h4 className="text-lg font-semibold text-gray-900">Key Competitive Signals</h4>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm font-medium text-gray-600">
              {renderParagraphsCopy(researchSummary).map((paragraph, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#126DFB]" aria-hidden />
                  <span className="leading-relaxed">{paragraph}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-8">
          {/* Campaign Overview */}
          <div className="rounded-2xl border border-[#D0E3FF] bg-gradient-to-br from-[#F8FAFF] to-[#F3F8FF] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#126DFB] text-white shadow-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FD6]">Campaign Overview</p>
                <h3 className="text-xl font-semibold text-[#111827]">{structuredBrief.campaignOverview.campaignName}</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#374151] mb-2">Primary Objective</h4>
                <p className="text-[#111827] font-medium leading-relaxed">{structuredBrief.campaignOverview.primaryObjective}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#374151] mb-2">Key Message</h4>
                <p className="text-[#111827] leading-relaxed">{structuredBrief.campaignOverview.keyMessage}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#374151] mb-2">Target Audience</h4>
                <p className="text-[#111827] leading-relaxed">{structuredBrief.campaignOverview.targetAudience}</p>
              </div>
            </div>
          </div>

          {/* Concept Summary */}
          <div className="rounded-2xl border border-[#D1FAE5] bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981] text-white shadow-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#047857]">Highest Scoring Concept</p>
                <h3 className="text-xl font-semibold text-[#111827]">{structuredBrief.conceptSummary.conceptName}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Strategic Approach</h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.conceptSummary.strategicApproach}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Core Emotion</h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.conceptSummary.coreEmotion}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-white/80 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#047857] mb-1">Performance Score</p>
                  <p className="text-3xl font-bold text-[#10B981]">{structuredBrief.conceptSummary.performancePredictionScore}</p>
                  <p className="text-xs text-[#6B7280]">out of 25 points</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Target Persona</h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.conceptSummary.targetPersona}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Format Executions */}
          <div className="rounded-2xl border border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-[#FEF9E7] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B] text-white shadow-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92400E]">Format Executions</p>
                <h3 className="text-xl font-semibold text-[#111827]">Creative Formats</h3>
              </div>
            </div>
            <div className="space-y-6">
              {structuredBrief.formatExecutions.map((execution, index) => (
                <div key={index} className="rounded-xl bg-white/80 p-6 border border-[#FDE68A]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F59E0B] text-white text-sm font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-[#111827]">{execution.formatType}</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#374151] mb-2">Primary Hook</h5>
                      <p className="text-[#111827] font-medium leading-relaxed">"{execution.primaryHook}"</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-semibold text-[#374151] mb-2">Key Visuals</h5>
                        <p className="text-[#111827] leading-relaxed">{execution.keyVisuals}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#374151] mb-2">Talent Notes</h5>
                        <p className="text-[#111827] leading-relaxed">{execution.talentNotes}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] p-4">
                        <h5 className="text-sm font-semibold text-[#DC2626] mb-2">Pain Point Addressed</h5>
                        <p className="text-[#111827] leading-relaxed">{execution.goldenPainAddressed}</p>
                      </div>
                      <div className="rounded-lg bg-[#F0FDF4] border border-[#86EFAC] p-4">
                        <h5 className="text-sm font-semibold text-[#16A34A] mb-2">Dream Outcome</h5>
                        <p className="text-[#111827] leading-relaxed">{execution.dreamOutcomePromised}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Guidelines */}
          <div className="rounded-2xl border border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-[#FEF9E7] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B] text-white shadow-lg">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92400E]">Brand Guidelines</p>
                <h3 className="text-xl font-semibold text-[#111827]">Voice & Language</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded-xl bg-[#F0FDF4] border border-[#86EFAC] p-6">
                  <h4 className="text-sm font-semibold text-[#16A34A] mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Voice Positioning
                  </h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.brandGuidelines.voicePositioning}</p>
                </div>
                <div className="rounded-xl bg-[#F0FDF4] border border-[#86EFAC] p-6">
                  <h4 className="text-sm font-semibold text-[#16A34A] mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Power Words
                  </h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.brandGuidelines.powerWords}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] p-6">
                  <h4 className="text-sm font-semibold text-[#DC2626] mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Forbidden Language
                  </h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.brandGuidelines.forbiddenLanguage}</p>
                </div>
                <div className="rounded-xl bg-[#FFF7ED] border border-[#FDBA74] p-6">
                  <h4 className="text-sm font-semibold text-[#EA580C] mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    Required Disclaimers
                  </h4>
                  <p className="text-[#111827] leading-relaxed">{structuredBrief.brandGuidelines.requiredDisclaimers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResultActionsPanel>
  ) : undefined;

  return (
    <>
      {checkoutStatus && !checkoutMessageDismissed && (
        <div className={`mx-auto mb-6 max-w-4xl px-4 sm:px-6 lg:px-8`}>
          <div
            className={`flex items-start justify-between rounded-2xl border px-4 py-3 text-sm ${
              checkoutStatus === 'success'
                ? 'border-success-200 bg-success-50 text-success-900'
                : 'border-brand-200 bg-brand-50 text-brand-900'
            }`}
          >
            <div className="pr-4">
              <p className="font-semibold">
                {checkoutStatus === 'success'
                  ? 'Payment confirmed — 50 new credits and research mode added to your account.'
                  : 'Checkout cancelled — your card was not charged.'}
              </p>
              <p className="mt-1 text-xs text-current/80">
                {checkoutStatus === 'success'
                  ? 'You can start generating advanced briefs right away.'
                  : 'Need more time? You can resume checkout whenever you are ready.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCheckoutMessageDismissed(true);
                setCheckoutStatus(null);
                router.replace('/creative-brief-generator');
              }}
              className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <AIFormTemplate
        config={config.form}
        fields={config.fields}
        onSubmit={handleSubmit}
        submitting={submitting || polling}
        error={error}
        result={structuredBrief ? 'Generated' : ''}
        resultComponent={resultComponent}
        userSection={userSection}
      />

      {showPurchasePrompt && (
        <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Activate advanced research.</h3>
                <p className="mt-1 text-sm text-brand-800">
                  Upgrade to Essentials for 150 monthly credits or secure the $29 Studio founding offer with 800 credits and an expert-crafted concept in month one.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <button
                  onClick={() => handlePurchase('essentials')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
                  type="button"
                >
                  <CreditCard className="h-4 w-4" />
                  Get 150 Credits
                </button>
                <button
                  onClick={() => handlePurchase('studio')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-600 hover:text-brand-800"
                  type="button"
                >
                  <CreditCard className="h-4 w-4" />
                  Get 800 Credits + Expert Concept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AuthModal
        open={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setError(null);
        }}
        supabase={supabase}
        onAuthSuccess={() => {
          setShowAuthModal(false);
          setShowPurchasePrompt(false);
          setError(null);
          triggerProfileReload();
        }}
      />
    </>
  );
}

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  supabase: BrowserClient;
  onAuthSuccess: () => void;
};

type AuthPanelProps = {
  supabase: BrowserClient;
  onAuthSuccess: () => void;
};

function AuthPanel({ supabase, onAuthSuccess }: AuthPanelProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setAuthError(null);

    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setAuthError(error.message);
          return;
        }

        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        const subscribeHeaders = buildSupabaseInvokeHeaders({
          accessToken: currentSession?.access_token ?? null,
        });

        const { error: subscribeError } = await supabase.functions.invoke('subscribe-convertkit', {
          body: { email },
          ...(subscribeHeaders ? { headers: subscribeHeaders } : {}),
        });

        if (subscribeError) {
          console.error('subscribe-convertkit failed (sign-in)', subscribeError);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setAuthError(error.message);
          return;
        }

        const subscribeHeaders = buildSupabaseInvokeHeaders({
          accessToken: data.session?.access_token ?? null,
        });

        const { error: subscribeError } = await supabase.functions.invoke('subscribe-convertkit', {
          body: { email },
          ...(subscribeHeaders ? { headers: subscribeHeaders } : {}),
        });

        if (subscribeError) {
          console.error('subscribe-convertkit failed (sign-up)', subscribeError);
        }

        if (!data.session) {
          setAuthError('Check your email to confirm your account, then sign in to use your extra credits.');
          return;
        }
      }

      setEmail('');
      setPassword('');
      onAuthSuccess();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-gray-700">
          {mode === 'sign-in' ? 'Sign in to continue generating briefs' : 'Create a free account to claim 3 more briefs'}
        </p>
        <button
          type="button"
          onClick={() => {
            setMode((prev) => (prev === 'sign-in' ? 'sign-up' : 'sign-in'));
            setAuthError(null);
          }}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {mode === 'sign-in' ? 'Need an account?' : 'Already registered?'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        {authError && <p className="text-sm text-red-600">{authError}</p>}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {busy ? 'Processing…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

function AuthModal({ open, onClose, supabase, onAuthSuccess }: AuthModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-8" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:text-gray-800"
          aria-label="Close sign in modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Unlock more briefs</p>
          <h3 className="text-2xl font-bold text-gray-900">Create a free APSICS account</h3>
          <p className="text-sm text-gray-600">
            Get 10 monthly AI creative brief credits, save your favorites, and access Monday creative intelligence drops.
          </p>
        </div>
        <AuthPanel
          supabase={supabase}
          onAuthSuccess={() => {
            onAuthSuccess();
          }}
        />
      </div>
    </div>
  );
}

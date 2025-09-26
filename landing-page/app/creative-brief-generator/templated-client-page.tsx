'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, X, FileText, Download, Mail, FileDown } from 'lucide-react';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { useFreeWeek } from '@/components/contexts/free-week-context';
import { getToolConfig } from '@/lib/template-configs';
import {
  type BriefMode,
  type BriefFormat,
  type StructuredBrief,
  type BriefResponse,
  generateBrief,
  fetchBriefStatus,
  startCreativeBriefCheckout,
} from './creative-brief-generator';

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
  return `# Creative Brief\n\n## Executive Summary\n${brief.executiveSummary}\n\n## Strategic Foundation\n${brief.strategicFoundation}\n\n## Creative Direction\n${brief.creativeDirection}\n\n## Deliverables\n${brief.deliverables}\n\n## Success Metrics\n${brief.successMetrics}\n`;
}

function renderParagraphsCopy(copy: string) {
  return copy
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderParagraphBlocks(copy: string) {
  const paragraphs = renderParagraphsCopy(copy);
  return paragraphs.map((paragraph, index) => (
    <div
      key={index}
      className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm leading-relaxed text-gray-600"
    >
      {paragraph}
    </div>
  ));
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
  const [emailSent, setEmailSent] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [lastFormData, setLastFormData] = useState<Record<string, any> | null>(null);

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

      setUser(session?.user ?? null);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }

      setUser(session?.user ?? null);
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
          setProfileCredits(data?.credits_remaining ?? 0);
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

      const { data, error } = await fetchBriefStatus(supabase, pollingJobId);

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
  }, [pollingJobId, supabase, triggerProfileReload, user]);

  const handleSubmit = useCallback(
    async (formData: Record<string, any>) => {
      setError(null);
      setShowPurchasePrompt(false);
      setShowAuthModal(false);
      setStructuredBrief(null);
      setResearchSummary(null);
      setSubmitting(true);
      setPollingJobId(null);
      setDowngradedMode(null);
      setRequestedPdf(false);
      setLastFormData(formData);

      const normalizedWebsiteUrl = formData.websiteUrl.startsWith('http')
        ? formData.websiteUrl
        : `https://${formData.websiteUrl}`;

      try {
        const payload = {
          mode: 'simple' as BriefMode, // Start with simple mode for all users
          brief_format: formData.briefFormat,
          companyName: formData.companyName.trim(),
          websiteUrl: normalizedWebsiteUrl,
          productDescription: formData.productDescription.trim(),
          campaignObjective: formData.campaignObjective.trim(),
          audienceProfile: formData.audienceProfile.trim(),
          keyMessages: formData.keyMessages?.trim() || undefined,
          primaryPlatform: formData.primaryPlatform || undefined,
          budgetRange: formData.budgetRange || undefined,
          creativeConstraints: formData.creativeConstraints?.trim() || undefined,
          include_pdf: false, // For template simplicity, no PDF checkbox
        };

        const { data, error: invokeError } = await generateBrief(supabase, payload);

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
                  messageText && !messageText.toLowerCase().includes('edge function returned a non-2xx status code')
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
    [supabase, triggerProfileReload, user],
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

  const handleSendEmail = useCallback(async () => {
    if (!structuredBrief || !user?.email || emailSending) {
      return;
    }

    setEmailSending(true);
    try {
      const markdown = toMarkdown(structuredBrief);
      const response = await fetch('/api/send-brief-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          content: markdown,
          companyName: lastFormData?.companyName || 'Company',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Email sending failed:', error);
      setError('Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  }, [structuredBrief, user?.email, emailSending, lastFormData?.companyName]);

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
    <div className="mt-8 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Generated Creative Brief</h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {user?.email && (
            <button
              onClick={handleSendEmail}
              disabled={emailSending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#126DFB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0F5AD6] disabled:opacity-50"
              type="button"
            >
              {emailSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : emailSent ? (
                <Mail className="h-4 w-4" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {emailSending ? 'Sending...' : emailSent ? 'Sent!' : 'Email'}
            </button>
          )}
          <button
            onClick={handleDownloadPdf}
            disabled={pdfGenerating}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            type="button"
          >
            {pdfGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            {pdfGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {researchSummary && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <h4 className="text-sm font-semibold text-primary mb-1">Research Highlights</h4>
          {renderParagraphsCopy(researchSummary).map((paragraph, index) => (
            <p key={index} className="mt-1 text-sm text-primary/90">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-gray-900">Executive Summary</h4>
          <div className="space-y-3">
            {renderParagraphBlocks(structuredBrief.executiveSummary)}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold text-gray-900">Strategic Foundation</h4>
          <div className="space-y-3">
            {renderParagraphBlocks(structuredBrief.strategicFoundation)}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold text-gray-900">Creative Direction</h4>
          {(() => {
            const concepts = parseCreativeConcepts(structuredBrief.creativeDirection);
            if (concepts) {
              return (
                <div className="space-y-3">
                  {concepts.map((concept) => (
                    <div key={concept.id} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                      <p className="text-sm font-semibold text-gray-900">
                        Concept {concept.id}: {concept.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{concept.description}</p>
                    </div>
                  ))}
                </div>
              );
            }

            return renderParagraphBlocks(structuredBrief.creativeDirection);
          })()}
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold text-gray-900">Deliverables</h4>
          <div className="space-y-3">
            {renderParagraphBlocks(structuredBrief.deliverables)}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold text-gray-900">Success Metrics</h4>
          <div className="space-y-3">
            {renderParagraphBlocks(structuredBrief.successMetrics)}
          </div>
        </div>
      </div>

      {requestedPdf && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-4 w-4" /> PDF export queued via APSICS renderer. You'll receive it as soon as it's ready.
        </div>
      )}

      {downgradedMode === 'simple' && (
        <div className="rounded-md border border-warning/20 bg-warning/10 p-3 text-sm text-warning">
          Advanced mode is available with the Growth plan. We delivered a simple brief so you can keep momentum going.
        </div>
      )}
    </div>
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

        const { error: subscribeError } = await supabase.functions.invoke('subscribe-convertkit', {
          body: { email },
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

        const { error: subscribeError } = await supabase.functions.invoke('subscribe-convertkit', {
          body: { email },
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

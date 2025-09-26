'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { ProcessAccordion } from '@/components/alytics/process-accordion';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { StudioFoundingOfferCard } from '@/components/alytics/studio-founding-offer-card';
import { useFreeWeek } from '@/components/contexts/free-week-context';

type FormState = {
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  platform: string;
  objective: string;
  adFormat: 'video' | 'static';
};

type GenerationResponse = {
  script: string;
  creditsRemaining?: number;
  anonymousKey?: string;
};

const defaultFormState: FormState = {
  companyName: '',
  websiteUrl: '',
  productDescription: '',
  platform: '',
  objective: '',
  adFormat: 'video',
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

export default function AdScriptGeneratorClient() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useFreeWeek();
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ companyName?: string; websiteUrl?: string; adFormat?: string }>({});
  const [lastRequestedFormat, setLastRequestedFormat] = useState<'video' | 'static' | null>(null);
  const [profileCredits, setProfileCredits] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileReloadKey, setProfileReloadKey] = useState(0);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'success' | 'error' | null>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [anonymousKey, setAnonymousKey] = useState<string | null>(null);
  const [anonUsageCount, setAnonUsageCount] = useState(0);

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
      } else {
        setUser(null);
        setEmailAddress('');
      }

    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
      } else {
        setUser(null);
        setEmailAddress('');
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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedKey = window.localStorage.getItem('scriptGeneratorAnonymousKey');
    if (storedKey) {
      setAnonymousKey(storedKey);
    }

    const storedCount = window.localStorage.getItem('scriptGeneratorAnonymousUsageCount');
    if (storedCount) {
      const parsed = Number.parseInt(storedCount, 10);
      if (Number.isFinite(parsed) && parsed >= 0) {
        setAnonUsageCount(parsed);
      }
    }
  }, []);

  const handleFieldChange = useCallback((key: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => (prev[key as keyof typeof prev] ? { ...prev, [key]: undefined } : prev));
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setShowPurchasePrompt(false);
      setShowAuthModal(false);
      setResult('');

      const nextErrors: { companyName?: string; websiteUrl?: string; adFormat?: string } = {};

      if (!formState.companyName.trim()) {
        nextErrors.companyName = 'Company name is required.';
      }

      if (!formState.websiteUrl.trim()) {
        nextErrors.websiteUrl = 'Website URL is required.';
      } else {
        try {
          const parsedUrl = new URL(formState.websiteUrl.startsWith('http') ? formState.websiteUrl : `https://${formState.websiteUrl}`);
          if (!parsedUrl.host) {
            throw new Error('Invalid host');
          }
        } catch {
          nextErrors.websiteUrl = 'Enter a valid URL (including your domain).';
        }
      }

      if (!formState.adFormat) {
        nextErrors.adFormat = 'Select the ad output format.';
      }

      if (Object.keys(nextErrors).length > 0) {
        setFormErrors(nextErrors);
        return;
      }

      setFormErrors({});

      const isAnonymousUser = !user;
      let currentAnonymousKey = anonymousKey;

      if (isAnonymousUser) {
        if (anonUsageCount >= 1) {
          setError('You’ve used your free script. Create a free APSICS Media account to keep generating.');
          setShowAuthModal(true);
          return;
        }

        if (!currentAnonymousKey) {
          const newAnonymousKey =
            typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
              ? crypto.randomUUID()
              : `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
          currentAnonymousKey = newAnonymousKey;
          setAnonymousKey(newAnonymousKey);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('scriptGeneratorAnonymousKey', newAnonymousKey);
          }
        }
      }

      setSubmitting(true);
      setLastRequestedFormat(formState.adFormat);

      const normalizedWebsiteUrl = formState.websiteUrl.startsWith('http')
        ? formState.websiteUrl
        : `https://${formState.websiteUrl}`;

      try {
        const invokeOptions: {
          body: {
            companyName: string;
            websiteUrl: string;
            productDescription: string;
            platform: string;
            objective: string;
            adFormat: 'video' | 'static';
          };
          headers?: Record<string, string>;
        } = {
          body: {
            companyName: formState.companyName,
            websiteUrl: normalizedWebsiteUrl,
            productDescription: formState.productDescription,
            platform: formState.platform,
            objective: formState.objective,
            adFormat: formState.adFormat,
          },
        };

        if (isAnonymousUser && currentAnonymousKey) {
          invokeOptions.headers = { 'x-anonymous-key': currentAnonymousKey };
        }

        const { data, error: invokeError } = await supabase.functions.invoke<GenerationResponse>('generate-script', invokeOptions);

        if (invokeError) {
          console.error('generate-script error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const messageText = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError('Double-check the company name and website URL, then try again.');
              break;
            case 401:
              if (user) {
                setError('Please sign in again to continue generating scripts.');
              } else {
                setError('Create a free APSICS Media account to keep generating scripts.');
              }
              setShowAuthModal(true);
              break;
            case 402:
              if (user) {
                setShowPurchasePrompt(true);
                setError('You’re out of credits. Upgrade to Essentials or Studio to keep generating scripts.');
                setProfileCredits(0);
              } else {
                setShowAuthModal(true);
                setError('Create a free APSICS Media account to access your 10 monthly credits.');
              }
              break;
            case 502:
              setError('The AI model is busy. Wait a few seconds and try again.');
              break;
            default:
              if (messageText.toLowerCase().includes('out of credit') && !user) {
                setShowAuthModal(true);
                setError('Create a free APSICS Media account to access your 10 monthly credits.');
              } else if (statusCode === 402 && user) {
                setShowPurchasePrompt(true);
                setError('You’re out of credits. Upgrade to Essentials or Studio to keep generating scripts.');
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

        if (data?.script) {
          setResult(data.script);
          setEmailStatus(null);
          setEmailStatusMessage('');
          if (user?.email) {
            setEmailAddress(user.email);
          }
          if (typeof data.creditsRemaining === 'number') {
            setProfileCredits(data.creditsRemaining);
          } else if (user) {
            triggerProfileReload();
          }
          if (!user) {
            if (data.anonymousKey && data.anonymousKey.length > 0 && data.anonymousKey !== currentAnonymousKey) {
              setAnonymousKey(data.anonymousKey);
              if (typeof window !== 'undefined') {
                window.localStorage.setItem('scriptGeneratorAnonymousKey', data.anonymousKey);
              }
              currentAnonymousKey = data.anonymousKey;
            }
            setAnonUsageCount((prev) => {
              const next = prev + 1;
              if (typeof window !== 'undefined') {
                window.localStorage.setItem('scriptGeneratorAnonymousUsageCount', next.toString());
              }
              return next;
            });
          }
        }
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : 'We couldn’t reach the AI right now. Try again in a minute or email brian@apsicsmedia.com.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [anonUsageCount, anonymousKey, formState, supabase, triggerProfileReload, user],
  );

  const handlePurchase = useCallback((tier: 'essentials' | 'studio' | 'concierge' = 'essentials') => {
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
      source: 'ai-ad-script-generator',
      tier: tier
    });
  }, [openModal]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setShowPurchasePrompt(false);
      setResult('');
      setProfileCredits(null);
      setError(null);
      setLastRequestedFormat(null);
      setEmailAddress('');
      setEmailStatus(null);
      setEmailStatusMessage('');
    } catch (signOutError) {
      console.error('Failed to sign out', signOutError);
    }
  }, [supabase]);

  const handleSendEmail = useCallback(async () => {
    if (!result || !lastRequestedFormat) {
      return;
    }

    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailStatus('error');
      setEmailStatusMessage('Enter a valid email address to send the output.');
      return;
    }

    setEmailSending(true);
    setEmailStatus(null);
    setEmailStatusMessage('');

    try {
      const response = await fetch('/api/send-ad-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailAddress,
          content: result,
          format: lastRequestedFormat,
          companyName: formState.companyName,
          platform: formState.platform,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        console.error('send-ad-email failure', payload);

        const mapFriendlyMessage = () => {
          if (typeof payload?.details === 'string') {
            if (payload.details.includes('401') || payload.details.toLowerCase().includes('invalid')) {
              return 'Email service credentials need attention. Please try again shortly while we refresh them.';
            }

            if (payload.details.includes('domain') || payload.details.toLowerCase().includes('verify')) {
              return 'Email service is still verifying our sender address. Give it a minute and try again.';
            }
          }

          if (typeof payload?.error === 'string' && payload.error.length > 0) {
            return payload.error;
          }

          return 'We couldn’t send the email right now. Please try again in a minute.';
        };

        const friendly = mapFriendlyMessage();
        setEmailStatus('error');
        setEmailStatusMessage(friendly);
        return;
      }

      setEmailStatus('success');
      setEmailStatusMessage('Sent! Check your inbox for the ad deliverable.');
    } catch (sendError) {
      console.error('send-ad-email failed', sendError);
      setEmailStatus('error');
      setEmailStatusMessage('Unexpected error sending email. Try again in a minute.');
    } finally {
      setEmailSending(false);
    }
  }, [emailAddress, formState.companyName, formState.platform, lastRequestedFormat, result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          {checkoutStatus && !checkoutMessageDismissed && (
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
                    ? 'Payment confirmed — 50 new credits were added to your account.'
                    : 'Checkout cancelled — your card was not charged.'}
                </p>
                <p className="mt-1 text-xs text-current/80">
                  {checkoutStatus === 'success'
                    ? 'You can start generating more scripts right away.'
                    : 'Need more time? You can resume checkout whenever you are ready.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCheckoutMessageDismissed(true);
                  setCheckoutStatus(null);
                  router.replace('/ai-ad-script-generator');
                }}
                className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-white"
              >
                Dismiss
              </button>
            </div>
          )}

          <header className="text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
              <Sparkles className="h-4 w-4" />
              APSICS Creative Intelligence
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Generate revenue-ready ads from our $250M+ creative intelligence engine
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Turn your brief into platform-native scripts and static copy trained on what actually moves CAC. TikTok, Meta, YouTube, LinkedIn, X — handled in a single pass.
            </p>
          </header>

          <section className="rounded-3xl border border-brand-100 bg-white p-8 shadow-xl shadow-brand-50/40">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Start with a complimentary script</h2>
                <p className="text-sm text-gray-600">
                  Drop in your company name, URL, and the campaign goal. We’ll return a production-ready concept engineered from competitor intel, audience psychology, and APSICS testing frameworks.
                </p>
                <ul className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                  <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                    <p className="font-semibold text-brand-800">Platform-native copy</p>
                    <p className="mt-1 text-brand-700">Hooks, overlays, and CTAs tuned to each channel’s pacing and auction behavior.</p>
                  </li>
                  <li className="rounded-2xl border border-success-200 bg-success-50/70 p-4">
                    <p className="font-semibold text-success-700">Psychology-backed messaging</p>
                    <p className="mt-1 text-success-600">Language sourced from real customer voice, competitor gaps, and emotional triggers.</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/70 p-5 text-sm text-brand-900">
                <p className="font-semibold uppercase tracking-wide text-brand-700">Free forever plan</p>
                <ul className="mt-3 space-y-2">
                  <li>• 1 instant script without logging in</li>
                  <li>• 10 credits every month with a free account</li>
                  <li>• Upgrade to unlock weekly delivery & advanced formats</li>
                </ul>
                <p className="mt-4 text-xs text-brand-700/80">Need more credits? Paid plans add instant top ups without leaving this page.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
                        Enjoy one complimentary download. Create a free APSICS Media account to access 10 monthly credits and save your best performers.
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

              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  <span className="flex items-center justify-between">
                    <span>Company Name</span>
                    {formErrors.companyName ? (
                      <span className="text-xs font-semibold text-red-600">{formErrors.companyName}</span>
                    ) : null}
                  </span>
                  <input
                    required
                    name="companyName"
                    value={formState.companyName}
                    onChange={(event) => handleFieldChange('companyName', event.target.value)}
                    className={`rounded-lg border px-4 py-3 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${
                      formErrors.companyName ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500'
                    }`}
                    placeholder="e.g. BrightWave Labs"
                    aria-invalid={Boolean(formErrors.companyName)}
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  <span className="flex items-center justify-between">
                    <span>Website URL</span>
                    {formErrors.websiteUrl ? (
                      <span className="text-xs font-semibold text-red-600">{formErrors.websiteUrl}</span>
                    ) : null}
                  </span>
                  <input
                    required
                    name="websiteUrl"
                    value={formState.websiteUrl}
                    onChange={(event) => handleFieldChange('websiteUrl', event.target.value)}
                    className={`rounded-lg border px-4 py-3 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200 ${
                      formErrors.websiteUrl ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500'
                    }`}
                    placeholder="https://yourbrand.com"
                    aria-invalid={Boolean(formErrors.websiteUrl)}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <span className="flex items-center justify-between">
                  <span>Ad Output Format</span>
                  {formErrors.adFormat ? (
                    <span className="text-xs font-semibold text-red-600">{formErrors.adFormat}</span>
                  ) : null}
                </span>
                <select
                  name="adFormat"
                  value={formState.adFormat}
                  onChange={(event) => handleFieldChange('adFormat', event.target.value as 'video' | 'static')}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  aria-invalid={Boolean(formErrors.adFormat)}
                >
                  <option value="video">Video ad (scripted output)</option>
                  <option value="static">Static ad (headline + supporting copy)</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                <span className="flex items-center justify-between">
                  <span>Product Description <span className="text-xs font-normal text-gray-400">(optional)</span></span>
                </span>
                <textarea
                  rows={4}
                  name="productDescription"
                  value={formState.productDescription}
                  onChange={(event) => handleFieldChange('productDescription', event.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  placeholder="Share positioning, differentiators, or customer pain points for richer scripts"
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Platform <span className="text-xs font-normal text-gray-400">(optional)</span>
                  <select
                    name="platform"
                    value={formState.platform}
                    onChange={(event) => handleFieldChange('platform', event.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="">Let the AI choose the best fit</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="x">X (Twitter)</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Objective <span className="text-xs font-normal text-gray-400">(optional)</span>
                  <select
                    name="objective"
                    value={formState.objective}
                    onChange={(event) => handleFieldChange('objective', event.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="">Select campaign goal</option>
                    <option value="awareness">Awareness</option>
                    <option value="leads">Leads</option>
                    <option value="sales">Sales</option>
                    <option value="engagement">Engagement</option>
                    <option value="downloads">Downloads</option>
                    <option value="installs">Installs</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating…
                  </>
                ) : (
                  'Generate Script'
                )}
              </button>
            </form>

            {error && (
              <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            {result && (
              <div className="mt-8 space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Generated {lastRequestedFormat ? (lastRequestedFormat === 'video' ? 'Video Ad' : 'Static Ad') : 'Output'}
                  </h3>
                  <button
                    onClick={() => {
                      if (typeof navigator !== 'undefined') {
                        navigator.clipboard
                          .writeText(result)
                          .catch(() => setError('Unable to copy to clipboard.'));
                      }
                    }}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    type="button"
                  >
                    Copy to clipboard
                  </button>
                </div>
                <div className="space-y-3">
                  {result
                    .trim()
                    .split(/\n\s*\n/)
                    .map((block, index) => (
                      <div
                        key={`result-block-${index}`}
                        className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 text-sm leading-relaxed text-gray-800"
                      >
                        {block}
                      </div>
                    ))}
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <h4 className="text-sm font-semibold text-gray-900">Send this to your inbox</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    We’ll email the full {lastRequestedFormat === 'video' ? 'video script' : 'static copy bundle'} straight to your inbox.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email address
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(event) => {
                          setEmailAddress(event.target.value);
                          if (emailStatus) {
                            setEmailStatus(null);
                            setEmailStatusMessage('');
                          }
                        }}
                        placeholder="you@company.com"
                        className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      disabled={emailSending || !result}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {emailSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        'Send email'
                      )}
                    </button>
                  </div>
                  {emailStatusMessage ? (
                    <p
                      className={`mt-2 text-xs font-medium ${
                        emailStatus === 'success' ? 'text-success-600' : 'text-red-600'
                      }`}
                    >
                      {emailStatusMessage}
                    </p>
                  ) : null}
                </div>
              </div>
            )}

            {showPurchasePrompt && (
              <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">You’ve used your free credits.</h3>
                    <p className="mt-1 text-sm text-brand-800">
                      Upgrade to Essentials for 150 monthly credits or lock in the $29 Studio founding offer with 800 credits and an expert concept.
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
            )}

            <StudioFoundingOfferCard className="mt-8" />
          </section>

          <aside id="workflow" className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900">How we craft scripts</h2>
            <p className="mt-4 text-base text-gray-600">
              We blend your product inputs with proven creative frameworks, audience psychology, and platform-specific pacing so every script hits performance benchmarks.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-sm font-semibold text-brand-800">Audience-first positioning</p>
                <p className="mt-1 text-sm text-brand-700">Align the narrative with awareness level, pain points, and desired transformation.</p>
              </li>
              <li className="rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 p-4">
                <p className="text-sm font-semibold text-brand-800">Platform formatting</p>
                <p className="mt-1 text-sm text-brand-700">Optimize pacing, structure, and CTA style for the placement you choose.</p>
              </li>
              <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-sm font-semibold text-brand-800">Performance heuristics</p>
                <p className="mt-1 text-sm text-brand-700">Trained on $250M+ in ad spend, focusing on retention, resonance, and conversion.</p>
              </li>
              <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-sm font-semibold text-brand-800">Brand consistency</p>
                <p className="mt-1 text-sm text-brand-700">Adapts to your voice guidelines without sacrificing clarity or urgency.</p>
              </li>
            </ul>
            <div className="mt-8">
              <ProcessAccordion />
            </div>
          </aside>
        </div>
        <div className="pt-12">
          <SimplePricingSection />
        </div>
      </div>
      <ExitIntentPopup 
        title="Grab 10 More Free Ad Templates"
        subtitle="Join 100+ teams getting Monday creative intelligence drops plus instant access to our 10-template swipe file."
      />
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
    </div>
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
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">
          {mode === 'sign-in' ? 'Sign in to continue generating scripts' : 'Create a free account to claim 3 more scripts'}
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
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Unlock more scripts</p>
          <h3 className="text-2xl font-bold text-gray-900">Create a free APSICS account</h3>
          <p className="text-sm text-gray-600">
            Get 10 monthly AI ad script credits, save your favourites, and access Monday creative intelligence drops.
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

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User, AuthChangeEvent } from '@supabase/supabase-js';
import { CreditCard, Loader2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { getToolConfig } from '@/lib/template-configs';
import { extractEdgeFunctionError } from '@/lib/utils/error-handling';
import { AuthModal as SharedAuthModal } from '@/components/shared/auth-modal';
import ResultActionsPanel from '@/components/shared/result-actions-panel';
import ScriptOutputDisplay from '@/components/shared/script-output-display';
import { buildSupabaseInvokeHeaders } from '@/utils/build-supabase-invoke-headers';

type FormState = {
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  platform: string;
  objective: string;
  adFormat: 'video' | 'static';
};

type ScriptScene = {
  timing: string;
  description: string;
  voiceover: string;
  onScreenText: string;
  cta?: string;
};

type StaticCopy = {
  headline: string;
  subheadline: string;
  body: string;
  bullets: string[];
  cta: string;
  designNotes: string;
};

type ScriptRecommendation = {
  improvedElement: string;
  frameworkUsed: string;
  awarenessStage: string;
  rationale: string;
  testingStrategy: string;
};

type PlatformAdaptations = {
  tiktok: string;
  instagram: string;
  facebook: string;
  x: string;
  linkedin: string;
  youtube: string;
};

type ScriptGenerationData = {
  contentType: 'video' | 'static';
  script?: {
    scenes: ScriptScene[];
  };
  staticCopy?: StaticCopy;
  recommendations: ScriptRecommendation[];
  platformAdaptations: PlatformAdaptations;
};

type GenerationResponse = {
  script: string;
  data?: ScriptGenerationData;
  creditsRemaining?: number;
  anonymousKey?: string;
};


export default function TemplatedAdScriptGeneratorClient() {
  // All hooks must be called before any conditional returns
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [structuredData, setStructuredData] = useState<ScriptGenerationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
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

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session) => {
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

  const handleSubmit = useCallback(
    async (rawFormData: Record<string, any>) => {
      const formData = rawFormData as FormState;
      setError(null);
      setShowPurchasePrompt(false);
      setShowAuthModal(false);
      setResult('');
      setLastRequestedFormat(formData.adFormat);
      setLastFormData(formData);

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

      const normalizedWebsiteUrl = formData.websiteUrl.startsWith('http')
        ? formData.websiteUrl
        : `https://${formData.websiteUrl}`;

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
            companyName: formData.companyName,
            websiteUrl: normalizedWebsiteUrl,
            productDescription: formData.productDescription,
            platform: formData.platform,
            objective: formData.objective,
            adFormat: formData.adFormat,
          },
        };

        const headers = buildSupabaseInvokeHeaders({
          accessToken,
          anonymousKey: isAnonymousUser ? currentAnonymousKey : undefined,
        });

        if (headers) {
          invokeOptions.headers = headers;
        }

        const { data, error: invokeError } = await supabase.functions.invoke<GenerationResponse>('generate-script', invokeOptions);

        if (invokeError) {
          console.error('generate-script error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const messageText = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError('Please check your company name and website URL are correct, then try again.');
              break;
            case 401:
              if (user) {
                setError('Your session has expired. Please sign in again to continue.');
              } else {
                setError('You\'ve used your free script! Create a free account to get 10 more credits each month.');
              }
              setShowAuthModal(true);
              break;
            case 402:
              if (user) {
                setShowPurchasePrompt(true);
                setError('You\'re out of credits. Upgrade or add more scripts instantly.');
                setProfileCredits(0);
              } else {
                setShowAuthModal(true);
                setError('You\'ve used your free script! Create a free account to get 10 more credits each month.');
              }
              break;
            case 502:
              setError('Our AI is experiencing high demand. Please wait 30 seconds and try again.');
              break;
            default:
              if (messageText.toLowerCase().includes('out of credit') && !user) {
                setShowAuthModal(true);
                setError('You\'ve used your free script! Create a free account to get 10 more credits each month.');
              } else if (statusCode === 402 && user) {
                setShowPurchasePrompt(true);
                setError('You\'re out of credits. Upgrade or add more scripts instantly.');
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

        if (data?.script) {
          setResult(data.script);
          setStructuredData(data.data || null);
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
            : 'We couldn\'t reach the AI right now. Try again in a minute or email brian@apsicsmedia.com.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [accessToken, anonUsageCount, anonymousKey, supabase, triggerProfileReload, user],
  );

  const handlePurchase = useCallback(async () => {
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke<{ checkout_url?: string }>(
        'create-checkout-session',
        { body: {} },
      );

      if (invokeError) {
        setError(invokeError.message || 'Unable to create checkout session.');
        return;
      }

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setError('Checkout session did not return a redirect URL.');
      }
    } catch (purchaseError) {
      setError(purchaseError instanceof Error ? purchaseError.message : 'Unexpected error.');
    }
  }, [supabase]);

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
      setAccessToken(null);
    } catch (signOutError) {
      console.error('Failed to sign out', signOutError);
    }
  }, [supabase]);

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

  const handleCopyResult = useCallback(() => {
    if (!result) {
      return;
    }

    if (typeof navigator !== 'undefined') {
      navigator.clipboard
        .writeText(result)
        .catch(() => setError('Unable to copy to clipboard.'));
    }
  }, [result]);

  const handleDownloadPdf = useCallback(async () => {
    if (!result || pdfGenerating) {
      return;
    }

    setPdfGenerating(true);
    try {
      const response = await fetch('/api/generate-brief-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: result,
          companyName: lastFormData?.companyName,
          documentType: 'ad-script',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeCompany = (lastFormData?.companyName || 'campaign').toLowerCase().replace(/\s+/g, '-');
      link.href = url;
      link.download = `ad-script-${safeCompany}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (downloadError) {
      console.error('Failed to generate ad script PDF', downloadError);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  }, [lastFormData?.companyName, pdfGenerating, result]);

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
          companyName: lastFormData?.companyName || '',
          platform: lastFormData?.platform || '',
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        console.error('send-ad-email failure', payload);
        setEmailStatus('error');
        setEmailStatusMessage('We couldn\'t send the email right now. Please try again in a minute.');
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
  }, [emailAddress, lastFormData?.companyName, lastFormData?.platform, lastRequestedFormat, result]);

  // Config check after all hooks are declared
  const config = getToolConfig('ai-ad-script-generator');

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
              Enjoy one complimentary export. Create a free APSICS Media account to keep generating scripts and save your best performers.
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

  // Custom result component
  const resultComponent = result ? (
    <ResultActionsPanel
      title={`Generated ${lastRequestedFormat ? (lastRequestedFormat === 'video' ? 'Video Ad' : 'Static Ad') : 'Output'}`}
      onCopy={handleCopyResult}
      downloads={[
        {
          id: 'ad-script-pdf',
          label: 'Download PDF',
          onClick: handleDownloadPdf,
          disabled: !result,
          loading: pdfGenerating,
        },
      ]}
      emailConfig={{
        description: `We'll email the full ${
          lastRequestedFormat === 'video' ? 'video script' : 'static copy bundle'
        } straight to your inbox.`,
        value: emailAddress,
        onChange: handleEmailAddressChange,
        onSubmit: handleSendEmail,
        submitting: emailSending,
        statusMessage: emailStatusMessage,
        statusType: emailStatus,
      }}
    >
      <ScriptOutputDisplay script={result} structuredData={structuredData} />
    </ResultActionsPanel>
  ) : undefined;

  return (
    <>
      {checkoutStatus && !checkoutMessageDismissed && (
        <div
          className={`mx-auto mb-6 max-w-4xl px-4 sm:px-6 lg:px-8`}
        >
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
        </div>
      )}

      <AIFormTemplate
        config={config.form}
        fields={config.fields}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
        result={result}
        resultComponent={resultComponent}
        userSection={userSection}
      />

      {showPurchasePrompt && (
        <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Need more scripts?</h3>
                <p className="mt-1 text-sm text-brand-800">
                  Unlock 50 additional credits instantly or chat with our team about unlimited creative intelligence retainers.
                </p>
              </div>
              <button
                onClick={handlePurchase}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
                type="button"
              >
                <CreditCard className="h-4 w-4" />
                Purchase More Credits
              </button>
            </div>
          </div>
        </div>
      )}

      <SharedAuthModal
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
        subscribeToConvertKit={true}
        toolType="script"
      />
    </>
  );
}

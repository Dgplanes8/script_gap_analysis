'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, X } from 'lucide-react';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { getToolConfig } from '@/lib/template-configs';

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

export default function TemplatedAdScriptGeneratorClient() {
  const config = getToolConfig('ai-ad-script-generator');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
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

  const handleSubmit = useCallback(
    async (formData: Record<string, any>) => {
      setError(null);
      setShowPurchasePrompt(false);
      setShowAuthModal(false);
      setResult('');
      setSubmitting(true);
      setLastRequestedFormat(formData.adFormat);

      const normalizedWebsiteUrl = formData.websiteUrl.startsWith('http')
        ? formData.websiteUrl
        : `https://${formData.websiteUrl}`;

      try {
        const { data, error: invokeError } = await supabase.functions.invoke<GenerationResponse>(
          'generate-script',
          {
            body: {
              companyName: formData.companyName,
              websiteUrl: normalizedWebsiteUrl,
              productDescription: formData.productDescription,
              platform: formData.platform,
              objective: formData.objective,
              adFormat: formData.adFormat,
            },
          },
        );

        if (invokeError) {
          console.error('generate-script error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const messageText = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError('Double-check the company name and website URL, then try again.');
              break;
            case 401:
              setError('Please sign in again to continue generating scripts.');
              setShowAuthModal(true);
              break;
            case 402:
              if (user) {
                setShowPurchasePrompt(true);
                setError('You're out of credits. Upgrade or add more scripts instantly.');
                setProfileCredits(0);
              } else {
                setShowAuthModal(true);
                setError('Create a free APSICS Media account to unlock three additional scripts.');
              }
              break;
            case 502:
              setError('The AI model is busy. Wait a few seconds and try again.');
              break;
            default:
              if (messageText.toLowerCase().includes('out of credit') && !user) {
                setShowAuthModal(true);
                setError('Create a free APSICS Media account to unlock three additional scripts.');
              } else if (statusCode === 402 && user) {
                setShowPurchasePrompt(true);
                setError('You're out of credits. Upgrade or add more scripts instantly.');
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
        }
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : 'We couldn't reach the AI right now. Try again in a minute or email brian@apsicsmedia.com.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [supabase, triggerProfileReload, user],
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
          companyName: '', // This would be extracted from form data
          platform: '', // This would be extracted from form data
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        console.error('send-ad-email failure', payload);
        setEmailStatus('error');
        setEmailStatusMessage('We couldn't send the email right now. Please try again in a minute.');
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
  }, [emailAddress, lastRequestedFormat, result]);

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
              Enjoy one complimentary export. Create a free APSICS Media account to unlock three more scripts and save your best performers.
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
    <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
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
      <pre className="whitespace-pre-wrap rounded-xl bg-white p-6 text-sm leading-relaxed text-gray-800 shadow-inner">
        {result}
      </pre>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-gray-900">Send this to your inbox</h4>
        <p className="mt-1 text-xs text-gray-600">
          We'll email the full {lastRequestedFormat === 'video' ? 'video script' : 'static copy bundle'} straight to your inbox.
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
            Get three additional AI ad scripts, save your favourites, and access Monday creative intelligence drops.
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
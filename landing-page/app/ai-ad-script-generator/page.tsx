'use client';

export const dynamic = 'force-dynamic';
export const revalidate = false;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, LogOut, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient, type BrowserClient, type ProfileRow } from '@/lib/supabase/browser-client';

type FormState = {
  companyName: string;
  productDescription: string;
  targetAudience: string;
  platform: string;
  tone: string;
  callToAction: string;
};

type GenerationResponse = {
  script: string;
  creditsRemaining?: number;
};

const defaultFormState: FormState = {
  companyName: '',
  productDescription: '',
  targetAudience: '',
  platform: '',
  tone: '',
  callToAction: '',
};

export default function AdScriptGeneratorPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('id, credits_remaining, stripe_customer_id, updated_at')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Failed to load profile', profileError);
        return;
      }

      setProfile(data ?? null);
    },
    [supabase],
  );

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
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }

      setAuthLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    bootstrapAuth();

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile, supabase]);

  useEffect(() => {
    const checkoutParam = searchParams?.get('checkout');
    if (!checkoutParam || checkoutMessageDismissed) {
      return;
    }

    if (checkoutParam === 'success' || checkoutParam === 'cancel') {
      setCheckoutStatus(checkoutParam);
    }
  }, [checkoutMessageDismissed, searchParams]);

  const handleFieldChange = useCallback((key: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      setError(null);
      setShowPurchasePrompt(false);
      setResult('');

      try {
        const { data, error: invokeError } = await supabase.functions.invoke<GenerationResponse>(
          'generate-script',
          {
            body: {
              companyName: formState.companyName,
              productDescription: formState.productDescription,
              targetAudience: formState.targetAudience,
              platform: formState.platform,
              tone: formState.tone,
              callToAction: formState.callToAction,
            },
          },
        );

        if (invokeError) {
          if (invokeError.status === 402) {
            setShowPurchasePrompt(true);
            setError('You are out of credits. Purchase more to continue generating scripts.');
          } else {
            setError(invokeError.message || 'Unable to generate script right now.');
          }

          return;
        }

        if (data?.script) {
          setResult(data.script);
        }

        if (typeof data?.creditsRemaining === 'number') {
          setProfile((prev) =>
            prev
              ? {
                  ...prev,
                  credits_remaining: data.creditsRemaining ?? null,
                }
              : prev,
          );
        }
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Unexpected error occurred.');
      } finally {
        setSubmitting(false);
      }
    },
    [formState, supabase],
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
              AI Ad Script Generator
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Generate high-converting ad scripts in seconds
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Combine your product inputs with battle-tested hooks, brand tone, and platform best practices.
            </p>
          </header>

          <section className="rounded-3xl border border-brand-100 bg-white p-8 shadow-xl shadow-brand-50/40">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Account status</h2>
                {authLoading ? (
                  <p className="mt-2 text-sm text-gray-500">Checking your session…</p>
                ) : user ? (
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Signed in as:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-semibold">Credits remaining:</span>{' '}
                      {profile?.credits_remaining ?? '—'}
                    </p>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <AuthPanel supabase={supabase} onAuthSuccess={() => setShowPurchasePrompt(false)} />
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-brand-50/60 p-4 text-brand-900">
                <p className="text-sm font-semibold uppercase tracking-wide">Credit system</p>
                <ul className="mt-2 space-y-1 text-sm text-brand-800">
                  <li>• Guests receive one AI script.</li>
                  <li>• Free members get 3 complimentary scripts.</li>
                  <li>• Add more credits with a single-click Stripe checkout.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Company Name
                  <input
                    required
                    name="companyName"
                    value={formState.companyName}
                    onChange={(event) => handleFieldChange('companyName', event.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    placeholder="e.g. BrightWave Labs"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Target Audience
                  <input
                    required
                    name="targetAudience"
                    value={formState.targetAudience}
                    onChange={(event) => handleFieldChange('targetAudience', event.target.value)}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    placeholder="e.g. Operations leaders at growth-stage SaaS startups"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Product Description
                <textarea
                  required
                  rows={4}
                  name="productDescription"
                  value={formState.productDescription}
                  onChange={(event) => handleFieldChange('productDescription', event.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  placeholder="Describe the product, positioning, and key outcomes the AI should focus on"
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Platform
                  <select
                    required
                    name="platform"
                    value={formState.platform}
                    onChange={(event) => handleFieldChange('platform', event.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="">Select platform</option>
                    <option value="facebook">Facebook / Instagram</option>
                    <option value="tiktok">TikTok / Reels</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="display">Display / Programmatic</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                  Tone
                  <select
                    required
                    name="tone"
                    value={formState.tone}
                    onChange={(event) => handleFieldChange('tone', event.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="">Select tone</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="friendly">Friendly</option>
                    <option value="playful">Playful</option>
                    <option value="urgent">Urgent</option>
                    <option value="educational">Educational</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Call to Action
                <input
                  required
                  name="callToAction"
                  value={formState.callToAction}
                  onChange={(event) => handleFieldChange('callToAction', event.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  placeholder="e.g. Book a demo, Start free trial"
                />
              </label>

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
              <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Script</h3>
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
              </div>
            )}

            {showPurchasePrompt && (
              <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Need more credits?</h3>
                    <p className="mt-1 text-sm text-brand-800">
                      Unlock 50 additional scripts instantly with our Stripe-powered checkout.
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
            )}
          </section>

          <aside className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
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
              <li className="rounded-2xl border border-success-200 bg-success-50/70 p-4">
                <p className="text-sm font-semibold text-success-700">Performance heuristics</p>
                <p className="mt-1 text-sm text-success-600">Trained on $250M+ in ad spend, focusing on retention, resonance, and conversion.</p>
              </li>
              <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-sm font-semibold text-brand-800">Brand consistency</p>
                <p className="mt-1 text-sm text-brand-700">Adapts to your voice guidelines without sacrificing clarity or urgency.</p>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>Want to embed this workflow?</span>
              <Link href="/tools" className="font-semibold text-brand-700 underline-offset-2 hover:text-brand-900 hover:underline">
                Explore more automation tools
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

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
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setAuthError(error.message);
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
          {mode === 'sign-in' ? 'Sign in to use your credits' : 'Create an account to claim free credits'}
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

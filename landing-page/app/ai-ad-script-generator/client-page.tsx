'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { CreditCard, Loader2, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';

type FormState = {
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  platform: string;
  objective: string;
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
};

export default function AdScriptGeneratorClient() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [user, setUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ companyName?: string; websiteUrl?: string }>({});

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
      } else {
        setUser(null);
      }

    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
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

      const nextErrors: { companyName?: string; websiteUrl?: string } = {};

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

      if (Object.keys(nextErrors).length > 0) {
        setFormErrors(nextErrors);
        return;
      }

      setFormErrors({});
      setSubmitting(true);

      const normalizedWebsiteUrl = formState.websiteUrl.startsWith('http')
        ? formState.websiteUrl
        : `https://${formState.websiteUrl}`;

      try {
        const { data, error: invokeError } = await supabase.functions.invoke<GenerationResponse>(
          'generate-script',
          {
            body: {
              companyName: formState.companyName,
              websiteUrl: normalizedWebsiteUrl,
              productDescription: formState.productDescription,
              platform: formState.platform,
              objective: formState.objective,
            },
          },
        );

        if (invokeError) {
          if (invokeError.status === 402) {
            if (user) {
              setShowPurchasePrompt(true);
              setError('You are out of credits. Purchase more to continue generating scripts.');
            } else {
              setShowAuthModal(true);
              setError('Create a free account to unlock 3 additional scripts.');
            }
          } else {
            setError(invokeError.message || 'Unable to generate script right now.');
          }

          return;
        }

        if (data?.script) {
          setResult(data.script);
        }
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Unexpected error occurred.');
      } finally {
        setSubmitting(false);
      }
    },
    [formState, supabase, user],
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
              Free AI Tool · APSICS Media
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free AI Ad Script Generator for Paid Social & UGC
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Generate scroll-stopping ad scripts backed by APSICS Media’s creative intelligence system—perfect for TikTok, Meta, YouTube, and more.
            </p>
          </header>

          <section className="rounded-3xl border border-brand-100 bg-white p-8 shadow-xl shadow-brand-50/40">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Grab your free AI ad script</h2>
                <p className="text-sm text-gray-600">
                  Start with one complimentary script—no login required. When you’re ready for more, create a free APSICS Media account to unlock three additional scripts and save your best-performing prompts.
                </p>
                <ul className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                  <li className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                    <p className="font-semibold text-brand-800">Performance-backed outputs</p>
                    <p className="mt-1 text-brand-700">Built on $250M+ of creative learnings and APSICS Media’s testing frameworks.</p>
                  </li>
                  <li className="rounded-2xl border border-success-200 bg-success-50/70 p-4">
                    <p className="font-semibold text-success-700">Fast, flexible workflows</p>
                    <p className="mt-1 text-success-600">Export platform-native scripts for paid social, UGC, or lifecycle retargeting in seconds.</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/70 p-5 text-sm text-brand-900">
                <p className="font-semibold uppercase tracking-wide text-brand-700">Free forever plan</p>
                <ul className="mt-3 space-y-2">
                  <li>• 1 instant script without logging in</li>
                  <li>• +3 bonus scripts after free account signup</li>
                  <li>• Upgrade anytime for unlimited concepts</li>
                </ul>
                <p className="mt-4 text-xs text-brand-700/80">Need more credits? Paid plans add Stripe-powered top ups without leaving this page.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
                    <option value="facebook">Facebook / Instagram</option>
                    <option value="tiktok">TikTok / Reels</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="display">Display / Programmatic</option>
                    <option value="ugc">UGC / Creator ads</option>
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

          <section className="rounded-3xl border border-brand-100 bg-white p-8 shadow-xl shadow-brand-50/30">
            <h2 className="text-2xl font-semibold text-gray-900">Free AI ad script generator for marketers who need wins fast</h2>
            <p className="mt-4 text-base text-gray-600">
              This free AI ad script generator accelerates campaign launches, creative refreshes, and UGC briefs. Pair it with APSICS Media resources to build a full funnel of high-intent ads that convert cold traffic into revenue.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/52-high-converting-ad-hooks-library"
                className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">Free hook templates for cold audiences</p>
                <p className="mt-2 text-sm text-gray-600">Stack your scripts with proven hook formulas and intro angles pulled from 52 high-performing ads.</p>
              </Link>
              <Link
                href="/weekly-creative-intelligence-guide"
                className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">Creative intelligence playbook</p>
                <p className="mt-2 text-sm text-gray-600">Follow APSICS Media’s weekly optimization workflow to keep Facebook, TikTok, and YouTube ads scaling.</p>
              </Link>
              <Link
                href="/ai-enhanced-creative-intelligence"
                className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">AI creative operations toolkit</p>
                <p className="mt-2 text-sm text-gray-600">See how APSICS Media blends human strategists with AI to ship top 1% ads across paid social.</p>
              </Link>
              <Link
                href="/subscription-business-viral-content-calendar"
                className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-brand-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">Plan viral content sprints</p>
                <p className="mt-2 text-sm text-gray-600">Use our subscription brand content calendar to line up organic clips that support every paid campaign.</p>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Need more automation? Explore the <Link href="/tools" className="font-semibold text-brand-700 hover:text-brand-900">APSICS Media tools hub</Link> for email, landing page, and creative workflow accelerators.
            </p>
          </section>
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

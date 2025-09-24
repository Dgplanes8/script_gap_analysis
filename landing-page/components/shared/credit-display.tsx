/**
 * Shared credit display component for APSICS AI Tools
 * Provides consistent credit management UI following brand guidelines
 */

import { ReactNode } from 'react';
import { CreditCard, Loader2, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { CONTACT_MESSAGE } from '@/lib/utils/supabase-helpers';

interface CreditDisplayProps {
  user: any | null;
  credits: number | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPurchase: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  className?: string;
}

/**
 * Standard credit display component with consistent styling
 * Follows brand color system: #126DFB primary, #0F5AD6 hover
 */
export function CreditDisplay({
  user,
  credits,
  loading,
  error,
  onRefresh,
  onPurchase,
  onSignIn,
  onSignOut,
  className
}: CreditDisplayProps) {
  const getCreditStatus = () => {
    if (loading) return 'Checking your credits...';
    if (error) return error;
    if (user) return `Credits remaining: ${credits ?? 0}`;
    return 'Run one generation without logging in. Create a free account to unlock more runs.';
  };

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (!user) return 'text-gray-500';
    if ((credits ?? 0) === 0) return 'text-orange-600';
    return 'text-gray-500';
  };

  return (
    <div className={clsx('rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            {user ? 'Creative generation credits' : 'Start for free'}
          </p>
          <p className={clsx('mt-1 text-xs', getStatusColor())}>
            {getCreditStatus()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh credits
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="rounded-lg border border-[#126DFB] bg-blue-50 px-3 py-2 text-xs font-semibold text-[#126DFB] transition hover:bg-blue-100"
            >
              Sign in or create free account
            </button>
          )}

          <button
            type="button"
            onClick={onPurchase}
            className="inline-flex items-center gap-2 rounded-lg bg-[#126DFB] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-[#126DFB]/30 transition hover:bg-[#0F5AD6] hover:shadow-[#0F5AD6]/30"
          >
            <CreditCard className="h-4 w-4" />
            Buy credits
          </button>
        </div>
      </div>
    </div>
  );
}

interface PurchasePromptProps {
  onPurchase: () => void;
  onClose?: () => void;
  toolType?: 'script' | 'brief' | 'iteration';
  className?: string;
}

/**
 * Standard purchase prompt with consistent messaging
 * Follows brand voice: accessibility-focused, supportive
 */
export function PurchasePrompt({
  onPurchase,
  onClose,
  toolType = 'script',
  className
}: PurchasePromptProps) {
  const toolNames = {
    script: 'scripts',
    brief: 'briefs',
    iteration: 'iterations'
  };

  return (
    <div className={clsx('mx-auto mt-8 max-w-4xl', className)}>
      <div className="rounded-2xl border border-[#126DFB] bg-blue-50 p-6 text-blue-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Need more {toolNames[toolType]}?</h3>
            <p className="mt-1 text-sm text-blue-800">
              Unlock 50 additional credits instantly or talk with the APSICS team about creative intelligence retainers.
            </p>
          </div>
          <div className="flex gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-xl border border-blue-300 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                type="button"
              >
                Maybe later
              </button>
            )}
            <button
              onClick={onPurchase}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#126DFB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#126DFB]/30 transition hover:bg-[#0F5AD6]"
              type="button"
            >
              <CreditCard className="h-4 w-4" />
              Purchase more credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CheckoutStatusProps {
  status: 'success' | 'cancel';
  onDismiss: () => void;
  className?: string;
}

/**
 * Checkout status notification with brand-consistent styling
 */
export function CheckoutStatus({ status, onDismiss, className }: CheckoutStatusProps) {
  const isSuccess = status === 'success';

  return (
    <div className={clsx('mb-6 rounded-2xl border border-[#126DFB] bg-blue-50 p-4 text-sm text-blue-900', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">
            {isSuccess
              ? 'Purchase confirmed. Credits will appear in a few seconds.'
              : 'Checkout cancelled. Your card has not been charged.'}
          </p>
          {isSuccess && (
            <p className="mt-1 text-xs text-blue-800">
              Refresh credits if they do not appear automatically.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-white"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

interface FreeAccountPromoProps {
  onSignUp: () => void;
  toolType?: 'script' | 'brief' | 'iteration';
  className?: string;
}

/**
 * Free account promotion with consistent messaging
 */
export function FreeAccountPromo({ onSignUp, toolType = 'script', className }: FreeAccountPromoProps) {
  const toolNames = {
    script: 'scripts',
    brief: 'briefs',
    iteration: 'iterations'
  };

  return (
    <div className={clsx('rounded-2xl border border-dashed border-[#126DFB] bg-blue-50/70 p-5 text-sm text-blue-900', className)}>
      <p className="font-semibold uppercase tracking-wide text-blue-700">Free account benefits</p>
      <ul className="mt-3 space-y-2">
        <li>• 1 instant {toolType} without logging in</li>
        <li>• +3 additional {toolNames[toolType]} after free account signup</li>
        <li>• Upgrade to unlock weekly delivery & advanced formats</li>
      </ul>
      <button
        type="button"
        onClick={onSignUp}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#126DFB] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#126DFB]/30 transition hover:bg-[#0F5AD6]"
      >
        Create free account
      </button>
      <p className="mt-3 text-xs text-blue-700/80">
        {CONTACT_MESSAGE}
      </p>
    </div>
  );
}
/**
 * Shared authentication modal for APSICS AI Tools
 * Provides consistent auth UI following brand guidelines
 */

import { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import type { BrowserClient } from '@/lib/supabase/browser-client';
import { handleAuthSuccess } from '@/lib/utils/supabase-helpers';
import { ContactInfo } from './contact-info';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
  supabase: BrowserClient;
  subscribeToConvertKit?: boolean;
  toolType?: 'script' | 'brief' | 'iteration';
}

type AuthMode = 'sign-in' | 'sign-up';

/**
 * Standard authentication modal with consistent styling
 * Follows brand color system and voice guidelines
 */
export function AuthModal({
  open,
  onClose,
  onAuthSuccess,
  supabase,
  subscribeToConvertKit = false,
  toolType = 'script'
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const getToolNames = () => ({
    script: 'scripts',
    brief: 'briefs',
    iteration: 'iterations'
  });

  const toolNames = getToolNames();

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
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

        // Handle ConvertKit subscription for new signups
        if (subscribeToConvertKit) {
          await handleAuthSuccess(supabase, email, true);
        }
      }

      onAuthSuccess();
      onClose();
    } catch (authErr) {
      console.error('Auth error', authErr);
      setAuthError(authErr instanceof Error ? authErr.message : 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }, [mode, email, password, supabase, subscribeToConvertKit, onAuthSuccess, onClose]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setAuthError(null);
    setBusy(false);
    setMode('sign-in');
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  return (
    <Dialog open={open} onOpenChange={(value) => (!value ? handleClose() : null)}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Sign in or create a free account
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Free accounts unlock three additional {toolNames[toolType]} and save your creative history.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Auth Mode Toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('sign-in')}
              className={clsx(
                'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
                mode === 'sign-in'
                  ? 'bg-[#126DFB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('sign-up')}
              className={clsx(
                'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
                mode === 'sign-up'
                  ? 'bg-[#126DFB] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              Create account
            </button>
          </div>

          {/* Email Field */}
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#126DFB]/20 focus:border-[#126DFB]"
              placeholder="you@company.com"
            />
          </label>

          {/* Password Field */}
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#126DFB]/20 focus:border-[#126DFB]"
              placeholder="At least 8 characters"
            />
            <span className="text-xs text-gray-500">At least 8 characters.</span>
          </label>

          {/* Error Message */}
          {authError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs font-semibold text-red-600">{authError}</p>
            </div>
          )}

          {/* Submit Button */}
          <DialogFooter>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#126DFB] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#126DFB]/30 transition hover:bg-[#0F5AD6] disabled:cursor-not-allowed disabled:opacity-75"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </DialogFooter>

          {/* Help Text */}
          <div className="text-center">
            <ContactInfo variant="help" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Auth success handler with ConvertKit integration
 * Provides consistent post-auth behavior across tools
 */
export function useAuthSuccess(
  supabase: BrowserClient,
  onSuccess: () => void,
  subscribeToConvertKit = false
) {
  return useCallback(async (email?: string) => {
    if (subscribeToConvertKit && email) {
      await handleAuthSuccess(supabase, email, true);
    }
    onSuccess();
  }, [supabase, onSuccess, subscribeToConvertKit]);
}
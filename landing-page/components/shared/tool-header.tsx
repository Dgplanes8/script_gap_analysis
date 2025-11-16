'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import { AuthenticatedHeader } from './authenticated-header';

type ToolHeaderProps = {
  fallback?: ReactNode;
  className?: string;
};

/**
 * Renders the authenticated tools header when a session exists, otherwise falls back to the marketing header.
 * Keeps the fallback visible while the auth state is loading to avoid layout shift.
 */
export function ToolHeader({ fallback, className }: ToolHeaderProps) {
  const [hasSession, setHasSession] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createBrowserClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    let mounted = true;

    const loadSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setHasSession(Boolean(session));
        }
      } catch (error) {
        console.error('ToolHeader: failed to fetch session', error);
        if (mounted) {
          setHasSession(false);
        }
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setHasSession(Boolean(session));
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, isMounted]);

  // During SSR and initial hydration, always show fallback to prevent mismatch
  if (!isMounted) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }
    return null;
  }

  if (hasSession) {
    return <AuthenticatedHeader className={className} />;
  }

  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return null;
}


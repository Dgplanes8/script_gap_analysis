'use client';

import { useState, useEffect } from 'react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { X, Mail } from 'lucide-react';
import { ConvertKitForm } from '@/components/forms/convertkit-form';
import { createBrowserClient } from '@/lib/supabase/browser-client';

interface ExitIntentPopupProps {
  title?: string;
  subtitle?: string;
}

export function ExitIntentPopup({
  title = "Wait! Get Your Free Templates Before You Go",
  subtitle = "Join 100+ growing businesses getting revenue-driving templates every Monday + instant access to our 10 Free Templates PDF."
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
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

    const determineSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setShouldRender(!session);
        }
      } catch (error) {
        console.error('ExitIntentPopup: failed to load session', error);
        if (mounted) {
          setShouldRender(true);
        }
      }
    };

    determineSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (mounted) {
        setShouldRender(!session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, isMounted]);

  useEffect(() => {
    if (shouldRender === false) {
      return;
    }

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the viewport from the top
      if (e.clientY <= 0 && !hasTriggered && !isDismissed) {
        setIsVisible(true);
        hasTriggered = true;
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    // Add event listeners after a short delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('keydown', handleEscape);
    }, 5000); // Wait 5 seconds before enabling exit intent

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDismissed, shouldRender]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Don't render anything during SSR or before mounting to prevent hydration mismatch
  if (!isMounted || !shouldRender || !isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative animate-in zoom-in duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          <ConvertKitForm
            formId={process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID || '8372309'}
            placeholder="Enter your work email"
            buttonText="Get My Free Templates"
            className="ck-reset"
            source="exit-intent-popup"
          />

          <div className="text-center mt-4">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              No thanks, I'll pass on the free templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

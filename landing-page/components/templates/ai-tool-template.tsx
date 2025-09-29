'use client';

import { ReactNode, useEffect, useState } from 'react';
import { SecondaryHeader, type SecondaryHeaderProps } from '@/components/layout/secondary-header';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { ToolHeader } from '@/components/shared/tool-header';
import { createBrowserClient } from '@/lib/supabase/browser-client';

export interface AIToolTemplateConfig {
  header: {
    title: string;
    subtitle: string;
    badgeText?: string;
  };
  sections: {
    showFoundersClub?: boolean;
    showProcessSection?: boolean;
    showPricingSection?: boolean;
  };
  exitIntent?: {
    title: string;
    subtitle: string;
  };
}

interface AIToolTemplateProps {
  config: AIToolTemplateConfig;
  secondaryHeaderProps?: SecondaryHeaderProps;
  headerComponent?: ReactNode;
  children: ReactNode;
  foundersClubContent?: ReactNode;
  processContent?: ReactNode;
  pricingContent?: ReactNode;
}

export function AIToolTemplate({
  config,
  secondaryHeaderProps,
  headerComponent,
  children,
  foundersClubContent,
  processContent,
  pricingContent,
}: AIToolTemplateProps) {
  const fallbackHeader = headerComponent ?? (secondaryHeaderProps ? <SecondaryHeader {...secondaryHeaderProps} /> : null);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const supabase = createBrowserClient();

  useEffect(() => {
    let mounted = true;

    const resolveSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setHasSession(Boolean(session));
        }
      } catch (error) {
        console.error('AI Tool Template: failed to load session', error);
        if (mounted) {
          setHasSession(false);
        }
      }
    };

    resolveSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      {fallbackHeader ? <ToolHeader fallback={fallbackHeader} /> : null}
      <div className="pt-4 md:pt-8">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            <header className="text-center">
              {config.header?.badgeText && (
                <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
                  <span className="h-4 w-4">✨</span>
                  {config.header?.badgeText}
                </div>
              )}
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {config.header?.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {config.header?.subtitle}
              </p>
            </header>

            {children}

            {config.sections.showFoundersClub && foundersClubContent && (
              <div className="mt-8">
                {foundersClubContent}
              </div>
            )}

            {config.sections.showProcessSection && processContent && (
              <aside className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                {processContent}
              </aside>
            )}
          </div>
          {config.sections.showPricingSection && pricingContent && (
            <div className="pt-12">
              {pricingContent}
            </div>
          )}
        </div>
      </div>
      {config.exitIntent && hasSession === false && (
        <ExitIntentPopup
          title={config.exitIntent.title}
          subtitle={config.exitIntent.subtitle}
        />
      )}
    </div>
  );
}

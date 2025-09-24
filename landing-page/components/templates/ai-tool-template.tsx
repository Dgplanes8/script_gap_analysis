'use client';

import { ReactNode } from 'react';
import { SecondaryHeader, type SecondaryHeaderProps } from '@/components/layout/secondary-header';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';

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
  secondaryHeaderProps: SecondaryHeaderProps;
  children: ReactNode;
  foundersClubContent?: ReactNode;
  processContent?: ReactNode;
  pricingContent?: ReactNode;
}

export function AIToolTemplate({
  config,
  secondaryHeaderProps,
  children,
  foundersClubContent,
  processContent,
  pricingContent,
}: AIToolTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <SecondaryHeader {...secondaryHeaderProps} />
      <div className="pt-20 md:pt-24">
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
              <div className="mt-8 rounded-3xl border border-brand-200 bg-white p-6 shadow-lg shadow-brand-50/40">
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
      {config.exitIntent && (
        <ExitIntentPopup
          title={config.exitIntent.title}
          subtitle={config.exitIntent.subtitle}
        />
      )}
    </div>
  );
}
'use client';

import dynamic from 'next/dynamic';
import { FreeWeekButton } from '@/components/ui/free-week-button';

// Lazy load EmailCaptureForm as it's not critical for LCP
const EmailCaptureForm = dynamic(
  () => import('@/components/forms/email-capture-form').then(mod => ({ default: mod.EmailCaptureForm })),
  {
    loading: () => (
      <div className="w-full max-w-xl">
        <div className="h-12 bg-white/20 rounded-lg animate-pulse"></div>
      </div>
    ),
    ssr: false
  }
);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  background?: 'gradient' | 'default';
  showEmailCapture?: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function Hero({
  title,
  subtitle,
  ctaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  background = 'default',
  showEmailCapture = true,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const bgClasses =
    background === 'gradient'
      ? 'bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900'
      : 'bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900';

  return (
    <section className={`${bgClasses} text-white py-24 lg:py-32 hero-section`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center hero-content">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hero-title"
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.1',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}
          >
            {title}
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-200 mb-12 hero-subtitle"
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.5'
            }}
          >
            {subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mb-16">
            {showEmailCapture ? (
              <>
                <div className="w-full max-w-xl">
                  <EmailCaptureForm
                    placeholder="Enter your email address"
                    buttonText={ctaText}
                    variant="hero"
                  />
                </div>
                {secondaryCtaText && onSecondaryClick && (
                  <button
                    onClick={onSecondaryClick}
                    className="btn btn-secondary"
                  >
                    {secondaryCtaText}
                  </button>
                )}
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                {primaryCtaLink ? (
                  <FreeWeekButton
                    source="hero-primary"
                    className="text-lg px-8 py-4"
                    label={ctaText}
                  />
                ) : onPrimaryClick ? (
                  <button
                    onClick={onPrimaryClick}
                    className="btn btn-primary text-lg px-8 py-4"
                  >
                    {ctaText}
                  </button>
                ) : (
                  <FreeWeekButton source="hero-primary" className="text-lg px-8 py-4" label={ctaText} />
                )}
                
                {secondaryCtaText && (
                  onSecondaryClick ? (
                    <button
                      onClick={onSecondaryClick}
                      className="btn btn-secondary text-lg px-8 py-4"
                    >
                      {secondaryCtaText}
                    </button>
                  ) : secondaryCtaLink ? (
                    <FreeWeekButton
                      source="hero-secondary"
                      variant="link"
                      className="text-lg"
                    >
                      {secondaryCtaText}
                    </FreeWeekButton>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Strategic Credibility */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-400 mr-2">$250MM+</span>
              <span>Media Spend Managed</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-400 mr-2">Campaign</span>
              <span>Launch Specialist</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-400 mr-2">10+</span>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

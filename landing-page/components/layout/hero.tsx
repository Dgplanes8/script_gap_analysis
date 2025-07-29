import Link from 'next/link';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  background?: 'gradient' | 'default';
  showEmailCapture?: boolean;
}

export function Hero({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  secondaryCtaLink,
  background = 'default',
  showEmailCapture = true,
}: HeroProps) {
  const bgClasses =
    background === 'gradient'
      ? 'bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800'
      : 'bg-gray-900';

  return (
    <section className={`${bgClasses} text-white py-24 lg:py-32`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-slide-up">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {showEmailCapture ? (
              <div className="w-full max-w-md">
                <EmailCaptureForm
                  placeholder="Enter your email address"
                  buttonText={ctaText}
                  variant="hero"
                />
              </div>
            ) : (
              <Link href="#contact" className="btn-primary text-lg px-8 py-4">
                {ctaText}
              </Link>
            )}
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="text-gray-200 hover:text-white underline transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">2,847+</span>
              <span>Businesses Transformed</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">$127M+</span>
              <span>Revenue Generated</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white mr-2">312%</span>
              <span>Average ROI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
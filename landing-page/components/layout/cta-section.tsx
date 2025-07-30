import Link from 'next/link';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  showEmailCapture?: boolean;
  background?: 'default' | 'gradient';
}

export function CTASection({
  title,
  subtitle,
  ctaText,
  ctaLink = '#contact',
  showEmailCapture = false,
  background = 'default',
}: CTASectionProps) {
  const bgClasses =
    background === 'gradient'
      ? 'bg-gradient-to-r from-brand-600 to-brand-700'
      : 'bg-gray-900';

  return (
    <section className={`${bgClasses} text-white py-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {showEmailCapture ? (
            <div className="max-w-md mx-auto">
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText={ctaText}
                variant="cta"
              />
            </div>
          ) : (
            <Link href={ctaLink} className="btn-primary text-lg px-8 py-4 inline-block">
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
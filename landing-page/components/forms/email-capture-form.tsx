'use client';

import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';

interface EmailCaptureFormProps {
  buttonText?: string;
  source?: string;
  tier?: string;
  variant?: 'hero' | 'cta' | 'inline';
  placeholder?: string; // kept for API compatibility
}

export function EmailCaptureForm({
  buttonText = 'Start Free Week Trial',
  source = 'email-capture',
  tier,
  variant = 'inline',
}: EmailCaptureFormProps) {
  const variantClasses = {
    hero: 'w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl transition-colors shadow-lg',
    cta: 'w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base px-6 py-3 rounded-xl transition-colors shadow-md',
    inline: 'w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base px-6 py-3 rounded-xl transition-colors shadow-md',
  } as const;

  return (
    <SimpleAirtableForm
      buttonText={buttonText}
      source={source}
      tier={tier}
      buttonClassName={variantClasses[variant]}
    />
  );
}

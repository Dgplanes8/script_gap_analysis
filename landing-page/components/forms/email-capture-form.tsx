'use client';

import { SimpleAirtableForm } from '@/components/forms/simple-airtable-form';

interface EmailCaptureFormProps {
  buttonText?: string;
  source?: string;
  tier?: string;
  variant?: 'hero' | 'cta' | 'inline';
}

export function EmailCaptureForm({
  buttonText = 'Start Free Week Trial',
  source = 'email-capture',
  tier,
}: EmailCaptureFormProps) {
  return (
    <SimpleAirtableForm
      buttonText={buttonText}
      source={source}
      tier={tier}
      buttonClassName="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
    />
  );
}

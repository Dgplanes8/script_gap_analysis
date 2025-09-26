'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { trackFormStart, trackPaidPackageCheckout } from '@/components/analytics/gtm';

interface PackageCheckoutFormProps {
  packageName: string;
  source?: string;
  priceId?: string;
  checkoutMode?: 'payment' | 'subscription';
  successUrl?: string;
  cancelUrl?: string;
  onClose?: () => void;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
}

export function PackageCheckoutForm({
  packageName,
  source = 'service-tiers',
  priceId,
  checkoutMode = 'subscription',
  successUrl,
  cancelUrl,
  onClose,
}: PackageCheckoutFormProps) {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      trackPaidPackageCheckout(packageName, formState.email, source);

      const response = await fetch('/api/leads/package-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          website: formState.website,
          packageInterest: packageName,
          source,
          priceId,
          checkoutMode,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json().catch(() => ({ error: 'Unable to start checkout session.' }));
        throw new Error(errorMessage?.error || 'Unable to start checkout session.');
      }

      const data: { checkoutUrl?: string } = await response.json();

      if (!data.checkoutUrl) {
        throw new Error('Checkout URL not returned by server.');
      }

      if (typeof window !== 'undefined') {
        window.location.href = data.checkoutUrl;
      }
    } catch (submissionError) {
      console.error('Failed to start Stripe checkout', submissionError);
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to start checkout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Secure {packageName}</h3>
        <p className="text-sm text-gray-600">Complete checkout to lock in your access.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formState.name}
            onChange={handleChange('name')}
            onFocus={() => trackFormStart('weekly_trial', packageName)}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formState.email}
            onChange={handleChange('email')}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formState.company}
            onChange={handleChange('company')}
            required
          />
          <input
            type="text"
            placeholder="Website (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
            value={formState.website}
            onChange={handleChange('website')}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Up Your Account...
            </>
          ) : (
            <>
              Get My Credits
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

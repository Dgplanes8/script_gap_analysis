'use client';

import { useState } from 'react';

interface ConvertKitFormProps {
  formId: string;
  className?: string;
  source?: string;
  placeholder?: string;
  buttonText?: string;
}

export function ConvertKitForm({
  formId,
  className = '',
  source = 'convertkit-form',
  placeholder = 'Enter your work email',
  buttonText = 'Get Free Hooks',
}: ConvertKitFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          formId,
          source,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || 'Subscription failed');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`rounded-xl border border-brand-100 bg-brand-50 p-6 text-center ${className}`}>
        <h3 className="text-lg font-semibold text-brand-700">Thanks! You’re subscribed.</h3>
        <p className="mt-2 text-sm text-brand-600">
          Check your inbox for your free hooks and weekly creative intelligence updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className="h-12 flex-1 rounded-xl border border-gray-200 px-4 text-base text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-6 text-base font-semibold text-white shadow-lg transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}

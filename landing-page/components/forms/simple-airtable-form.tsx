'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Mail, CheckCircle } from 'lucide-react';
import { trackWeeklyTrialSubmission, trackFormStart } from '@/components/analytics/gtm';

interface SimpleAirtableFormProps {
  buttonText?: string;
  buttonClassName?: string;
  source?: string;
  tier?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function SimpleAirtableForm({
  buttonText = "Claim My Free Credits",
  buttonClassName = "btn btn-primary text-lg px-8 py-4",
  source = "service-tiers",
  tier,
  onSuccess,
  onError
}: SimpleAirtableFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true); // Start with form visible
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    packageInterest: tier || '' // Pre-populate with tier if provided
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const selectedTier = formData.packageInterest || tier || 'unknown';

      // Track form submission attempt
      trackWeeklyTrialSubmission(
        selectedTier,
        formData.email,
        source
      );

      // Check if user selected a paid tier - redirect to Stripe checkout
      const paidTiers = ['Essentials', 'Studio', 'Concierge'];
      if (paidTiers.includes(selectedTier)) {
        // Submit to Stripe checkout API
        const response = await fetch('/api/leads/package-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            packageInterest: selectedTier,
            source: source
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.checkoutUrl) {
            // Redirect to Stripe checkout
            window.location.href = result.checkoutUrl;
            return;
          }
        }
        throw new Error('Failed to create Stripe checkout session');
      }

      // For free tiers, submit to internal lead capture API
      const response = await fetch('/api/leads/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          packageInterest: formData.packageInterest,
          source: source,
          type: 'free_week_trial',
          tier: tier
        }),
      });

      if (response.ok) {
        // Show success state first
        setShowSuccess(true);

        // Wait 3 seconds before redirect to let user see success message
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.href = '/success?source=' + source;
          }
        }, 3000);
      } else {
        throw new Error('Lead submission failed');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setError('Something went wrong. Please reach out to brian@apsicsmedia.com');
      if (onError) {
        onError();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className={buttonClassName}
      >
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    );
  }

  if (showSuccess) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email!</h3>
          <p className="text-gray-600 mb-4">
            We sent your free credits to <span className="font-semibold text-[#126DFB]">{formData.email}</span>
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-gray-900 mb-2">What happens next:</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#126DFB]">1.</span>
                <span>Check your email for login instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#126DFB]">2.</span>
                <span>Click the link to activate your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-[#126DFB]">3.</span>
                <span>Start using your 10 free credits on any tool</span>
              </li>
            </ol>
          </div>
          <p className="text-xs text-gray-500 mt-4">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100">
      <div className="text-center mb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Mail className="h-3 w-3 mr-1" />
          FREE CREDITS
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Claim Your Free Credits</h3>
        <p className="text-sm text-gray-600">Unlock 10 AI credits you can use on any generator</p>
      </div>
      
      {error && (
        <div className="bg-brand-50 border border-brand-200 text-brand-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#126DFB] focus:border-[#126DFB] text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            onFocus={() => trackFormStart('weekly_trial', tier)}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#126DFB] focus:border-[#126DFB] text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#126DFB] focus:border-[#126DFB] text-sm"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#126DFB] focus:border-[#126DFB] text-sm"
            value={formData.packageInterest}
            onChange={(e) => setFormData({...formData, packageInterest: e.target.value})}
            required
          >
            <option value="">Package Interest</option>
            <option value="Explore">Explore ($0 - 10 credits)</option>
            <option value="Essentials">Essentials ($19 - 100 credits)</option>
            <option value="Studio">Studio ($29 - 500 credits)</option>
            <option value="Concierge">Concierge ($249 - 1,500 credits)</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] hover:from-[#0F5AD6] hover:to-[#126DFB] text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {['Essentials', 'Studio', 'Concierge'].includes(formData.packageInterest)
                ? 'Setting Up Your Account...'
                : 'Unlocking Your Credits...'}
            </>
          ) : (
            <>
              {['Essentials', 'Studio', 'Concierge'].includes(formData.packageInterest)
                ? 'Get My Credits'
                : 'Claim Free Credits'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">No payment required • Credits refresh monthly • Upgrade whenever you need more</p>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-sm text-gray-600 hover:text-gray-800 underline block mx-auto"
        >
          Back
        </button>
      </form>
    </div>
  );
}

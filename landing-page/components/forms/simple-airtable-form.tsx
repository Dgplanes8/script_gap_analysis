'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Mail } from 'lucide-react';

interface SimpleAirtableFormProps {
  buttonText?: string;
  buttonClassName?: string;
  source?: string;
  tier?: string;
}

export function SimpleAirtableForm({ 
  buttonText = "Start My FREE Week Trial",
  buttonClassName = "btn btn-primary text-lg px-8 py-4",
  source = "service-tiers",
  tier
}: SimpleAirtableFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    monthlyBudget: '',
    goals: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Airtable API using the same endpoint and format as existing form
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          monthlyBudget: formData.monthlyBudget,
          goals: formData.goals,
          source: source,
          type: 'free_week_trial',
          tier: tier
        }),
      });

      if (response.ok) {
        // Redirect to success page or show confirmation
        window.location.href = '/success?source=' + source;
      } else {
        console.error('Airtable submission failed');
        // Fallback to original email form behavior
        window.location.href = '/free-hooks';
      }
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      // Fallback to original email form behavior
      window.location.href = '/free-hooks';
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-orange-200">
      <div className="text-center mb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Mail className="h-3 w-3 mr-1" />
          FREE WEEK TRIAL
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Start Your FREE Week</h3>
        <p className="text-sm text-gray-600">Get winning templates every Monday</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Work email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            value={formData.monthlyBudget}
            onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
            required
          >
            <option value="">Budget</option>
            <option value="$100-$500">$100-$500</option>
            <option value="$500-$1k">$500-$1K</option>
            <option value="$1k-$2.5k">$1K-$2.5K</option>
            <option value="$2.5k-$5k">$2.5K-$5K</option>
            <option value="$5k-$10k">$5K-$10K</option>
            <option value="$10k+">$10K+</option>
          </select>
        </div>
        <textarea
          placeholder="What are your main goals? (e.g., increase app downloads, grow subscriptions, improve conversion rates)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          rows={3}
          value={formData.goals}
          onChange={(e) => setFormData({...formData, goals: e.target.value})}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting Your Free Week...
            </>
          ) : (
            <>
              Start FREE Week Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">No payment required • Cancel anytime</p>
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
'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface SimpleAirtableFormProps {
  buttonText?: string;
  buttonClassName?: string;
  source?: string;
  tier?: string;
}

export function SimpleAirtableForm({ 
  buttonText = "Get My 10 Free Hooks",
  buttonClassName = "btn btn-primary text-lg px-8 py-4",
  source = "service-tiers",
  tier
}: SimpleAirtableFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: ''
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
          source: source,
          type: 'service_tier_signup',
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
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Get Started</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Work email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
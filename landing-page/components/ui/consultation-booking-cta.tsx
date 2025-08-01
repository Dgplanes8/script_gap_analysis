'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { ApplicationForm } from '@/components/forms/application-form';

interface ConsultationBookingCTAProps {
  variant?: 'primary' | 'secondary' | 'header';
  text?: string;
  className?: string;
}

export function ConsultationBookingCTA({ 
  variant = 'primary', 
  text = 'Book Free Consultation',
  className = ''
}: ConsultationBookingCTAProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const baseClasses = 'inline-flex items-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-8 py-3 rounded-lg text-lg',
    secondary: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 px-6 py-2 rounded-lg',
    header: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 rounded-lg text-sm'
  };

  const handleBookingClick = () => {
    // Track consultation booking click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consultation_booking_click', {
        event_category: 'lead_generation',
        event_label: variant
      });
    }
    setShowForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: 'consultation_booking',
          source: `consultation_cta_${variant}`,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Track successful booking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'consultation_booking_complete', {
            event_category: 'conversion',
            event_label: variant,
            value: 1
          });
        }
      }
    } catch (error) {
      console.error('Booking submission error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Consultation Request Received!
        </h3>
        <p className="text-green-700">
          We'll reach out within 24 hours to schedule your strategic consultation.
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Book Your Free Strategic Consultation
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">What You'll Get:</h3>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                  Personalized CAC optimization strategy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                  Custom implementation roadmap
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                  Potential ROI assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                  No-obligation strategic guidance
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries());
                await handleFormSubmit(data);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current ARR *
                  </label>
                  <select
                    name="currentARR"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select range</option>
                    <option value="$100K-$500K">$100K - $500K</option>
                    <option value="$500K-$1M">$500K - $1M</option>
                    <option value="$1M-$2M">$1M - $2M</option>
                    <option value="$2M+">$2M+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Book Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleBookingClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <Calendar className="h-5 w-5 mr-2" />
      {text}
      <ArrowRight className="h-4 w-4 ml-2" />
    </button>
  );
}
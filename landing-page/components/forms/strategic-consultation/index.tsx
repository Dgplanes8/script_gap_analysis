'use client';

import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { StrategicConsultationFormProps } from './form-types';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { SuccessConfirmation } from './success-confirmation';

const getInitialFormData = () => ({
  fullName: '',
  email: '',
  company: '',
  monthlyAdSpend: '',
  packageInterest: ''
});

export function StrategicConsultationForm({ isOpen = true, onClose }: StrategicConsultationFormProps) {
  const [formData, setFormData] = useState(getInitialFormData());
  
  const { isSubmitting, isSubmitted, submit } = useFormSubmission({
    trackingEventName: 'strategic_consultation_booking',
    trackingFormType: 'simplified_form',
    additionalData: {
      type: 'strategic_consultation',
      source: 'apsics_media_landing'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isSubmitted) {
    return <SuccessConfirmation onClose={onClose} handleOverlayClick={handleOverlayClick} />;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative animate-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Book Your $100 Strategy Consultation
            </h2>
            <p className="text-gray-600">
              30-minute assessment + $100 credit toward any package
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your company name"
              />
            </div>

            {/* Monthly Ad Spend */}
            <div>
              <label htmlFor="monthlyAdSpend" className="block text-sm font-medium text-gray-700 mb-2">
                Current Monthly Ad Spend *
              </label>
              <select
                id="monthlyAdSpend"
                name="monthlyAdSpend"
                value={formData.monthlyAdSpend}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your ad spend range</option>
                <option value="<$10K">Less than $10K/month</option>
                <option value="$10K-$50K">$10K - $50K/month</option>
                <option value="$50K-$200K">$50K - $200K/month</option>
                <option value="$200K+">$200K+/month</option>
              </select>
            </div>

            {/* Package Interest */}
            <div>
              <label htmlFor="packageInterest" className="block text-sm font-medium text-gray-700 mb-2">
                Package Interest *
              </label>
              <select
                id="packageInterest"
                name="packageInterest"
                value={formData.packageInterest}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select package interest</option>
                <option value="Concept Starter ($97/month)">Concept Starter - $97/month</option>
                <option value="Intelligence Accelerator ($297/month)">Intelligence Accelerator - $297/month</option>
                <option value="Performance Accelerator ($997/month)">Performance Accelerator - $997/month</option>
                <option value="Not Sure">Not Sure - Help Me Decide</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2">What Happens Next:</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>1. We'll reach out within 24 hours to schedule your call</li>
                  <li>2. 30-minute performance marketing assessment</li>
                  <li>3. Custom package recommendation + $100 credit applied</li>
                </ul>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Booking Consultation...' : 'Book $100 Strategy Consultation'}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                $100 consultation fee fully credited toward chosen package
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
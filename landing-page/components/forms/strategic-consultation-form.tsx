'use client';

import { useState } from 'react';
import { X, Calendar, Target, TrendingUp, DollarSign, Building2, CheckCircle } from 'lucide-react';

interface StrategicConsultationFormProps {
  isOpen?: boolean;
  onClose: () => void;
}

export function StrategicConsultationForm({ isOpen = true, onClose }: StrategicConsultationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    title: '',
    currentARR: '',
    targetARR: '',
    currentCAC: '',
    monthlyAdSpend: '',
    primaryChallenge: '',
    timeline: '',
    previousExperience: '',
    specificGoals: '',
    consultationPreference: 'phone'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'strategic_consultation',
          source: 'strategic_landing_page',
          submissionDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Track strategic consultation booking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'strategic_consultation_booking', {
            event_category: 'lead_generation',
            event_label: 'premium_positioning',
            value: 1
          });
        }
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Strategic Consultation Booked!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your interest in our Strategic Ad Intelligence System. 
          We'll review your information and reach out within 24 hours to schedule 
          your personalized strategic consultation.
        </p>
        <div className="bg-indigo-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-indigo-900 mb-3">What to Expect:</h3>
          <ul className="text-sm text-indigo-800 space-y-2">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
              30-minute strategic assessment call
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
              Custom ROI projection for your business
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
              Personalized implementation roadmap
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
              No-obligation strategic guidance
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book Your Strategic Consultation
        </h2>
        <p className="text-gray-600">
          Free 30-minute strategic assessment with custom ROI projection
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-indigo-600" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., CMO, Head of Growth, Founder"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Business Metrics <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current ARR
                </label>
                <select
                  name="currentARR"
                  value={formData.currentARR}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select current ARR</option>
                  <option value="$100K-$500K">$100K - $500K</option>
                  <option value="$500K-$1M">$500K - $1M</option>
                  <option value="$1M-$2M">$1M - $2M</option>
                  <option value="$2M-$5M">$2M - $5M</option>
                  <option value="$5M+">$5M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target ARR Goal
                </label>
                <select
                  name="targetARR"
                  value={formData.targetARR}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select target ARR</option>
                  <option value="$500K">$500K</option>
                  <option value="$1M">$1M</option>
                  <option value="$2M">$2M</option>
                  <option value="$5M">$5M</option>
                  <option value="$10M+">$10M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current CAC (if known)
                </label>
                <input
                  type="number"
                  name="currentCAC"
                  value={formData.currentCAC}
                  onChange={handleInputChange}
                  placeholder="e.g., 200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Ad Spend
                </label>
                <select
                  name="monthlyAdSpend"
                  value={formData.monthlyAdSpend}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select ad spend range</option>
                  <option value="$0-$5K">$0 - $5K</option>
                  <option value="$5K-$15K">$5K - $15K</option>
                  <option value="$15K-$30K">$15K - $30K</option>
                  <option value="$30K-$50K">$30K - $50K</option>
                  <option value="$50K+">$50K+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Strategic Assessment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Strategic Assessment <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Growth Challenge
                </label>
                <select
                  name="primaryChallenge"
                  value={formData.primaryChallenge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select primary challenge</option>
                  <option value="High CAC / expensive acquisition">High CAC / expensive acquisition</option>
                  <option value="Low conversion rates">Low conversion rates</option>
                  <option value="Creative performance declining">Creative performance declining</option>
                  <option value="Scaling marketing profitably">Scaling marketing profitably</option>
                  <option value="Attribution and measurement">Attribution and measurement</option>
                  <option value="Channel diversification">Channel diversification</option>
                  <option value="Strategic positioning">Strategic positioning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline for Implementation
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP - this month">ASAP - this month</option>
                  <option value="Next 1-2 months">Next 1-2 months</option>
                  <option value="Next 3-6 months">Next 3-6 months</option>
                  <option value="Planning for next year">Planning for next year</option>
                  <option value="Just exploring options">Just exploring options</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Experience with Strategic Marketing
                </label>
                <textarea
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about your experience with agencies, consultants, or internal marketing teams..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Goals for This Partnership
                </label>
                <textarea
                  name="specificGoals"
                  value={formData.specificGoals}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="What specific outcomes are you looking to achieve? e.g., reduce CAC by 30%, scale to $2M ARR, improve creative performance..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Consultation Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Consultation Preferences
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Consultation Method *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="consultationPreference"
                    value="phone"
                    checked={formData.consultationPreference === 'phone'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Phone Call</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="consultationPreference"
                    value="video"
                    checked={formData.consultationPreference === 'video'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Video Call (Zoom)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-indigo-900 mb-2">What Happens Next:</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>1. We'll review your information and reach out within 24 hours</li>
                <li>2. Schedule a 30-minute strategic assessment call</li>
                <li>3. Receive a custom ROI projection and implementation roadmap</li>
                <li>4. Get strategic guidance with no obligation to proceed</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Booking Consultation...' : 'Book Strategic Consultation'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Free consultation • No obligation • We respect your privacy and won't share your information
            </p>
          </div>
      </form>
    </div>
  );
}
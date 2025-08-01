'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ArrowRight } from 'lucide-react';

const assessmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  currentARR: z.string().min(1, 'Current ARR is required'),
  targetARR: z.string().min(1, 'Target ARR is required'),
  currentCAC: z.string().optional(),
  primaryChallenge: z.string().min(1, 'Primary challenge is required'),
  currentChannels: z.array(z.string()).min(1, 'Please select at least one channel'),
  timeline: z.string().min(1, 'Timeline is required'),
  budget: z.string().min(1, 'Budget range is required')
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface StrategyAssessmentFormProps {
  onClose: () => void;
}

const marketingChannels = [
  'Paid Search (Google Ads)',
  'Paid Social (Facebook, LinkedIn)',
  'Content Marketing',
  'Email Marketing', 
  'SEO/Organic',
  'Influencer/Partnership Marketing',
  'Direct Sales',
  'Referral Programs',
  'Other'
];

export function StrategyAssessmentForm({ onClose }: StrategyAssessmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema)
  });

  const handleChannelChange = (channel: string, checked: boolean) => {
    let newChannels;
    if (checked) {
      newChannels = [...selectedChannels, channel];
    } else {
      newChannels = selectedChannels.filter(c => c !== channel);
    }
    setSelectedChannels(newChannels);
    setValue('currentChannels', newChannels);
  };

  const handleFormSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/airtable-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: 'strategy_assessment',
          source: '1m_arr_playbook_assessment',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Track assessment completion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'strategy_assessment_complete', {
            event_category: 'lead_generation',
            event_label: '1m_arr_playbook',
            value: 1
          });
        }
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Assessment Submitted!
        </h3>
        <p className="text-gray-700 mb-6">
          We'll analyze your responses and send you a personalized strategic 
          assessment within 24 hours, including specific recommendations for 
          scaling to your target ARR.
        </p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-indigo-900 mb-2">Get Your Personalized Assessment:</h3>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Custom roadmap to reach your ARR target</li>
          <li>• Channel optimization recommendations</li>
          <li>• CAC reduction strategies</li>
          <li>• Priority action items with timelines</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Email *
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@company.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          {...register('company')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Your company name"
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current ARR *
          </label>
          <select
            {...register('currentARR')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select current ARR</option>
            <option value="0-100k">$0 - $100K</option>
            <option value="100k-250k">$100K - $250K</option>
            <option value="250k-500k">$250K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m-2.5m">$1M - $2.5M</option>
            <option value="2.5m+">$2.5M+</option>
          </select>
          {errors.currentARR && (
            <p className="text-red-500 text-sm mt-1">{errors.currentARR.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target ARR *
          </label>
          <select
            {...register('targetARR')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select target ARR</option>
            <option value="500k">$500K</option>
            <option value="1m">$1M</option>
            <option value="2.5m">$2.5M</option>
            <option value="5m">$5M</option>
            <option value="10m+">$10M+</option>
          </select>
          {errors.targetARR && (
            <p className="text-red-500 text-sm mt-1">{errors.targetARR.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Customer Acquisition Cost (CAC)
        </label>
        <input
          type="number"
          {...register('currentCAC')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. 250 (if known)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Current Marketing Channels * (Select all that apply)
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {marketingChannels.map((channel) => (
            <label key={channel} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedChannels.includes(channel)}
                onChange={(e) => handleChannelChange(channel, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{channel}</span>
            </label>
          ))}
        </div>
        {errors.currentChannels && (
          <p className="text-red-500 text-sm mt-1">{errors.currentChannels.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Challenge *
        </label>
        <select
          {...register('primaryChallenge')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select primary challenge</option>
          <option value="high-cac">High customer acquisition costs</option>
          <option value="low-conversion">Low conversion rates</option>
          <option value="channel-effectiveness">Poor channel effectiveness</option>
          <option value="scaling-challenges">Difficulty scaling marketing</option>
          <option value="attribution">Attribution and measurement issues</option>
          <option value="creative-performance">Creative and content performance</option>
          <option value="retention">Customer retention and churn</option>
          <option value="other">Other</option>
        </select>
        {errors.primaryChallenge && (
          <p className="text-red-500 text-sm mt-1">{errors.primaryChallenge.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline to Target ARR *
          </label>
          <select
            {...register('timeline')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select timeline</option>
            <option value="6-months">6 months</option>
            <option value="12-months">12 months</option>
            <option value="18-months">18 months</option>
            <option value="24-months">24 months</option>
            <option value="36-months+">36+ months</option>
          </select>
          {errors.timeline && (
            <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Marketing Budget *
          </label>
          <select
            {...register('budget')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select budget range</option>
            <option value="under-5k">Under $5K</option>
            <option value="5k-15k">$5K - $15K</option>
            <option value="15k-30k">$15K - $30K</option>
            <option value="30k-50k">$30K - $50K</option>
            <option value="50k+">$50K+</option>
          </select>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center ${
            isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              Get My Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
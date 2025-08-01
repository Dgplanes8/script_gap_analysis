'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';

const airtableSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company is required'),
  appType: z.string().min(1, 'App type is required'),
  currentCTR: z.string().optional(),
  currentTSR: z.string().optional(),
  painPoints: z.string().min(10, 'Please describe your main challenges (min 10 characters)'),
  goals: z.string().min(10, 'Please describe your goals (min 10 characters)'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type AirtableFormData = z.infer<typeof airtableSchema>;

interface AirtableFormProps {
  title?: string;
  description?: string;
  onSubmit?: (data: AirtableFormData) => Promise<void>;
}

export function AirtableForm({
  title = 'Get Featured - Share Your Success Story',
  description = 'Tell us about your subscription business and how Monday Morning Marketer helped improve your ad performance.',
  onSubmit,
}: AirtableFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AirtableFormData>({
    resolver: zodResolver(airtableSchema),
  });

  const handleFormSubmit = async (data: AirtableFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Submit to Airtable via API route
        const response = await fetch('/api/airtable-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
      }
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-green-800 mb-2">
          Thank you for your submission!
        </h3>
        <p className="text-green-700 mb-4">
          We've received your information and will review it within 24 hours.
        </p>
        <p className="text-sm text-green-600">
          If your story is a good fit, we'll reach out to discuss featuring you in our case studies.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              className="form-input"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              className="form-input"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company/App Name *
            </label>
            <input
              type="text"
              className="form-input"
              {...register('company')}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Type *
            </label>
            <select className="form-input" {...register('appType')}>
              <option value="">Select app type</option>
              <option value="streaming">Streaming</option>
              <option value="software">Software</option>
              <option value="ecommerce">E-commerce</option>
              <option value="education">Education</option>
              <option value="subscription_box">Subscription Box</option>
              <option value="wellness">Wellness</option>
              <option value="nutrition">Nutrition</option>
              <option value="other">Other</option>
            </select>
            {errors.appType && (
              <p className="text-red-500 text-sm mt-1">{errors.appType.message}</p>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current CTR (Click-Through Rate)
            </label>
            <input
              type="text"
              placeholder="e.g., 2.5%"
              className="form-input"
              {...register('currentCTR')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current TSR (Tap-Through Rate)
            </label>
            <input
              type="text"
              placeholder="e.g., 1.8%"
              className="form-input"
              {...register('currentTSR')}
            />
          </div>
        </div>

        {/* Detailed Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Pain Points & Challenges *
          </label>
          <textarea
            rows={4}
            className="form-input"
            placeholder="Describe the marketing challenges you faced before working with MMM..."
            {...register('painPoints')}
          />
          {errors.painPoints && (
            <p className="text-red-500 text-sm mt-1">{errors.painPoints.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goals & Desired Outcomes *
          </label>
          <textarea
            rows={4}
            className="form-input"
            placeholder="What results are you hoping to achieve with Monday Morning Marketer?"
            {...register('goals')}
          />
          {errors.goals && (
            <p className="text-red-500 text-sm mt-1">{errors.goals.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Ad Budget
            </label>
            <select className="form-input" {...register('budget')}>
              <option value="">Select budget range</option>
              <option value="<$1k">Less than $1,000</option>
              <option value="$1k-$5k">$1,000 - $5,000</option>
              <option value="$5k-$10k">$5,000 - $10,000</option>
              <option value="$10k-$25k">$10,000 - $25,000</option>
              <option value="$25k+">$25,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline for Results
            </label>
            <select className="form-input" {...register('timeline')}>
              <option value="">Select timeline</option>
              <option value="immediate">Immediate - need results ASAP</option>
              <option value="1-month">1 month</option>
              <option value="3-months">3 months</option>
              <option value="6-months">6 months</option>
              <option value="ongoing">Ongoing partnership</option>
            </select>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary px-8 py-3 text-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <span className="flex items-center">
                Submit Application
                <Send className="ml-2 h-5 w-5" />
              </span>
            )}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you agree to be contacted about potential case study features.
        </p>
      </form>
    </div>
  );
}
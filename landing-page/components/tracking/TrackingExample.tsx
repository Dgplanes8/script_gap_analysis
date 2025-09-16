'use client';

import React, { useState } from 'react';
import { TrackedButton, EnhancedTrackedButton } from './TrackedButton';
import { TrackedForm, EnhancedTrackedForm } from './TrackedForm';
import { useCTATracking } from '@/hooks/useClickTracking';
import { trackConversion } from '@/components/analytics';

export function TrackingExample() {
  const [formData, setFormData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Example CTA tracking
  const { handleClick: handleCTAClick } = useCTATracking({
    ctaName: 'hero_cta',
    ctaType: 'primary_cta',
    pageSection: 'hero',
    ctaValue: 'free_trial',
  });

  // Example form completion handler
  const handleFormComplete = (data: any) => {
    console.log('Form completed:', data);
    setFormData(data);
    
    // Track conversion
    trackConversion('newsletter_signup', 5, 'USD');
  };

  // Example form abandonment handler
  const handleFormAbandonment = (step: string) => {
    console.log('Form abandoned at step:', step);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Google Tag Manager Tracking Examples
      </h1>

      {/* Basic Button Tracking */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Button Click Tracking</h2>
        <div className="space-y-4">
          <TrackedButton
            buttonName="get_started_button"
            buttonType="primary_button"
            pageSection="hero"
            buttonValue="free_trial"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            onClick={() => console.log('Get Started clicked')}
          >
            Get Started - Free Trial
          </TrackedButton>

          <EnhancedTrackedButton
            buttonName="learn_more_button"
            buttonType="secondary_button"
            pageSection="hero"
            buttonValue="learn_more"
            additionalData={{
              campaign_source: 'homepage',
              user_type: 'new_visitor',
            }}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            onClick={() => console.log('Learn More clicked')}
          >
            Learn More
          </EnhancedTrackedButton>

          <button
            onClick={handleCTAClick}
            className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700"
          >
            Hero CTA Button
          </button>
        </div>
      </section>

      {/* Basic Form Tracking */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Form Tracking</h2>
        <TrackedForm
          formName="newsletter_signup"
          formType="email_capture"
          onFormComplete={handleFormComplete}
          onFormAbandonment={handleFormAbandonment}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <TrackedButton
            buttonName="newsletter_submit"
            buttonType="submit_button"
            pageSection="newsletter_form"
            buttonValue="newsletter_signup"
            type="submit"
            className="w-full bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700"
          >
            Subscribe to Newsletter
          </TrackedButton>
        </TrackedForm>
      </section>

      {/* Multi-step Form Tracking */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Multi-step Form Tracking</h2>
        <EnhancedTrackedForm
          formName="consultation_booking"
          formType="multi_step_form"
          steps={['contact_info', 'business_info', 'preferences', 'confirmation']}
          currentStepIndex={currentStep}
          onStepChange={(stepIndex, stepData) => {
            setCurrentStep(stepIndex);
            console.log(`Step ${stepIndex} completed:`, stepData);
          }}
          onFormComplete={handleFormComplete}
          onFormAbandonment={handleFormAbandonment}
          className="space-y-4"
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 1: Contact Information</h3>
              <div>
                <label htmlFor="consultation_email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="consultation_email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="consultation_phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="consultation_phone"
                  name="phone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 2: Business Information</h3>
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 3: Preferences</h3>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Monthly Ad Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="0-1000">$0 - $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000+">$10,000+</option>
                </select>
              </div>
              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  Primary Goals
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your primary marketing goals"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Step 4: Confirmation</h3>
              <p className="text-gray-600">
                Please review your information and click submit to book your consultation.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Summary:</h4>
                <p>Email: {formData.email}</p>
                <p>Company: {formData.company}</p>
                <p>Industry: {formData.industry}</p>
                <p>Budget: {formData.budget}</p>
              </div>
            </div>
          )}

          <TrackedButton
            buttonName="consultation_submit"
            buttonType="submit_button"
            pageSection="consultation_form"
            buttonValue="consultation_booking"
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {currentStep === 3 ? 'Book Consultation' : 'Next Step'}
          </TrackedButton>
        </EnhancedTrackedForm>
      </section>

      {/* Conversion Tracking Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Conversion Tracking</h2>
        <div className="space-y-4">
          <TrackedButton
            buttonName="purchase_button"
            buttonType="purchase_button"
            pageSection="pricing"
            buttonValue={99}
            className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700"
            onClick={() => {
              trackConversion('product_purchase', 99, 'USD');
              console.log('Purchase conversion tracked');
            }}
          >
            Buy Now - $99
          </TrackedButton>

          <TrackedButton
            buttonName="demo_request"
            buttonType="demo_button"
            pageSection="hero"
            buttonValue="demo_request"
            className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700"
            onClick={() => {
              trackConversion('demo_request', 0, 'USD');
              console.log('Demo request conversion tracked');
            }}
          >
            Request Demo
          </TrackedButton>
        </div>
      </section>
    </div>
  );
} 
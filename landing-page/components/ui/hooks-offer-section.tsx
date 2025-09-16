'use client';

import { useState } from 'react';
import { CheckCircle, Download, TrendingUp, Target, Mail } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export function HooksOfferSection() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section id="hooks-offer" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Download className="h-4 w-4 mr-2" />
              FREE DOWNLOAD
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              10 Copy-Paste Ad Templates for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Startup Teams</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Get battle-tested ad templates that help startup teams launch winning campaigns fast. Perfect for founders who need results without the guesswork. Each template includes simple implementation guides and platform-specific variations.
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Launch Fast</h3>
              <p className="text-gray-600">
                Templates that help startup teams launch winning ads in minutes, not months. Skip the trial-and-error phase completely.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
              <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget Friendly</h3>
              <p className="text-gray-600">
                Each template includes simple implementation guides. No expensive agencies required - just copy, customize, and launch today.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-brand-100">
              <div className="bg-brand-100 rounded-lg p-3 w-fit mb-4">
                <Mail className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Founder Support</h3>
              <p className="text-gray-600">
                Plus get weekly newsletter with fresh templates, competitor insights, and startup-focused strategies from a fellow founder.
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              What You'll Get Instantly:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>10 Copy-Paste Templates</strong> - Ready-to-use ad formats that work for startups
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Why It Works Explanations</strong> - Simple guides on when and how to use each template
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Implementation Guides</strong> - Step-by-step instructions for launching your first ads
                  </span>
                </li>
              </ul>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Customization Guide</strong> - How to adapt each template for your startup and audience
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Platform Variations</strong> - Specific formats for TikTok, Facebook, Instagram, and YouTube
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Bonus: Testing Guide</strong> - Simple A/B testing framework to find what works for your startup
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Startup Objection Preemption */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-12 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              "But Will This Actually Work for MY Startup?"
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">✓ Zero Risk</h4>
                <p className="text-gray-600 text-sm">Free download, no strings attached. If they don't help, you've lost nothing.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">✓ Built for Startups</h4>
                <p className="text-gray-600 text-sm">Created specifically for early-stage teams with small budgets and big goals.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">✓ Proven Results</h4>
                <p className="text-gray-600 text-sm">Used by 100+ growing businesses who've launched successful ad campaigns.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Download MY 10 Templates Now
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Join 100+ growing businesses getting templates that actually convert
            </p>
            
            <div className="max-w-md mx-auto bg-white rounded-xl p-6">
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText="Download MY Templates"
                variant="inline"
              />
              <p className="text-xs text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
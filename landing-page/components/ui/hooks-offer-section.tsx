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
              10 Viral Hooks from Fortune 100
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Campaigns</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Get the exact hooks that drove viral growth for subscription businesses. 
              From someone who managed $100M+ ad spend. Each hook includes the strategic rationale 
              and platform-specific adaptation guide.
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fortune 100 Proven</h3>
              <p className="text-gray-600">
                Hooks that drove viral growth for subscription businesses at enterprise scale. Real performance data, not theory.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
              <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Use</h3>
              <p className="text-gray-600">
                Each hook includes strategic rationale and platform adaptation guide. Copy, paste, and customize for your brand.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekly Intelligence</h3>
              <p className="text-gray-600">
                Plus get weekly trend intelligence newsletter with fresh hooks, competitor breakdowns, and Fortune 100 strategies.
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
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>10 High-Converting Hooks</strong> - Ready-to-use headlines with performance data
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Psychology Breakdowns</strong> - Why each hook works and when to use it
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Strategic Analysis</strong> - Psychological principles and optimization insights
                  </span>
                </li>
              </ul>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Adaptation Framework</strong> - How to customize each hook for your specific audience
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Platform Optimization</strong> - Variations for TikTok, Facebook, Instagram, and YouTube
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Bonus: Testing Matrix</strong> - How to A/B test hooks systematically for maximum ROI
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              Download Your 10 Proven Hooks Now
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Join 1,200+ subscription company founders getting hooks that actually convert
            </p>
            
            <div className="max-w-md mx-auto bg-white rounded-xl p-6">
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText="Send Me The 10 Hooks"
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
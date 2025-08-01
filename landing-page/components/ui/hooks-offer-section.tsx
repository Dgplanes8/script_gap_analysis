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
              Get 20 Proven Hooks That Convert
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Instantly</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              These hooks are based on recent trends and proven media performance from managing 
              <strong> $100M+ in ad spend</strong> across subscription companies. Each hook includes 
              the psychology behind why it works and real performance data.
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trending Psychology</h3>
              <p className="text-gray-600">
                Based on current consumer behavior patterns and what's working right now in subscription marketing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
              <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Performance</h3>
              <p className="text-gray-600">
                Every hook includes actual CTR data and conversion metrics from real campaigns across multiple verticals.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekly Updates</h3>
              <p className="text-gray-600">
                Plus get exclusive Monday Morning Ideas with fresh hooks, creative breakdowns, and testing strategies.
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
                    <strong>20 High-Converting Hooks</strong> - Ready-to-use headlines with performance data
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
                    <strong>Real Performance Metrics</strong> - CTR, CVR, and engagement data from live campaigns
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
              Download Your 20 Proven Hooks Now
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Join 1,200+ subscription company founders getting hooks that actually convert
            </p>
            
            <div className="max-w-md mx-auto bg-white rounded-xl p-6">
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText="Send Me The 20 Hooks"
                variant="inline"
                showFirstName={true}
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
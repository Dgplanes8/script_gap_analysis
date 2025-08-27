'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HooksOfferSection } from '@/components/ui/hooks-offer-section';
import { ConvertKitForm } from '@/components/forms/convertkit-form';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { trackPageView } from '@/components/analytics';
import { ArrowRight } from 'lucide-react';
import { Download, BookOpen, Zap, Users } from 'lucide-react';

export default function FreeHooksPage() {

  useEffect(() => {
    trackPageView('free-hooks');
  }, []);

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section for Free Hooks */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Download className="h-4 w-4 mr-2" />
                  COPY-PASTE TEMPLATES - FREE
                </div>
                
                <div className="bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  🔥 Downloaded by 1,247+ startup founders this month
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                10 Copy-Paste Ad Templates (Launch Your First Campaign This Week)
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Skip months of trial-and-error testing. These battle-tested templates help you launch winning ads in minutes. Designed for startup teams who need results fast - download, customize, launch today.
              </p>
              
              {/* Above-fold CTA */}
              <div className="max-w-lg mx-auto mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
                  {/* ConvertKit Form Above the Fold */}
                  <div className="mb-8">
                    <ConvertKitForm 
                      formId="your-form-id-here"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-red-600">500+</div>
                      <div className="text-sm text-gray-600">Campaigns Launched</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-orange-600">Startup</div>
                      <div className="text-sm text-gray-600">Focused</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-red-600">3+</div>
                      <div className="text-sm text-gray-600">Platforms</div>
                    </div>
                  </div>
                  <div className="w-full max-w-xl">
                    <EmailCaptureForm
                      placeholder="Enter your work email"
                      buttonText="Download MY Templates Now"
                      variant="hero"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Instant download • No spam • Used by 1,247+ startup founders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Hooks Offer Section */}
        <HooksOfferSection />

        {/* Additional Resources Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  More Startup-Friendly Tools
                </h2>
                <p className="text-xl text-gray-600">
                  Free tools and calculators designed specifically for early-stage startup teams
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* CAC Calculator */}
                <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
                  <div className="bg-red-600 rounded-lg p-3 w-fit mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">CAC Optimization Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Free calculator to help startup teams reduce customer acquisition costs on any budget.
                  </p>
                  <a
                    href="/cac-optimization-calculator"
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Use Calculator
                    <Download className="h-4 w-4 ml-2" />
                  </a>
                </div>

                {/* Benchmarking Tool */}
                <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
                  <div className="bg-orange-600 rounded-lg p-3 w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Revenue Growth Benchmarking Tool</h3>
                  <p className="text-gray-600 mb-4">
                    See how your startup's growth compares and get actionable recommendations to improve.
                  </p>
                  <a
                    href="/revenue-growth-benchmarking"
                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                  >
                    Start Benchmarking
                    <Download className="h-4 w-4 ml-2" />
                  </a>
                </div>

                {/* ROI Calculator */}
                <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-6 border border-red-200">
                  <div className="bg-red-600 rounded-lg p-3 w-fit mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">SaaS Creative ROI Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Calculate how much better ad templates could improve your startup's results.
                  </p>
                  <a
                    href="/saas-creative-strategy-roi-calculator"
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Calculate ROI
                    <Download className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Consultation CTA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready for Weekly Templates from a Fellow Founder?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get proven ad templates every Monday from someone who's been in your shoes. <strong>Built by a startup founder, for startup founders.</strong> Starting at $5/week with your first week FREE.
              </p>
              <button
                onClick={() => window.location.href = '/#service-tiers'}
                className="bg-white text-gray-900 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
              >
                See MY Weekly Plans
              </button>
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-lg opacity-90 mb-2">Questions? Get in touch:</p>
                <a 
                  href="mailto:brian@apsicsmedia.com" 
                  className="text-orange-400 hover:text-orange-300 font-semibold text-lg"
                >
                  brian@apsicsmedia.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>


      {/* Footer */}
      <Footer />
    </>
  );
}
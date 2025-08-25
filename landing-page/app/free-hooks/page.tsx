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
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Download className="h-4 w-4 mr-2" />
                COPY-PASTE TEMPLATES - FREE
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                10 Copy-Paste Ad Templates (Launch Your First Campaign This Week)
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Skip months of trial-and-error testing. These battle-tested templates help you launch winning ads in minutes. Designed for startup teams who need results fast - download, customize, launch today.
              </p>
              
              {/* Above-fold CTA */}
              <div className="max-w-lg mx-auto mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-200">
                  {/* ConvertKit Form Above the Fold */}
                  <div className="mb-6">
                    <ConvertKitForm 
                      formId="your-form-id-here"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">$250MM+</div>
                      <div className="text-sm text-gray-600">Media Managed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">Campaign</div>
                      <div className="text-sm text-gray-600">Launch Expert</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">3+</div>
                      <div className="text-sm text-gray-600">Platforms</div>
                    </div>
                  </div>
                  <div className="w-full max-w-xl">
                    <EmailCaptureForm
                      placeholder="Enter your work email"
                      buttonText="Get My 10 Free Hooks Now"
                      variant="hero"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      Instant download • No spam • Used by early-stage startup founders
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
                  More Strategic Resources
                </h2>
                <p className="text-xl text-gray-600">
                  Explore our comprehensive collection of strategic marketing tools and calculators
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
                    Interactive calculator to optimize your customer acquisition costs with industry benchmarks.
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
                    Compare your creative strategy performance against industry leaders and get personalized recommendations.
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
                    Calculate potential ROI improvements from strategic creative optimization.
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
                Ready for Weekly Creative Intelligence?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get strategic creative concepts every Monday designed for early-stage startups. Starting at $5/week with your first week FREE.
              </p>
              <button
                onClick={() => window.location.href = '/#service-tiers'}
                className="bg-white text-gray-900 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
              >
                See Weekly Plans
              </button>
            </div>
          </div>
        </section>
      </main>


      {/* Footer */}
      <Footer />
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HooksOfferSection } from '@/components/ui/hooks-offer-section';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { trackPageView } from '@/components/analytics';
import { useConsultation } from '@/components/contexts/consultation-context';
import { Download, BookOpen, Zap, Users } from 'lucide-react';

export default function FreeHooksPage() {
  const { openModal: handleOpenConsultation } = useConsultation();
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  useEffect(() => {
    trackPageView('free-hooks');
  }, []);

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section for Free Hooks */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Download className="h-4 w-4 mr-2" />
                FREE RESOURCES
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                10 Free Viral Hooks That Stop the Scroll
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get the exact hooks used by Fortune 100 subscription businesses to drive viral growth. Based on $100M+ in managed ad spend data.
              </p>
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
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">CAC Optimization Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Interactive calculator to optimize your customer acquisition costs with industry benchmarks.
                  </p>
                  <a
                    href="/cac-optimization-calculator"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Try Calculator
                    <Download className="h-4 w-4 ml-2" />
                  </a>
                </div>

                {/* Benchmarking Tool */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                  <div className="bg-indigo-600 rounded-lg p-3 w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Revenue Growth Benchmarking Tool</h3>
                  <p className="text-gray-600 mb-4">
                    Compare your creative strategy performance against industry leaders and get personalized recommendations.
                  </p>
                  <a
                    href="/revenue-growth-benchmarking"
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                  >
                    Try Benchmarking Tool
                    <Download className="h-4 w-4 ml-2" />
                  </a>
                </div>

                {/* ROI Calculator */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="bg-purple-600 rounded-lg p-3 w-fit mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">SaaS Creative ROI Calculator</h3>
                  <p className="text-gray-600 mb-4">
                    Calculate potential ROI improvements from strategic creative optimization.
                  </p>
                  <a
                    href="/saas-creative-strategy-roi-calculator"
                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
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
                Ready for Weekly Trend Intelligence?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get fresh scripts every Monday based on trending formats + competitor analysis. Starting at $67/month.
              </p>
              <button
                onClick={handleOpenConsultation}
                className="bg-white text-gray-900 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </>
  );
}
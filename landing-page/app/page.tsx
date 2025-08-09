'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Users, TrendingUp, Target, Building2, Calculator, Calendar } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { ServiceTiers } from '@/components/layout/service-tiers';
import { StrategyProcess } from '@/components/layout/strategic-process';
import { CreativeStrategyBenchmarkTool } from '@/components/calculators/creative-strategy-benchmark-tool';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { AboutSection } from '@/components/layout/about-section';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { Header } from '@/components/layout/header';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Footer } from '@/components/layout/footer';
import { useConsultation } from '@/components/contexts/consultation-context';

export default function HomePage() {
  const { openModal: handleOpenConsultation } = useConsultation();
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <Hero
        title="Get Viral Scripts Every Week (Not Every Month)"
        subtitle="Weekly trend intelligence + competitor analysis delivered every Monday. Each concept includes ready-to-develop scripts from someone who managed $100M+ ad spend for Fortune 100 subscription businesses."
        ctaText="Get My 10 Free Hooks"
        secondaryCtaText="See Weekly Plans"
        showEmailCapture={true}
        onPrimaryClick={() => window.location.href = '/free-hooks'}
        onSecondaryClick={() => document.getElementById('service-tiers')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Lead Magnet Prominence Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200">
              <div className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Mail className="h-4 w-4 mr-2" />
                FREE DOWNLOAD - LIMITED TIME
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get 10 Viral Hooks from Fortune 100 Campaigns
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                The exact hooks that drove viral growth for subscription businesses. Each hook includes strategic rationale and platform adaptation guide. From someone who managed $100M+ ad spend.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">Fortune 100</div>
                  <div className="text-sm text-gray-600">Proven Hooks</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">Ready to Use</div>
                  <div className="text-sm text-gray-600">Copy & Customize</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">Weekly Bonus</div>
                  <div className="text-sm text-gray-600">Trend Intelligence</div>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Get My 10 Free Hooks"
                  variant="hero"
                />
                <p className="text-xs text-gray-500 mt-3">
                  Plus weekly trend intelligence newsletter. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced Fortune 100 Positioning */}
      <AboutSection onOpenApplication={handleOpenConsultation} />

      {/* Strategic Process Overview */}
      <StrategyProcess />

      {/* Strategic Differentiators */}
      <Features
        title="Why Weekly Trend Intelligence Works for Digital Subscription Businesses"
        subtitle="Get trending concepts and competitor analysis delivered every Monday vs waiting weeks for traditional agencies"
        features={[
          {
            icon: Target,
            title: 'Weekly Trend Intelligence',
            description:
              'Scripts inspired by what\'s working RIGHT NOW on social media. Fresh concepts every Monday based on trending formats, not guesswork.',
          },
          {
            icon: Building2,
            title: 'Fortune 100 Proven Methods',
            description:
              '10+ years managing $100M+ ad spend for subscription businesses. Systematic approach proven at Fortune 100 scale, optimized for speed.'
          },
          {
            icon: TrendingUp,
            title: 'Competitive Analysis Included',
            description:
              'We reverse-engineer your competitors\' best content. Weekly delivery vs industry standard 1-2 week turnaround times.',
          },
        ]}
      />

      {/* Creative Strategy Benchmark Analysis */}
      <CreativeStrategyBenchmarkTool />

      {/* Service Tiers Section */}
      <section id="service-tiers">
        <ServiceTiers />
      </section>

      {/* Strategic Resources Section */}
      <section id="strategic-resources" className="bg-gray-50">
        <ContentNavigation showTitle={true} variant="grid" />
      </section>


      {/* Weekly Delivery Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              MONDAY DELIVERY GUARANTEE
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Weekly Script Delivery (Every Monday)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trending Concepts Weekly</h3>
                <p className="text-gray-600">
                  Fresh scripts based on what's working RIGHT NOW on social media. Delivered every Monday, not every month.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Competitor Intelligence</h3>
                <p className="text-gray-600">
                  We reverse-engineer what's working for your competitors and adapt it for your brand. Fortune 100 methodology at startup speed.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Subscription Business Focus</h3>
                <p className="text-gray-600">
                  Built specifically for digital subscription businesses needing consistent creative testing fuel to combat churn and drive growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our weekly trend intelligence service
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How is this different from traditional agencies?
                </h3>
                <p className="text-gray-600">
                  Traditional agencies take 1-2 weeks for script delivery and charge $5,000+ monthly minimums. We deliver fresh, trending concepts every Monday at a fraction of the cost, using Fortune 100 proven methodology enhanced with AI research.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What makes your trend intelligence unique?
                </h3>
                <p className="text-gray-600">
                  We combine real-time social media trend analysis with competitor reverse-engineering, backed by 10+ years managing $100M+ in ad spend for Fortune 100 subscription businesses. You get strategic context, not just trending formats.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600">
                  Yes, all plans are month-to-month with no long-term contracts. Cancel anytime. We're confident in our weekly delivery quality and strategic value.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you work with businesses outside of subscriptions?
                </h3>
                <p className="text-gray-600">
                  While our expertise is optimized for subscription and recurring revenue businesses (SaaS, D2C subscriptions, memberships), our trend intelligence methodology works for any business needing consistent creative testing fuel.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I get started?
                </h3>
                <p className="text-gray-600">
                  Start with our free 10 Hook Bank to experience our strategic approach. Then book a strategy call to discuss which weekly plan fits your growth needs. No obligation, no pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Fresh Scripts Every Monday?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join subscription businesses getting weekly trend intelligence from someone who managed $100M+ ad spend at Fortune 100 companies.
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="text-3xl font-bold">Weekly</div>
                  <div className="text-sm opacity-80">Monday Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">Trending</div>
                  <div className="text-sm opacity-80">Fresh Concepts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$67/Month</div>
                  <div className="text-sm opacity-80">Starting Price</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => window.location.href = '/free-hooks'}
                  className="btn btn-primary"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get My 10 Free Hooks
                </button>
                <button
                  onClick={() => document.getElementById('service-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-secondary"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  See Weekly Plans
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Weekly Creative Intelligence Newsletter
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get trending hooks, competitor insights, and Fortune 100 performance marketing strategies delivered every Monday.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Get My Weekly Hooks"
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        title="Wait! Get Your Free Expert Creative Intelligence Toolkit Before You Go"
        subtitle="Join 1,200+ marketers getting expert creative hooks and strategic insights every Monday + instant access to our Creative Hook Database."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </>
  );
}
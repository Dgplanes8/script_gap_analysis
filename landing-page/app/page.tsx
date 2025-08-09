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
        title="Stop Waiting Weeks for Creative Concepts - Get Fresh Scripts in 48 Hours"
        subtitle="Weekly creative intelligence delivered every Monday for growth leaders at subscription companies. Battle-tested concepts from 10+ years managing performance marketing campaigns, not corporate methodology."
        ctaText="Get My 10 Free Hooks"
        secondaryCtaText="See Weekly Plans"
        showEmailCapture={true}
        onPrimaryClick={() => window.location.href = '/free-hooks'}
        onSecondaryClick={() => document.getElementById('service-tiers')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Lead Magnet Prominence Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Mail className="h-4 w-4 mr-2" />
                FREE DOWNLOAD - LIMITED TIME
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10 Hooks That Convert Subscription Sign-ups
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Proven hooks from high-performing subscription campaigns. Perfect for growth teams testing new creative angles weekly. Stop guessing what hooks will work - get concepts you can test this week.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">Performance</div>
                  <div className="text-sm text-gray-600">Tested Hooks</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-navy-600">Ready to Test</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-teal-600">Growth Focus</div>
                  <div className="text-sm text-gray-600">Subscription Specific</div>
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
        title="Built for Growth Leaders Who Can't Wait on Agencies"
        subtitle="48-hour creative delivery vs 2-week agency turnaround times. Perfect for performance marketers scaling subscription companies."
        features={[
          {
            icon: Target,
            title: 'Creative Bottleneck Solution',
            description:
              'Fresh creative concepts every Monday when your team is stuck on the same angles. Stop waiting weeks for agencies - get testable scripts immediately.',
          },
          {
            icon: Building2,
            title: 'Performance Marketing Focus',
            description:
              '10+ years optimizing campaigns for subscription companies. Built specifically for growth teams managing $10k-$50k+ monthly ad spend.',
          },
          {
            icon: TrendingUp,
            title: 'Audience Expansion Intelligence',
            description:
              'Find new audiences when you\'ve saturated your core segments. Competitor analysis shows you what\'s working for similar subscription companies.',
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
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              MONDAY DELIVERY GUARANTEE
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Weekly Script Delivery (Every Monday)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Creative Testing Fuel</h3>
                <p className="text-gray-600">
                  New concepts to test when your current ads are fatiguing. Fresh angles delivered every Monday for continuous optimization.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Competitor Intelligence</h3>
                <p className="text-gray-600">
                  See what's working for other subscription companies before your competitors copy it. Adapt winning concepts for your growth goals.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-navy-100">
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-navy-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth-Stage Focused</h3>
                <p className="text-gray-600">
                  Perfect for 5-75 employee subscription companies scaling beyond basic audiences. Built for teams managing serious ad budgets.
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
                  Agencies take 1-2 weeks for concept delivery and charge $5,000+ monthly minimums. We deliver fresh concepts every Monday at a fraction of the cost, specifically for performance marketers who need constant creative testing.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What makes your creative intelligence unique?
                </h3>
                <p className="text-gray-600">
                  We combine trend analysis with competitor intelligence, specifically for subscription business models. 10+ years optimizing campaigns for recurring revenue companies means we understand your growth challenges.
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
      <section className="py-24 bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Stop Waiting on Agencies - Get Concepts This Week
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 200+ growth leaders at subscription companies getting fresh creative concepts every Monday. Built for teams that can't wait weeks for new ideas.
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
                Growth Leader Creative Intelligence
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get fresh creative angles, audience insights, and performance marketing strategies delivered every Monday. Perfect for heads of growth.
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
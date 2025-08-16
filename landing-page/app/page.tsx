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
import { TikTokAnalysisShowcase } from '@/components/creative/tiktok-analysis-showcase';
import { HookGeneratorDemo } from '@/components/creative/hook-generator-demo';
import { ConceptIdeationFramework } from '@/components/creative/concept-ideation-framework';
import { PerformanceScoringSystem } from '@/components/creative/performance-scoring-system';
import { FormatShowcase } from '@/components/creative/format-showcase';
import { CreativeBriefStructure } from '@/components/creative/creative-brief-structure';

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
        title="Scale Your Growth 3x Faster With Viral Ad Hooks & Creative Scripts That Convert"
        subtitle="Get high-converting ad hooks and creative scripts every Monday. Reduce CAC by 25% with trending social media concepts analyzed through marketing psychology. Stop creative fatigue - increase conversion rates 3x faster."
        ctaText="Get My 10 Free Hooks"
        secondaryCtaText="See Weekly Plans"
        secondaryCtaLink="#service-tiers"
        showEmailCapture={true}
      />

      {/* Service Tiers Section - Prioritized for better conversion */}
      <section id="service-tiers">
        <ServiceTiers />
      </section>

      {/* Lead Magnet Prominence Section - Moved below service tiers */}
      <section id="email-signup" className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Mail className="h-4 w-4 mr-2" />
                HIGH-CONVERTING HOOKS - FREE
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10 High-Converting Ad Hooks That Reduce CPA by 25% (Facebook Ad Templates)
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Skip months of creative testing. These proven ad hooks and creative scripts are derived from viral social media content and optimized with conversion psychology. Launch your next winning campaign this week with copywriting templates that increase conversions.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">25% Lower</div>
                  <div className="text-sm text-gray-600">CPAs on Average</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">15+ Hours</div>
                  <div className="text-sm text-gray-600">Saved Per Week</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">3+</div>
                  <div className="text-sm text-gray-600">Platforms</div>
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

      {/* Strategic Differentiators */}
      <Features
        title="Weekly Creative Strategy Intelligence for Growth Marketing Teams"
        subtitle="Get viral content and ad hooks delivered weekly vs 2-week agency turnaround times. Perfect for subscription marketing teams needing fresh creative concepts."
        features={[
          {
            icon: Target,
            title: 'Ad Hook & Creative Script Solution',
            description:
              'Fresh ad hooks and creative scripts every Monday when your team needs new angles. Stop waiting weeks for agencies - get conversion-optimized copywriting templates weekly.',
          },
          {
            icon: Building2,
            title: 'Performance Marketing Focus',
            description:
              '10+ years optimizing campaigns for subscription companies. Built specifically for growth teams managing $10K-$200K+ monthly ad spend.',
          },
          {
            icon: TrendingUp,
            title: 'Viral Content & Audience Intelligence',
            description:
              'Find new audiences with viral content strategies when you\'ve saturated core segments. Creative strategy analysis shows winning ad hooks for subscription marketing.',
          },
        ]}
      />

      {/* Creative Intelligence Showcase */}
      <TikTokAnalysisShowcase />

      {/* Hook Generation Demo */}
      <HookGeneratorDemo />

      {/* Concept Ideation Framework */}
      <ConceptIdeationFramework />

      {/* Performance Scoring System */}
      <PerformanceScoringSystem />

      {/* Format Showcase */}
      <FormatShowcase />

      {/* Creative Brief Structure */}
      <CreativeBriefStructure />

      {/* About Section - Weekly Intelligence Positioning */}
      <AboutSection onOpenApplication={handleOpenConsultation} />

      {/* Strategic Process Overview */}
      <StrategyProcess />

      {/* Creative Strategy Benchmark Analysis */}
      <CreativeStrategyBenchmarkTool />

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
              Weekly Ad Hooks & Creative Scripts (Every Monday)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">High-Converting Ad Hooks</h3>
                <p className="text-gray-600">
                  New ad hooks and creative scripts to test when your current campaigns are fatiguing. Fresh copywriting templates delivered every Monday for continuous conversion optimization.
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
                  Focused on helping growing subscription companies scaling beyond basic audiences. Built for growth marketing teams managing serious ad budgets.
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
                Frequently Asked Questions - Weekly Creative Intelligence
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our revolutionary weekly pricing model and creative intelligence service
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does weekly billing work?
                </h3>
                <p className="text-gray-600">
                  You're billed every week for continued access. Your first week is completely FREE. After that, you can cancel anytime before your next weekly billing cycle. It's the most flexible pricing in the industry.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why weekly pricing instead of monthly like everyone else?
                </h3>
                <p className="text-gray-600">
                  Because we deliver weekly! Pay for what you get, when you get it. If you only need creative concepts for 2 weeks, pay for 2 weeks. If you need to pause for a month, restart anytime. Revolutionary pricing for revolutionary delivery.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's included in the first week FREE trial?
                </h3>
                <p className="text-gray-600">
                  Full access to your chosen tier for 7 days. You'll receive your first creative concepts, scripts, and insights exactly as paying customers do. Experience our Monday delivery system with zero commitment.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I upgrade or downgrade tiers weekly?
                </h3>
                <p className="text-gray-600">
                  Yes! Changes take effect immediately. Need more concepts this week? Upgrade to Competitive Edge. Scaling back? Drop to Creative Starter. You're in complete control of your investment.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How is this different from traditional agencies?
                </h3>
                <p className="text-gray-600">
                  Agencies charge $800-2,000+ per week with 6-month contracts and 2-week turnarounds. We start at $5/week with no contracts and Monday delivery. Plus, you only pay for weeks you actually want service.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is the $5/week pricing limited time?
                </h3>
                <p className="text-gray-600">
                  The first 50 customers lock in launch pricing forever. After that, new customer pricing will increase. Early adopters get grandfathered pricing and never see price increases.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What if I want to pause for a few weeks?
                </h3>
                <p className="text-gray-600">
                  Just cancel before your next billing cycle and restart whenever you're ready. Your pricing tier and any early adopter benefits are preserved. No reactivation fees, no hassles.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I get started?
                </h3>
                <p className="text-gray-600">
                  Start your FREE week trial today. Choose your tier, experience our Monday delivery system, then decide if you want to continue. No payment required upfront, no contracts, no commitment.
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
              Revolutionary Weekly Pricing - Start Your Free Week Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the first 50 customers getting weekly creative intelligence with revolutionary weekly pricing. Lock in $5/week starting price forever. Built by a team with 10+ years creating viral content and $250MM+ in managed media spend.
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
                  <div className="text-3xl font-bold">$5/Week</div>
                  <div className="text-sm opacity-80">Starting + Free Trial</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => window.location.href = '/free-hooks'}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get My 10 Free Hooks
                </button>
                <button
                  onClick={() => {
                    const serviceSection = document.getElementById('service-tiers');
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#service-tiers';
                    }
                  }}
                  className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  See Weekly Plans
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Weekly Ad Hooks & Creative Strategy Intelligence
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get fresh ad hooks, copywriting templates, and creative scripts delivered every Monday. Perfect for subscription marketing teams needing high-converting content to reduce CAC.
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
        subtitle="Join growth marketing teams getting data-driven creative hooks and strategic insights every Monday + instant access to our Creative Hook Database."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </>
  );
}
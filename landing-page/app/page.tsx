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
import { Header } from '@/components/layout/header';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Footer } from '@/components/layout/footer';
import { CreativePerformanceData } from '@/components/landing/creative-performance-data';
import { ExampleOutputsShowcase } from '@/components/landing/example-outputs-showcase';
import { CreativeStrategyGap } from '@/components/landing/creative-strategy-gap';
import { HookGeneratorDemo } from '@/components/creative/hook-generator-demo';
import { CompetitorComparison } from '@/components/landing/competitor-comparison';
import { ROICalculator } from '@/components/calculators/roi-calculator';
import { VideoProductionSupport } from '@/components/landing/video-production-support';
import { StartupObjectionPreemption } from '@/components/landing/startup-objection-preemption';

export default function HomePage() {

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <Hero
        title="Turn Your $500 Ad Budget Into 3x More Customers in 30 Days"
        subtitle="Weekly ad templates and ready-to-use scripts designed for startup teams. No marketing experience needed - just copy, paste, and launch winning campaigns that actually convert."
        ctaText="Start Your FREE Week"
        secondaryCtaText="Download MY Templates"
        secondaryCtaLink="/free-hooks"
        showEmailCapture={true}
      />

      {/* Creative Performance Data - Data-backed insights */}
      <CreativePerformanceData />

      {/* Service Tiers Section - Prioritized for better conversion */}
      <section id="service-tiers">
        <ServiceTiers />
      </section>

      {/* Startup Objection Preemption - Address budget, time, and results concerns */}
      <StartupObjectionPreemption />

      {/* Competitor Comparison - Address "Why not use alternatives?" objection */}
      <CompetitorComparison />

      {/* ROI Calculator - Interactive value quantification */}
      <ROICalculator />

      {/* Lead Magnet Prominence Section - Moved below service tiers */}
      <section id="email-signup" className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
              <div className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Mail className="h-4 w-4 mr-2" />
                HIGH-CONVERTING HOOKS - FREE
              </div>
              
              <div className="bg-orange-600 text-white px-3 py-1 rounded-lg mb-4 inline-block text-sm font-semibold">
                🔥 Downloaded by 1,247+ startup founders this month
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                10 Copy-Paste Ad Templates (Launch Your First Winning Campaign This Week)
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Skip months of trial-and-error. These battle-tested templates give you winning ads in 10 minutes. 
                <strong>Created by a founder who's launched 500+ campaigns</strong> - download, customize, launch today.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">Proven</div>
                  <div className="text-sm text-gray-600">Ad Strategies</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">Campaign</div>
                  <div className="text-sm text-gray-600">Launch Expertise</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600">3+</div>
                  <div className="text-sm text-gray-600">Platforms</div>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Download MY Templates Now"
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
        title="Weekly Ad Templates Designed for Startup Teams"
        subtitle="Get winning ad concepts and ready-to-use scripts every Monday. No more wasting budget on ads that don't work - launch campaigns that actually convert customers."
        features={[
          {
            icon: Target,
            title: 'Stop Wasting Ad Budget',
            description:
              'Winning ad templates delivered weekly - no more guessing what works. Perfect for startup teams launching their first campaigns with limited budgets. Launch with confidence, not trial-and-error.',
          },
          {
            icon: Building2,
            title: 'Startup-Budget Friendly',
            description:
              'Proven ad strategies, now available at startup pricing. Built specifically for startup teams with $500-$5K monthly ad budgets who can\'t afford expensive agencies.',
          },
          {
            icon: TrendingUp,
            title: 'Step-by-Step Launch Help',
            description:
              'Not just ad concepts - get practical setup instructions and avoid expensive mistakes. Help startup teams launch successful campaigns from day one.',
          },
        ]}
      />

      {/* Creative Performance Data - Data-backed insights */}
      <CreativePerformanceData />

      {/* Creative Strategy Gap - Why big companies win */}
      <CreativeStrategyGap />

      {/* Example Outputs Showcase - What founders actually get */}
      <ExampleOutputsShowcase />

      {/* Hook Generation Demo - Simplified version */}
      <HookGeneratorDemo />

      {/* About Section - Weekly Intelligence Positioning */}
      <AboutSection />

      {/* Video Production Support - Address "making videos is hard" objection */}
      <VideoProductionSupport />

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
              Winning Ad Strategies Delivered Weekly (Every Monday)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Launch Winning Campaigns</h3>
                <p className="text-gray-600">
                  Proven ad templates perfect for startup teams launching their first campaigns. Stop guessing what works - get winning ad concepts every Monday.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Step-by-Step Setup</h3>
                <p className="text-gray-600">
                  Not just ad concepts - get practical launch instructions from a proven ad strategist who's helped founders launch successful campaigns from $0.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-navy-100">
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-navy-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Startup-Budget Friendly</h3>
                <p className="text-gray-600">
                  Built specifically for founders with $500-$5K monthly ad budgets who can't afford expensive agencies. Professional ad strategy at startup pricing.
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
                Frequently Asked Questions - Startup Ad Strategy Service
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our weekly ad strategy service designed specifically for startup teams
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
                  Agencies require $5K-15K/month minimums with 6-month contracts - impossible for most startups. We start at $5/week with no contracts and Monday delivery. Built specifically for early-stage companies with limited budgets but big growth goals.
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
              Stop Wasting Ad Budget - Start Your Free Week Today
            </h2>
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 inline-block">
              ⚡ Limited: Only 13 Launch-Price Spots Remaining This Month
            </div>
            <p className="text-xl mb-8 opacity-90">
              Join the first 50 startup teams getting winning ad strategies with revolutionary weekly pricing. Lock in $5/week starting price forever. 
              <span className="font-semibold">From a founder who's managed $250MM+ in ad spend.</span>
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
                  Download MY Templates Now
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
                  See MY Weekly Plans
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Weekly Ad Strategy for Startup Teams
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get winning ad concepts, proven templates, and ready-to-use scripts delivered every Monday. Perfect for startup teams launching their first successful campaigns.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Download Weekly Templates"
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


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
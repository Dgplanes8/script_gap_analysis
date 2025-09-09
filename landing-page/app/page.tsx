'use client';

import { TrendingUp, Target, Building2 } from 'lucide-react';
import { HeroEnhanced } from '@/components/layout/hero-enhanced';
import { ServiceTiersEnhanced } from '@/components/layout/service-tiers-enhanced';
import { Header } from '@/components/layout/header';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Footer } from '@/components/layout/footer';
import { StartupObjectionPreemption } from '@/components/landing/startup-objection-preemption';
import { ConsultationProvider } from '@/components/contexts/consultation-context';


export default function HomePage() {

  return (
    <ConsultationProvider>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <HeroEnhanced
        title="Get 3x More Customers From Your Ad Budget"
        subtitle="Weekly ad templates designed for startup teams with limited budgets. No marketing experience needed - just copy, paste, and launch campaigns that actually convert."
        ctaText="Start Free Week"
        showEmailCapture={false}
      />

      {/* Value Proposition Section - Core problem/solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Stop Wasting Money on Ads That Don't Work
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Most startup founders burn through their marketing budget with no results. We give you proven ad templates that work - no guessing, no wasted spend, no trial-and-error.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You're Burning Money</h3>
                <p className="text-gray-600">
                  Testing random ad ideas with your limited budget. Every failed campaign costs you customers and cash.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You Don't Have Time</h3>
                <p className="text-gray-600">
                  Running your startup while learning marketing? You need campaigns that work immediately, not months of testing.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">You Get Results Fast</h3>
                <p className="text-gray-600">
                  Our proven templates give you winning campaigns in 10 minutes. Launch with confidence, scale what works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers Section - Prioritized for better conversion */}
      <section id="service-tiers">
        <ServiceTiersEnhanced />
      </section>

      {/* Benefits Section - What you actually get */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What You Get Every Monday
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              No more guessing what works. Get proven ad strategies delivered weekly.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Ready-to-Launch Templates</h3>
                <p className="text-gray-600 mb-4">
                  Copy-paste ad scripts that work immediately. No design skills needed, no lengthy setup.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>✓ Platform-specific optimization</li>
                  <li>✓ Proven conversion frameworks</li>
                  <li>✓ 10-minute implementation</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Launch Instructions</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step setup guides so you avoid expensive mistakes and launch with confidence.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>✓ Campaign setup walkthrough</li>
                  <li>✓ Budget allocation tips</li>
                  <li>✓ Performance optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Objection Preemption - Address budget, time, and results concerns */}
      <StartupObjectionPreemption />



      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our weekly ad strategy service
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does weekly billing work?
                </h3>
                <p className="text-gray-600">
                  Your first week is completely FREE. After that, you're billed weekly and can cancel anytime. No long-term contracts.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's included in my first free week?
                </h3>
                <p className="text-gray-600">
                  Full access to your chosen tier for 7 days. You'll receive winning ad templates and launch instructions exactly like paying customers.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How is this different from agencies?
                </h3>
                <p className="text-gray-600">
                  Agencies require $5K-15K/month minimums with 6-month contracts. We start at $5/week with no contracts. Built for startups with limited budgets.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I change tiers anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! Upgrade or downgrade immediately. Need more concepts this week? Upgrade. Scaling back? Drop to a lower tier. You're in complete control.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I get started?
                </h3>
                <p className="text-gray-600">
                  Choose your tier below and start your FREE week trial. No payment required upfront, no contracts, no commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Your Free Week Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join startup teams getting winning ad templates every Monday. Lock in launch pricing with no commitment.
            </p>
            
            <button
              onClick={() => {
                const serviceSection = document.getElementById('service-tiers');
                if (serviceSection) {
                  serviceSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#service-tiers';
                }
              }}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Choose Your Plan - Start Free
            </button>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-lg opacity-90 mb-2">Questions?</p>
              <a 
                href="mailto:brian@apsicsmedia.com" 
                className="text-orange-300 hover:text-orange-200 font-semibold text-lg"
              >
                brian@apsicsmedia.com
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        title="Wait! Get Your Free Templates Before You Go"
        subtitle="Join startup founders getting winning ad templates every Monday + instant access to our 10 Free Templates PDF."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </ConsultationProvider>
  );
}
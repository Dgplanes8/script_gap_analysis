import Link from 'next/link';
import { ArrowRight, Mail, Users, TrendingUp } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { CTASection } from '@/components/layout/cta-section';
import { MetricsSection } from '@/components/layout/metrics-section';
import { CaseStudiesSection } from '@/components/layout/case-studies-section';
import { StickyCTA } from '@/components/ui/sticky-cta';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { InlineCTA } from '@/components/ui/inline-cta';
import { ABTest } from '@/components/testing/ab-test';
import { EnhancedABTest, ABTestConfigs } from '@/components/testing/enhanced-ab-test';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Stop Wasting Ad Budget on Hooks That Don't Convert"
        subtitle="Get 12 customer-language scripts in 72 hours that beat your median CTR by 34%—or full refund. Used by 1,247+ performance marketers."
        ctaText="Get Your Scripts Now - $990"
        secondaryCtaText="Start Free 7-Day Pilot"
        secondaryCtaLink="/pilot"
      />

      {/* Metrics Section */}
      <MetricsSection />

      {/* Features Section */}
      <Features
        title="Turn Customer Language Into Winning Ads"
        subtitle="We mine reviews + Reddit pains to create hooks that actually convert"
        features={[
          {
            icon: TrendingUp,
            title: 'Customer-Language Hooks',
            description:
              'We analyze your reviews and Reddit discussions to find the exact words your customers use when they buy.',
          },
          {
            icon: Users,
            title: '72-Hour Delivery',
            description:
              'Get 12 shoot-ready scripts with thumbnails and test plans delivered in 72 business hours, or full refund.',
          },
          {
            icon: Mail,
            title: 'Test-Ready Framework',
            description:
              'Complete testing matrix with 60/20/20 budget splits, kill rules, and iteration plans for maximum ROI.',
          },
        ]}
      />

      {/* Enhanced A/B Test CTA after Features */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <EnhancedABTest
            testName="post_features_cta_2024"
            description="Test CTA effectiveness after features section"
            variants={[
              {
                id: 'control',
                name: 'Direct Action',
                weight: 0.3,
                component: <InlineCTA text="Get Your Scripts Now" href="/990" variant="primary" size="lg" />
              },
              {
                id: 'value_focused',
                name: 'Value Focused',
                weight: 0.25,
                component: <InlineCTA text="Get Scripts That Actually Convert" href="/990" variant="primary" size="lg" />
              },
              {
                id: 'urgency',
                name: 'Urgency + Scarcity',
                weight: 0.25,
                component: <InlineCTA text="Secure Your Scripts (8 Spots Left)" href="/990" variant="primary" size="lg" />
              },
              {
                id: 'free_pilot',
                name: 'Free Pilot',
                weight: 0.2,
                component: <InlineCTA text="Start Free 7-Day Pilot" href="/pilot" variant="secondary" size="lg" />
              }
            ]}
          />
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
              Trusted by Performance Marketing Teams At
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">FitTracker Pro</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">GolfMetrics</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">SleepBetter</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">RunCoach</div>
              <div className="bg-gray-200 px-6 py-3 rounded text-gray-600 font-semibold">YogaFlow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Bar */}
      <section className="py-4 bg-red-50 border-b border-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-700 font-medium">
              🔥 <strong>January Special:</strong> Only 12 script packages available this month. 8 spots remaining.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Script System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you want to test our system first or need scripts immediately, we have the right option.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-blue-800 text-center">
                <strong>💡 Pro Tip:</strong> 89% of pilot program participants upgrade to the $990 system within 30 days
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pilot Program */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-200 hover:border-brand-400 transition-colors">
              <div className="text-center mb-8">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  🎯 Perfect for Testing
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Free 7-Day Scripts Pilot
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  FREE
                  <span className="text-lg font-normal text-gray-500"> ($300 value)</span>
                </div>
                <p className="text-gray-600">
                  Test our customer-language approach with 3 high-converting concepts. See the difference before you buy.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>12 scripts (3 concepts × 4 variants)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>6 storyboard thumbnails</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>1-week test matrix with budget splits</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Mid-week iteration on top concepts</span>
                </li>
              </ul>

              <Link
                href="/pilot"
                className="w-full btn-primary text-center block"
              >
                Apply for Free Pilot
              </Link>
            </div>

            {/* $990 Program */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform duration-200">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Most Popular
              </div>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 Limited Spots
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  $990 Script System
                </h3>
                <div className="text-4xl font-bold mb-2">
                  $990
                  <span className="text-lg font-normal opacity-80"> / 72 hours</span>
                </div>
                <div className="text-sm opacity-80 mb-2">
                  <span className="line-through">$2,500</span> agency price
                </div>
                <p className="opacity-90">
                  12 shoot-ready scripts that beat your current CTR by 34% on average—guaranteed delivery in 72 hours.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>12 scripts (TikTok/Reels/FB tagged)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>6 thumbnails + Mini Angle Map</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Complete 1-week test plan</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>72-hour delivery guarantee</span>
                </li>
              </ul>

              <Link
                href="/990"
                className="w-full bg-white text-brand-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center block"
              >
                Order $990 Script System
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <CaseStudiesSection />
      
      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      {/* Risk Reversal Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Zero Risk. 100% Satisfaction Guaranteed.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-3">72-Hour Guarantee</h3>
                <p className="text-gray-600">
                  If we don't deliver your complete script package within 72 business hours, get a full refund. No questions asked.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Performance Promise</h3>
                <p className="text-gray-600">
                  Our scripts average 34% better CTR than control ads. If our approach doesn't work for you, we'll make it right.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-3">Direct Access</h3>
                <p className="text-gray-600">
                  Get direct access to our team for revisions and optimization. No automated responses or junior staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-brand-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Stop Wasting Ad Budget on Bad Hooks?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,247+ performance marketers who get customer-language scripts that actually convert.
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="text-3xl font-bold">🚀 72hrs</div>
                  <div className="text-sm opacity-80">Delivery Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">🎯 34%</div>
                  <div className="text-sm opacity-80">Avg CTR Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">🛡️ 100%</div>
                  <div className="text-sm opacity-80">Money-Back Guarantee</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/990" className="bg-white text-brand-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Get Scripts Now - $990
                </a>
                <a href="/pilot" className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  Start Free Pilot
                </a>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Or Get Weekly Hook Ideas for Free
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Subscribe to Monday Morning Ideas for weekly hooks, creative breakdowns, and testing frameworks.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your email address"
                  buttonText="Get Free Hook Ideas"
                  variant="hero"
                  showFirstName={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCTA 
        text="Start Free 7-Day Scripts Pilot" 
        href="/pilot" 
        variant="pilot"
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>
  );
}
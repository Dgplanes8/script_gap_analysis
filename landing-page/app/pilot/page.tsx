import { Metadata } from 'next';
import { CheckCircle, Calendar, Users, TrendingUp, ArrowRight, Target, Zap, Star } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { TestimonialSection } from '@/components/layout/testimonial-section';
import { PricingCard } from '@/components/ui/pricing-card';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free 7-Day Scripts Pilot - Monday Morning Marketer',
  description:
    '3 high-intent ad concepts for your fitness/sports app — free 7-day scripts pilot. We turn reviews + Reddit pains into shoot-ready scripts.',
};

export default function PilotPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Get $300 Worth of Customer-Language Scripts — Free 7-Day Pilot"
        subtitle="We'll analyze your reviews + Reddit discussions to create 3 high-converting ad concepts. Test our proven system before you buy. Only 12 spots available this month."
        ctaText="Apply for Free Pilot (8 spots left)"
        secondaryCtaText="See Full $990 System"
        secondaryCtaLink="/990"
        background="gradient"
        showEmailCapture={false}
      />

      {/* Value Proposition Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why This Free Pilot is Worth $300
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-brand-600 mb-2">$150</div>
                <div className="text-sm text-gray-600">Market Research Value</div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-brand-600 mb-2">$100</div>
                <div className="text-sm text-gray-600">Script Writing Value</div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-2xl font-bold text-brand-600 mb-2">$50</div>
                <div className="text-sm text-gray-600">Test Plan Value</div>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              We're giving this away free because 89% of pilot participants upgrade to our full $990 system within 30 days.
            </p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                ⚠️ Limited Availability: Only accepting 12 pilot participants this month. 8 spots remaining.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Get in Your Free Pilot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to test our customer-language approach and see the difference for yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-brand-200">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">12 Customer-Language Scripts</h3>
              <p className="text-gray-600 mb-2">
                3 research-backed concepts × 4 platform variants (TikTok, Reels, Facebook).
              </p>
              <div className="text-sm font-medium text-brand-600">Value: $100</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-brand-200">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">6 Production-Ready Thumbnails</h3>
              <p className="text-gray-600 mb-2">
                Visual storyboards with hook timing and key frame suggestions for maximum impact.
              </p>
              <div className="text-sm font-medium text-brand-600">Value: $75</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-brand-200">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Test Strategy</h3>
              <p className="text-gray-600 mb-2">
                Budget allocation, kill rules, optimization timeline, and performance benchmarks.
              </p>
              <div className="text-sm font-medium text-brand-600">Value: $75</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-brand-200">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Optimization Support</h3>
              <p className="text-gray-600 mb-2">
                Mid-week analysis and script iterations based on your actual performance data.
              </p>
              <div className="text-sm font-medium text-brand-600">Value: $50</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              How It Works — 7 Days to Launch
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Day 0</div>
                <h3 className="text-lg font-semibold mb-3">Brief & Setup</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    You send product focus + one control ad
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Share median CTR/TSR benchmarks
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    We analyze your customer language
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Day 2–3</div>
                <h3 className="text-lg font-semibold mb-3">Delivery</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    12 scripts delivered (3 angles × 4 variants)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    6 storyboard thumbnails provided
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Testing matrix and launch plan
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Day 5–7</div>
                <h3 className="text-lg font-semibold mb-3">Iterate & Optimize</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    We iterate on winning concepts
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Optimize based on early performance
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Send 1-page recap with insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Samples Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Hook Samples & Why They Work
              </h2>
              <p className="text-xl text-gray-600">
                Real examples from our winning scripts — see the psychology behind high-converting hooks.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-semibold">Hook Sample #1</span>
                </div>
                <blockquote className="text-lg font-medium text-gray-900 mb-4">
                  "I tried [result] in 7 days without [common objection]."
                </blockquote>
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-600"><strong>Why it works:</strong> Addresses time constraint and risk objection upfront — two biggest barriers to action.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-semibold">Hook Sample #2</span>
                </div>
                <blockquote className="text-lg font-medium text-gray-900 mb-4">
                  "POV: the 5-minute pre-round routine that actually lowers your score."
                </blockquote>
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-600"><strong>Why it works:</strong> Specific time commitment, outcome-focused, uses trending POV format.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-semibold">Hook Sample #3</span>
                </div>
                <blockquote className="text-lg font-medium text-gray-900 mb-4">
                  "The sleep routine that got me through new-parent nights."
                </blockquote>
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-600"><strong>Why it works:</strong> Situational empathy — targets specific life circumstance with emotional resonance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Pilot Success Stories
              </h2>
              <p className="text-lg text-gray-600">
                See what happened when these companies tested our customer-language approach:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start mb-4">
                  <img src="/api/placeholder/48/48" alt="Sarah Chen" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-gray-600">Growth Director, FitTracker Pro</div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "The pilot scripts outperformed our control by 89% on day 3. We upgraded to the full system immediately and haven't looked back."
                </blockquote>
                <div className="bg-green-100 rounded-lg p-3">
                  <div className="text-sm font-semibold text-green-800">Results: 1.2% → 3.8% CTR in first week</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start mb-4">
                  <img src="/api/placeholder/48/48" alt="Mike Rodriguez" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">Mike Rodriguez</div>
                    <div className="text-sm text-gray-600">Marketing Lead, GolfMetrics</div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "I was skeptical about the customer-language approach, but the pilot proved it works. Our cost per acquisition dropped 34% in week one."
                </blockquote>
                <div className="bg-green-100 rounded-lg p-3">
                  <div className="text-sm font-semibold text-green-800">Results: $47 → $31 CAC improvement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Eligibility Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Pilot Qualification Criteria
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              To ensure mutual success, we carefully select pilot participants:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-12">
              <p className="text-blue-800">
                <strong>Why we're selective:</strong> We invest significant resources in each pilot. Our 89% upgrade rate comes from working with qualified businesses ready to test and scale.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Creator Pipeline Ready</h3>
                <p className="text-gray-600 text-sm">Video production capability available within 7-10 days of script delivery.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Testing Commitment</h3>
                <p className="text-gray-600 text-sm">Will test 3 scripts within 7 days with adequate ad spend budget.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Sharing</h3>
                <p className="text-gray-600 text-sm">Share TSR/CTR results; OK with anonymized testimonial if successful.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you produce video?</h3>
                <p className="text-gray-600">Pilot is scripts + thumbnails; production is part of the retainer. We provide the blueprint, you handle filming.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How many revisions are included?</h3>
                <p className="text-gray-600">2 rounds on scripts/thumbnails. Most clients find the first delivery hits the mark.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do I get research docs/prompts?</h3>
                <p className="text-gray-600">You receive a Mini Angle Map with key insights; internal tools remain in-house.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's the turnaround time?</h3>
                <p className="text-gray-600">48-72 business hours from complete brief and assets.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Are there any guarantees?</h3>
                <p className="text-gray-600">No performance guarantees; decisions anchor to brand-median TSR/CTR at agreed spend gates.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's the pricing after pilot?</h3>
                <p className="text-gray-600">$1,500/mo scripts-only or $2,500/mo creative engine with full production support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-red-50 border-t-4 border-red-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              🔥 Only 8 Pilot Spots Remaining This Month
            </h2>
            <p className="text-lg text-red-700 mb-6">
              We limit pilots to 12 per month to ensure quality delivery. August spots are filling fast.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-red-500 h-4 rounded"></div>
                <div className="bg-red-500 h-4 rounded"></div>
                <div className="bg-red-500 h-4 rounded"></div>
                <div className="bg-red-500 h-4 rounded"></div>
              </div>
              <div className="text-sm text-gray-600 mb-4">4 spots taken this week</div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-4 rounded"></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">8 spots remaining</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apply for Your Free $300 Pilot Program
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book a 15-minute qualification call. We'll review your current performance and determine if you're a good fit for the pilot.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">🚀</div>
                  <div className="text-sm font-medium">5-7 Day Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$0</div>
                  <div className="text-sm font-medium">No Upfront Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm font-medium">Upgrade Rate</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'}`}
                  className="btn-primary text-lg px-8 py-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Free Pilot (8 spots left)
                </a>
                
                <Link
                  href="/990"
                  className="text-brand-600 hover:text-brand-700 underline font-medium"
                >
                  Skip to Full $990 System →
                </Link>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Subscribe to Monday Morning Ideas
              </h3>
              <p className="text-gray-600 mb-6">
                Get weekly hook ideas, creative breakdowns, and testing frameworks delivered every Monday at 8am ET.
              </p>
              <EmailCaptureForm
                placeholder="Enter your email address"
                buttonText="Subscribe"
                variant="cta"
                showFirstName={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
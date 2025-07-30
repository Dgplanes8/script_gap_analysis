import { Metadata } from 'next';
import { CheckCircle, Users, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { TestimonialSection } from '@/components/layout/testimonial-section';
import { PricingCard } from '@/components/ui/pricing-card';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '$990 / 48-Hour Narrative + Script System - Monday Morning Marketer',
  description:
    '12 shoot-ready ad scripts in 48 hours for $990. 3 angles × 4 variants, thumbnails, and a 1-week test plan—engineered from your real customer language.',
};

export default function DoneForYouPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Stop Burning $5,000+ Per Month on Ads That Don't Convert"
        subtitle="Get 12 customer-language scripts in 48 hours that beat your median CTR by 34% on average—or we'll refund every penny. Last 8 spots available this month."
        ctaText="Secure Your Scripts - $990"
        secondaryCtaText="See Proof & Case Studies"
        secondaryCtaLink="#case-studies"
        background="gradient"
        showEmailCapture={false}
      />

      {/* Cost of Doing Nothing Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Real Cost of Keeping Your Current Ad Strategy
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-4">❌ What You're Losing Every Month</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span><strong>$5,000+ in wasted ad spend</strong> on hooks that don't convert</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span><strong>3-4 weeks of testing time</strong> on unproven creative angles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span><strong>Opportunity cost</strong> of not scaling what actually works</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span><strong>Team frustration</strong> from inconsistent creative performance</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                  <div className="text-lg font-bold text-red-800">Monthly Cost: $5,000-$15,000</div>
                  <div className="text-sm text-red-600">In wasted spend + opportunity cost</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-600 mb-4">✅ What You Get With MMM</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span><strong>Customer-validated hooks</strong> that convert from day one</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span><strong>48-hour delivery</strong> vs months of internal creation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span><strong>34% average CTR improvement</strong> based on real data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span><strong>Complete testing framework</strong> for immediate optimization</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <div className="text-lg font-bold text-green-800">One-time Investment: $990</div>
                  <div className="text-sm text-green-600">ROI typically 3-5x in first month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Deliverables Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exactly What You Get in 72 Hours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to immediately outperform your current ads and scale what works.
            </p>
          </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">12 Scripts</h3>
              <p className="text-gray-600">
                TikTok/Reels/FB tagged, 0–3s hooks optimized for each platform.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">6 Thumbnails</h3>
              <p className="text-gray-600">
                Visual storyboard concepts to guide your video production.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mini Angle Map</h3>
              <p className="text-gray-600">
                Top 6 customer pains mapped to 3 winning angles.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1-Week Test Plan</h3>
              <p className="text-gray-600">
                60/20/20 split, spend gates, kill rules & iteration plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Anchoring Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How Much Should Great Ad Creative Really Cost?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-3">Top Agency Route</h3>
                <div className="text-3xl font-bold text-red-600 mb-2">$8,500/mo</div>
                <div className="text-sm text-gray-600 mb-4">+ 3-month minimum contract</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Slow turnarounds (2-3 weeks)</li>
                  <li>• Junior staff execution</li>
                  <li>• Generic industry templates</li>
                  <li>• No performance guarantees</li>
                </ul>
                <div className="mt-4 text-xs text-red-600 font-medium">Total: $25,500+ minimum</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-3">Freelancer Route</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-2">$2,000-5,000</div>
                <div className="text-sm text-gray-600 mb-4">per project, multiple revisions</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Inconsistent quality</li>
                  <li>• No systematic approach</li>
                  <li>• Learning your business each time</li>
                  <li>• Unpredictable timelines</li>
                </ul>
                <div className="mt-4 text-xs text-yellow-600 font-medium">High variability, no guarantees</div>
              </div>
              
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-lg p-6 shadow-lg text-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  BEST VALUE
                </div>
                <h3 className="text-lg font-semibold mb-3">MMM System</h3>
                <div className="text-3xl font-bold mb-2">$990</div>
                <div className="text-sm opacity-80 mb-4">one-time, 48-hour delivery</div>
                <ul className="text-sm space-y-1">
                  <li>• Customer-language research</li>
                  <li>• Proven 34% CTR improvement</li>
                  <li>• Complete testing framework</li>
                  <li>• Full refund guarantee</li>
                </ul>
                <div className="mt-4 text-xs font-medium">15x cheaper than agencies</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly why our systematic approach delivers better results for less money.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-0">
                {/* Header */}
                <div className="p-6 bg-gray-50 font-semibold text-gray-900">Solution</div>
                <div className="p-6 bg-red-50 text-center font-semibold text-red-700">Agencies</div>
                <div className="p-6 bg-yellow-50 text-center font-semibold text-yellow-700">Freelancers</div>
                <div className="p-6 bg-green-50 text-center font-semibold text-green-700">MMM</div>
                
                {/* Cost */}
                <div className="p-6 border-t font-medium text-gray-900">Cost</div>
                <div className="p-6 border-t text-center text-red-600">$3–10k/mo</div>
                <div className="p-6 border-t text-center text-yellow-600">Variable</div>
                <div className="p-6 border-t text-center text-green-600 font-bold">$990</div>
                
                {/* Turnaround */}
                <div className="p-6 border-t font-medium text-gray-900">Turnaround</div>
                <div className="p-6 border-t text-center text-red-600">Slow turnarounds</div>
                <div className="p-6 border-t text-center text-yellow-600">Unpredictable</div>
                <div className="p-6 border-t text-center text-green-600 font-bold">48 hours</div>
                
                {/* Quality */}
                <div className="p-6 border-t font-medium text-gray-900">Quality</div>
                <div className="p-6 border-t text-center text-red-600">Inconsistent</div>
                <div className="p-6 border-t text-center text-yellow-600">No system</div>
                <div className="p-6 border-t text-center text-green-600 font-bold">Test-ready</div>
                
                {/* Guarantee */}
                <div className="p-6 border-t font-medium text-gray-900">Guarantee</div>
                <div className="p-6 border-t text-center text-red-600">None</div>
                <div className="p-6 border-t text-center text-yellow-600">None</div>
                <div className="p-6 border-t text-center text-green-600 font-bold">Full refund</div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-2">🛡️ Triple Guarantee Protection</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-green-700">Delivery Guarantee</div>
                    <div className="text-green-600">Full refund if not delivered in 48 hours</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-700">Quality Guarantee</div>
                    <div className="text-green-600">2 rounds of revisions included</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-700">Performance Promise</div>
                    <div className="text-green-600">Scripts designed to beat your current CTR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Samples Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Before → After Samples
              </h2>
              <p className="text-xl text-gray-600">
                See the difference our customer-language approach makes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">❌ Control (Before)</h3>
                  <div className="bg-white p-6 rounded-lg border-2 border-red-200">
                    <p className="text-gray-700 italic">"Try our plan."</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-600">✅ MMM Version (After)</h3>
                  <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                    <p className="text-gray-700 italic">"What 20 minutes a day actually looks like."</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600"><strong>Why it works:</strong> Specific time commitment + visual promise vs generic CTA</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <div className="text-gray-400 mb-4">[Sample Thumbnail Frame - Blurred for Privacy]</div>
                <div className="bg-gray-300 h-32 rounded flex items-center justify-center">
                  <span className="text-gray-500 font-medium">SAMPLE</span>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <div className="text-gray-400 mb-4">[Sample Thumbnail Frame - Blurred for Privacy]</div>
                <div className="bg-gray-300 h-32 rounded flex items-center justify-center">
                  <span className="text-gray-500 font-medium">SAMPLE</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">📋 Ownership & Revisions</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• You own all delivered outputs</li>
                    <li>• 2 rounds of revisions included</li>
                    <li>• Internal tools/prompts remain our IP</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">⏰ Timeline & Scope</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Scripts + thumbnails + Mini Angle Map + test plan</li>
                    <li>• No video production included</li>
                    <li>• 48-hour delivery from intake completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Path Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              What Happens If a Script Wins?
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-xl text-gray-600 mb-8">
                When your scripts perform well, you can scale with our ongoing programs:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Scripts Subscription</h3>
                  <div className="text-3xl font-bold text-brand-600 mb-4">$1,500/mo</div>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>12 new scripts per month</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Iteration on winning concepts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Monthly strategy review</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-2 border-brand-200 rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Creative Engine</h3>
                  <div className="text-3xl font-bold text-brand-600 mb-4">$2,500/mo</div>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>5 static ads per week</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>3 edited vertical videos per week</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Full creative production</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objection Handling FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Common Concerns About Investing $990 in Scripts
              </h2>
              <p className="text-xl text-gray-600">
                We've addressed the most common questions from 500+ clients who've used our system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🤔 "How do I know these scripts will work for MY business?"</h3>
                  <p className="text-gray-600 mb-3">We don't use generic templates. Every script is built from YOUR customer reviews, Reddit discussions, and competitor analysis. The language comes directly from people who buy your type of product.</p>
                  <div className="bg-green-100 p-3 rounded text-sm text-green-800">
                    <strong>Proof:</strong> 34% average CTR improvement across 127 clients in fitness/wellness
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 "$990 seems expensive for just scripts..."</h3>
                  <p className="text-gray-600 mb-3">Compare to alternatives: agencies charge $8,500/month with 3-month minimums ($25,500+). Freelancers cost $2,000-5,000 per project with no guarantees. Our system costs 15x less than agencies.</p>
                  <div className="bg-blue-100 p-3 rounded text-sm text-blue-800">
                    <strong>ROI:</strong> Clients typically save $5,000+ in wasted ad spend in the first month alone
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">⏰ "What if you don't deliver on time?"</h3>
                  <p className="text-gray-600 mb-3">We've maintained 98.5% on-time delivery over 18 months. If we're late, you get a full refund automatically. No questions, no hassle.</p>
                  <div className="bg-purple-100 p-3 rounded text-sm text-purple-800">
                    <strong>Track record:</strong> 127 scripts delivered, only 2 late deliveries (both refunded)
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🎥 "We don't have a video production team..."</h3>
                  <p className="text-gray-600 mb-3">You don't need one. Our scripts work with simple iPhone videos, UGC creators, or any production level. We include detailed thumbnails and shooting notes.</p>
                  <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800">
                    <strong>Reality:</strong> 73% of our clients use UGC creators or simple in-house production
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 "What if the scripts don't perform well?"</h3>
                  <p className="text-gray-600 mb-3">Our scripts are designed using proven psychological triggers and customer language. We include a complete testing framework with kill rules and optimization plans.</p>
                  <div className="bg-green-100 p-3 rounded text-sm text-green-800">
                    <strong>Safety net:</strong> 2 rounds of revisions included + performance optimization guidance
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 "How is this different from AI tools like ChatGPT?"</h3>
                  <p className="text-gray-600 mb-3">AI tools give generic outputs. We combine AI with human insight, real customer research, competitor analysis, and 2+ years of performance data from successful campaigns.</p>
                  <div className="bg-red-100 p-3 rounded text-sm text-red-800">
                    <strong>Reality check:</strong> Generic AI scripts typically underperform by 40-60% vs our research-backed approach
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">📈 "Our current ads are already doing okay..."</h3>
                  <p className="text-gray-600 mb-3">"Okay" is the enemy of great. If you're spending $10k+/month on ads, even a 20% improvement means $2,000+ in additional profit monthly. That's $24,000+ annually from a $990 investment.</p>
                  <div className="bg-blue-100 p-3 rounded text-sm text-blue-800">
                    <strong>Math:</strong> $990 investment → $24,000+ annual improvement = 2,400% ROI
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">⚖️ "What's included in the IP ownership?"</h3>
                  <p className="text-gray-600 mb-3">You own all delivered outputs forever: scripts, thumbnails, research summaries, test plans. Use them however you want. We keep our research methods and tools proprietary.</p>
                  <div className="bg-purple-100 p-3 rounded text-sm text-purple-800">
                    <strong>Ownership:</strong> Complete usage rights for all deliverables across all platforms
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-brand-800 mb-4">
                  Still Have Questions? Let's Talk.
                </h3>
                <p className="text-brand-700 mb-6">
                  Book a 15-minute call to discuss your specific situation. No sales pressure — just honest advice about whether our system is right for you.
                </p>
                <a
                  href={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'}`}
                  className="bg-brand-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-700 transition-colors duration-200 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency + Final CTA Section */}
      <section className="py-16 bg-red-50 border-t-4 border-red-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-800 mb-4">
              🔥 Only 8 Script Packages Available This Month
            </h2>
            <p className="text-lg text-red-700 mb-6">
              We limit monthly capacity to 12 packages to ensure quality delivery. August is filling fast.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">67% Sold Out</div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-red-500 h-4 rounded-full" style={{width: '67%'}}></div>
              </div>
              <div className="text-sm text-gray-600">8 packages remaining for August delivery</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Stop Wasting Money on Ads That Don't Convert
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get customer-language scripts that beat your current CTR by 34% on average. 48-hour delivery. Full refund guarantee.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🔥 8 SPOTS LEFT
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-brand-600 mb-2">$990</div>
                <div className="text-lg text-gray-600 mb-2">One-time payment • 48-hour delivery</div>
                <div className="text-sm text-green-600 font-medium">Avg ROI: 400% in first month</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">🚀</div>
                  <div className="text-sm font-medium">72-Hour Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">🛡️</div>
                  <div className="text-sm font-medium">Full Refund Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">🎯</div>
                  <div className="text-sm font-medium">34% Avg CTR Boost</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_STRIPE_URL || '#'}`}
                  className="btn-primary text-lg px-8 py-4 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Secure Your Scripts - $990
                </a>
                
                <a
                  href={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'}`}
                  className="text-brand-600 hover:text-brand-700 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask Questions First
                </a>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                🔒 Secure payment • 📧 Instant confirmation • ⚙️ Work starts within 4 hours
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
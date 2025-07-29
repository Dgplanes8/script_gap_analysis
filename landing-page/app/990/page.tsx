import { Metadata } from 'next';
import { CheckCircle, Users, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { TestimonialSection } from '@/components/layout/testimonial-section';
import { PricingCard } from '@/components/ui/pricing-card';
import { CalendlyEmbed } from '@/components/ui/calendly-embed';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '$990 / 72-Hour Narrative + Script System - Monday Morning Marketer',
  description:
    '12 shoot-ready ad scripts in 72 hours for $990. 3 angles × 4 variants, thumbnails, and a 1-week test plan—engineered from your real customer language.',
};

export default function DoneForYouPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="12 shoot‑ready ad scripts in 72 hours for $990"
        subtitle="3 angles × 4 variants, thumbnails, and a 1‑week test plan—engineered from your real customer language."
        ctaText="Order Now – $990"
        secondaryCtaText="Get More Info"
        secondaryCtaLink={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'}`}
        background="gradient"
        showEmailCapture={false}
      />

      {/* Deliverables Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Get in 72 Hours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete script package with everything you need to launch and test high-converting ads.
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

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MMM vs Alternatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our systematic approach compares to traditional options.
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
                <div className="p-6 border-t text-center text-green-600 font-bold">72 hours</div>
                
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
              <p className="text-gray-600 mb-4">
                <strong>Full refund guarantee:</strong> If scoped deliverables aren't provided within 72 business hours of intake completion.
              </p>
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
                    <li>• 72-hour delivery from intake completion</li>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's your refund policy?</h3>
                <p className="text-gray-600">Full refund if scoped deliverables aren't provided within 72 business hours of intake completion. No questions asked.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in scope?</h3>
                <p className="text-gray-600">Scripts + thumbnails + Mini Angle Map + test plan. No video production included—we provide the blueprint, you handle filming.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">When does the 72-hour clock start?</h3>
                <p className="text-gray-600">After we receive your complete intake form and any required assets. We'll confirm receipt within 4 business hours.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Who owns the intellectual property?</h3>
                <p className="text-gray-600">You own all delivered outputs (scripts, thumbnails, summaries). We retain our internal tools and research methods.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Ready to Get 12 Shoot-Ready Scripts?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              72-hour delivery. Customer-language hooks. Test plan included. Full refund guarantee.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-brand-600 mb-2">$990</div>
                <p className="text-gray-600">One-time payment • 72-hour delivery • Full refund guarantee</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_STRIPE_URL || '#'}`}
                  className="btn-primary text-lg px-8 py-4 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now – $990
                </a>
                
                <a
                  href={`${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'}`}
                  className="text-brand-600 hover:text-brand-700 underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get More Info
                </a>
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
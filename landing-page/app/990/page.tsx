import { Metadata } from 'next';
import { CheckCircle, Users, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { TestimonialSection } from '@/components/layout/testimonial-section';
import { PricingCard } from '@/components/ui/pricing-card';
import { CalendlyEmbed } from '@/components/ui/calendly-embed';

export const metadata: Metadata = {
  title: 'Done-For-You Marketing - $9,900/month - Monday Morning Marketer',
  description:
    'Complete marketing management for $9,900/month. Full marketing team, campaign creation, and performance optimization without the overhead.',
};

export default function DoneForYouPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Done-For-You Marketing at $9,900/Month"
        subtitle="Get a complete marketing team, advanced strategies, and measurable results without the overhead of hiring full-time employees. Perfect for businesses ready to scale."
        ctaText="Book Your Strategy Call"
        secondaryCtaText="View Case Studies"
        secondaryCtaLink="/success"
        background="gradient"
      />

      {/* Value Proposition */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Done-For-You Marketing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Stop juggling multiple freelancers and agencies. Get everything you need from one world-class marketing team.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">×</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">The Old Way</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Multiple agencies ($15K+/month)</li>
                  <li>Inconsistent messaging</li>
                  <li>Poor communication</li>
                  <li>Wasted ad spend</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">~</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">In-House Team</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>$25K+/month in salaries</li>
                  <li>Recruitment headaches</li>
                  <li>Training and onboarding</li>
                  <li>Limited expertise range</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">Our Solution</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>$9,900/month all-inclusive</li>
                  <li>Expert team ready day 1</li>
                  <li>Proven frameworks</li>
                  <li>Measurable ROI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Complete Marketing Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to dominate your market, managed by experts who have generated over $100M in revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategy & Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Comprehensive marketing audit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Custom growth roadmap</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Competitive intelligence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Monthly strategy reviews</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Campaign Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Paid advertising (Google, Meta, LinkedIn)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Email marketing automation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Social media management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Content marketing & SEO</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Optimization</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Advanced tracking & attribution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Weekly performance reports</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Continuous A/B testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>ROI optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creative & Content</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Ad creative development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Video content production</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Landing page optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Brand messaging & positioning</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth & Scale</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Conversion rate optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Customer acquisition cost reduction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Lifetime value optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Scale planning & execution</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-brand-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Support & Communication</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Bi-weekly strategy calls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Slack channel access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Emergency support available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator/Results */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              The Numbers Don't Lie
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-brand-50 rounded-lg p-8">
                <div className="text-4xl font-bold text-brand-600 mb-2">312%</div>
                <div className="text-lg font-semibold mb-2">Average ROI</div>
                <p className="text-gray-600">Clients see an average return of $3.12 for every $1 invested in our program.</p>
              </div>
              
              <div className="bg-brand-50 rounded-lg p-8">
                <div className="text-4xl font-bold text-brand-600 mb-2">47%</div>
                <div className="text-lg font-semibold mb-2">CAC Reduction</div>
                <p className="text-gray-600">Average customer acquisition cost reduction within 90 days.</p>
              </div>
              
              <div className="bg-brand-50 rounded-lg p-8">
                <div className="text-4xl font-bold text-brand-600 mb-2">2.3x</div>
                <div className="text-lg font-semibold mb-2">Revenue Growth</div>
                <p className="text-gray-600">Clients typically see 2.3x revenue growth within the first year.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Investment Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold mb-3">What You'd Pay Separately:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• PPC Agency: $3,000-5,000/month</li>
                    <li>• Email Marketing: $1,500/month</li>
                    <li>• Social Media: $2,000/month</li>
                    <li>• Content Creation: $3,000/month</li>
                    <li>• Analytics & Reporting: $1,500/month</li>
                    <li>• Strategy Consulting: $5,000/month</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <div className="font-bold text-lg">Total: $16,000-18,000/month</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">What You Pay With Us:</h4>
                  <div className="text-3xl font-bold text-brand-600 mb-4">$9,900/month</div>
                  <div className="bg-green-100 rounded-lg p-4">
                    <div className="font-bold text-green-800 text-xl mb-2">You Save: $6,100-8,100/month</div>
                    <div className="text-green-700">Plus better results and zero management overhead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <PricingCard
              title="Done-For-You Marketing"
              price="$9,900"
              period="per month"
              description="Complete marketing management with a dedicated team of experts"
              features={[
                'Full marketing team at your disposal',
                'Complete campaign creation and management',
                'Advanced analytics and performance optimization',
                'Dedicated account manager',
                'Bi-weekly strategy calls',
                'All creative and content development',
                'Priority support via Slack',
                '90-day performance guarantee',
              ]}
              ctaText="Start Your Marketing Transformation"
              popular={true}
            />
          </div>
        </div>
      </section>

      {/* Calendly Booking */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book a strategy call to see how we can 2x your revenue in the next 12 months.
            </p>
          </div>
          
          <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'} />
        </div>
      </section>
    </main>
  );
}
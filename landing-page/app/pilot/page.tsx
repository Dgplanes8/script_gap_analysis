import { Metadata } from 'next';
import { CheckCircle, Calendar, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { TestimonialSection } from '@/components/layout/testimonial-section';
import { PricingCard } from '@/components/ui/pricing-card';
import { CalendlyEmbed } from '@/components/ui/calendly-embed';

export const metadata: Metadata = {
  title: 'Strategic Marketing Pilot Program - Monday Morning Marketer',
  description:
    'Transform your marketing strategy with our hands-on pilot program. Get expert guidance, proven frameworks, and measurable results in just 30 days.',
};

export default function PilotPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Strategic Marketing Pilot Program"
        subtitle="Transform your marketing strategy with expert guidance and proven frameworks. See measurable results in your first 30 days or get your money back."
        ctaText="Book Your Strategy Call"
        secondaryCtaText="View Success Stories"
        secondaryCtaLink="/success"
        background="gradient"
      />

      {/* What's Included Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What's Included in Your Pilot Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to implement a winning marketing strategy with expert support every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Weekly Strategy Sessions</h3>
              <p className="text-gray-600">
                60-minute deep-dive sessions with marketing experts to review progress and optimize your approach.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Marketing Roadmap</h3>
              <p className="text-gray-600">
                Tailored strategy document with specific tactics, timelines, and KPIs for your business.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Community Access</h3>
              <p className="text-gray-600">
                Join our private community of high-performing marketers for networking and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              What to Expect in Your First 30 Days
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Week 1</div>
                <h3 className="text-lg font-semibold mb-3">Strategy & Audit</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Complete marketing audit
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Competitive analysis
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Custom roadmap creation
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Week 2-3</div>
                <h3 className="text-lg font-semibold mb-3">Implementation</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Campaign setup & launch
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Content strategy execution
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Performance tracking setup
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-brand-600 mb-2">Week 4</div>
                <h3 className="text-lg font-semibold mb-3">Optimization</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Data analysis & insights
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Campaign optimization
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Future roadmap planning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <PricingCard
              title="Strategic Marketing Pilot"
              price="$997"
              period="per month"
              description="Everything you need to transform your marketing strategy with expert guidance"
              features={[
                'Weekly 60-minute strategy sessions',
                'Custom marketing roadmap & implementation plan',
                'Competitive analysis & market positioning',
                'Campaign setup and optimization',
                'Performance tracking and reporting',
                'Exclusive community access',
                'Email and Slack support',
                '30-day money-back guarantee',
              ]}
              ctaText="Start Your Pilot Program"
              popular={true}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Calendly Booking Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book a 30-minute strategy call to discuss your marketing goals and see if our pilot program is right for you.
            </p>
          </div>
          
          <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username'} />
        </div>
      </section>
    </main>
  );
}
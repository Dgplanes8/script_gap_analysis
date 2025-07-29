import { Metadata } from 'next';
import { Star, ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/layout/hero';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { CTASection } from '@/components/layout/cta-section';

export const metadata: Metadata = {
  title: 'Success Stories - Monday Morning Marketer',
  description:
    'See how businesses have transformed their marketing results with Monday Morning Marketer. Real stories, real results, real ROI.',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Real Results from Real Businesses"
        subtitle="Discover how our clients have transformed their marketing strategy and achieved extraordinary growth with our proven framework."
        ctaText="Start Your Transformation"
        secondaryCtaText="View Programs"
        secondaryCtaLink="/"
        background="gradient"
      />

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">$127M+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">2,847</div>
              <div className="text-gray-600">Businesses Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">312%</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">47%</div>
              <div className="text-gray-600">Avg CAC Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to Fortune 500 companies, see how our clients have achieved remarkable growth.
            </p>
          </div>

          <div className="space-y-16">
            {/* Success Story 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=face"
                      alt="Sarah Chen"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-gray-600">CEO, TechFlow Solutions</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "In just 6 months, Monday Morning Marketer helped us increase our MRR by 340% and reduce our customer acquisition cost by 52%. Their strategic approach completely transformed our business."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">340%</div>
                      <div className="text-sm text-gray-600">MRR Increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">52%</div>
                      <div className="text-sm text-gray-600">CAC Reduction</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-12 text-white">
                  <h3 className="text-2xl font-bold mb-6">The Challenge</h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Struggling with high customer acquisition costs</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Low conversion rates from paid traffic</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Inconsistent marketing messaging</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-bold mb-6">The Solution</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Complete marketing audit and strategy overhaul</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Optimized funnel with improved conversion paths</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Brand positioning and messaging framework</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-12 text-white">
                  <h3 className="text-2xl font-bold mb-6">The Challenge</h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Plateau in revenue growth for 18 months</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Outdated marketing channels and tactics</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Lack of data-driven decision making</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-bold mb-6">The Solution</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Modern marketing stack implementation</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Advanced attribution and analytics setup</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Multi-channel growth strategy</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-12">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                      alt="Marcus Johnson"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">Marcus Johnson</div>
                      <div className="text-gray-600">Founder, EcoLife Products</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "After being stuck at the same revenue level for over a year, Monday Morning Marketer helped us break through and scale to $2M ARR. Their data-driven approach was exactly what we needed."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">185%</div>
                      <div className="text-sm text-gray-600">Revenue Growth</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">$2M</div>
                      <div className="text-sm text-gray-600">ARR Reached</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b6b2edc2?w=60&h=60&fit=crop&crop=face"
                      alt="Lisa Rodriguez"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">Lisa Rodriguez</div>
                      <div className="text-gray-600">CMO, FinanceFirst</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "The team at Monday Morning Marketer completely transformed our lead generation. We went from 50 qualified leads per month to over 400, with better quality prospects than ever before."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">700%</div>
                      <div className="text-sm text-gray-600">Lead Increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">67%</div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-12 text-white">
                  <h3 className="text-2xl font-bold mb-6">The Challenge</h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Low-quality leads from traditional channels</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Long sales cycles with poor conversion</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Difficulty reaching decision makers</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-bold mb-6">The Solution</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Account-based marketing strategy</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Content-driven lead nurturing sequences</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                      <span>Advanced lead scoring and qualification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Results */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Results Across Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven framework works for businesses in every industry and stage of growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">SaaS & Technology</h3>
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-brand-600">Average Results:</div>
                <div>267% increase in MRR</div>
                <div>43% reduction in CAC</div>
                <div>89% improvement in LTV</div>
              </div>
              <p className="text-gray-600 text-sm">
                From seed-stage startups to established SaaS companies, we've helped technology businesses achieve sustainable growth.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional Services</h3>
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-brand-600">Average Results:</div>
                <div>189% increase in qualified leads</div>
                <div>56% higher close rates</div>
                <div>34% reduced sales cycle</div>
              </div>
              <p className="text-gray-600 text-sm">
                Consultants, agencies, and service providers have transformed their lead generation and client acquisition.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">E-commerce & Retail</h3>
              <div className="space-y-2 mb-4">
                <div className="text-2xl font-bold text-brand-600">Average Results:</div>
                <div>156% increase in online revenue</div>
                <div>78% improvement in ROAS</div>
                <div>41% higher AOV</div>
              </div>
              <p className="text-gray-600 text-sm">
                E-commerce brands have scaled their online presence and dramatically improved their advertising performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The strategic insights and hands-on support from Monday Morning Marketer were game-changing for our business. We finally have a marketing system that works."
              author="David Park"
              role="CEO, CloudSync"
              rating={5}
            />
            
            <TestimonialCard
              quote="I've worked with many marketing agencies, but none have delivered results like this. The ROI on our investment has been incredible."
              author="Jennifer Adams"
              role="Founder, GreenTech Solutions"
              rating={5}
            />
            
            <TestimonialCard
              quote="From strategy to execution, the team understands what it takes to scale a business. Our revenue has more than doubled since we started working together."
              author="Michael Torres"
              role="CMO, HealthFirst"
              rating={5}
            />
            
            <TestimonialCard
              quote="The level of expertise and dedication is unmatched. They truly become an extension of your team and are invested in your success."
              author="Rachel Kim"
              role="VP Marketing, DataFlow"
              rating={5}
            />
            
            <TestimonialCard
              quote="Finally, a marketing partner that delivers on their promises. The results speak for themselves - we've never had better performance."
              author="Alex Thompson"
              role="Founder, TechStart"
              rating={5}
            />
            
            <TestimonialCard
              quote="The strategic framework they provided transformed how we think about marketing. It's not just tactics - it's a complete growth system."
              author="Maria Gonzalez"
              role="CEO, InnovateCorp"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Become Our Next Success Story?"
        subtitle="Join hundreds of businesses that have transformed their marketing results with our proven strategies."
        ctaText="Start Your Transformation Today"
        showEmailCapture={false}
      />
    </main>
  );
}
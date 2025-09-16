import type { Metadata } from 'next';
import { Header } from '@/components/layout/secondary-header';
import { Footer } from '@/components/layout/footer';
import { StructuredData } from '@/components/schema';
import { TrendingUp, Users, Award, Target, DollarSign, Building2, ArrowRight, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'About APSICS Media | $250MM+ Performance Marketing Intelligence Experience | Brian Apsics',
  description: 'Meet the team behind revenue-driving creative intelligence. Learn our proven methodology from managing $250MM+ in ad spend for growing businesses. Performance marketing that converts.',
  keywords: 'performance marketing agency, creative intelligence, brian apsics, apsics media, revenue optimization, conversion marketing, performance advertising, creative ROI',
  openGraph: {
    title: 'About APSICS Media | $250MM+ Performance Marketing Intelligence Experience',
    description: 'Meet the team behind revenue-driving creative intelligence. Learn our proven methodology from managing $250MM+ in ad spend for growing businesses.',
    type: 'website',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About APSICS Media - Startup Ad Strategy Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About APSICS Media | $250MM+ Startup Ad Strategy Experience',
    description: 'Meet the team behind startup ad templates. Built by founders, for founders.',
    images: ['/images/about-og.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData 
        pageType="service"
        title="About APSICS Media"
        description="Meet the team behind startup ad templates. Learn our proven methodology from managing $250MM+ in ad spend for growing companies. Built by founders, for founders."
        slug="/about"
        additionalSchemas={[
          {
            '@type': 'Organization',
            name: 'APSICS Media',
            description: 'Weekly ad templates and creative strategy for startup founders',
            founder: {
              '@type': 'Person',
              name: 'Brian Apsics',
              jobTitle: 'Founder & Creative Strategist'
            },
            foundingDate: '2020',
            url: 'https://apsicsmedia.com',
            email: 'brian@apsicsmedia.com',
            areaServed: 'Worldwide',
            serviceArea: {
              '@type': 'GeoCircle',
              name: 'Worldwide'
            }
          }
        ]}
      />
      
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-brand-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-brand-600 to-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                BUILT BY FOUNDERS, FOR FOUNDERS
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                The Story Behind Weekly Ad Templates for Startups
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                From spending $250MM+ in ad budgets to creating affordable ad strategy for startup teams. Learn why we built the most founder-friendly creative intelligence service.
              </p>
              
              {/* Founder Photo Placeholder */}
              <div className="bg-white rounded-xl shadow-xl p-8 mb-8 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-600 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">BA</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Brian Apsics</h3>
                <p className="text-brand-600 font-semibold mb-4">Founder & Creative Strategist</p>
                <p className="text-gray-600 leading-relaxed">
                  "After managing $250MM+ in ad spend for Fortune 100 companies, I realized startup founders needed the same strategic frameworks - just at startup pricing."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  From Fortune 100 to Startup Founders
                </h2>
                <p className="text-xl text-gray-600">
                  Why I left high-paying agency work to serve startup teams with limited budgets
                </p>
              </div>

              <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
                <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem I Saw Everywhere</h3>
                  <p className="mb-4">
                    After years of managing massive ad budgets for Fortune 100 companies, I kept meeting brilliant startup founders who were burning through their limited marketing budgets with no results. They had amazing products but were stuck trying to figure out creative strategy on their own.
                  </p>
                  <p className="mb-4">
                    Traditional agencies wanted $5K-15K per month with 6-month contracts - impossible for most early-stage startups. Freelancers were hit-or-miss. AI tools gave generic templates that didn't work. Meanwhile, these founders were spending 10-20 hours per week trying to create ads that would actually convert.
                  </p>
                  <p className="font-semibold text-brand-600">
                    I realized there was a massive gap between what startup founders needed and what the market was providing.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">What Startups Were Getting</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• $5K-15K/month agency minimums</li>
                      <li>• 6-month contracts they couldn't afford</li>
                      <li>• Generic AI-generated templates</li>
                      <li>• Hit-or-miss freelancer quality</li>
                      <li>• No strategic thinking behind creative</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-brand-50 to-brand-50 border border-brand-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">What Startups Actually Needed</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Startup-budget friendly pricing</li>
                      <li>• No long-term commitments</li>
                      <li>• Proven, strategic templates</li>
                      <li>• Weekly fresh concepts</li>
                      <li>• Direct founder-to-founder guidance</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Solution: Weekly Creative Intelligence</h3>
                  <p className="mb-4">
                    Instead of monthly retainers, what if startup founders could get professional ad strategy delivered weekly? Pay only for the weeks they need it, cancel anytime, restart anytime?
                  </p>
                  <p className="mb-4">
                    I took everything I learned from managing $250MM+ in ad spend - the strategic frameworks, the performance scoring systems, the trend analysis - and packaged it into bite-sized weekly deliveries that startup teams could actually use.
                  </p>
                  <p className="font-semibold text-brand-600">
                    The result: Professional creative strategy at startup pricing, delivered every Monday.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Credentials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The Experience Behind Every Template
                </h2>
                <p className="text-xl text-gray-600">
                  Professional creative strategy backed by real Fortune 100 experience
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="text-3xl font-bold text-brand-600 mb-2">$250MM+</div>
                  <div className="text-gray-600">Total Ad Spend Managed</div>
                  <div className="text-sm text-gray-500 mt-2">Across Fortune 100 and growth-stage companies</div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="text-3xl font-bold text-brand-600 mb-2">500+</div>
                  <div className="text-gray-600">Campaigns Launched</div>
                  <div className="text-sm text-gray-500 mt-2">From $1K startup budgets to $10M+ enterprise</div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                  <div className="text-sm text-gray-500 mt-2">Performance marketing and creative strategy</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Strategic Frameworks We Use
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Creative Development</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 25-point performance scoring system</li>
                      <li>• Audience psychology and emotional triggers</li>
                      <li>• Platform-specific optimization strategies</li>
                      <li>• Direct response copywriting frameworks</li>
                      <li>• A/B testing and iteration methodologies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Strategic Intelligence</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Competitive analysis and trend monitoring</li>
                      <li>• Weekly trend intelligence and insights</li>
                      <li>• Performance benchmarking and optimization</li>
                      <li>• Budget allocation and ROI optimization</li>
                      <li>• Campaign launch and scaling strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Philosophy: Founders First
                </h2>
                <p className="text-xl text-gray-600">
                  Every decision we make is filtered through one question: "Does this help startup founders succeed?"
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">🚀 Startup-First Pricing</h3>
                  <p className="text-gray-600">
                    We charge $5-99 per week instead of $5K-15K per month. No contracts, no minimums, no BS. Pay for what you use, when you use it. Founded by someone who's bootstrapped companies and understands cash flow constraints.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Speed Over Perfection</h3>
                  <p className="text-gray-600">
                    Startups need to move fast and test quickly. We deliver fresh concepts every Monday so you can launch, learn, and iterate. Perfect is the enemy of launched - we optimize for speed to market while maintaining strategic quality.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Results-Focused</h3>
                  <p className="text-gray-600">
                    Every template is scored using our 25-point performance framework. We don't create "pretty" ads - we create ads that convert customers. Each concept is validated against real-world performance data from $250MM+ in managed spend.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-brand-50 to-brand-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">🤝 Founder-to-Founder</h3>
                  <p className="text-gray-600">
                    This isn't just a service - it's one founder helping other founders. I've been where you are: limited budget, wearing multiple hats, needing professional results without agency overhead. Every template comes with the strategic thinking behind it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How We Work
                </h2>
                <p className="text-xl text-gray-600">
                  Our approach to delivering weekly creative intelligence
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Monday Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Fresh creative concepts delivered every Monday morning, so you can plan your week and launch by Friday.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategic Thinking</h3>
                  <p className="text-gray-600 text-sm">
                    Every template includes the strategic reasoning behind it - audience psychology, platform optimization, and performance expectations.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trend Integration</h3>
                  <p className="text-gray-600 text-sm">
                    We monitor trending content and integrate relevant patterns into your templates, keeping your brand current without chasing every fad.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Founder Support</h3>
                  <p className="text-gray-600 text-sm">
                    Direct access to strategic guidance when you need it. This isn't just templates - it's ongoing creative intelligence for your growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & CTA */}
        <section className="py-16 bg-gradient-to-br from-brand-600 to-brand-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our free templates, then upgrade to weekly delivery when you're ready for consistent creative intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <FreeWeekButton source="about-cta" className="bg-white text-brand-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg">Start Free Week Trial</FreeWeekButton>
                <FreeWeekButton source="about-cta" className="bg-brand-800 hover:bg-brand-900 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center text-lg">Start Free Week Trial</FreeWeekButton>
              </div>

              <div className="border-t border-white/20 pt-8">
                <p className="text-lg opacity-90 mb-2">Questions? Let's talk founder to founder:</p>
                <a 
                  href="mailto:brian@apsicsmedia.com" 
                  className="text-brand-300 hover:text-brand-200 font-semibold text-xl inline-flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  brian@apsicsmedia.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

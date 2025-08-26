import { Metadata } from 'next';
import { Star, ArrowRight, TrendingUp, Users, Target, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/layout/hero';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { CTASection } from '@/components/layout/cta-section';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';

export const metadata: Metadata = {
  title: 'Thank You - Apsics Media',
  description:
    'Thank you for your interest in Apsics Media. Your next steps and what to expect.',
};

export default function SuccessPage() {
  // Get source from URL params to show dynamic content
  const getHeadlineVariant = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      
      switch(source) {
        case 'call':
          return {
            title: "Booked! Bring your current creative performance data.",
            subtitle: "We'll confirm scope and discuss which weekly trend intelligence plan fits your growth goals. Fresh scripts delivered every Monday starting next week."
          };
        case 'order':
          return {
            title: "Welcome to weekly trend intelligence! First delivery this Monday.",
            subtitle: "Watch for your welcome guide with this Monday's trending concepts. You can reply with any questions."
          };
        case 'newsletter':
          return {
            title: "Welcome to weekly trend intelligence — your first issue arrives next Monday at 8am ET.",
            subtitle: "Check your inbox for a welcome email and your '10 Free Templates' PDF. Every Monday you'll get trending concepts, competitor analysis, and ready-to-develop scripts."
          };
        default:
          return {
            title: "Thank You - Your Free Templates Are Coming!",
            subtitle: "Check your inbox for instant access to your free templates. We're excited to help you create high-converting campaigns."
          };
      }
    }
    
    return {
      title: "Thank You - Your Free Templates Are Coming!",
      subtitle: "Check your inbox for instant access to your free templates. We're excited to help you create high-converting campaigns."
    };
  };
  
  const { title, subtitle } = getHeadlineVariant();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText="Get Free Templates"
        primaryCtaLink="/free-hooks"
        secondaryCtaText="View Weekly Plans"
        secondaryCtaLink="/#service-tiers"
        background="gradient"
        showEmailCapture={false}
      />

      {/* Next Steps Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Happens Next?
              </h2>
              <p className="text-xl text-gray-600">
                Here's what to expect in the coming days.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Booked a Call</h3>
                <p className="text-gray-600">
                  We'll confirm scope and discuss which weekly plan fits your business. Bring your current creative performance data for strategic assessment.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Subscribed</h3>
                <p className="text-gray-600">
                  Watch for your welcome guide. Your first weekly trend intelligence delivery arrives this Monday.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">If You Downloaded Free Templates</h3>
                <p className="text-gray-600">
                  Check your inbox for your 10 Free Templates PDF and welcome email. Consider weekly trend intelligence for fresh concepts every Monday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Our Programs
              </h2>
              <p className="text-xl text-gray-600">
                Choose the right path for your business goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Trend Tracker Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-brand-300 transition-colors">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Weekly Trend Intelligence
                  </h3>
                  <p className="text-gray-600">
                    Weekly trend intelligence with ready-to-develop scripts based on what's working RIGHT NOW.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>1 trending concept every Monday</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>2 ready-to-develop scripts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Platform optimization guide</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Weekly trend analysis</span>
                  </li>
                </ul>
                
                <Link
                  href="/free-hooks"
                  className="w-full btn-primary text-center block"
                >
                  Get 10 Free Templates First
                </Link>
              </div>
              
              {/* Market Intelligence Card */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-8 shadow-lg text-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    All Weekly Plans Available
                  </h3>
                  <p className="text-brand-100">
                    Starting at $5/week with first week FREE. See all tiers and choose what fits your growth goals.
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>Trend Tracker: $67/month - 1 concept weekly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>Competitive Edge: $197/month - 2 concepts weekly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>Market Intelligence: $497/month - 3 concepts weekly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                    <span>All plans include trend analysis & ready scripts</span>
                  </li>
                </ul>
                
                <Link
                  href="/#service-tiers"
                  className="w-full bg-white text-brand-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center block"
                >
                  Compare All Weekly Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Message Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Focus on Building Your Startup
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              We'll handle the creative templates so you can focus on what matters most - growing your business.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
              <p className="text-lg text-gray-700">
                <strong>Ready to get started?</strong> Check your email for your free templates and consider upgrading to weekly delivery for fresh concepts every Monday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Bank CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start With 10 Free Templates
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get proven templates from high-performing subscription campaigns. Perfect way to experience our strategic approach before choosing a weekly plan.
              </p>
              
              <Link
                href="/free-hooks"
                className="btn-primary inline-block px-8 py-4 text-lg font-semibold"
              >
                Get My 10 Free Templates
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                Instant PDF download + weekly trend intelligence newsletter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Questions? We're Here to Help
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our process, timeline, or which program is right for you?
            </p>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Contact us:</strong> <a href="mailto:hello@apsicsmedia.com" className="text-brand-600 hover:underline">hello@apsicsmedia.com</a>
              </p>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>IP/Scope:</strong> You own delivered scripts, thumbnails, and summaries. Internal tools, prompts, and raw research remain our IP.</p>
                <p><strong>Refund Policy:</strong> Full refund if scoped deliverables aren't provided within 72 business hours of intake completion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
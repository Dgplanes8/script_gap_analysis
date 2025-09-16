import { Metadata } from 'next';
import { TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { FreeWeekButton } from '@/components/ui/free-week-button';

export const metadata: Metadata = {
  title: 'Thank You - Apsics Media',
  description:
    'Thank you for your interest in Apsics Media. Your next steps and what to expect.',
};

type HeadlineVariant = {
  title: string;
  subtitle: string;
};

function getHeadlineVariant(source: string | null): HeadlineVariant {
  switch (source) {
    case 'call':
      return {
        title: 'Booked! Bring your current creative performance data.',
        subtitle:
          "We'll confirm scope and discuss which weekly trend intelligence plan fits your growth goals. Fresh scripts delivered every Monday starting next week.",
      };
    case 'order':
      return {
        title: 'Welcome to weekly trend intelligence! First delivery this Monday.',
        subtitle:
          "Watch for your welcome guide with this Monday's trending concepts. You can reply with any questions.",
      };
    case 'newsletter':
      return {
        title: 'Welcome to weekly trend intelligence — your first issue arrives next Monday at 8am ET.',
        subtitle:
          "Check your inbox for a welcome email and your '10 Free Templates' PDF. Every Monday you'll get trending concepts, competitor analysis, and ready-to-develop scripts.",
      };
    default:
      return {
        title: 'Thank You - Your Free Templates Are Coming!',
        subtitle:
          "Check your inbox for instant access to your free templates. We're excited to help you create high-converting campaigns.",
      };
  }
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { source?: string };
}) {
  const { title, subtitle } = getHeadlineVariant(searchParams?.source ?? null);
  
  return (
    <main className="min-h-screen">
      <Hero
        title={title}
        subtitle={subtitle}
        ctaText="Start Free Week Trial"
        secondaryCtaText="View Plans"
        background="gradient"
        showEmailCapture={false}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Here's what to expect in the coming days.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">If You Booked a Call</h3>
              <p className="text-gray-600 leading-relaxed">
                We'll confirm scope and discuss which weekly plan fits your growing business. Bring your current creative performance data for strategic assessment.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">If You Subscribed</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch for your welcome guide. Your first weekly trend intelligence delivery arrives this Monday.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">If You Downloaded Free Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Check your inbox for your 10 Free Templates PDF and welcome email. Consider weekly trend intelligence for fresh concepts every Monday.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Explore Our Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the right path for your growing business goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100 hover:border-brand-300 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Weekly Trend Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Weekly trend intelligence with ready-to-develop scripts based on what's working RIGHT NOW.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">1 trending concept every Monday</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">2 ready-to-develop scripts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Platform optimization guide</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Weekly trend analysis</span>
                </li>
              </ul>

              <FreeWeekButton source="success-cta" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-center block">Start Free Week Trial</FreeWeekButton>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 shadow-lg text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-500 to-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">All Weekly Plans Available</h3>
                <p className="text-blue-100 leading-relaxed">
                  Starting at $5/week with first week FREE. See all tiers and choose what fits your growth goals.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Trend Tracker: $5/week - 1 concept weekly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Competitive Edge: $20/week - 2 concepts weekly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Market Intelligence: $50/week - 3 concepts weekly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>All plans include trend analysis &amp; ready scripts</span>
                </li>
              </ul>

              <FreeWeekButton
                source="success-pricing-cta"
                variant="secondary"
                className="w-full py-3 text-base"
              >
                Compare All Weekly Plans
              </FreeWeekButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Focus on Building Your Business</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            We'll handle the creative templates so you can focus on what matters most - growing your business.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Ready to get started?</strong> Check your email for your free templates and consider upgrading to weekly delivery for fresh concepts every Monday.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Start With 10 Free Templates</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Get proven templates from high-performing campaigns. Perfect way to experience our strategic approach before choosing a weekly plan.
            </p>

            <FreeWeekButton source="success-cta" className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white font-semibold px-8 py-4 text-lg rounded-xl transition-colors inline-block">Start Free Week Trial</FreeWeekButton>

            <p className="text-sm text-gray-500 mt-4">
              Instant PDF download + weekly trend intelligence newsletter
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Questions? We're Here to Help</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Have questions about our process, timeline, or which program is right for your growing business?
          </p>

          <div className="bg-[#F8F8F8] rounded-xl p-8">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Contact us:</strong>{' '}
              <a href="mailto:hello@apsicsmedia.com" className="text-[#126DFB] hover:underline">
                hello@apsicsmedia.com
              </a>
            </p>

            <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
              <p>
                <strong>IP/Scope:</strong> You own delivered scripts, thumbnails, and summaries. Internal tools, prompts, and raw
                research remain our IP.
              </p>
              <p>
                <strong>Refund Policy:</strong> Full refund if scoped deliverables aren't provided within 72 business hours of intake
                completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

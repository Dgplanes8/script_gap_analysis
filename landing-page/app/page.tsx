import Link from 'next/link';
import { ArrowRight, Mail, Users, TrendingUp } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { CTASection } from '@/components/layout/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Stop guessing hooks. Get 12 scripts in 72 hours for $990."
        subtitle="Your next winning ad starts in your reviews. Beat your median CTR/TSR with buyer-language hooks—this week."
        ctaText="Subscribe to Monday Morning Ideas"
        secondaryCtaText="Start Free Pilot"
        secondaryCtaLink="/pilot"
      />

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

      {/* Programs Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Script System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you want to test our system first or need scripts immediately, we have the right option.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pilot Program */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-200 hover:border-brand-400 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Free 7-Day Scripts Pilot
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  FREE
                  <span className="text-lg font-normal text-gray-500"> (for qualified apps)</span>
                </div>
                <p className="text-gray-600">
                  Test our system with 3 high-intent ad concepts for your fitness/sports app.
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
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  $990 Script System
                </h3>
                <div className="text-4xl font-bold mb-2">
                  $990
                  <span className="text-lg font-normal opacity-80"> / 72 hours</span>
                </div>
                <p className="opacity-90">
                  12 shoot-ready ad scripts engineered from your real customer language.
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

      {/* CTA Section */}
      <CTASection
        title="Ready to Turn Customer Language Into Winning Ads?"
        subtitle="Join the Monday Morning Ideas newsletter for weekly hooks, creative breakdowns, and testing frameworks."
        ctaText="Subscribe to Monday Morning Ideas"
        showEmailCapture={true}
      />
    </main>
  );
}
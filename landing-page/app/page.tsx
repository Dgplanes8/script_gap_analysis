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
        title="Transform Your Marketing Strategy Every Monday Morning"
        subtitle="Join thousands of marketers who start their week with actionable insights, proven frameworks, and game-changing strategies delivered straight to their inbox."
        ctaText="Get Free Marketing Insights"
        secondaryCtaText="View Success Stories"
        secondaryCtaLink="/success"
      />

      {/* Features Section */}
      <Features
        title="Why Monday Morning Marketer?"
        subtitle="Everything you need to elevate your marketing game"
        features={[
          {
            icon: Mail,
            title: 'Weekly Strategic Insights',
            description:
              'Get curated marketing strategies, case studies, and actionable tactics delivered every Monday morning.',
          },
          {
            icon: Users,
            title: 'Exclusive Community Access',
            description:
              'Join a private community of high-performing marketers sharing wins, challenges, and breakthrough strategies.',
          },
          {
            icon: TrendingUp,
            title: 'Proven Growth Frameworks',
            description:
              'Access battle-tested frameworks and templates that have generated millions in revenue for our community.',
          },
        ]}
      />

      {/* Programs Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path to Marketing Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for strategic guidance or hands-off execution, we have the perfect program for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pilot Program */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-200 hover:border-brand-400 transition-colors">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Strategic Marketing Pilot
                </h3>
                <div className="text-4xl font-bold text-brand-600 mb-2">
                  $997
                  <span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">
                  Perfect for businesses ready to implement proven marketing strategies with expert guidance.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Weekly strategy sessions with marketing experts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Custom marketing roadmap and implementation plan</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Access to exclusive marketing frameworks and templates</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Priority support and community access</span>
                </li>
              </ul>

              <Link
                href="/pilot"
                className="w-full btn-primary text-center block"
              >
                Learn More About Pilot Program
              </Link>
            </div>

            {/* Done-For-You Program */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Done-For-You Marketing
                </h3>
                <div className="text-4xl font-bold mb-2">
                  $9,900
                  <span className="text-lg font-normal opacity-80">/month</span>
                </div>
                <p className="opacity-90">
                  Complete marketing management for businesses ready to scale without the overhead.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Full marketing team at your disposal</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Complete campaign creation and management</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Advanced analytics and performance optimization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-brand-200 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Dedicated account manager and strategy calls</span>
                </li>
              </ul>

              <Link
                href="/990"
                className="w-full bg-white text-brand-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center block"
              >
                Explore Done-For-You Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Marketing?"
        subtitle="Join thousands of marketers who have already transformed their results with our proven strategies."
        ctaText="Start Your Marketing Transformation"
        showEmailCapture={true}
      />
    </main>
  );
}
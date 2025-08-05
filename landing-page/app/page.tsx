'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Users, TrendingUp, Target, Building2, Calculator, Calendar } from 'lucide-react';
import { EmailCaptureForm } from '@/components/forms/email-capture-form';
import { Hero } from '@/components/layout/hero';
import { Features } from '@/components/layout/features';
import { ServiceTiers } from '@/components/layout/service-tiers';
import { StrategyProcess } from '@/components/layout/strategic-process';
import { StrategyROICalculator } from '@/components/calculators/strategic-roi-calculator';
import { ContentNavigation } from '@/components/layout/content-navigation';
import { AboutSection } from '@/components/layout/about-section';
import { StrategicConsultationForm } from '@/components/forms/strategic-consultation-form';
import { ConsultationBookingCTA } from '@/components/ui/consultation-booking-cta';
import { Header } from '@/components/layout/header';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { Footer } from '@/components/layout/footer';
import { useConsultation } from '@/components/contexts/consultation-context';

export default function HomePage() {
  const { openModal: handleOpenConsultation } = useConsultation();
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  return (
    <>
      {/* Header Navigation */}
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <Hero
        title="Fortune 100 Creative Strategy Delivered in 48 Hours"
        subtitle="Get expert creative strategy and competitive intelligence that traditionally takes weeks, accelerated by proprietary AI research tools. 10+ years performance marketing experience serving D2C brands and subscription businesses."
        ctaText="Get My Expert Analysis"
        secondaryCtaText="See Pricing & Plans"
        showEmailCapture={false}
        onPrimaryClick={handleOpenConsultation}
        onSecondaryClick={() => document.getElementById('service-tiers')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* About Section - Enhanced Fortune 100 Positioning */}
      <AboutSection onOpenApplication={handleOpenConsultation} />

      {/* Strategic Process Overview */}
      <StrategyProcess />

      {/* Strategic Differentiators */}
      <Features
        title="Why Expert Strategy With AI Research Works for Growth Businesses"
        subtitle="Unlike slow agencies, we deliver systematic creative strategy with AI-accelerated research in 48 hours"
        features={[
          {
            icon: Target,
            title: 'Expert Strategy, AI-Accelerated Research',
            description:
              'Get expert creative strategy with AI-enhanced competitive intelligence in 48 hours that traditionally takes agencies 2-4 weeks.',
          },
          {
            icon: Building2,
            title: 'Performance Marketing Expertise',
            description:
              '10+ years managing $100M+ ad spend for D2C brands and subscription businesses scaling from $10K-$1MM monthly.'
          },
          {
            icon: TrendingUp,
            title: 'Data-Driven Performance Prediction',
            description:
              'Every creative concept comes with strategic analysis and data-driven performance prediction before you spend a dollar on testing.',
          },
        ]}
      />

      {/* Strategic ROI Calculator */}
      <StrategyROICalculator />

      {/* Service Tiers Section */}
      <section id="service-tiers">
        <ServiceTiers />
      </section>

      {/* Strategic Resources Section */}
      <section id="strategic-resources" className="bg-gray-50">
        <ContentNavigation showTitle={true} variant="grid" />
      </section>


      {/* Creative Intelligence Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              48-Hour Expert Creative Strategy Guarantee
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Speed Advantage</h3>
                <p className="text-gray-600">
                  Expert creative strategy with AI-enhanced research delivered in 48 hours, not weeks.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Strategic Performance Analysis</h3>
                <p className="text-gray-600">
                  Every creative comes with expert strategic analysis and data-driven performance prediction before you spend money testing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth-Stage Focus</h3>
                <p className="text-gray-600">
                  Built for D2C brands and subscription businesses scaling their ad spend systematically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Creative Intelligence CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-600/20 backdrop-blur rounded-lg p-4 mb-6 border border-red-400/30">
              <div className="text-red-200 font-semibold mb-1">⚡ Limited Expert Capacity</div>
              <div className="text-lg font-bold">Only 20 spots left for September Expert Creative Strategy</div>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Expert Creative Strategy in 48 Hours?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join D2C brands using expert creative strategy with AI-accelerated research to scale faster and more profitably.
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="text-3xl font-bold">48 Hours</div>
                  <div className="text-sm opacity-80">Creative Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">Expert-Driven</div>
                  <div className="text-sm opacity-80">Strategic Analysis</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$97/Month</div>
                  <div className="text-sm opacity-80">Starting Price</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Get My Expert Analysis
                </button>
                <button
                  onClick={() => document.getElementById('service-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  See Pricing Plans
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Get Expert Creative Intelligence Weekly
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Subscribe for weekly creative hooks, expert insights, and strategic performance predictions that stop the scroll.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Get My Weekly Hooks"
                  variant="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Consultation Form Modal */}
      <StrategicConsultationForm
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        title="Wait! Get Your Free Expert Creative Intelligence Toolkit Before You Go"
        subtitle="Join 1,200+ marketers getting expert creative hooks and strategic insights every Monday + instant access to our Creative Hook Database."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </>
  );
}
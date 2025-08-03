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

export default function HomePage() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const handleOpenConsultation = () => {
    setIsConsultationFormOpen(true);
  };

  return (
    <>
      {/* Header Navigation */}
      <Header onOpenConsultation={handleOpenConsultation} />
      
      <main className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <Hero
        title="Strategic Ad Intelligence System for Subscription Businesses"
        subtitle="Transform your marketing with the same Fortune 100 systematic methodology used to manage $100M+ in ad spend. Strategic partnerships for $500K-$2M ARR companies ready to scale systematically."
        ctaText="Book Strategic Consultation"
        secondaryCtaText="Explore Strategic Resources"
        showEmailCapture={false}
        onPrimaryClick={handleOpenConsultation}
        onSecondaryClick={() => document.getElementById('strategic-resources')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* About Section - Enhanced Fortune 100 Positioning */}
      <AboutSection onOpenApplication={handleOpenConsultation} />

      {/* Strategic Process Overview */}
      <StrategyProcess onOpenConsultation={handleOpenConsultation} />

      {/* Strategic Differentiators */}
      <Features
        title="Why Fortune 100 Methodology Works for Subscription Businesses"
        subtitle="Unlike agencies that focus on execution, we provide systematic strategic transformation"
        features={[
          {
            icon: Target,
            title: 'Systematic 11-Phase Process',
            description:
              'Every decision is grounded in strategic research and validated through our proven Fortune 100 methodology.',
          },
          {
            icon: Building2,
            title: 'Strategic Partnership Focus',
            description:
              'We partner with your team for long-term transformation, not just creative deliverables.'
          },
          {
            icon: TrendingUp,
            title: 'Scalable Growth Framework',
            description:
              'Build systematic processes that scale with your business as you grow from $500K to $5M+ ARR.',
          },
        ]}
      />

      {/* Strategic ROI Calculator */}
      <StrategyROICalculator onOpenConsultation={handleOpenConsultation} />

      {/* Service Tiers Section */}
      <ServiceTiers onOpenConsultation={handleOpenConsultation} />

      {/* Strategic Resources Section */}
      <section id="strategic-resources" className="bg-gray-50">
        <ContentNavigation showTitle={true} variant="grid" />
      </section>


      {/* Strategic Guarantee Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Strategic Partnership Guarantee
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Strategic Alignment</h3>
                <p className="text-gray-600">
                  Every recommendation is aligned with your specific business goals and growth stage. No generic solutions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Focus</h3>
                <p className="text-gray-600">
                  We're accountable for strategic outcomes, not just deliverables. Your success is our success.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Executive Access</h3>
                <p className="text-gray-600">
                  Direct access to senior strategists with Fortune 100 experience. No junior staff or account managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Strategic CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-600/20 backdrop-blur rounded-lg p-4 mb-6 border border-red-400/30">
              <div className="text-red-200 font-semibold mb-1">⚡ Limited Availability</div>
              <div className="text-lg font-bold">Only 4 spots left for August partnerships</div>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Marketing Strategy?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join subscription businesses using Fortune 100 methodology to scale systematically and profitably.
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                <div>
                  <div className="text-3xl font-bold">$100M+</div>
                  <div className="text-sm opacity-80">Ad Spend Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">11-Phase</div>
                  <div className="text-sm opacity-80">Systematic Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">Fortune 100</div>
                  <div className="text-sm opacity-80">Proven Methods</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleOpenConsultation}
                  className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Strategic Consultation
                </button>
                <button
                  onClick={() => document.getElementById('strategic-resources')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Explore Strategic Tools
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-bold mb-4">
                Get Strategic Insights Weekly
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Subscribe for weekly strategic insights, case studies, and Fortune 100 methodology updates.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  placeholder="Enter your work email"
                  buttonText="Get Strategic Insights"
                  variant="hero"
                  showFirstName={false}
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
        title="Wait! Get Your Free Strategic Hooks Before You Go"
        subtitle="Join 1,200+ marketers getting winning strategic hooks every Monday + instant access to our Strategic Hook Bank PDF."
      />

      {/* Conversion Dashboard (dev/admin only) */}
      <ConversionDashboard />
    </main>

    {/* Footer */}
    <Footer />
    </>
  );
}
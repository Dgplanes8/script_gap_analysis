'use client';

import { motion } from 'framer-motion';
import { AlyticsNavbar } from './alytics-navbar';
import { AlyticsHero } from './alytics-hero';
import { FloatingLogos } from './floating-logos';
import { DashboardPreview } from './dashboard-preview';
import { FeaturesSection } from './features-section';
import { ProblemSolutionSection } from './problem-solution-section';
import { ServiceTiersSection } from './service-tiers-section';
import { WeeklyDeliveryShowcase } from './weekly-delivery-showcase';
import { TestimonialsSection } from './testimonials-section';
import { ObjectionPreemptionSection } from './objection-preemption-section';
import { FAQSection } from './faq-section';
import { FinalCTASection } from './final-cta-section';
import { NewsletterSection } from './newsletter-section';
import { NewsletterExitPopup } from './newsletter-exit-popup';

export function AlyticsLanding() {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Navigation */}
      <AlyticsNavbar />
      
      {/* Hero Section with Floating Logos */}
      <div className="relative">
        <AlyticsHero />
        <FloatingLogos />
      </div>
      
      {/* Dashboard Preview */}
      <DashboardPreview />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Problem-Solution Section */}
      <ProblemSolutionSection />
      
      {/* Service Tiers Section */}
      <ServiceTiersSection />
      
      {/* Weekly Delivery Showcase */}
      <WeeklyDeliveryShowcase />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Objection Preemption Section */}
      <ObjectionPreemptionSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final CTA Section */}
      <FinalCTASection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Newsletter Exit Popup */}
      <NewsletterExitPopup />
    </div>
  );
}
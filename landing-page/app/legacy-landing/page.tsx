'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ConversionDashboard } from '@/components/analytics/conversion-dashboard';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';
import { ConsultationProvider } from '@/components/contexts/consultation-context';

// Import Alytics components
import { AlyticsHero } from '@/components/alytics/alytics-hero';
import { FloatingLogos } from '@/components/alytics/floating-logos';
import { ProblemSolutionWorkflow } from '@/components/alytics/problem-solution-workflow';
import { FounderSection } from '@/components/alytics/founder-section';
import { FreeHooksSection } from '@/components/alytics/free-hooks-section';

// Dynamic imports for below-fold components for better performance
const KeyBenefitsSection = dynamic(() => import('@/components/alytics/key-benefits-section').then(mod => ({ default: mod.KeyBenefitsSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse"></div>
});

const SocialProofSection = dynamic(() => import('@/components/alytics/social-proof-section').then(mod => ({ default: mod.SocialProofSection })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse"></div>
});

const SimplePricingSection = dynamic(() => import('@/components/alytics/simple-pricing-section').then(mod => ({ default: mod.SimplePricingSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse"></div>
});

const FinalConversionSection = dynamic(() => import('@/components/alytics/final-conversion-section').then(mod => ({ default: mod.FinalConversionSection })), {
  loading: () => <div className="py-20 bg-gradient-to-b from-gray-50 to-white animate-pulse"></div>
});

// Note: This is a hidden legacy page for reference only
// Robots directives handled via robots.txt exclusion

export default function LegacyLandingPage() {
  return (
    <ConsultationProvider>
      <div className="min-h-screen bg-white overflow-hidden relative">
        {/* Header Navigation */}
        <Header />
        
        {/* 1. Hero Section with Floating Logos */}
        <div className="relative pt-16 lg:pt-20">
          <AlyticsHero />
          <FloatingLogos />
        </div>
        
        {/* 2. Problem-Solution Bridge */}
        <ProblemSolutionWorkflow />
        
        {/* 3. Key Benefits */}
        <KeyBenefitsSection />
        
        {/* 4. Social Proof */}
        <SocialProofSection />
        
        {/* 5. Founder Section & Founding Offer */}
        <FounderSection />
        
        {/* 6. Simple Pricing */}
        <SimplePricingSection />
        
        {/* 7. Final Conversion Push */}
        <FinalConversionSection />
        
        {/* 8. Free Hooks Lead Magnet */}
        <FreeHooksSection />
        
        {/* Exit Intent Popup - Preserving existing ConvertKit integration */}
        <ExitIntentPopup 
          title="Wait! Get Your Free Content Intelligence Before You Go"
          subtitle="Join startup founders getting winning content templates every Monday + instant access to our strategic insights."
        />

        {/* Conversion Dashboard (dev/admin only) */}
        <ConversionDashboard />
      </div>

      {/* Footer */}
      <Footer />
    </ConsultationProvider>
  );
}
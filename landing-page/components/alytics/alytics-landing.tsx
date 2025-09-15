'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AlyticsNavbar } from './alytics-navbar';
import { AlyticsHero } from './alytics-hero';
import { FloatingLogos } from './floating-logos';

// Dynamic imports for below-fold components
// Import the working ProblemSolutionWorkflow component directly
import { ProblemSolutionWorkflow } from './problem-solution-workflow';
import { FounderSection } from './founder-section';

const KeyBenefitsSection = dynamic(() => import('./key-benefits-section').then(mod => ({ default: mod.KeyBenefitsSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse"></div>
});

const SocialProofSection = dynamic(() => import('./social-proof-section').then(mod => ({ default: mod.SocialProofSection })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse"></div>
});

const SimplePricingSection = dynamic(() => import('./simple-pricing-section').then(mod => ({ default: mod.SimplePricingSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse"></div>
});

const FinalConversionSection = dynamic(() => import('./final-conversion-section').then(mod => ({ default: mod.FinalConversionSection })), {
  loading: () => <div className="py-20 bg-gradient-to-b from-gray-50 to-white animate-pulse"></div>
});

const NewsletterExitPopup = dynamic(() => import('./newsletter-exit-popup').then(mod => ({ default: mod.NewsletterExitPopup })), {
  ssr: false,
  loading: () => null
});

const FreeHooksSection = dynamic(() => import('./free-hooks-section').then(mod => ({ default: mod.FreeHooksSection })), {
  loading: () => <div className="py-20 bg-blue-50 animate-pulse"></div>
});


export function AlyticsLanding() {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Navigation */}
      <AlyticsNavbar />
      
      {/* 1. Hero Section with Floating Logos */}
      <div className="relative">
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
      
      {/* Newsletter Exit Popup */}
      <NewsletterExitPopup />
    </div>
  );
}
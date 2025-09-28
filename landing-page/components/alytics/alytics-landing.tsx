'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AlyticsNavbar } from './alytics-navbar';
import { AlyticsHero } from './alytics-hero';
import { FloatingLogos } from './floating-logos';

// Dynamic imports for below-fold components
// Import the working ProblemSolutionWorkflow component directly
import { ProblemSolutionWorkflow } from './problem-solution-workflow';
import { CreativeResearchMattersSection } from './creative-research-matters-section';
import { BeforeAfterExamplesSection } from './before-after-examples-section';
import { AIGeneratorPreviewSection } from './ai-generator-preview-section';
import { PerformanceGuaranteeSection } from './performance-guarantee-section';
import { FourBoxProcessSection } from './four-box-process-section';
import { CreativeGuessworkProblemSection } from './creative-guesswork-problem-section';
import { ToolsOverviewSection } from './tools-overview-section';
import { ComingSoonPipelineSection } from './coming-soon-pipeline-section';

const KeyBenefitsSection = dynamic(() => import('./key-benefits-section').then(mod => ({ default: mod.KeyBenefitsSection })), {
  loading: () => <div className="py-20 bg-white animate-pulse"></div>
});

const SocialProofSection = dynamic(() => import('./social-proof-section').then(mod => ({ default: mod.SocialProofSection })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse"></div>
});

import { SimplePricingSection } from './simple-pricing-section';

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

      {/* 2. Live Demo - Immediate value demonstration */}
      <AIGeneratorPreviewSection />

      {/* 3. Social Proof - Builds on demo success */}
      <SocialProofSection />

      {/* 4. Problem/Pain - Establish the creative guesswork problem */}
      <CreativeGuessworkProblemSection />

      {/* 5. Before/After Examples - Proof of transformation */}
      <BeforeAfterExamplesSection />

      {/* 6. Tools Overview - Clarify product suite */}
      <ToolsOverviewSection />

      {/* 7. Coming Soon Pipeline - Platform evolution preview */}
      <ComingSoonPipelineSection />

      {/* 8. Simple Pricing - After demonstrating value */}
      <SimplePricingSection />

      {/* 9. Problem-Solution Bridge - Core value prop */}
      <ProblemSolutionWorkflow />

      {/* 10. Key Benefits - Value reinforcement */}
      <KeyBenefitsSection />

      {/* 11. Final Conversion Push */}
      <FinalConversionSection />
      
      {/* Newsletter Exit Popup */}
      <NewsletterExitPopup />
    </div>
  );
}

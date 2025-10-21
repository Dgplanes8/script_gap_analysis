export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';
import { StudioFoundingOfferCard } from '@/components/alytics/studio-founding-offer-card';
import { SoftwareApplicationSchema } from '@/components/schema/software-application-schema';
import { FAQSection, SPECIALIZED_FAQS } from '@/components/schema/faq-schema';

export const metadata: Metadata = {
  title: 'Free Creative Brief Generator - AI Marketing Brief Tool | APSICS Media',
  description: 'Generate execution-ready creative briefs in 60 seconds. Target audience, positioning, deliverables—built from $250M in ad intelligence. Free 10 credits/month, no signup required.',
  keywords: 'creative brief generator, creative brief generator free, marketing brief generator ai, campaign brief generator, advertising brief generator tool, saas marketing brief generator, d2c creative brief template generator, subscription business brief generator, performance marketing brief generator, social media campaign brief generator, tiktok ad brief generator, meta ads creative brief generator, creative brief template, marketing brief tool',
  openGraph: {
    title: 'Free Creative Brief Generator - AI Marketing Brief Tool',
    description: 'Generate execution-ready creative briefs in 60 seconds. Target audience, positioning, deliverables—built from $250M in ad intelligence.',
    type: 'website',
    url: 'https://apsicsmedia.com/creative-brief-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Creative Brief Generator - AI Tool',
    description: 'Generate execution-ready creative briefs in 60 seconds from $250M ad intelligence.',
  },
  alternates: {
    canonical: '/creative-brief-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Dynamic import for better performance
const TemplatedCreativeBriefGeneratorClient = nextDynamic(() => import('./templated-client-page'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: false
});

export default function CreativeBriefGeneratorPage() {
  const config = getToolConfig('creative-brief-generator');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <>
      <SoftwareApplicationSchema
        name="Creative Brief Generator"
        description="Generate execution-ready creative briefs with target audience analysis, positioning frameworks, and deliverables specification. Built from $250M in ad intelligence for marketers and agencies."
        url="/creative-brief-generator"
        category="BusinessApplication"
        aggregateRating={{
          ratingValue: '4.9',
          ratingCount: '287'
        }}
        featureList={[
          'AI-powered brief generation in 60 seconds',
          'Target audience and ICP analysis',
          'Strategic positioning frameworks',
          'Platform-specific deliverables',
          'Industry-specific templates (SaaS, D2C, Mobile)',
          'Free 10 monthly credits'
        ]}
      />

      <AIToolTemplate
        config={config.template}
        secondaryHeaderProps={config.secondaryHeader}
        headerComponent={<AlyticsNavbar />}
        foundersClubContent={<StudioFoundingOfferCard />}
        processContent={<ProcessSection config={config.process} />}
        pricingContent={<SimplePricingSection />}
      >
        <TemplatedCreativeBriefGeneratorClient />
      </AIToolTemplate>

      {/* FAQ Section for Featured Snippets */}
      <FAQSection
        faqs={SPECIALIZED_FAQS.creative_brief_generator}
        title="Creative Brief Generator: Frequently Asked Questions"
        subtitle="Everything you need to know about generating high-quality marketing briefs with AI"
        variant="default"
      />
    </>
  );
}

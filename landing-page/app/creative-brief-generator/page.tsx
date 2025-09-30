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

export const metadata: Metadata = {
  title: 'Creative Brief Generator - AI Strategy Tool | APSICS Media',
  description: 'Generate comprehensive creative briefs with target personas, positioning strategies, and asset recommendations. Built from $250M+ in managed spend. Free 10 monthly credits.',
  keywords: 'creative brief generator, marketing brief template, creative strategy tool, ad campaign brief, target audience analysis, positioning strategy, ai marketing tool',
  openGraph: {
    title: 'Creative Brief Generator - AI Strategy Tool',
    description: 'Generate comprehensive creative briefs with target personas and positioning strategies. Free trial with 10 monthly credits.',
    type: 'website',
    url: 'https://apsicsmedia.com/creative-brief-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Brief Generator - Free Tool',
    description: 'Generate comprehensive creative briefs with AI-powered strategic insights.',
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
  );
}

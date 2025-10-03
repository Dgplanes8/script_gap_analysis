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
  title: 'Brief Generator - Turn Ideas Into Execution-Ready Direction | APSICS Media',
  description: 'Turn campaign ideas into complete briefs with target audience, positioning, and ready-to-launch concepts. Built from $250M+ in ad testing. Free 10 monthly credits.',
  keywords: 'brief generator, marketing brief template, campaign brief tool, ad campaign brief, target audience analysis, positioning strategy, creative brief',
  openGraph: {
    title: 'Brief Generator - Execution-Ready Direction',
    description: 'Turn campaign ideas into complete briefs your team can execute immediately. Free trial with 10 monthly credits.',
    type: 'website',
    url: 'https://apsicsmedia.com/creative-brief-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brief Generator - Free Tool',
    description: 'Turn campaign ideas into briefs your team can execute today.',
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

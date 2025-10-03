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
  title: 'Ad Iterator - Turn Your Ad Into a Better Version | APSICS Media',
  description: 'Upload your ad, get instant feedback and ready-to-test improvements. Performance scores, priority fixes, and platform-optimized version. Free 10 monthly credits.',
  keywords: 'ad iteration tool, facebook ad analyzer, ad optimization, ad performance analysis, campaign optimization, ad testing, ad improvement tool',
  openGraph: {
    title: 'Ad Iterator - Turn Your Ad Into a Better Version',
    description: 'Upload your ad and get instant improvements. Performance scoring and ready-to-test version. Free trial with 10 monthly credits.',
    type: 'website',
    url: 'https://apsicsmedia.com/ai-ad-iteration-tool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ad Iterator - Get a Better Version',
    description: 'Upload your ad, get instant improvements ready to test.',
  },
};

// Dynamic import for better performance
const IterationToolClient = nextDynamic(() => import('./client-page'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: false
});

export default function AIAdIterationToolPage() {
  const config = getToolConfig('ai-ad-iteration-tool');

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
      <IterationToolClient config={config} />
    </AIToolTemplate>
  );
}

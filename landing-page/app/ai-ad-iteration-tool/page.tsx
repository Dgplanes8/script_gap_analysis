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
  title: 'Free Ad Analyzer & Iteration Tool - 25-Point Performance Score | APSICS Media',
  description: 'Upload any ad, get instant 25-point performance score + optimized version in 60 seconds. TikTok, Meta, LinkedIn ads analyzed. Free 10 credits/month, no signup required.',
  keywords: 'ad analyzer free tool, ad iteration tool, facebook ad analyzer free, ad performance score tool, creative iteration tool, ad optimization tool free, tiktok ad analyzer, meta ad performance checker, ad creative scoring tool, 25 point ad scoring system, ad improvement tool, campaign optimizer, facebook ad analysis, ad testing tool, creative analyzer, ad performance analysis, linkedin ad analyzer',
  openGraph: {
    title: 'Free Ad Analyzer & Iteration Tool - 25-Point Performance Score',
    description: 'Upload any ad, get instant 25-point performance score + optimized version in 60 seconds. TikTok, Meta, LinkedIn ads analyzed.',
    type: 'website',
    url: 'https://apsicsmedia.com/ai-ad-iteration-tool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Ad Analyzer - 25-Point Score',
    description: 'Upload any ad, get instant performance score + optimized version in 60 seconds.',
  },
  alternates: {
    canonical: '/ai-ad-iteration-tool',
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
    <>
      <SoftwareApplicationSchema
        name="AI Ad Analyzer & Iteration Tool"
        description="Upload any ad, get instant 25-point performance score and optimized version in 60 seconds. Analyzes TikTok, Meta, and LinkedIn ads with actionable improvement recommendations."
        url="/ai-ad-iteration-tool"
        category="BusinessApplication"
        aggregateRating={{
          ratingValue: '4.9',
          ratingCount: '156'
        }}
        featureList={[
          '25-point ad performance scoring',
          'Instant ad optimization suggestions',
          'Multi-platform analysis (TikTok, Meta, LinkedIn)',
          'Visual and copy improvement recommendations',
          'Before/after comparison',
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
        <IterationToolClient config={config} />
      </AIToolTemplate>

      {/* FAQ Section for Featured Snippets */}
      <FAQSection
        faqs={SPECIALIZED_FAQS.ad_iteration_tool}
        title="Ad Analyzer & Iteration Tool: Frequently Asked Questions"
        subtitle="Learn how to optimize your ads with AI-powered performance scoring and recommendations"
        variant="default"
      />
    </>
  );
}

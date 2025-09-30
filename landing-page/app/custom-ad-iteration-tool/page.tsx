import { Metadata } from 'next';
import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { AlyticsNavbar } from '@/components/alytics/alytics-navbar';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { StudioFoundingOfferCard } from '@/components/alytics/studio-founding-offer-card';
import { getToolConfig } from '@/lib/template-configs';
import CustomAdIterationClientPage from './client-page';

// Force dynamic rendering for session awareness
export const dynamic = 'force-dynamic';

const toolConfig = getToolConfig('custom-ad-iteration-tool');

if (!toolConfig) {
  throw new Error('Tool configuration not found for custom-ad-iteration-tool');
}

export const metadata: Metadata = {
  title: 'Custom Ad Iteration Tool | Save & Remix Competitor Ads | APSICS Media',
  description:
    'Save Meta and Instagram ads via iOS Shortcut, then generate APSICS-crafted remixes using competitor intelligence and proven performance frameworks. Save unlimited ads, generate with credits.',
  openGraph: {
    title: 'Custom Ad Iteration Tool | APSICS Media',
    description:
      'Save competitor ads and generate high-performance remixes with APSICS creative intelligence.',
    type: 'website',
  },
};

export default function CustomAdIterationToolPage() {
  return (
    <>
      <AlyticsNavbar />

      <AIToolTemplate config={toolConfig!.template}>
        {/* Main client component with saved ads table + form */}
        <CustomAdIterationClientPage />

        {/* Process Section */}
        <ProcessSection config={toolConfig!.process} />

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your APSICS Plan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Save unlimited ads for free. Use credits to generate custom remixes from your
                library. Upgrade anytime for higher volume and advanced concepts.
              </p>
            </div>

            <SimplePricingSection />

            {/* Studio Founding Offer */}
            <div className="mt-16 max-w-4xl mx-auto">
              <StudioFoundingOfferCard />
            </div>
          </div>
        </section>
      </AIToolTemplate>
    </>
  );
}
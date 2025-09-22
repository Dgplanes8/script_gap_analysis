export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { FoundersClubSection } from '@/components/templates/founders-club-section';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';
import IterationToolClient from './client-page';

export default function AIAdIterationToolPage() {
  const config = getToolConfig('ai-ad-iteration-tool');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <AIToolTemplate
      config={config.template}
      secondaryHeaderProps={config.secondaryHeader}
      foundersClubContent={<FoundersClubSection config={config.foundersClub} />}
      processContent={<ProcessSection config={config.process} />}
      pricingContent={<SimplePricingSection />}
    >
      <IterationToolClient config={config} />
    </AIToolTemplate>
  );
}

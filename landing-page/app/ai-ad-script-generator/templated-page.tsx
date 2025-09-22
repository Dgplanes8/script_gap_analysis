export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { FoundersClubSection } from '@/components/templates/founders-club-section';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';
import TemplatedAdScriptGeneratorClient from './templated-client-page';

export default function TemplatedAdScriptGeneratorPage() {
  const config = getToolConfig('ai-ad-script-generator');

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
      <TemplatedAdScriptGeneratorClient />
    </AIToolTemplate>
  );
}
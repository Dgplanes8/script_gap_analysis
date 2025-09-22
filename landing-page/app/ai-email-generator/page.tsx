export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { FoundersClubSection } from '@/components/templates/founders-club-section';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';

export default function AIEmailGeneratorPage() {
  const config = getToolConfig('ai-email-generator');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  const handleSubmit = async (formData: Record<string, any>) => {
    // This would be replaced with actual email generation logic
    console.log('Email generation form data:', formData);

    // For demo purposes, return a mock result
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      subject: `Launch announcement for ${formData.companyName}`,
      body: `Hi there!\n\nWe're excited to announce our latest update at ${formData.companyName}...\n\nBest regards,\nThe ${formData.companyName} Team`
    };
  };

  return (
    <AIToolTemplate
      config={config.template}
      secondaryHeaderProps={config.secondaryHeader}
      foundersClubContent={<FoundersClubSection config={config.foundersClub} />}
      processContent={<ProcessSection config={config.process} />}
      pricingContent={<SimplePricingSection />}
    >
      <AIFormTemplate
        config={config.form}
        fields={config.fields}
        onSubmit={handleSubmit}
      />
    </AIToolTemplate>
  );
}
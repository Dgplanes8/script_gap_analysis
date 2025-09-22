export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AdScriptGeneratorClient from './client-page';
import { SecondaryHeader } from '@/components/layout/secondary-header';

export default function AdScriptGeneratorPage() {
  return (
    <>
      <SecondaryHeader
        links={[
          { label: 'Overview', href: '#overview' },
          { label: 'How it works', href: '#workflow' },
          { label: 'Plans & Pricing', href: '#service-tiers' },
        ]}
        ctaHref="#service-tiers"
        ctaLabel="Start Free Week Trial"
      />
      <div className="pt-20 md:pt-24">
        <AdScriptGeneratorClient />
      </div>
    </>
  );
}

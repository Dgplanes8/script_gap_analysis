import type { Metadata } from 'next';
import { SaaSGrowthMarketingGuide } from '@/components/content/saas-growth-marketing-guide';

export const metadata: Metadata = {
  title: 'The $10M SaaS Growth Playbook (Free Download): 0 to $10M ARR Roadmap',
  description: 'Get the exact growth playbook that scaled 50+ SaaS companies to $10M+ ARR. Channel strategies, CAC optimization, retention tactics—all free. Skip 2 years of trial and error.',
  keywords: 'SaaS growth marketing consultant, SaaS growth marketing guide, SaaS marketing channels, SaaS growth strategy, SaaS marketing optimization',
  openGraph: {
    title: 'The $10M SaaS Growth Playbook (Free Download): 0 to $10M ARR Roadmap',
    description: 'Get the exact growth playbook that scaled 50+ SaaS companies to $10M+ ARR. Channel strategies, CAC optimization, retention tactics.',
    type: 'website',
  },
  alternates: {
    canonical: '/saas-growth-marketing-guide',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SaaS Growth Marketing Channel Assessment',
  applicationCategory: 'BusinessApplication',
  description: 'Interactive assessment tool for optimizing SaaS growth marketing channels',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free SaaS growth marketing assessment and optimization guide'
  },
  provider: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
  },
  featureList: [
    'Channel performance assessment',
    'Growth strategy optimization',
    'ROI calculation and modeling',
    'Implementation roadmap generation'
  ],
  audience: {
    '@type': 'BusinessAudience',
    businessFunction: 'Marketing'
  }
};

export default function SaaSGrowthMarketingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SaaSGrowthMarketingGuide />
    </>
  );
}
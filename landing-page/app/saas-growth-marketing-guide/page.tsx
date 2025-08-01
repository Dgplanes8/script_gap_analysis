import type { Metadata } from 'next';
import { SaaSGrowthMarketingGuide } from '@/components/content/saas-growth-marketing-guide';

export const metadata: Metadata = {
  title: 'SaaS Growth Marketing Channel Optimization Guide - Scale Your SaaS Business',
  description: 'Complete guide to SaaS growth marketing with interactive channel assessment tool, optimization playbook, and growth strategy frameworks. Includes channel performance audit and consultation.',
  keywords: 'SaaS growth marketing consultant, SaaS growth marketing guide, SaaS marketing channels, SaaS growth strategy, SaaS marketing optimization',
  openGraph: {
    title: 'SaaS Growth Marketing Channel Optimization Guide - Scale Your SaaS Business',
    description: 'Complete guide to SaaS growth marketing with interactive assessment tools and optimization frameworks.',
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
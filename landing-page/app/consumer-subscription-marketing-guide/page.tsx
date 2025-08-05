import type { Metadata } from 'next';
import { ConsumerSubscriptionMarketingGuide } from '@/components/content/consumer-subscription-marketing-guide';

export const metadata: Metadata = {
  title: 'Consumer Subscription Marketing Channel Optimization Guide - Scale Your D2C Business',
  description: 'Complete guide to consumer subscription marketing with interactive channel assessment tool, optimization playbook, and growth strategy frameworks. Includes channel performance audit and consultation.',
  keywords: 'consumer subscription marketing consultant, D2C subscription marketing guide, consumer subscription marketing channels, D2C growth strategy, subscription marketing optimization',
  openGraph: {
    title: 'Consumer Subscription Marketing Channel Optimization Guide - Scale Your D2C Business',
    description: 'Complete guide to consumer subscription marketing with interactive assessment tools and optimization frameworks.',
    type: 'website',
  },
  alternates: {
    canonical: '/consumer-subscription-marketing-guide',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Consumer Subscription Marketing Channel Assessment',
  applicationCategory: 'BusinessApplication',
  description: 'Interactive assessment tool for optimizing consumer subscription marketing channels',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free consumer subscription marketing assessment and optimization guide'
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

export default function ConsumerSubscriptionMarketingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ConsumerSubscriptionMarketingGuide />
    </>
  );
}
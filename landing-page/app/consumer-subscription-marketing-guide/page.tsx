import type { Metadata } from 'next';
import { ConsumerSubscriptionMarketingGuide } from '@/components/content/consumer-subscription-marketing-guide';

export const metadata: Metadata = {
  title: 'D2C Subscription Secrets: How 3 Brands Hit $100M+ ARR (Free Playbook)',
  description: 'Get the exact strategies behind Dollar Shave Club, BarkBox, and Stitch Fix. Complete D2C playbook: retention tactics, churn prevention, viral growth loops—all free.',
  keywords: 'consumer subscription marketing consultant, D2C subscription marketing guide, consumer subscription marketing channels, D2C growth strategy, subscription marketing optimization',
  openGraph: {
    title: 'D2C Subscription Secrets: How 3 Brands Hit $100M+ ARR (Free Playbook)',
    description: 'Get the exact strategies behind Dollar Shave Club, BarkBox, and Stitch Fix. Complete D2C playbook with retention tactics and viral growth loops.',
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
    name: 'Apsics Media',
    url: 'https://apsicsmedia.com'
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
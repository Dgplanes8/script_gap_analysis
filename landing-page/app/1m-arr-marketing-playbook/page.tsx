import type { Metadata } from 'next';
import { MarketingPlaybookLanding } from '@/components/content/marketing-playbook-landing';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'The $1M ARR Marketing Playbook - Subscription Marketing Strategy Guide',
  description: 'Complete marketing playbook for subscription companies scaling to $1M ARR. Proven frameworks, strategic templates, and implementation guides used by Fortune 100 companies.',
  keywords: 'subscription marketing consultant for $1M ARR companies, subscription marketing strategy, SaaS marketing playbook, $1M ARR marketing guide',
  openGraph: {
    title: 'The $1M ARR Marketing Playbook - Scale Your Subscription Business',
    description: 'Complete marketing playbook for subscription companies scaling to $1M ARR. Proven frameworks and strategic templates.',
    type: 'website',
  },
  alternates: {
    canonical: '/1m-arr-marketing-playbook',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  name: 'The $1M ARR Marketing Playbook',
  description: 'Comprehensive marketing strategy guide for subscription companies scaling to $1M ARR',
  genre: 'Business Strategy Guide',
  inLanguage: 'en-US',
  author: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free comprehensive marketing playbook download'
  },
  educationalLevel: 'Professional',
  audience: {
    '@type': 'BusinessAudience',
    businessFunction: 'Marketing'
  }
};

export default function MarketingPlaybookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingPlaybookLanding />
    </>
  );
}
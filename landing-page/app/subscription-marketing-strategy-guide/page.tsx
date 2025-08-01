import type { Metadata } from 'next';
import { SubscriptionMarketingGuide } from '@/components/content/subscription-marketing-guide';

export const metadata: Metadata = {
  title: 'Complete Guide to Subscription Marketing Strategy - Scale Your Recurring Revenue',
  description: 'Comprehensive 8,000-word guide to subscription marketing strategy. Includes strategic frameworks, implementation checklist, case studies, and 7-part email course for scaling subscription businesses.',
  keywords: 'subscription marketing strategy, subscription business marketing, recurring revenue marketing, subscription marketing consultant, SaaS marketing strategy',
  openGraph: {
    title: 'Complete Guide to Subscription Marketing Strategy - Scale Your Recurring Revenue',
    description: 'Comprehensive guide to subscription marketing strategy with frameworks, case studies, and implementation resources.',
    type: 'article',
  },
  alternates: {
    canonical: '/subscription-marketing-strategy-guide',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Complete Guide to Subscription Marketing Strategy',
  description: 'Comprehensive guide covering subscription marketing frameworks, implementation strategies, and case studies',
  author: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mondaymorningmarketer.com/logo.png'
    }
  },
  datePublished: '2024-01-01',
  dateModified: '2024-01-01',
  wordCount: 8000,
  educationalLevel: 'Professional',
  audience: {
    '@type': 'BusinessAudience',
    businessFunction: 'Marketing'
  }
};

export default function SubscriptionMarketingStrategyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SubscriptionMarketingGuide />
    </>
  );
}
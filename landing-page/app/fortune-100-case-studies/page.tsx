import type { Metadata } from 'next';
import { Fortune100CaseStudies } from '@/components/content/fortune-100-case-studies';

export const metadata: Metadata = {
  title: 'Fortune 100 Ad Intelligence Case Studies - Subscription Marketing Success Stories',
  description: 'Detailed case studies from Fortune 100 subscription marketing campaigns. Download methodology breakdowns, templates, and strategic insights from real campaigns that drove growth.',
  keywords: 'subscription business marketing consultant, Fortune 100 marketing case studies, subscription marketing case studies, marketing consultant case studies',
  openGraph: {
    title: 'Fortune 100 Ad Intelligence Case Studies - Real Marketing Success Stories',
    description: 'Detailed case studies from Fortune 100 subscription marketing campaigns with methodology breakdowns and templates.',
    type: 'website',
  },
  alternates: {
    canonical: '/fortune-100-case-studies',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Fortune 100 Ad Intelligence Case Studies',
  description: 'Collection of detailed marketing case studies from Fortune 100 subscription businesses',
  publisher: {
    '@type': 'Organization',
    name: 'Strategic Ad Intelligence System',
    url: 'https://mondaymorningmarketer.com'
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'Article',
        position: 1,
        name: 'B2B SaaS Platform Growth Case Study',
        description: 'How a project management platform reduced CAC by 58% using customer language analysis'
      },
      {
        '@type': 'Article', 
        position: 2,
        name: 'FinTech Subscription Scaling Case Study',
        description: 'Multi-channel attribution strategy that drove 340% revenue growth'
      },
      {
        '@type': 'Article',
        position: 3, 
        name: 'Marketing Automation Platform Case Study',
        description: 'Creative optimization framework that improved ROAS by 290%'
      },
      {
        '@type': 'Article',
        position: 4,
        name: 'Enterprise Software Case Study', 
        description: 'Account-based marketing strategy for complex B2B sales cycles'
      }
    ]
  }
};

export default function Fortune100CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Fortune100CaseStudies />
    </>
  );
}
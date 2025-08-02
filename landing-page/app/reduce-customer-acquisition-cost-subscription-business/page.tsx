import type { Metadata } from 'next';
import { CACReductionClient } from './client';

export const metadata: Metadata = {
  title: 'How to Reduce CAC by 20% Without Increasing Ad Spend | Strategic Ad Intelligence',
  description: 'Learn Fortune 100 methodology to reduce customer acquisition cost by 20% for subscription businesses. Strategic optimization levers, implementation framework, and measurement tactics.',
  keywords: 'reduce customer acquisition cost subscription, lower CAC subscription business, customer acquisition cost optimization, subscription CAC reduction, Fortune 100 CAC strategy',
  openGraph: {
    title: 'How to Reduce CAC by 20% Without Increasing Ad Spend',
    description: 'Learn Fortune 100 methodology to reduce customer acquisition cost by 20% for subscription businesses.',
    type: 'website',
  },
  alternates: {
    canonical: '/reduce-customer-acquisition-cost-subscription-business',
  },
};

export default function CACReductionPage() {
  return <CACReductionClient />;
}
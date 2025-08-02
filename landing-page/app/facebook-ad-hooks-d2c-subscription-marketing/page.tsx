import type { Metadata } from 'next';
import { FacebookAdHooksClient } from './client';

export const metadata: Metadata = {
  title: 'Facebook Ad Creative Strategy: 15 Winning Hooks for D2C Subscriptions | Strategic Ad Intelligence',
  description: 'Master Facebook ad hooks for D2C subscription businesses. 15 proven hook formulas with psychology breakdowns, A/B testing frameworks, and optimization strategies.',
  keywords: 'Facebook ad hooks subscription business, D2C Facebook marketing, Facebook ad creative strategy, subscription Facebook ads, Facebook hooks that convert',
  openGraph: {
    title: 'Facebook Ad Creative Strategy: 15 Winning Hooks for D2C Subscriptions',
    description: 'Master Facebook ad hooks for D2C subscription businesses with proven formulas and optimization strategies.',
    type: 'website',
  },
  alternates: {
    canonical: '/facebook-ad-hooks-d2c-subscription-marketing',
  },
};

export default function FacebookAdHooksPage() {
  return <FacebookAdHooksClient />;
}
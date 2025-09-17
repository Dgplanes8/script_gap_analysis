import type { Metadata } from 'next';
import { FacebookAdHooksClient } from './client';

export const metadata: Metadata = {
  title: '15 Facebook Ad Hooks That Generated $47M+ for D2C Brands (Copy & Paste)',
  description: 'Get the exact Facebook hooks behind Dollar Shave Club, HelloFresh, and BarkBox success. 15 proven formulas with psychology breakdowns. Stop guessing—start converting.',
  keywords: 'Facebook ad hooks subscription business, D2C Facebook marketing, Facebook ad creative strategy, subscription Facebook ads, Facebook hooks that convert',
  openGraph: {
    title: '15 Facebook Ad Hooks That Generated $47M+ for D2C Brands (Copy & Paste)',
    description: 'Get the exact Facebook hooks behind Dollar Shave Club, HelloFresh, and BarkBox success. 15 proven formulas with psychology breakdowns.',
    type: 'website',
  },
  alternates: {
    canonical: '/facebook-ad-hooks-d2c-subscription-marketing',
  },
};

export default function FacebookAdHooksPage() {
  return <FacebookAdHooksClient />;
}
import type { Metadata } from 'next';
import { TikTokHooksClient } from './client';

export const metadata: Metadata = {
  title: '25 TikTok Hooks That Convert for Subscription Businesses | Apsics Media',
  description: 'Discover 25 proven TikTok hooks that drive conversions for subscription businesses. Based on Fortune 100 methodology with psychology breakdowns and optimization frameworks.',
  keywords: 'TikTok hooks subscription business, TikTok marketing subscription, viral TikTok hooks, subscription business TikTok strategy, TikTok hooks that convert',
  openGraph: {
    title: '25 TikTok Hooks That Convert for Subscription Businesses',
    description: 'Discover 25 proven TikTok hooks that drive conversions for subscription businesses. Based on Fortune 100 methodology.',
    type: 'website',
  },
  alternates: {
    canonical: '/tiktok-hooks-subscription-business-marketing',
  },
};

export default function TikTokHooksPage() {
  return <TikTokHooksClient />;
}
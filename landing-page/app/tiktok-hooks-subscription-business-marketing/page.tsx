import type { Metadata } from 'next';
import { TikTokHooksClient } from './client';

export const metadata: Metadata = {
  title: '25 Viral TikTok Hooks That Generated 100M+ Views (Subscription Gold Mine)',
  description: 'Get the exact TikTok hooks that went viral for subscription brands. 25 proven formulas from 100M+ view analysis. Turn views into subscribers with psychology-backed hooks.',
  keywords: 'TikTok hooks subscription business, TikTok marketing subscription, viral TikTok hooks, subscription business TikTok strategy, TikTok hooks that convert',
  openGraph: {
    title: '25 Viral TikTok Hooks That Generated 100M+ Views (Subscription Gold Mine)',
    description: 'Get the exact TikTok hooks that went viral for subscription brands. 25 proven formulas from 100M+ view analysis.',
    type: 'website',
  },
  alternates: {
    canonical: '/tiktok-hooks-subscription-business-marketing',
  },
};

export default function TikTokHooksPage() {
  return <TikTokHooksClient />;
}
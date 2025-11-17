export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Free AI Ad Script Generator - TikTok, Reels, YouTube Shorts | APSICS Media',
  description: 'Generate platform-native ad scripts for TikTok, Instagram Reels, YouTube Shorts, Meta ads in 30 seconds. UGC-ready copy from $250M intelligence. Free 10 credits/month, no signup.',
  keywords: 'ad script generator, ai ad script generator free, tiktok ad script generator, instagram reels script generator, youtube shorts ad script generator, ugc script generator free, video ad script generator, meta ads script generator, facebook ad script, linkedin video ad script, saas ad script generator, d2c video ad script, mobile app ad script generator, tiktok script generator free, reels ad script, shorts script generator, ugc creator script, platform native ad copy',
  openGraph: {
    title: 'Free AI Ad Script Generator - TikTok, Reels, YouTube Shorts',
    description: 'Generate platform-native ad scripts for TikTok, Instagram Reels, YouTube Shorts in 30 seconds. UGC-ready copy from $250M intelligence.',
    type: 'website',
    url: 'https://apsicsmedia.com/ai-ad-script-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Ad Script Generator',
    description: 'Generate TikTok, Reels, and YouTube Shorts scripts in 30 seconds from $250M ad intelligence.',
  },
  alternates: {
    canonical: '/ai-ad-script-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Dynamic import of the heavy client component for better performance
const AdScriptGeneratorClient = nextDynamic(() => import('./client-page').catch(err => {
  console.error('Failed to load AdScriptGeneratorClient:', err);
  throw err;
}), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: false
});

export default function AdScriptGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-50">
      <div className="pt-4 md:pt-8">
        <AdScriptGeneratorClient />
      </div>
    </div>
  );
}

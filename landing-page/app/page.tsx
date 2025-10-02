import type { Metadata } from 'next';
import { AlyticsLanding } from '@/components/alytics/alytics-landing';

export const metadata: Metadata = {
  title: 'Stop Launching Ads That Flop - APSICS Media Credit Platform',
  description: 'Get proven ad scripts that actually work in 60 seconds. Built from analyzing $250M+ in ad spend. Try free, then claim 10 credits.',
  keywords: 'ad scripts, UGC scripts, paid ads, business marketing, ad intelligence, strategic advertising, growing businesses, viral content, conversion optimization',
  authors: [{ name: 'Apsics Media' }],
  creator: 'Apsics Media',
  publisher: 'Apsics Media',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Stop Launching Ads That Flop - APSICS Media Credit Platform',
    description: 'Get proven ad scripts that actually work in 60 seconds. Built from analyzing $250M+ in ad spend.',
    url: '/',
    siteName: 'Apsics Media',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ad Scripts that Convert - APSICS Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Launching Ads That Flop - APSICS Media Credit Platform',
    description: 'Get proven ad scripts that actually work in 60 seconds. Built from analyzing $250M+ in ad spend.',
    images: ['/images/og-image.png'],
    creator: '@apsicsmedia',
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

export default function HomePage() {
  return <AlyticsLanding />;
}

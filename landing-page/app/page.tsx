import type { Metadata } from 'next';
import { AlyticsLanding } from '@/components/alytics/alytics-landing';

export const metadata: Metadata = {
  title: 'The 25% CAC Reduction Secret (Weekly Creative Intelligence) | APSICS Media',
  description: 'Stop wasting ad spend. Get weekly creative intelligence + battle-tested scripts that reduced CAC by 25% for 500+ brands. From $250M+ managed spend experience.',
  keywords: 'content intelligence, UGC scripts, paid ads, business marketing, creative intelligence, strategic ad intelligence, growing businesses, viral content, conversion optimization',
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
    title: 'The 25% CAC Reduction Secret (Weekly Creative Intelligence) | APSICS Media',
    description: 'Stop wasting ad spend. Get weekly creative intelligence + battle-tested scripts that reduced CAC by 25% for 500+ brands.',
    url: '/',
    siteName: 'Apsics Media',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Creative Intelligence that Converts - APSICS Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 25% CAC Reduction Secret (Weekly Creative Intelligence) | APSICS Media',
    description: 'Stop wasting ad spend. Get weekly creative intelligence + battle-tested scripts that reduced CAC by 25% for 500+ brands.',
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

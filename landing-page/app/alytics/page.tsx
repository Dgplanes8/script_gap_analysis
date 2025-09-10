import type { Metadata } from 'next';
import { AlyticsLanding } from '@/components/alytics/alytics-landing';

export const metadata: Metadata = {
  title: 'APSICS Media | Turn Content Chaos Into Conversion Intelligence',
  description: 'Weekly content intelligence + custom scripts for UGC and paid ads. Built from trending data analysis and tailored to your specific needs—without the chaos.',
  keywords: 'content intelligence, UGC scripts, paid ads, startup marketing, creative intelligence',
  openGraph: {
    title: 'APSICS Media | Turn Content Chaos Into Conversion Intelligence',
    description: 'Weekly content intelligence + custom scripts for UGC and paid ads. Built from trending data analysis and tailored to your specific needs.',
    type: 'website',
    images: [
      {
        url: '/images/alytics-og.jpg',
        width: 1200,
        height: 630,
        alt: 'APSICS Media - Content Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APSICS Media | Turn Content Chaos Into Conversion Intelligence',
    description: 'Weekly content intelligence + custom scripts for UGC and paid ads.',
    images: ['/images/alytics-og.jpg'],
  },
  alternates: {
    canonical: '/alytics',
  },
};

export default function AlyticsPage() {
  return <AlyticsLanding />;
}
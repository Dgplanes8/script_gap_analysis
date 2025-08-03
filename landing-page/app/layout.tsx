import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/structured-data';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strategic Ad Intelligence System - Fortune 100 Methodology for Subscription Businesses',
  description:
    'Transform your subscription business with Fortune 100 systematic methodology. Strategic partnerships for $500K-$2M ARR companies ready to scale systematically. 11-phase proven process.',
  keywords:
    'strategic ad intelligence, Fortune 100 methodology, subscription business marketing, systematic marketing process, CAC optimization, strategic consulting, subscription growth',
  authors: [{ name: 'Monday Morning Marketer' }],
  creator: 'Monday Morning Marketer',
  publisher: 'Monday Morning Marketer',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Strategic Ad Intelligence System - Fortune 100 Methodology',
    description:
      'Transform your subscription business with Fortune 100 systematic methodology. Strategic partnerships for $500K-$2M ARR companies ready to scale systematically.',
    url: '/',
    siteName: 'Monday Morning Marketer',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Monday Morning Marketer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategic Ad Intelligence System - Fortune 100 Methodology',
    description:
      'Transform your subscription business with Fortune 100 systematic methodology. Strategic partnerships for $500K-$2M ARR companies ready to scale systematically.',
    images: ['/images/og-image.jpg'],
    creator: '@mondaymorningmarketer',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
        <StructuredData />
        <SpeedInsights />
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monday Morning Marketer - 12 Shoot-Ready Ad Scripts in 72 Hours',
  description:
    'Get 12 shoot-ready ad scripts in 72 hours for $990. Customer-language hooks from reviews and Reddit for fitness/sports apps. Free 7-day pilot available.',
  keywords:
    'ad scripts, fitness app marketing, sports app ads, customer language hooks, CTR optimization, TSR improvement, Reddit marketing, review-based hooks',
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
    title: 'Monday Morning Marketer - 12 Shoot-Ready Ad Scripts in 72 Hours',
    description:
      'Get 12 shoot-ready ad scripts in 72 hours for $990. Customer-language hooks from reviews and Reddit for fitness/sports apps.',
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
    title: 'Monday Morning Marketer - 12 Shoot-Ready Ad Scripts in 72 Hours',
    description:
      'Get 12 shoot-ready ad scripts in 72 hours for $990. Customer-language hooks from reviews and Reddit for fitness/sports apps.',
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
      </body>
    </html>
  );
}
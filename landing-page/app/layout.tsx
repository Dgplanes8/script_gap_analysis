import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/structured-data';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ConsultationProvider } from '@/components/contexts/consultation-context';
import { ConsultationModal } from '@/components/modals/consultation-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apsics Media - Weekly Trend Intelligence for Subscription Businesses',
  description:
    'Get viral scripts every Monday based on trending formats + competitor analysis. Fortune 100 methodology delivering weekly trend intelligence starting at $67/month.',
  keywords:
    'weekly trend intelligence, viral scripts, competitor analysis, subscription business marketing, Fortune 100 marketing, TikTok trends, weekly creative concepts',
  authors: [{ name: 'Apsics Media' }],
  creator: 'Apsics Media',
  publisher: 'Apsics Media',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Apsics Media - Weekly Trend Intelligence for Subscription Businesses',
    description:
      'Get viral scripts every Monday based on trending formats + competitor analysis. Fortune 100 methodology starting at $67/month.',
    url: '/',
    siteName: 'Apsics Media',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apsics Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apsics Media - Weekly Trend Intelligence for Subscription Businesses',
    description:
      'Get viral scripts every Monday based on trending formats + competitor analysis. Fortune 100 methodology starting at $67/month.',
    images: ['/images/og-image.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ConsultationProvider>
          {children}
          <ConsultationModal />
          <Analytics />
          <StructuredData />
          <SpeedInsights />
        </ConsultationProvider>
      </body>
    </html>
  );
}
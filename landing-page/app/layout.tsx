import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/schema';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ConsultationProvider } from '@/components/contexts/consultation-context';
import { ConsultationModal } from '@/components/modals/consultation-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weekly Ad Hooks & Creative Scripts for Subscription Businesses | Apsics Media',
  description:
    'Get viral ad hooks and creative scripts every Monday. Reduce CAC by 25%, increase conversion rates 3x faster with trending concepts + competitor analysis. Growth marketing teams at subscription companies starting at $67/month.',
  keywords:
    'ad hooks, creative hooks, facebook ad templates, viral content, subscription marketing, creative scripts, reduce CAC, increase conversions, creative strategy, growth marketing, weekly trend intelligence, copywriting templates, social media hooks, tiktok hooks, subscription business creative, saas creative, conversion copywriting',
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
    title: 'Weekly Ad Hooks & Creative Scripts for Subscription Businesses | Apsics Media',
    description:
      'Get viral ad hooks and creative scripts every Monday. Reduce CAC by 25%, increase conversion rates 3x faster with trending concepts + competitor analysis for growth marketing teams.',

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
    title: 'Weekly Ad Hooks & Creative Scripts for Subscription Businesses | Apsics Media',
    description:
      'Get viral ad hooks and creative scripts every Monday. Reduce CAC by 25%, increase conversion rates 3x faster with trending concepts + competitor analysis for growth marketing teams.',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
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
          <StructuredData pageType="homepage" />
          <SpeedInsights />
        </ConsultationProvider>
      </body>
    </html>
  );
}
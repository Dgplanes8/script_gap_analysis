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
  title: 'Apsics Media - Performance Marketing Acceleration in 48 Hours',
  description:
    'Ready-to-develop scripts delivered in 48 hours. Each creative concept includes 3 platform-optimized scripts. Expert performance marketing acceleration with AI-enhanced research.',
  keywords:
    'performance marketing acceleration, ready-to-develop scripts, creative concepts, performance marketing consultant, D2C marketing, subscription business marketing',
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
    title: 'Apsics Media - Performance Marketing Acceleration in 48 Hours',
    description:
      'Ready-to-develop scripts delivered in 48 hours. Each creative concept includes 3 platform-optimized scripts. Expert performance marketing acceleration.',
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
    title: 'Apsics Media - Performance Marketing Acceleration in 48 Hours',
    description:
      'Ready-to-develop scripts delivered in 48 hours. Each creative concept includes 3 platform-optimized scripts. Expert performance marketing acceleration.',
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
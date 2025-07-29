import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monday Morning Marketer - Transform Your Marketing Strategy',
  description:
    'Join the Monday Morning Marketer community and transform your marketing strategy with expert insights, proven frameworks, and actionable tactics.',
  keywords:
    'marketing strategy, digital marketing, marketing framework, business growth, marketing insights',
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
    title: 'Monday Morning Marketer - Transform Your Marketing Strategy',
    description:
      'Join the Monday Morning Marketer community and transform your marketing strategy with expert insights, proven frameworks, and actionable tactics.',
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
    title: 'Monday Morning Marketer - Transform Your Marketing Strategy',
    description:
      'Join the Monday Morning Marketer community and transform your marketing strategy with expert insights, proven frameworks, and actionable tactics.',
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
      </body>
    </html>
  );
}
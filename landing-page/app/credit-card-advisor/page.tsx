import type { Metadata } from 'next';
import { CreditCardAdvisor } from '@/components/credit-card-advisor/credit-card-advisor';

export const metadata: Metadata = {
  title: 'AI Credit Card Advisor | Get Personalized Card Recommendations',
  description: 'Get expert credit card recommendations tailored to your spending habits. Our AI advisor analyzes your needs and suggests the best premium travel cards like Amex Platinum and Chase Sapphire Reserve.',
  keywords: 'credit card advisor, AI credit card recommendations, Amex Platinum, Chase Sapphire Reserve, travel credit cards, credit card comparison, premium credit cards',
  authors: [{ name: 'APSICS Media' }],
  creator: 'APSICS Media',
  publisher: 'APSICS Media',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com'
  ),
  alternates: {
    canonical: '/credit-card-advisor',
  },
  openGraph: {
    title: 'AI Credit Card Advisor | Get Personalized Card Recommendations',
    description: 'Get expert credit card recommendations tailored to your spending habits. Our AI advisor analyzes your needs and suggests the best premium travel cards.',
    url: '/credit-card-advisor',
    siteName: 'APSICS Media',
    images: [
      {
        url: '/images/og-credit-card-advisor.png',
        width: 1200,
        height: 630,
        alt: 'AI Credit Card Advisor - Personalized Recommendations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Credit Card Advisor | Get Personalized Card Recommendations',
    description: 'Get expert credit card recommendations tailored to your spending habits. Our AI advisor analyzes your needs and suggests the best premium travel cards.',
    images: ['/images/og-credit-card-advisor.png'],
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

export default function CreditCardAdvisorPage() {
  return <CreditCardAdvisor />;
}
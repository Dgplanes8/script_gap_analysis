import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Weekly Ad Templates for Startups | Common Questions | APSICS Media',
  description: 'Get answers to common questions about weekly ad templates for startups. Pricing, delivery, customization, and implementation support.',
  keywords: 'startup ad templates FAQ, weekly ad delivery questions, creative strategy pricing, startup marketing support',
  openGraph: {
    title: 'FAQ - Weekly Ad Templates for Startups | Common Questions',
    description: 'Get answers to common questions about weekly ad templates for startups. Pricing, delivery, customization support.',
    type: 'website',
    images: [
      {
        url: '/images/faq-og.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ - Weekly Ad Templates for Startups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Weekly Ad Templates for Startups | Common Questions',
    description: 'Common questions about weekly ad templates for startup founders.',
    images: ['/images/faq-og.jpg'],
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
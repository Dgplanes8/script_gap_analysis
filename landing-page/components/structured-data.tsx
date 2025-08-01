'use client';

import Script from 'next/script';

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        name: 'Monday Morning Marketer',
        url: process.env.NEXT_PUBLIC_APP_URL,
        email: 'mondaymorningmarketer@gmail.com',
        description: 'Customer-language ad scripts for subscription companies. 12 shoot-ready scripts in 48 hours.',
        sameAs: [
          'https://twitter.com/mondaymorningmarketer',
          'https://linkedin.com/company/monday-morning-marketer',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
        url: process.env.NEXT_PUBLIC_APP_URL,
        name: 'Monday Morning Marketer',
        description: 'Get 12 shoot-ready ad scripts in 48 hours for $990. Customer-language hooks from reviews and Reddit for subscription companies.',
        publisher: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#service`,
        name: '48-Hour Ad Script System',
        description: '12 shoot-ready ad scripts with thumbnails and test plan, delivered in 48 hours',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '990',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validThrough: '2024-12-31',
          description: '12 scripts (3 concepts x 4 variants), 6 thumbnails, Mini Angle Map, 1-week test plan',
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Subscription Company Marketers',
        },
        serviceType: 'Digital Marketing Services',
        category: 'Advertising Scripts',
      },
      {
        '@type': 'Product',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}/pilot#product`,
        name: 'Free 7-Day Scripts Pilot',
        description: '3 high-intent ad concepts for your subscription business with free 7-day scripts pilot',
        brand: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: '12 scripts, 6 storyboard thumbnails, 1-week test matrix, mid-week iteration',
        },
        category: 'Marketing Services',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you produce video?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pilot is scripts + thumbnails; production is part of the retainer.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is your refund policy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Full refund if scoped deliverables aren\'t provided within 48 business hours of intake completion.',
            },
          },
          {
            '@type': 'Question',
            name: 'What do I get for $990?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '12 scripts (TikTok/Reels/FB tagged, 0-3s hooks), 6 thumbnails, Mini Angle Map, 1-week test plan.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '24-48 business hours from brief completion for pilot, 48 hours for $990 package.',
            },
          },
        ],
      },
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
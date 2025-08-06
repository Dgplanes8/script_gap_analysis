'use client';

import Script from 'next/script';

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        name: 'Apsics Media',
        url: process.env.NEXT_PUBLIC_APP_URL,
        email: 'hello@apsicsmedia.com',
        description: 'Performance marketing acceleration with ready-to-develop scripts. Expert creative strategy delivered in 48 hours.',
        sameAs: [
          'https://twitter.com/apsicsmedia',
          'https://linkedin.com/company/apsics-media',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#website`,
        url: process.env.NEXT_PUBLIC_APP_URL,
        name: 'Apsics Media',
        description: 'Performance marketing acceleration with ready-to-develop scripts. Each concept includes 3 platform-optimized scripts delivered in 48 hours.',
        publisher: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#service`,
        name: 'Performance Marketing Acceleration',
        description: 'Ready-to-develop scripts with expert creative strategy and competitive intelligence, delivered in 48 hours',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '97',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validThrough: '2024-12-31',
          description: '1 expert creative concept per week with 3 ready-to-develop scripts, trending analysis, competitive context',
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'D2C and Subscription Business Marketers',
        },
        serviceType: 'Performance Marketing Acceleration',
        category: 'Creative Strategy and Scripts',
      },
      {
        '@type': 'Product',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}/pilot#product`,
        name: '$100 Strategy Consultation',
        description: '30-minute performance marketing assessment with $100 credit toward any package',
        brand: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '100',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Performance marketing assessment, custom recommendation, $100 credit applied to chosen package',
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
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
        email: 'brian@apsicsmedia.com',
        description: 'Weekly trend intelligence for subscription businesses. Creative concepts and competitor analysis delivered every Monday to growth teams.',
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
        description: 'Weekly trend intelligence for subscription businesses. Fresh creative concepts and competitor analysis delivered every Monday.',
        publisher: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        '@id': `${process.env.NEXT_PUBLIC_APP_URL}#service`,
        name: 'Weekly Trend Intelligence for Subscription Businesses',
        description: 'Weekly creative concepts and competitor analysis for subscription business growth teams, starting at $67/month',
        provider: {
          '@id': `${process.env.NEXT_PUBLIC_APP_URL}#organization`,
        },
        offers: [
          {
            '@type': 'Offer',
            price: '67',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            description: 'Trend Tracker - 1 creative concept with 2 scripts delivered weekly',
          },
          {
            '@type': 'Offer',
            price: '197',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            description: 'Competitive Edge - 2 creative concepts with 4 scripts delivered weekly',
          },
          {
            '@type': 'Offer',
            price: '497',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            description: 'Market Intelligence - 3 creative concepts with 6 scripts delivered weekly',
          }
        ],
        audience: {
          '@type': 'Audience',
          audienceType: 'Growth Marketing Teams at Subscription Companies',
        },
        serviceType: 'Weekly Creative Intelligence',
        category: 'Marketing Strategy and Creative Development',
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
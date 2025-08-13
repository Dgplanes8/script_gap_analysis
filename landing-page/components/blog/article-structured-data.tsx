'use client';

import Script from 'next/script';

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
  keywords?: string[];
  author?: string;
  readingTime?: number;
}

export function ArticleStructuredData({
  title,
  description,
  slug,
  publishedDate = new Date().toISOString(),
  modifiedDate = new Date().toISOString(),
  category = 'Marketing Strategy',
  keywords = [],
  author = 'Strategic Ad Intelligence Team',
  readingTime = 8,
}: ArticleStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${baseUrl}${slug}#article`,
        isPartOf: {
          '@id': `${baseUrl}${slug}#webpage`,
        },
        author: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
          name: author,
        },
        headline: title,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        mainEntityOfPage: {
          '@id': `${baseUrl}${slug}#webpage`,
        },
        publisher: {
          '@id': `${baseUrl}#organization`,
        },
        image: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}${slug}#primaryimage`,
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
        },
        thumbnailUrl: `${baseUrl}/images/og-image.jpg`,
        keywords: keywords.join(', '),
        wordCount: readingTime * 250, // Approximate words based on reading time
        articleSection: category,
        about: {
          '@type': 'Thing',
          name: category,
        },
        description: description,
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}${slug}#webpage`,
        url: `${baseUrl}${slug}`,
        name: title,
        isPartOf: {
          '@id': `${baseUrl}#website`,
        },
        primaryImageOfPage: {
          '@id': `${baseUrl}${slug}#primaryimage`,
        },
        datePublished: publishedDate,
        dateModified: modifiedDate,
        description: description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${baseUrl}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: title,
              item: `${baseUrl}${slug}`,
            },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'Strategic Ad Intelligence',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}#logo`,
          url: `${baseUrl}/images/logo.png`,
          width: 600,
          height: 60,
        },
        image: {
          '@id': `${baseUrl}#logo`,
        },
        description: 'Weekly trend intelligence and creative strategy for subscription businesses',
        foundingDate: '2023',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-888-GROWTH',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
        sameAs: [
          'https://twitter.com/strategicadintel',
          'https://linkedin.com/company/strategic-ad-intelligence',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: 'Strategic Ad Intelligence',
        description: 'Weekly creative intelligence for subscription marketing teams',
        publisher: {
          '@id': `${baseUrl}#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <Script
      id={`structured-data-${slug.replace(/[^a-z0-9]/gi, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
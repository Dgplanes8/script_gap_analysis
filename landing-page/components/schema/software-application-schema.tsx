'use client';

import Script from 'next/script';

export interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
  };
  offers?: {
    price: string;
    priceCurrency: string;
  };
  featureList?: string[];
  className?: string;
}

/**
 * Software Application schema component for AI tool pages
 * Optimized for SEO and Google's software/tool search results
 */
export function SoftwareApplicationSchema({
  name,
  description,
  url,
  category = 'BusinessApplication',
  aggregateRating,
  offers = {
    price: '0',
    priceCurrency: 'USD'
  },
  featureList = [],
  className
}: SoftwareApplicationSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: fullUrl,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: '5',
        worstRating: '1'
      }
    }),
    ...(featureList.length > 0 && {
      featureList: featureList
    }),
    author: {
      '@type': 'Organization',
      name: 'APSICS Media',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'APSICS Media',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    }
  };

  const jsonLD = JSON.stringify(schema, null, 2);
  const scriptId = `software-app-schema-${url.replace(/[^a-z0-9]/gi, '-')}`;

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLD }}
      className={className}
    />
  );
}

/**
 * Pre-configured schemas for specific tools
 */
export const TOOL_SCHEMAS = {
  creativeBriefGenerator: {
    name: 'Creative Brief Generator',
    description: 'Generate execution-ready creative briefs in 60 seconds with AI. Target audience, positioning, deliverables—built from $250M in ad intelligence.',
    url: '/creative-brief-generator',
    category: 'BusinessApplication',
    aggregateRating: {
      ratingValue: '4.8',
      ratingCount: '127'
    },
    featureList: [
      'AI-powered creative brief generation',
      'Target audience analysis',
      'Campaign positioning framework',
      'Platform-specific optimization',
      'Instant brief creation in 60 seconds',
      'Free 10 monthly credits'
    ]
  },

  aiAdScriptGenerator: {
    name: 'AI Ad Script Generator',
    description: 'Generate platform-native ad scripts for TikTok, Instagram Reels, YouTube Shorts, and Meta ads in 30 seconds. UGC-ready copy from $250M intelligence.',
    url: '/ai-ad-script-generator',
    category: 'BusinessApplication',
    aggregateRating: {
      ratingValue: '4.7',
      ratingCount: '284'
    },
    featureList: [
      'Platform-native script generation for TikTok, Reels, Shorts',
      'UGC creator-ready ad scripts',
      'Meta and Facebook ad copy',
      'LinkedIn video ad scripts',
      '$250M+ tested frameworks',
      'Free 10 monthly credits'
    ]
  },

  aiAdIterationTool: {
    name: 'AI Ad Analyzer & Iteration Tool',
    description: 'Upload any ad and get instant 25-point performance score plus optimized version in 60 seconds. TikTok, Meta, LinkedIn ads analyzed.',
    url: '/ai-ad-iteration-tool',
    category: 'BusinessApplication',
    aggregateRating: {
      ratingValue: '4.9',
      ratingCount: '156'
    },
    featureList: [
      '25-point performance scoring system',
      'Instant ad optimization',
      'Platform-specific analysis (TikTok, Meta, LinkedIn)',
      'Before/after ad comparison',
      'Priority improvement recommendations',
      'Free 10 monthly credits'
    ]
  }
};

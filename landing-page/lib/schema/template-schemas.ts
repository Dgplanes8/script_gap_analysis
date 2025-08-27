/**
 * Comprehensive Structured Data Schemas for Apsics Media Templates
 * 
 * Provides Schema.org structured data generation for all template types
 * to enhance SEO visibility and search engine understanding.
 */

import {
  Article,
  WebApplication,
  WebPage,
  FAQPage,
  Question,
  Answer,
  BreadcrumbList,
  ListItem,
  Organization,
  ImageObject,
  Thing,
  BRAND_CONFIG,
  SERVICE_TIERS
} from './types';

// Base organization schema for Apsics Media
export const APSICS_ORGANIZATION: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BRAND_CONFIG.baseUrl}#organization`,
  name: BRAND_CONFIG.companyName,
  alternateName: 'Apsics',
  url: BRAND_CONFIG.baseUrl,
  email: BRAND_CONFIG.email,
  description: BRAND_CONFIG.description,
  logo: {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${BRAND_CONFIG.baseUrl}${BRAND_CONFIG.logo.url}`,
    width: BRAND_CONFIG.logo.width,
    height: BRAND_CONFIG.logo.height,
    alt: `${BRAND_CONFIG.companyName} Logo`
  },
  sameAs: [
    'https://twitter.com/apsicsmedia',
    'https://linkedin.com/company/apsicsmedia'
  ],
  knowsAbout: [
    'Performance Marketing',
    'Creative Strategy',
    'Subscription Business Growth',
    'Marketing Intelligence',
    'Ad Creative Testing',
    'Conversion Rate Optimization'
  ]
};

/**
 * Generate Article Schema for Blog Posts
 */
export function generateBlogPostSchema({
  title,
  description,
  slug,
  category = 'Marketing Strategy',
  keywords = [],
  readingTime = 5,
  publishedDate,
  modifiedDate,
  imageUrl
}: {
  title: string;
  description: string;
  slug: string;
  category?: string;
  keywords?: string[];
  readingTime?: number;
  publishedDate?: string;
  modifiedDate?: string;
  imageUrl?: string;
}): Article {
  const published = publishedDate || new Date().toISOString();
  const modified = modifiedDate || published;
  const fullUrl = `${BRAND_CONFIG.baseUrl}${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: fullUrl,
    datePublished: published,
    dateModified: modified,
    author: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    publisher: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    articleSection: category,
    keywords: keywords.join(', '),
    wordCount: readingTime * 200, // Estimate 200 words per minute
    about: {
      '@type': 'Thing',
      name: 'Startup Marketing Strategy',
      description: 'Strategic marketing guidance for early-stage startups and growing companies'
    },
    inLanguage: 'en-US',
    image: imageUrl ? {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title
    } : undefined
  };
}

/**
 * Generate WebApplication Schema for Calculator Templates
 */
export function generateCalculatorSchema({
  title,
  description,
  slug,
  features = [],
  category = 'BusinessApplication'
}: {
  title: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
}): WebApplication {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: `${BRAND_CONFIG.baseUrl}${slug}`,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    author: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    offers: [{
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: `Free ${title} with instant results and strategic recommendations`
    }],
    featureList: features.length > 0 ? features : [
      'Real-time calculations',
      'Industry benchmarks',
      'Strategic recommendations',
      'Scenario modeling',
      'Instant results'
    ]
  };
}

/**
 * Generate Course Schema for Playbook Templates
 */
export function generatePlaybookSchema({
  title,
  description,
  slug,
  modules = [],
  duration = 'PT2H'
}: {
  title: string;
  description: string;
  slug: string;
  modules?: Array<{ title: string; description: string; duration?: string }>;
  duration?: string;
}): Course {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: description,
    url: `${BRAND_CONFIG.baseUrl}${slug}`,
    provider: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    educationalLevel: 'Intermediate',
    audience: {
      '@type': 'Audience',
      audienceType: 'Startup Founders and Marketing Teams',
      name: 'Early-Stage Startup Teams'
    },
    timeRequired: duration,
    courseMode: 'Self-paced',
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: 'Marketing Strategy Implementation',
      description: 'Practical marketing strategies and frameworks for startup growth'
    },
    hasCourseInstance: modules.length > 0 ? modules.map((module, index) => ({
      '@type': 'CourseInstance',
      courseMode: 'Self-paced',
      name: module.title,
      description: module.description,
      position: index + 1
    })) : undefined
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; href: string }>): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BRAND_CONFIG.baseUrl}${item.href}`
    }))
  };
}

/**
 * Generate Service Schema for Service Tier Pages
 */
export function generateServiceSchema({
  tierKey,
  additionalDescription
}: {
  tierKey: keyof typeof SERVICE_TIERS;
  additionalDescription?: string;
}) {
  const tier = SERVICE_TIERS[tierKey];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tier.name,
    description: additionalDescription || tier.description,
    provider: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    serviceType: 'Marketing Intelligence Service',
    category: 'Professional Services',
    audience: {
      '@type': 'Audience',
      audienceType: tier.target,
      name: tier.ideal
    },
    offers: tier.price !== 'Custom' ? {
      '@type': 'Offer',
      price: tier.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: tier.price,
        priceCurrency: 'USD',
        unitCode: 'WEE', // Weekly
        unitText: 'per week'
      },
      description: tier.description
    } : undefined
  };
}

/**
 * Generate How-To Schema for Step-by-Step Guides
 */
export function generateHowToSchema({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url
    })),
    totalTime: `PT${Math.max(steps.length * 5, 15)}M`, // Minimum 15 minutes, 5 minutes per step
    tool: ['Web Browser', 'Email Account'],
    supply: ['Marketing Budget', 'Brand Guidelines'],
    about: {
      '@type': 'Thing',
      name: 'Marketing Implementation'
    }
  };
}

/**
 * Generate VideoObject Schema for Video Content
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  duration,
  uploadDate
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  uploadDate?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    contentUrl: contentUrl,
    embedUrl: embedUrl,
    duration: duration,
    uploadDate: uploadDate || new Date().toISOString(),
    publisher: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    },
    creator: {
      '@id': `${BRAND_CONFIG.baseUrl}#organization`
    }
  };
}

/**
 * Generate Complete Schema Graph for a Template Page
 */
export function generateTemplateSchemaGraph({
  pageType,
  title,
  description,
  slug,
  breadcrumbs = [],
  faqs = [],
  additionalSchemas = []
}: {
  pageType: 'blog' | 'calculator' | 'playbook' | 'service' | 'generic';
  title: string;
  description: string;
  slug: string;
  breadcrumbs?: Array<{ name: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  additionalSchemas?: any[];
}) {
  const schemas: any[] = [APSICS_ORGANIZATION];

  // Add page-specific schema
  switch (pageType) {
    case 'blog':
      schemas.push(generateBlogPostSchema({ title, description, slug }));
      break;
    case 'calculator':
      schemas.push(generateCalculatorSchema({ title, description, slug }));
      break;
    case 'playbook':
      schemas.push(generatePlaybookSchema({ title, description, slug }));
      break;
    case 'service':
      schemas.push(generateServiceSchema({ tierKey: 'trendTracker' }));
      break;
  }

  // Add breadcrumbs if provided
  if (breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add FAQs if provided
  if (faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  // Add any additional schemas
  schemas.push(...additionalSchemas);

  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
}

/**
 * Common FAQ Collections for Different Template Types
 */
export const TEMPLATE_FAQS = {
  blog: [
    {
      question: 'How can startups create effective marketing campaigns?',
      answer: 'Startups should focus on clear value propositions, target specific pain points, use customer language, and test iteratively. Templates and proven frameworks help founders launch campaigns faster without extensive marketing experience.'
    },
    {
      question: 'What is a good marketing budget for early-stage startups?',
      answer: 'Early-stage startups typically allocate $500-$5K monthly for marketing and advertising, representing 5-15% of revenue. Bootstrap companies often start with $500-$1K while Series A startups may spend $2K-$5K monthly.'
    },
    {
      question: 'How often should startups update their marketing creative?',
      answer: 'Marketing creative should be updated weekly to prevent audience fatigue and maintain performance. Fresh creative maintains engagement and prevents declining conversion rates, especially important for performance marketing campaigns.'
    }
  ],
  calculator: [
    {
      question: 'How accurate are these marketing calculators?',
      answer: 'Our calculators use industry benchmarks and data from managing over $250MM in ad spend. Results provide directional guidance based on proven performance data, but individual results will vary based on execution and market conditions.'
    },
    {
      question: 'Can I trust these calculations for my budget planning?',
      answer: 'These calculations provide strategic estimates based on industry averages. Use them for initial planning and benchmarking, but always validate with your own testing and performance data as you scale your campaigns.'
    }
  ],
  playbook: [
    {
      question: 'How long does it take to implement these strategies?',
      answer: 'Most strategies in our playbooks can be implemented within 2-4 weeks for basics, with full optimization taking 6-12 weeks. The key is consistent execution and iterative testing rather than perfect implementation from day one.'
    },
    {
      question: 'Do these strategies work for all business types?',
      answer: 'Our strategies are optimized for subscription and recurring revenue businesses (SaaS, D2C subscriptions, memberships), but the frameworks adapt well to any business needing systematic growth and marketing optimization.'
    }
  ]
};

// Interface for TypeScript type checking
interface Course {
  '@context': string;
  '@type': 'Course';
  name: string;
  description?: string;
  url?: string;
  provider: Organization | { '@id': string };
  educationalLevel?: string;
  audience?: { '@type': 'Audience'; audienceType: string; name?: string };
  timeRequired?: string;
  courseMode?: string;
  isAccessibleForFree?: boolean;
  about?: Thing;
  hasCourseInstance?: any[];
  inLanguage?: string;
}
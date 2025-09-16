import { 
  BRAND_CONFIG, 
  SERVICE_TIERS,
  Organization,
  WebSite,
  Article,
  BreadcrumbList,
  WebApplication,
  FAQPage,
  Service,
  ImageObject,
  PostalAddress,
  ContactPoint
} from './types';

/**
 * Generate the core organization schema for Apsics Media
 */
export function generateOrganizationSchema(): Organization {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: BRAND_CONFIG.companyName,
    alternateName: 'Strategic Ad Intelligence',
    url: baseUrl,
    email: BRAND_CONFIG.email,
    description: 'Weekly creative intelligence and trend analysis for subscription businesses. Fortune 100 methodology delivered to growth teams every Monday.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'United States',
      addressCountry: 'US'
    } as PostalAddress,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
      areaServed: 'US'
    } as ContactPoint,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${BRAND_CONFIG.logo.url}`,
      width: BRAND_CONFIG.logo.width,
      height: BRAND_CONFIG.logo.height
    } as ImageObject,
    knowsAbout: [
      'Subscription Marketing',
      'Creative Intelligence',
      'Competitive Analysis', 
      'TikTok Marketing',
      'Mobile App Marketing',
      'Customer Acquisition',
      'Growth Marketing',
      'Performance Marketing',
      'SaaS Marketing',
      'D2C Marketing'
    ]
  };
}

/**
 * Generate the core website schema
 */
export function generateWebSiteSchema(): WebSite {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: BRAND_CONFIG.companyName,
    description: 'Weekly trend intelligence for subscription businesses. Fresh creative concepts and competitor analysis delivered every Monday.',
    publisher: {
      '@id': `${baseUrl}#organization`
    },
    inLanguage: 'en-US',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    ]
  };
}

/**
 * Generate service schema with all service tiers
 */
export function generateServiceSchema(): Service {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}#service`,
    name: 'Weekly Creative Intelligence - Revolutionary Weekly Pricing',
    description: 'Revolutionary weekly pricing for weekly creative delivery. Weekly creative concepts and competitor analysis for subscription business growth teams, starting at $5/week with first week FREE',
    provider: {
      '@id': `${baseUrl}#organization`
    },
    offers: [
      {
        '@type': 'Offer',
        price: `${SERVICE_TIERS.creativeStarter.price}/week`,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: `${SERVICE_TIERS.creativeStarter.name} - ${SERVICE_TIERS.creativeStarter.description}`
      },
      {
        '@type': 'Offer',
        price: `${SERVICE_TIERS.trendTracker.price}/week`,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: `${SERVICE_TIERS.trendTracker.name} - ${SERVICE_TIERS.trendTracker.description}`
      },
      {
        '@type': 'Offer',
        price: `${SERVICE_TIERS.competitiveEdge.price}/week`,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: `${SERVICE_TIERS.competitiveEdge.name} - ${SERVICE_TIERS.competitiveEdge.description}`
      },
      {
        '@type': 'Offer',
        price: `${SERVICE_TIERS.marketIntelligence.price}/week`,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: `${SERVICE_TIERS.marketIntelligence.name} - ${SERVICE_TIERS.marketIntelligence.description}`
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Growth Marketing Teams at Subscription Companies'
    },
    serviceType: 'Weekly Creative Intelligence with Revolutionary Weekly Pricing',
    category: 'Marketing Strategy and Creative Development'
  };
}

/**
 * Generate article schema for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedDate = new Date().toISOString(),
  modifiedDate = new Date().toISOString(),
  category = 'Marketing Strategy',
  keywords = [],
  readingTime = 8
}: {
  title: string;
  description: string;
  slug: string;
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
  keywords?: string[];
  readingTime?: number;
}): Article {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}${slug}#article`,
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: BRAND_CONFIG.author.name,
      description: BRAND_CONFIG.author.description
    },
    publisher: {
      '@id': `${baseUrl}#organization`
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@id': `${baseUrl}${slug}#webpage`
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}${slug}#primaryimage`,
      url: `${baseUrl}/images/og-image.png`,
      width: 1200,
      height: 630
    },
    keywords: keywords.join(', '),
    wordCount: readingTime * 250,
    articleSection: category,
    about: {
      '@type': 'Thing',
      name: category
    },
    inLanguage: 'en-US'
  };
}

/**
 * Generate breadcrumb schema from navigation items
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; href: string }>): BreadcrumbList {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`
    }))
  };
}

/**
 * Generate web application schema for calculator tools
 */
export function generateWebApplicationSchema({
  name,
  description,
  slug,
  features = [],
  category = 'BusinessApplication'
}: {
  name: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
}): WebApplication {
  const baseUrl = BRAND_CONFIG.baseUrl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${baseUrl}${slug}#webapp`,
    name,
    description,
    url: `${baseUrl}${slug}`,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    author: {
      '@id': `${baseUrl}#organization`
    },
    featureList: features
  };
}

/**
 * Generate FAQ schema from question/answer pairs
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
 * Generate complete structured data graph for a page
 */
export function generatePageSchemaGraph({
  pageType,
  title,
  description,
  slug,
  breadcrumbs,
  additionalSchemas = []
}: {
  pageType: 'homepage' | 'article' | 'calculator' | 'generic';
  title: string;
  description: string;
  slug: string;
  breadcrumbs?: Array<{ name: string; href: string }>;
  additionalSchemas?: any[];
}) {
  const graph: any[] = [
    generateOrganizationSchema(),
    generateWebSiteSchema()
  ];

  // Add page-specific schemas
  if (pageType === 'homepage') {
    graph.push(generateServiceSchema());
  }

  // Add breadcrumbs for non-homepage pages
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add any additional schemas
  graph.push(...additionalSchemas);

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

/**
 * Utility to format schema as JSON-LD string
 */
export function formatSchemaAsJsonLD(schema: any): string {
  return JSON.stringify(schema, null, 0);
}

/**
 * Validate required schema fields
 */
export function validateSchema(schema: any): boolean {
  if (!schema['@context'] || !schema['@type']) {
    console.warn('Schema missing required @context or @type');
    return false;
  }
  return true;
}

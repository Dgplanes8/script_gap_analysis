/**
 * Shared SEO Configuration System for Apsics Media Templates
 * 
 * This module provides consistent SEO optimization across all templates
 * with startup-focused ICP targeting and conversion optimization.
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  category?: string;
  readingTime?: number;
  image?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export interface ICPConfig {
  primaryAudience: string[];
  painPoints: string[];
  budgetRange: string;
  teamSize: string;
  revenueStage: string;
  decisionMakers: string[];
}

export interface ConversionConfig {
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
  leadMagnet: {
    title: string;
    description: string;
  };
  trustIndicators: string[];
}

/**
 * Default ICP Configuration for Apsics Media
 * Based on early-stage startup targeting (Bootstrap to Series A)
 */
export const DEFAULT_ICP_CONFIG: ICPConfig = {
  primaryAudience: [
    'Solo Founders',
    'CEOs',
    'Co-founders', 
    'Head of Growth',
    'Marketing Teams'
  ],
  painPoints: [
    'First-time advertising overwhelm',
    'Budget constraints vs. professional creative needs',
    'Creative development without design skills', 
    'Time constraints from multiple business functions',
    'Knowledge gaps in creative best practices'
  ],
  budgetRange: '$500-$5K/month ad spend',
  teamSize: '1-10 employees',
  revenueStage: '$500K-$2M ARR (early traction)',
  decisionMakers: [
    'Direct decision making authority',
    'No procurement process',
    'Budget-conscious founders'
  ]
};

/**
 * Default Conversion Configuration
 */
export const DEFAULT_CONVERSION_CONFIG: ConversionConfig = {
  primaryCTA: {
    text: 'Start Your FREE Week',
    link: '/#service-tiers'
  },
  secondaryCTA: {
    text: 'Download MY Templates',
    link: '/free-hooks'
  },
  leadMagnet: {
    title: 'Get Weekly Ad Templates for FREE',
    description: 'Join 1,200+ startup founders getting winning templates every Monday'
  },
  trustIndicators: [
    'Fortune 100 methodology',
    'Used by 1,200+ startup founders',
    'Real performance data',
    'Weekly Monday delivery',
    'No commitment required'
  ]
};

/**
 * SEO Title Templates
 * Optimized for 50-60 characters with primary keywords
 */
export const SEO_TITLE_TEMPLATES = {
  blog: (topic: string) => `${topic}: Complete Guide for Startup Teams`,
  calculator: (type: string) => `Free ${type} Calculator - Startup Marketing Tool`,
  playbook: (topic: string) => `${topic} Playbook: Step-by-Step Guide for Founders`,
  guide: (topic: string) => `${topic} Guide: Proven Strategies for Startups`,
  tool: (name: string) => `${name}: Free Tool for Startup Marketing Teams`
};

/**
 * SEO Description Templates  
 * Optimized for 150-160 characters with compelling CTAs
 */
export const SEO_DESCRIPTION_TEMPLATES = {
  blog: (topic: string, benefit1: string, benefit2: string) => 
    `Master ${topic} with proven strategies. ${benefit1}, ${benefit2}. Used by 1,200+ startup founders. Get weekly templates FREE.`,
  calculator: (type: string, benefit: string) => 
    `Free ${type} calculator for startup teams. ${benefit}. Get instant results + weekly ad templates. No signup required.`,
  playbook: (topic: string, outcome: string) => 
    `Complete ${topic} playbook for startup founders. ${outcome} with step-by-step implementation. Get FREE access today.`,
  guide: (topic: string, timeframe: string) => 
    `${topic} guide with proven strategies. Implementation takes ${timeframe}. Download free templates + weekly insights.`,
  tool: (name: string, purpose: string) => 
    `${name} designed for startup teams. ${purpose}. Free tool + weekly strategic guidance. Get started today.`
};

/**
 * Keyword Categories for Startup Marketing
 */
export const KEYWORD_CATEGORIES = {
  startup_marketing: [
    'startup marketing',
    'early stage marketing', 
    'bootstrap marketing',
    'startup advertising',
    'founder marketing',
    'startup growth'
  ],
  ad_creative: [
    'ad templates',
    'ad creative',
    'marketing creative',
    'ad copy',
    'creative templates',
    'ad design'
  ],
  budget_optimization: [
    'marketing budget',
    'ad budget optimization',
    'cost effective marketing',
    'marketing ROI',
    'CAC optimization',
    'marketing efficiency'
  ],
  tools_calculators: [
    'marketing calculator',
    'ROI calculator', 
    'CAC calculator',
    'marketing tools',
    'free marketing tools',
    'startup tools'
  ],
  strategy_guides: [
    'marketing strategy',
    'marketing playbook',
    'marketing guide',
    'startup playbook',
    'growth strategy',
    'marketing framework'
  ]
};

/**
 * Generate SEO optimized metadata
 */
export function generateSEOMetadata(config: SEOConfig) {
  const baseUrl = 'https://apsicsmedia.com';
  
  return {
    title: `${config.title} | Apsics Media`,
    description: config.description,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'article',
      url: `${baseUrl}${config.slug}`,
      images: config.image ? [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: config.title
        }
      ] : undefined,
      siteName: 'Apsics Media',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : undefined,
    },
    alternates: {
      canonical: config.slug,
    },
    authors: config.author ? [{ name: config.author }] : undefined,
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
    }
  };
}

/**
 * Generate structured data for articles
 */
export function generateArticleStructuredData(config: SEOConfig) {
  const baseUrl = 'https://apsicsmedia.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    url: `${baseUrl}${config.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Apsics Media'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apsics Media',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    image: config.image ? {
      '@type': 'ImageObject',
      url: config.image,
      width: 1200,
      height: 630
    } : undefined,
    datePublished: config.publishedDate,
    dateModified: config.modifiedDate || config.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${config.slug}`
    },
    keywords: config.keywords,
    articleSection: config.category,
    audience: {
      '@type': 'Audience',
      audienceType: 'Startup Founders and Marketing Teams'
    },
    about: {
      '@type': 'Thing',
      name: 'Startup Marketing Strategy'
    }
  };
}

/**
 * Generate structured data for tools/calculators
 */
export function generateToolStructuredData(config: SEOConfig) {
  const baseUrl = 'https://apsicsmedia.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.title,
    applicationCategory: 'BusinessApplication',
    description: config.description,
    url: `${baseUrl}${config.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: `Free ${config.title} with strategic recommendations`
    },
    provider: {
      '@type': 'Organization',
      name: 'Apsics Media',
      url: baseUrl
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Startup Founders and Marketing Teams'
    },
    featureList: [
      'Real-time calculations',
      'Industry benchmarks', 
      'Strategic recommendations',
      'Scenario modeling'
    ],
    softwareRequirements: 'Web browser',
    operatingSystem: 'Any'
  };
}

/**
 * Common FAQ schemas for featured snippets
 */
export const COMMON_FAQS = {
  startup_marketing: [
    {
      question: 'What is the average marketing budget for startups?',
      answer: 'Early-stage startups typically allocate $500-$5K monthly for marketing and advertising, representing 5-15% of revenue. Bootstrap companies often start with $500-$1K while Series A startups may spend $2K-$5K monthly.'
    },
    {
      question: 'How do startups create effective ad campaigns?',
      answer: 'Successful startup ad campaigns focus on clear value propositions, target specific pain points, use customer language, and test iteratively. Templates and proven frameworks help founders launch campaigns faster without extensive marketing experience.'
    },
    {
      question: 'What is a good CAC for startups?',
      answer: 'A good Customer Acquisition Cost (CAC) for startups is typically 1/3 of Customer Lifetime Value (LTV). For SaaS startups, CAC should be recovered within 12-18 months. B2B startups often see CACs of $200-$500, while B2C ranges from $20-$200.'
    }
  ],
  ad_templates: [
    {
      question: 'Do ad templates work for small businesses?',
      answer: 'Yes, ad templates are highly effective for small businesses and startups. They provide proven frameworks that reduce creation time by 70% while maintaining professional quality. Templates help founders without design experience launch effective campaigns.'
    },
    {
      question: 'How often should I update my ad creative?',
      answer: 'Ad creative should be updated weekly to prevent fatigue and maintain performance. Fresh creative maintains audience engagement and prevents declining click-through rates. Weekly updates align with platform algorithm preferences.'
    }
  ]
};

/**
 * Validation function for SEO config
 */
export function validateSEOConfig(config: SEOConfig): boolean {
  const errors: string[] = [];
  
  if (!config.title || config.title.length < 10 || config.title.length > 60) {
    errors.push('Title must be 10-60 characters');
  }
  
  if (!config.description || config.description.length < 120 || config.description.length > 160) {
    errors.push('Description must be 120-160 characters');
  }
  
  if (!config.keywords || config.keywords.length < 3) {
    errors.push('Minimum 3 keywords required');
  }
  
  if (!config.slug || !config.slug.startsWith('/')) {
    errors.push('Slug must start with /');
  }
  
  if (errors.length > 0) {
    console.error('SEO Config Validation Errors:', errors);
    return false;
  }
  
  return true;
}
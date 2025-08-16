// Schema.org structured data types for Apsics Media

// Brand constants based on requirements
export const BRAND_CONFIG = {
  companyName: 'Apsics Media',
  description: 'Strategic marketing intelligence team with 10+ years managing over $250MM in ad spend for household brand names',
  email: 'brian@apsicsmedia.com',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com',
  logo: {
    url: '/images/apsics-logo.png',
    width: 600,
    height: 60
  },
  brandColors: {
    primary: '#f97316', // orange-500
    secondary: '#ea580c', // orange-600
    accent: '#0d9488', // teal-600
    navy: '#1e293b' // navy-800
  },
  author: {
    name: 'Apsics Media Team',
    description: 'Strategic marketing intelligence team with 10+ years managing over $250MM in ad spend for household brand names'
  }
} as const;

// Core schema interfaces
export interface BaseSchemaProps {
  '@context': string;
  '@type': string;
  '@id'?: string;
}

export interface ImageObject extends BaseSchemaProps {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface Organization extends BaseSchemaProps {
  '@type': 'Organization';
  name: string;
  alternateName?: string;
  url: string;
  logo?: ImageObject;
  email?: string;
  description?: string;
  address?: PostalAddress;
  contactPoint?: ContactPoint;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  addressLocality?: string;
  addressCountry?: string;
  streetAddress?: string;
  postalCode?: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone?: string;
  contactType?: string;
  availableLanguage?: string;
  areaServed?: string;
}

export interface WebSite extends BaseSchemaProps {
  '@type': 'WebSite';
  url: string;
  name: string;
  description?: string;
  publisher?: Organization | { '@id': string };
  inLanguage?: string;
  potentialAction?: SearchAction[];
}

export interface SearchAction {
  '@type': 'SearchAction';
  target: EntryPoint;
  'query-input': string;
}

export interface EntryPoint {
  '@type': 'EntryPoint';
  urlTemplate: string;
}

export interface Article extends BaseSchemaProps {
  '@type': 'Article';
  headline: string;
  description?: string;
  author: Organization | Person | { '@id': string };
  publisher: Organization | { '@id': string };
  datePublished: string;
  dateModified: string;
  image?: ImageObject | { '@id': string };
  url?: string;
  mainEntityOfPage?: WebPage | { '@id': string };
  articleSection?: string;
  keywords?: string;
  wordCount?: number;
  about?: Thing;
  inLanguage?: string;
}

export interface Person extends BaseSchemaProps {
  '@type': 'Person';
  name: string;
  description?: string;
  url?: string;
  sameAs?: string[];
}

export interface Thing {
  '@type': 'Thing';
  name: string;
  description?: string;
}

export interface WebPage extends BaseSchemaProps {
  '@type': 'WebPage';
  url: string;
  name: string;
  description?: string;
  isPartOf?: WebSite | { '@id': string };
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbList;
  primaryImageOfPage?: ImageObject | { '@id': string };
}

export interface BreadcrumbList extends BaseSchemaProps {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface WebApplication extends BaseSchemaProps {
  '@type': 'WebApplication';
  name: string;
  description?: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: Offer[];
  author?: Organization | { '@id': string };
  featureList?: string[];
}

export interface FAQPage extends BaseSchemaProps {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  '@type': 'Answer';
  text: string;
}

export interface Service extends BaseSchemaProps {
  '@type': 'Service';
  name: string;
  description?: string;
  provider: Organization | { '@id': string };
  offers?: Offer[];
  audience?: Audience;
  serviceType?: string;
  category?: string;
}

export interface Offer {
  '@type': 'Offer';
  price?: string;
  priceCurrency?: string;
  availability?: string;
  description?: string;
  validFrom?: string;
  validThrough?: string;
}

export interface Audience {
  '@type': 'Audience';
  audienceType: string;
  name?: string;
}

// Utility types for component props
export interface SchemaComponentProps {
  className?: string;
}

export interface ArticleSchemaProps extends SchemaComponentProps {
  title: string;
  description: string;
  slug: string;
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
  keywords?: string[];
  readingTime?: number;
}

export interface BreadcrumbSchemaProps extends SchemaComponentProps {
  items: {
    name: string;
    href: string;
  }[];
}

export interface WebApplicationSchemaProps extends SchemaComponentProps {
  name: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
}

export interface FAQSchemaProps extends SchemaComponentProps {
  faqs?: {
    question: string;
    answer: string;
  }[];
}

// Service tier data from CLAUDE.md
export const SERVICE_TIERS = {
  trendTracker: {
    name: 'Trend Tracker',
    price: '67',
    description: '1 creative concept delivered every Monday with 2 ready-to-develop scripts per concept',
    target: 'Growth teams testing new angles',
    ideal: 'Growth teams at growing subscription companies'
  },
  competitiveEdge: {
    name: 'Competitive Edge',
    price: '197',
    description: '2 creative concepts weekly (1 trend-based + 1 competitor-inspired) with 4 weekly scripts',
    target: 'Performance marketers with saturated audiences',
    ideal: 'Performance marketers who have saturated core audiences',
    popular: true
  },
  marketIntelligence: {
    name: 'Market Intelligence',
    price: '497',
    description: '3 creative concepts delivered every Monday with 6 weekly scripts and direct team access',
    target: '$200K+ monthly ad spend companies',
    ideal: 'Heads of Growth at subscription companies scaling beyond $200K/month'
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Creative concepts delivered weekly with full-service media buying management and dedicated account manager',
    target: '$500K+ monthly ad spend companies',
    ideal: 'Large subscription companies requiring comprehensive solutions'
  }
} as const;

// FAQ data derived from service offerings and target pain points
export const DEFAULT_FAQS = [
  {
    question: 'How is this different from traditional agencies?',
    answer: 'Agencies take 1-2 weeks for concept delivery and charge $5,000+ monthly minimums. We deliver fresh concepts every Monday at a fraction of the cost, specifically for performance marketers who need constant creative testing.'
  },
  {
    question: 'What makes your creative intelligence unique?',
    answer: 'We combine trend analysis with competitor intelligence, specifically for subscription business models. 10+ years optimizing campaigns for recurring revenue companies means we understand your growth challenges.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, all plans are month-to-month with no long-term contracts. Cancel anytime. We are confident in our weekly delivery quality and strategic value.'
  },
  {
    question: 'Do you work with businesses outside of subscriptions?',
    answer: 'While our expertise is optimized for subscription and recurring revenue businesses (SaaS, D2C subscriptions, memberships), our trend intelligence methodology works for any business needing consistent creative testing fuel.'
  },
  {
    question: 'How do I get started?',
    answer: 'Start with our free 10 Hook Bank to experience our strategic approach. Then book a strategy call to discuss which weekly plan fits your growth needs. No obligation, no pressure.'
  },
  {
    question: 'What kind of results can I expect?',
    answer: 'Our clients typically see 25-40% improvement in conversion rates and 3x faster creative concept iteration. We focus on strategic positioning vs commodity copywriting with Fortune 100 methodology at startup speed.'
  }
] as const;
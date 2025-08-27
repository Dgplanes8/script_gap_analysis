/**
 * Template-Specific Schema Components for Apsics Media
 * 
 * Provides specialized structured data components that are optimized 
 * for each template type with proper Schema.org markup.
 */

import Script from 'next/script';
import {
  generateBlogPostSchema,
  generateCalculatorSchema,
  generatePlaybookSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateVideoSchema,
  TEMPLATE_FAQS
} from '@/lib/schema/template-schemas';
import { formatSchemaAsJsonLD } from '@/lib/schema/utils';

/**
 * Blog Post Schema Component
 * Generates Article schema with proper SEO optimization
 */
export function BlogPostSchema({
  title,
  description,
  slug,
  category = 'Marketing Strategy',
  keywords = [],
  readingTime = 5,
  publishedDate,
  modifiedDate,
  imageUrl,
  className
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
  className?: string;
}) {
  const schema = generateBlogPostSchema({
    title,
    description,
    slug,
    category,
    keywords,
    readingTime,
    publishedDate,
    modifiedDate,
    imageUrl
  });

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * Calculator Schema Component
 * Generates WebApplication schema for interactive tools
 */
export function CalculatorSchema({
  title,
  description,
  slug,
  features = [],
  category = 'BusinessApplication',
  className
}: {
  title: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
  className?: string;
}) {
  const schema = generateCalculatorSchema({
    title,
    description,
    slug,
    features,
    category
  });

  return (
    <Script
      id="calculator-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * Playbook Schema Component
 * Generates Course schema for educational content
 */
export function PlaybookSchema({
  title,
  description,
  slug,
  modules = [],
  duration = 'PT2H',
  className
}: {
  title: string;
  description: string;
  slug: string;
  modules?: Array<{ title: string; description: string; duration?: string }>;
  duration?: string;
  className?: string;
}) {
  const schema = generatePlaybookSchema({
    title,
    description,
    slug,
    modules,
    duration
  });

  return (
    <Script
      id="playbook-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * FAQ Schema Component
 * Generates FAQPage schema for featured snippets
 */
export function FAQSchema({
  faqs,
  templateType,
  className
}: {
  faqs?: Array<{ question: string; answer: string }>;
  templateType?: 'blog' | 'calculator' | 'playbook';
  className?: string;
}) {
  const finalFaqs = faqs || (templateType ? TEMPLATE_FAQS[templateType] : []);
  
  if (finalFaqs.length === 0) return null;

  const schema = generateFAQSchema(finalFaqs);

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * How-To Schema Component
 * Generates HowTo schema for step-by-step guides
 */
export function HowToSchema({
  name,
  description,
  steps,
  className
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  className?: string;
}) {
  const schema = generateHowToSchema({ name, description, steps });

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * Video Schema Component
 * Generates VideoObject schema for video content
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  duration,
  uploadDate,
  className
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  uploadDate?: string;
  className?: string;
}) {
  const schema = generateVideoSchema({
    name,
    description,
    thumbnailUrl,
    contentUrl,
    embedUrl,
    duration,
    uploadDate
  });

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}

/**
 * Combined Template Schema Component
 * Generates multiple schemas for complex template pages
 */
export function TemplateSchemaBundle({
  type,
  title,
  description,
  slug,
  
  // Common props
  faqs,
  
  // Blog-specific
  category,
  keywords,
  readingTime,
  publishedDate,
  modifiedDate,
  imageUrl,
  
  // Calculator-specific
  features,
  calculatorCategory,
  
  // Playbook-specific
  modules,
  duration,
  
  // How-to specific
  steps,
  
  className
}: {
  type: 'blog' | 'calculator' | 'playbook' | 'howto';
  title: string;
  description: string;
  slug: string;
  
  // Common props
  faqs?: Array<{ question: string; answer: string }>;
  
  // Blog-specific
  category?: string;
  keywords?: string[];
  readingTime?: number;
  publishedDate?: string;
  modifiedDate?: string;
  imageUrl?: string;
  
  // Calculator-specific
  features?: string[];
  calculatorCategory?: string;
  
  // Playbook-specific
  modules?: Array<{ title: string; description: string; duration?: string }>;
  duration?: string;
  
  // How-to specific
  steps?: Array<{ name: string; text: string; url?: string }>;
  
  className?: string;
}) {
  const schemas = [];

  // Add main content schema
  switch (type) {
    case 'blog':
      schemas.push(generateBlogPostSchema({
        title,
        description,
        slug,
        category,
        keywords,
        readingTime,
        publishedDate,
        modifiedDate,
        imageUrl
      }));
      break;
    case 'calculator':
      schemas.push(generateCalculatorSchema({
        title,
        description,
        slug,
        features,
        category: calculatorCategory
      }));
      break;
    case 'playbook':
      schemas.push(generatePlaybookSchema({
        title,
        description,
        slug,
        modules,
        duration
      }));
      break;
    case 'howto':
      if (steps) {
        schemas.push(generateHowToSchema({ name: title, description, steps }));
      }
      break;
  }

  // Add FAQ schema if provided
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  } else if (TEMPLATE_FAQS[type as keyof typeof TEMPLATE_FAQS]) {
    schemas.push(generateFAQSchema(TEMPLATE_FAQS[type as keyof typeof TEMPLATE_FAQS]));
  }

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': schemas
  };

  return (
    <Script
      id="template-schema-bundle"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schemaGraph) }}
      className={className}
    />
  );
}

/**
 * Rich Results Testing Schema Component
 * Provides optimal schema for Google Rich Results testing
 */
export function RichResultsSchema({
  pageType,
  title,
  description,
  url,
  breadcrumbs,
  faqs,
  howToSteps,
  videoData,
  className
}: {
  pageType: 'article' | 'faq' | 'howto' | 'video' | 'breadcrumb';
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{ name: string; text: string; url?: string }>;
  videoData?: {
    thumbnailUrl: string;
    contentUrl?: string;
    embedUrl?: string;
    duration?: string;
    uploadDate?: string;
  };
  className?: string;
}) {
  let schema;

  switch (pageType) {
    case 'article':
      schema = generateBlogPostSchema({ title, description, slug: url });
      break;
    case 'faq':
      schema = faqs ? generateFAQSchema(faqs) : null;
      break;
    case 'howto':
      schema = howToSteps ? generateHowToSchema({ name: title, description, steps: howToSteps }) : null;
      break;
    case 'video':
      schema = videoData ? generateVideoSchema({
        name: title,
        description,
        ...videoData
      }) : null;
      break;
    default:
      return null;
  }

  if (!schema) return null;

  return (
    <Script
      id="rich-results-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: formatSchemaAsJsonLD(schema) }}
      className={className}
    />
  );
}
# Structured Data Schema System

Comprehensive JSON-LD structured data implementation for Apsics Media's Next.js website.

## Overview

This schema system provides reusable, type-safe components for implementing Schema.org structured data across the website. It follows the requirements:

- **Company**: "Apsics Media" only
- **Author**: "Apsics Media Team" with credentials
- **No fabricated data**: No employee counts, founding dates, or unverified claims
- **Service-focused**: Based on actual service tiers from CLAUDE.md
- **SEO-optimized**: Proper JSON-LD implementation for rich snippets

## Brand Configuration

All brand information is centralized in `lib/schema/types.ts`:

```typescript
export const BRAND_CONFIG = {
  companyName: 'Apsics Media',
  description: 'Strategic marketing intelligence team with 10+ years managing over $250MM in ad spend for household brand names',
  email: 'brian@apsicsmedia.com',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://apsicsmedia.com',
  author: {
    name: 'Apsics Media Team',
    description: 'Strategic marketing intelligence team with 10+ years managing over $250MM in ad spend for household brand names'
  }
};
```

## Components

### 1. Master Component: `<StructuredData />`

The main component that automatically generates appropriate schemas based on page type:

```typescript
import { StructuredData } from '@/components/schema';

// Homepage
<StructuredData pageType="homepage" />

// Generic page with breadcrumbs
<StructuredData 
  pageType="generic"
  title="Page Title"
  description="Page description"
  slug="/page-url"
/>
```

### 2. Article Schema: `<ArticleSchema />`

For blog posts and articles:

```typescript
import { ArticleSchema } from '@/components/schema';

<ArticleSchema
  title="Article Title"
  description="Article description"
  slug="/blog/article-slug"
  category="Mobile App Marketing"
  keywords={['keyword1', 'keyword2']}
  readingTime={12}
  publishedDate="2025-01-15T10:00:00Z"
  modifiedDate="2025-01-15T10:00:00Z"
/>
```

### 3. Web Application Schema: `<WebApplicationSchema />`

For calculator tools and interactive applications:

```typescript
import { WebApplicationSchema } from '@/components/schema';

<WebApplicationSchema
  name="CAC Optimization Calculator"
  description="Calculate customer acquisition costs"
  slug="/cac-calculator"
  features={[
    'Cost calculation',
    'Optimization recommendations',
    'Industry benchmarks'
  ]}
  category="BusinessApplication"
/>
```

### 4. FAQ Schema: `<FAQSchema />`

For frequently asked questions:

```typescript
import { FAQSchema } from '@/components/schema';

const faqs = [
  {
    question: 'How does it work?',
    answer: 'Detailed explanation...'
  }
];

<FAQSchema faqs={faqs} />
```

### 5. Breadcrumb Schema: `<BreadcrumbSchema />`

For navigation breadcrumbs (automatically included in StructuredData):

```typescript
import { BreadcrumbSchema } from '@/components/schema';

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Article', href: '/blog/article' }
];

<BreadcrumbSchema items={breadcrumbs} />
```

## Schema Types Generated

### Organization Schema
- Company information (Apsics Media)
- Contact details
- Services and expertise areas
- Logo and branding

### WebSite Schema
- Site information
- Search functionality
- Publisher details

### Service Schema
- Service tier offerings (Trend Tracker, Competitive Edge, Market Intelligence, Enterprise)
- Pricing information
- Target audience

### Article Schema
- Article metadata
- Author attribution (Apsics Media Team)
- Publication dates
- Reading time and word count

### WebApplication Schema
- Calculator and tool metadata
- Feature lists
- Application category

### FAQ Schema
- Question and answer pairs
- Optimized for featured snippets

### BreadcrumbList Schema
- Navigation structure
- URL hierarchy

## Service Tiers Integration

Service information is automatically pulled from the predefined tiers:

```typescript
export const SERVICE_TIERS = {
  trendTracker: {
    name: 'Trend Tracker',
    price: '67',
    description: '1 creative concept delivered every Monday with 2 ready-to-develop scripts per concept'
  },
  // ... other tiers
};
```

## FAQ Integration

Default FAQs are defined based on service offerings and common questions:

```typescript
export const DEFAULT_FAQS = [
  {
    question: 'How is this different from traditional agencies?',
    answer: 'Agencies take 1-2 weeks for concept delivery and charge $5,000+ monthly minimums...'
  },
  // ... more FAQs
];
```

## Usage Guidelines

### Homepage Implementation

```typescript
// In app/layout.tsx
import { StructuredData } from '@/components/schema';

<StructuredData pageType="homepage" />
```

### Blog Post Implementation

```typescript
// In app/blog/[slug]/page.tsx
import { ArticleSchema, StructuredData } from '@/components/schema';

<ArticleSchema
  title={metadata.title}
  description={metadata.description}
  slug={`/blog/${slug}`}
  category="Marketing Strategy"
  keywords={['keyword1', 'keyword2']}
  readingTime={10}
/>

<StructuredData 
  pageType="article"
  title={metadata.title}
  description={metadata.description}
  slug={`/blog/${slug}`}
/>
```

### Calculator Page Implementation

```typescript
// In app/calculator/page.tsx
import { WebApplicationSchema, StructuredData } from '@/components/schema';

<WebApplicationSchema
  name="Calculator Name"
  description="Calculator description"
  slug="/calculator"
  features={['feature1', 'feature2']}
/>

<StructuredData 
  pageType="calculator"
  title="Calculator Page Title"
  description="Calculator page description"
  slug="/calculator"
/>
```

## Validation

The system includes validation utilities:

```typescript
import { validateSchema } from '@/lib/schema/utils';

const schema = generateOrganizationSchema();
const isValid = validateSchema(schema); // Returns boolean
```

## Testing

To test structured data:

1. **Google's Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **JSON-LD Playground**: https://json-ld.org/playground/

## Customization

To add new schema types:

1. Define interfaces in `lib/schema/types.ts`
2. Create generation function in `lib/schema/utils.ts`
3. Build component in `components/schema/`
4. Export from `components/schema/index.ts`

## SEO Benefits

- **Rich Snippets**: Enhanced search result displays
- **Knowledge Graph**: Better entity recognition
- **Featured Snippets**: FAQ optimization
- **Local SEO**: Business information structure
- **Voice Search**: Structured data for voice queries

## Performance

- **Client-side rendering**: Components use 'use client' directive
- **Efficient JSON-LD**: Minimal payload size
- **Deduplication**: Shared schemas referenced by ID
- **Lazy loading**: Conditional schema generation

## Compliance

- **No fabricated data**: All information is verified
- **Author attribution**: Consistent team crediting
- **Service accuracy**: Based on actual offerings
- **Contact verification**: Real contact information only
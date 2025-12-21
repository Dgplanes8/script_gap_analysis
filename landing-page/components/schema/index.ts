// Schema components exports
export { OrganizationSchema } from './organization-schema';
export { ArticleSchema } from './article-schema';
export { BreadcrumbSchema } from './breadcrumb-schema';
export { WebApplicationSchema } from './web-application-schema';
export { FAQSchema, FAQSection, SPECIALIZED_FAQS } from './faq-schema';
export { StructuredData } from './structured-data';

// Schema utilities exports
export {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateWebApplicationSchema,
  generateFAQSchema,
  generatePageSchemaGraph,
  formatSchemaAsJsonLD,
  validateSchema
} from '@/lib/schema/utils';

// Schema types exports
export {
  BRAND_CONFIG,
  SERVICE_TIERS,
  DEFAULT_FAQS
} from '@/lib/schema/types';

export type {
  ArticleSchemaProps,
  BreadcrumbSchemaProps,
  WebApplicationSchemaProps,
  FAQSchemaProps,
  SchemaComponentProps
} from '@/lib/schema/types';
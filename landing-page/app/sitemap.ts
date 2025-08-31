import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apsicsmedia.com';

  return [
    // Main pages - Only existing pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-hooks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Implemented Blog Articles - High priority for organic search
    {
      url: `${baseUrl}/blog/weekly-creative-intelligence-subscription-marketing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/competitive-creative-analysis-growth-teams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/creative-fatigue-subscription-companies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/growth-team-creative-bottlenecks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/trend-based-creative-development`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/mobile-app-cac-crisis-2025-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/aso-roi-calculator-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/freemium-conversion-optimization-framework`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/d2c-subscription-marketing-playbook`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/ai-creative-development-mobile-apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/ltv-cac-ratio-optimization-growth-teams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/blog/retention-marketing-automation-saas-growth`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/blog/subscription-churn-rate-optimization`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    
    // New SEO Blog Posts - High Impact Content for 2025
    {
      url: `${baseUrl}/blog/startup-marketing-budget-calculator-2025`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/creative-fatigue-prevention-framework`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/blog/cac-optimization-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/52-high-converting-ad-templates-startup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/blog/startup-marketing-roi-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },

    // Local Services Marketing Series - 2025 SEO Optimized Content
    {
      url: `${baseUrl}/blog/local-marketing-consultant-vs-freelance-services-cost-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/blog/small-business-marketing-budget-calculator-roi-analysis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/local-creative-agency-partnership-guide-build-vs-hire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.96,
    },
    {
      url: `${baseUrl}/blog/freelance-marketing-consultant-selection-checklist-2025`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.97,
    },
    {
      url: `${baseUrl}/blog/small-business-marketing-services-timeline-first-90-days`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/blog/local-creative-agency-vs-in-house-marketing-roi-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.98,
    },

    // High-Value Tools & Calculators - SEO Priority Pages
    {
      url: `${baseUrl}/hook-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.99,
    },
    {
      url: `${baseUrl}/cac-optimization-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/free-hooks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.97,
    },

    // Comprehensive Strategy Guides - High SEO Value
    {
      url: `${baseUrl}/saas-growth-marketing-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.96,
    },

    // Other existing pages
    {
      url: `${baseUrl}/success`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
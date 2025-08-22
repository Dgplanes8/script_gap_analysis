import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://apsicsmedia.com';

  return [
    // Main pages
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
    
    // Cluster 1: Creative Intelligence Hub - Maximum priority for topic authority
    {
      url: `${baseUrl}/weekly-creative-intelligence-playbook`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/52-high-converting-ad-hooks-library`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/creative-fatigue-prevention-framework`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/25-point-performance-scoring-system`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/creative-brief-framework`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/hook-generator`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/creative-intelligence-implementation-guide`,
      lastModified: new Date('2025-01-20'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Cluster 2: Performance Marketing Optimization - Strategic priority scoring
    {
      url: `${baseUrl}/mobile-app-cac-optimization-2025`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'weekly',
      priority: 0.95, // Score: 9.5 - Maximum priority for CAC crisis content
    },
    {
      url: `${baseUrl}/subscription-business-cac-reduction-framework`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'weekly',
      priority: 0.94, // Score: 9.4 - Systematic CAC reduction framework
    },
    {
      url: `${baseUrl}/d2c-subscription-marketing-strategy`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'monthly',
      priority: 0.93, // Score: 9.3 - Consumer psychology insights
    },
    {
      url: `${baseUrl}/freemium-to-premium-conversion-optimization`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'monthly',
      priority: 0.85, // Score: 8.5 - Behavioral psychology framework
    },
    {
      url: `${baseUrl}/saas-creative-strategy-roi-calculator`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'weekly',
      priority: 0.84, // Score: 8.4 - Interactive ROI tool
    },
    {
      url: `${baseUrl}/subscription-churn-reduction-framework`,
      lastModified: new Date('2025-01-21'),
      changeFrequency: 'monthly',
      priority: 0.83, // Score: 8.3 - Retention intelligence system
    },
    
    // New SEO articles - High priority for organic search
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
    
    // 2025 SEO Strategy Articles - Top priority for organic search
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
      url: `${baseUrl}/fortune-100-vs-agency-strategies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    
    // Calculators and tools
    {
      url: `${baseUrl}/cac-optimization-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/revenue-growth-benchmarking`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Strategy guides
    {
      url: `${baseUrl}/saas-growth-marketing-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consumer-subscription-marketing-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cac-reduction-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketing-attribution-framework`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Other pages
    {
      url: `${baseUrl}/success`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-featured`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
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
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
    
    // Cluster 3: Competitive Intelligence & Analysis - Strategic priority scoring
    {
      url: `${baseUrl}/fortune-100-creative-intelligence-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly',
      priority: 0.92, // Score: 9.2 - Fortune 100 methodology anchor
    },
    {
      url: `${baseUrl}/competitor-creative-analysis-system`,
      lastModified: new Date('2025-01-22'), 
      changeFrequency: 'monthly',
      priority: 0.91, // Score: 9.1 - Systematic competitor analysis
    },
    {
      url: `${baseUrl}/ai-enhanced-creative-intelligence-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly', 
      priority: 0.89, // Score: 8.9 - AI creative automation
    },
    {
      url: `${baseUrl}/multi-touch-attribution-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly',
      priority: 0.82, // Score: 8.2 - Attribution modeling
    },
    
    // Cluster 4: Platform-Specific Intelligence - Channel optimization priority
    {
      url: `${baseUrl}/tiktok-creative-intelligence-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'weekly',
      priority: 0.77, // Score: 7.7 - TikTok trend analysis anchor
    },
    {
      url: `${baseUrl}/facebook-ad-creative-intelligence-system`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly', 
      priority: 0.76, // Score: 7.6 - Facebook optimization
    },
    {
      url: `${baseUrl}/linkedin-creative-intelligence-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly',
      priority: 0.75, // Score: 7.5 - B2B LinkedIn strategy
    },
    {
      url: `${baseUrl}/voice-commerce-optimization-framework`,
      lastModified: new Date('2025-01-22'),
      changeFrequency: 'monthly',
      priority: 0.57, // Score: 5.7 - Emerging voice technology
    },
    
    // Cluster 5: Technical Implementation - Advanced setup priority
    {
      url: `${baseUrl}/marketing-automation-weekly-creative-intelligence-setup`,
      lastModified: new Date('2025-01-23'),
      changeFrequency: 'monthly',
      priority: 0.65, // Score: 6.5 - Automation anchor
    },
    {
      url: `${baseUrl}/first-party-data-collection-weekly-intelligence-framework`,
      lastModified: new Date('2025-01-23'),
      changeFrequency: 'monthly', 
      priority: 0.64, // Score: 6.4 - Data collection framework
    },
    {
      url: `${baseUrl}/analytics-setup-weekly-creative-intelligence-tracking`,
      lastModified: new Date('2025-01-23'),
      changeFrequency: 'monthly',
      priority: 0.63, // Score: 6.3 - Analytics setup
    },
    {
      url: `${baseUrl}/api-integration-weekly-creative-intelligence-automation`,
      lastModified: new Date('2025-01-23'),
      changeFrequency: 'monthly',
      priority: 0.62, // Score: 6.2 - API integration
    },
    {
      url: `${baseUrl}/marketing-technology-stack-weekly-intelligence-optimization`,
      lastModified: new Date('2025-01-23'),
      changeFrequency: 'monthly',
      priority: 0.46, // Score: 4.6 - Technology stack
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
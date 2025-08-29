/**
 * Internal Linking Configuration for SEO
 * 
 * This module provides intelligent internal linking recommendations
 * to improve SEO link equity distribution and user navigation.
 */

export interface InternalLink {
  title: string;
  slug: string;
  anchor: string;
  context: string;
  relevanceScore: number;
  category: string;
}

export interface LinkingRule {
  fromCategory: string;
  toCategory: string;
  priority: 'high' | 'medium' | 'low';
  maxLinks: number;
}

/**
 * Strategic internal linking rules for SEO optimization
 */
export const INTERNAL_LINKING_RULES: LinkingRule[] = [
  // Tools should link to strategy guides
  { fromCategory: 'Marketing Tools', toCategory: 'Creative Strategy', priority: 'high', maxLinks: 2 },
  { fromCategory: 'Marketing Tools', toCategory: 'Budget Planning', priority: 'high', maxLinks: 2 },
  
  // Strategy guides should cross-link
  { fromCategory: 'Creative Strategy', toCategory: 'Marketing Analytics', priority: 'high', maxLinks: 1 },
  { fromCategory: 'Budget Planning', toCategory: 'Marketing Optimization', priority: 'high', maxLinks: 1 },
  
  // All categories should link to high-converting tools
  { fromCategory: 'Creative Strategy', toCategory: 'Marketing Tools', priority: 'medium', maxLinks: 1 },
  { fromCategory: 'Strategy', toCategory: 'Marketing Tools', priority: 'medium', maxLinks: 1 },
  
  // Link to cornerstone content
  { fromCategory: 'Marketing Tools', toCategory: 'Creative Resources', priority: 'medium', maxLinks: 1 },
];

/**
 * High-value internal links for link equity distribution
 */
export const CORNERSTONE_LINKS: InternalLink[] = [
  {
    title: 'Startup Marketing Budget Calculator 2025',
    slug: '/blog/startup-marketing-budget-calculator-2025',
    anchor: 'marketing budget calculator',
    context: 'Use our free {anchor} to optimize your ad spend allocation',
    relevanceScore: 95,
    category: 'Marketing Tools'
  },
  {
    title: 'Startup Marketing ROI Calculator',
    slug: '/blog/startup-marketing-roi-calculator',
    anchor: 'ROI calculator',
    context: 'Track your marketing performance with our comprehensive {anchor}',
    relevanceScore: 90,
    category: 'Marketing Analytics'
  },
  {
    title: 'CAC Optimization Calculator for Startups',
    slug: '/blog/cac-optimization-calculator',
    anchor: 'CAC optimization tool',
    context: 'Reduce customer acquisition costs using our {anchor}',
    relevanceScore: 88,
    category: 'Marketing Optimization'
  },
  {
    title: '52 High-Converting Ad Templates for Startups',
    slug: '/blog/52-high-converting-ad-templates-startup',
    anchor: 'proven ad templates',
    context: 'Access our library of {anchor} to accelerate campaign development',
    relevanceScore: 85,
    category: 'Creative Resources'
  },
  {
    title: 'Creative Fatigue Prevention Framework',
    slug: '/blog/creative-fatigue-prevention-framework',
    anchor: 'creative fatigue framework',
    context: 'Prevent ad performance decline with our {anchor}',
    relevanceScore: 80,
    category: 'Creative Strategy'
  }
];

/**
 * Contextual linking opportunities based on keywords
 */
export const CONTEXTUAL_LINKS: Record<string, InternalLink[]> = {
  'marketing budget': [
    {
      title: 'Startup Marketing Budget Calculator 2025',
      slug: '/blog/startup-marketing-budget-calculator-2025',
      anchor: 'marketing budget calculator',
      context: 'Calculate optimal {anchor} allocation across channels',
      relevanceScore: 95,
      category: 'Marketing Tools'
    }
  ],
  'CAC': [
    {
      title: 'CAC Optimization Calculator for Startups',
      slug: '/blog/cac-optimization-calculator', 
      anchor: 'CAC optimization strategies',
      context: 'Learn proven {anchor} to reduce acquisition costs',
      relevanceScore: 90,
      category: 'Marketing Optimization'
    }
  ],
  'ROI': [
    {
      title: 'Startup Marketing ROI Calculator',
      slug: '/blog/startup-marketing-roi-calculator',
      anchor: 'marketing ROI measurement',
      context: 'Master {anchor} with our comprehensive guide',
      relevanceScore: 88,
      category: 'Marketing Analytics'
    }
  ],
  'creative fatigue': [
    {
      title: 'Creative Fatigue Prevention Framework',
      slug: '/blog/creative-fatigue-prevention-framework',
      anchor: 'creative fatigue prevention',
      context: 'Implement our {anchor} system for sustained performance',
      relevanceScore: 85,
      category: 'Creative Strategy'
    }
  ],
  'ad templates': [
    {
      title: '52 High-Converting Ad Templates for Startups',
      slug: '/blog/52-high-converting-ad-templates-startup',
      anchor: 'high-converting ad templates',
      context: 'Download our collection of {anchor} for immediate use',
      relevanceScore: 83,
      category: 'Creative Resources'
    }
  ],
  'customer acquisition': [
    {
      title: 'CAC Optimization Calculator for Startups',
      slug: '/blog/cac-optimization-calculator',
      anchor: 'customer acquisition optimization',
      context: 'Optimize your {anchor} with data-driven strategies',
      relevanceScore: 87,
      category: 'Marketing Optimization'
    }
  ]
};

/**
 * Generate intelligent internal link suggestions
 */
export function getInternalLinkSuggestions(
  currentSlug: string,
  currentCategory: string,
  content: string,
  limit: number = 3
): InternalLink[] {
  const suggestions: InternalLink[] = [];
  
  // Add cornerstone links first (except current page)
  const cornerstoneLinks = CORNERSTONE_LINKS.filter(link => link.slug !== currentSlug);
  suggestions.push(...cornerstoneLinks.slice(0, 2));
  
  // Add contextual links based on content
  Object.entries(CONTEXTUAL_LINKS).forEach(([keyword, links]) => {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      const relevantLinks = links.filter(link => 
        link.slug !== currentSlug && 
        !suggestions.some(existing => existing.slug === link.slug)
      );
      suggestions.push(...relevantLinks);
    }
  });
  
  // Sort by relevance score and apply linking rules
  const rules = INTERNAL_LINKING_RULES.filter(rule => rule.fromCategory === currentCategory);
  const filteredSuggestions = suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
    
  return filteredSuggestions;
}

/**
 * Generate contextual link HTML
 */
export function generateContextualLink(link: InternalLink): string {
  return link.context.replace('{anchor}', `<a href="${link.slug}" class="text-blue-600 hover:text-blue-800 font-medium underline">${link.anchor}</a>`);
}

/**
 * Blog category hierarchy for breadcrumb navigation
 */
export const BLOG_CATEGORY_HIERARCHY: Record<string, string[]> = {
  'Marketing Tools': ['Tools & Calculators', 'Budget Planning', 'Marketing Analytics'],
  'Creative Strategy': ['Creative Resources', 'Ad Development', 'Content Strategy'],
  'Strategy': ['Growth Strategy', 'Competitive Intelligence', 'Marketing Strategy'],
  'Marketing Optimization': ['Performance Marketing', 'CAC Optimization', 'Conversion Optimization'],
  'Marketing Analytics': ['Analytics & Measurement', 'Attribution', 'Performance Tracking']
};

/**
 * Related posts algorithm based on category and content similarity
 */
export function getRelatedPosts(
  currentSlug: string,
  currentCategory: string,
  allPosts: Array<{ slug: string; category: string; title: string; description: string; keywords: string[] }>,
  limit: number = 3
): Array<{ slug: string; title: string; description: string; score: number }> {
  
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // Same category gets highest score
      if (post.category === currentCategory) {
        score += 50;
      }
      
      // Related categories get medium score
      const currentHierarchy = BLOG_CATEGORY_HIERARCHY[currentCategory] || [];
      const postHierarchy = BLOG_CATEGORY_HIERARCHY[post.category] || [];
      const commonHierarchy = currentHierarchy.filter(cat => postHierarchy.includes(cat));
      score += commonHierarchy.length * 20;
      
      // Keyword overlap gets additional score
      // This would need to be implemented based on actual post content
      
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        score
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
    
  return scoredPosts;
}
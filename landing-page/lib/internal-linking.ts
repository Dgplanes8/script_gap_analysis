/**
 * Internal Linking Strategy for SEO Optimization
 * Creates contextual relationships between blog posts and pages
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  publishedDate: string;
  readingTime: number;
  priority: 'high' | 'medium' | 'low';
}

export interface InternalLink {
  url: string;
  title: string;
  description: string;
  category: string;
  relevanceScore: number;
  linkType: 'related' | 'contextual' | 'category' | 'pillar' | 'cta';
}

/**
 * Content mapping for the APSICS Media blog
 */
export const BLOG_CONTENT_MAP: BlogPost[] = [
  // Copywriting & UGC Series
  {
    slug: '/blog/ultimate-ad-copywriting-framework-guide-12-proven-formulas',
    title: 'Ultimate Ad Copywriting Framework Guide: 12 Proven Formulas That Convert in 2025',
    description: 'Master ad copywriting with 12 proven frameworks from $250MM+ managed campaigns',
    category: 'Copywriting Strategy',
    keywords: ['copywriting frameworks', 'ad copywriting', 'AIDA', 'PAS', 'conversion copywriting'],
    publishedDate: '2025-01-15',
    readingTime: 12,
    priority: 'high'
  },
  {
    slug: '/blog/psychology-based-copywriting-science-persuasive-ad-copy',
    title: 'Psychology-Based Copywriting: The Science Behind 300% Higher Converting Ads',
    description: 'Master psychological triggers that drive 300%+ higher ad performance',
    category: 'Copywriting Strategy',
    keywords: ['psychology copywriting', 'cognitive biases', 'persuasive copy', 'conversion psychology'],
    publishedDate: '2025-01-15',
    readingTime: 15,
    priority: 'high'
  },
  {
    slug: '/blog/high-converting-ad-copy-templates-25-proven-scripts',
    title: 'High-Converting Ad Copy Templates: 25+ Proven Scripts for Every Platform',
    description: 'Ready-to-use ad copy templates from $250MM+ managed campaigns',
    category: 'Copywriting Strategy',
    keywords: ['ad copy templates', 'conversion templates', 'platform specific copy'],
    publishedDate: '2025-01-15',
    readingTime: 10,
    priority: 'high'
  },
  {
    slug: '/blog/ugc-content-strategy-blueprint-10x-user-content-generation',
    title: 'UGC Content Strategy Blueprint: How to Generate 10x More User Content',
    description: 'Complete UGC strategy blueprint from $250MM+ managed campaigns',
    category: 'Content Marketing',
    keywords: ['UGC strategy', 'user generated content', 'content marketing', 'authentic content'],
    publishedDate: '2025-01-15',
    readingTime: 12,
    priority: 'high'
  },
  {
    slug: '/blog/ugc-creator-playbook-authentic-content-creation-guide',
    title: 'UGC Creator Playbook: Generate $10K+ Monthly Income With Authentic Content',
    description: 'Complete creator playbook for authentic UGC content creation',
    category: 'Creator Economy',
    keywords: ['UGC creator', 'content creator income', 'authentic content', 'creator economy'],
    publishedDate: '2025-01-15',
    readingTime: 18,
    priority: 'high'
  },

  // Growth Marketing & Strategy
  {
    slug: '/blog/startup-marketing-budget-calculator-2025',
    title: 'Free Startup Budget Calculator: Why 80% of Founders Spend Wrong',
    description: 'Calculate your exact marketing budget like successful startups',
    category: 'Budget Planning',
    keywords: ['startup marketing budget', 'marketing calculator', 'budget allocation'],
    publishedDate: '2025-01-15',
    readingTime: 12,
    priority: 'high'
  },
  {
    slug: '/blog/startup-marketing-roi-calculator',
    title: 'Startup Marketing ROI Calculator: Measure What Matters for Growth',
    description: 'Calculate and optimize your marketing ROI with precision',
    category: 'Analytics & ROI',
    keywords: ['marketing ROI', 'startup analytics', 'ROI calculator', 'marketing metrics'],
    publishedDate: '2025-01-15',
    readingTime: 10,
    priority: 'high'
  },

  // Mobile App Marketing
  {
    slug: '/blog/mobile-app-cac-crisis-2025-guide',
    title: 'Mobile App CAC Crisis: Complete 2025 Recovery Guide',
    description: 'Navigate rising customer acquisition costs with proven strategies',
    category: 'Mobile Marketing',
    keywords: ['mobile app CAC', 'customer acquisition cost', 'app marketing'],
    publishedDate: '2025-01-15',
    readingTime: 14,
    priority: 'high'
  },
  {
    slug: '/blog/aso-roi-calculator-guide',
    title: 'ASO ROI Calculator: Measure App Store Optimization Impact',
    description: 'Calculate the true ROI of your app store optimization efforts',
    category: 'Mobile Marketing',
    keywords: ['ASO ROI', 'app store optimization', 'mobile app analytics'],
    publishedDate: '2025-01-15',
    readingTime: 8,
    priority: 'medium'
  },

  // SaaS & Subscription Marketing
  {
    slug: '/blog/freemium-conversion-optimization-framework',
    title: 'Freemium Conversion Optimization: Convert 40% More Trial Users',
    description: 'Optimize your freemium funnel with proven conversion strategies',
    category: 'SaaS Marketing',
    keywords: ['freemium conversion', 'SaaS optimization', 'trial conversion'],
    publishedDate: '2025-01-15',
    readingTime: 12,
    priority: 'high'
  },
  {
    slug: '/blog/d2c-subscription-marketing-playbook',
    title: 'D2C Subscription Marketing Playbook: Scale to $10M ARR',
    description: 'Complete playbook for scaling D2C subscription businesses',
    category: 'Subscription Marketing',
    keywords: ['D2C marketing', 'subscription growth', 'recurring revenue'],
    publishedDate: '2025-01-15',
    readingTime: 16,
    priority: 'high'
  }
];

/**
 * Category-based content clusters for topical authority
 */
export const CONTENT_CLUSTERS = {
  'Copywriting Strategy': {
    pillarPage: '/blog/ultimate-ad-copywriting-framework-guide-12-proven-formulas',
    supportingContent: [
      '/blog/psychology-based-copywriting-science-persuasive-ad-copy',
      '/blog/high-converting-ad-copy-templates-25-proven-scripts'
    ],
    relatedTools: ['/free-hooks', '/hook-generator'],
    keywords: ['copywriting', 'ad copy', 'conversion copywriting', 'persuasive writing']
  },
  'Content Marketing': {
    pillarPage: '/blog/ugc-content-strategy-blueprint-10x-user-content-generation',
    supportingContent: [
      '/blog/ugc-creator-playbook-authentic-content-creation-guide'
    ],
    relatedTools: [],
    keywords: ['UGC', 'content marketing', 'user generated content', 'authentic content']
  },
  'Growth Marketing': {
    pillarPage: '/blog/startup-marketing-budget-calculator-2025',
    supportingContent: [
      '/blog/startup-marketing-roi-calculator'
    ],
    relatedTools: ['/cac-optimization-calculator'],
    keywords: ['growth marketing', 'startup marketing', 'marketing budget', 'ROI optimization']
  },
  'Mobile Marketing': {
    pillarPage: '/blog/mobile-app-cac-crisis-2025-guide',
    supportingContent: [
      '/blog/aso-roi-calculator-guide'
    ],
    relatedTools: [],
    keywords: ['mobile app marketing', 'CAC optimization', 'ASO', 'app growth']
  },
  'SaaS Marketing': {
    pillarPage: '/blog/freemium-conversion-optimization-framework',
    supportingContent: [
      '/blog/d2c-subscription-marketing-playbook'
    ],
    relatedTools: [],
    keywords: ['SaaS marketing', 'freemium', 'subscription growth', 'trial conversion']
  }
};

/**
 * Internal Linking Service for SEO optimization
 */
export class InternalLinkingService {
  private contentMap: BlogPost[];
  private clusters: typeof CONTENT_CLUSTERS;

  constructor() {
    this.contentMap = BLOG_CONTENT_MAP;
    this.clusters = CONTENT_CLUSTERS;
  }

  /**
   * Get related articles based on keywords and category similarity
   */
  getRelatedArticles(
    currentSlug: string,
    limit: number = 6,
    includeCategories: string[] = []
  ): InternalLink[] {
    const currentPost = this.contentMap.find(post => post.slug === currentSlug);
    if (!currentPost) return [];

    const relatedPosts = this.contentMap
      .filter(post => post.slug !== currentSlug)
      .map(post => ({
        ...post,
        relevanceScore: this.calculateRelevanceScore(currentPost, post)
      }))
      .filter(post => {
        if (includeCategories.length > 0) {
          return includeCategories.includes(post.category);
        }
        return post.relevanceScore > 0.3; // Minimum relevance threshold
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return relatedPosts.map(post => ({
      url: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      relevanceScore: post.relevanceScore,
      linkType: this.determineLinkType(currentPost, post)
    }));
  }

  /**
   * Get contextual links for specific content sections
   */
  getContextualLinks(
    currentSlug: string,
    contentKeywords: string[],
    limit: number = 3
  ): InternalLink[] {
    const currentPost = this.contentMap.find(post => post.slug === currentSlug);
    if (!currentPost) return [];

    const contextualPosts = this.contentMap
      .filter(post => post.slug !== currentSlug)
      .map(post => ({
        ...post,
        contextualScore: this.calculateContextualScore(contentKeywords, post.keywords)
      }))
      .filter(post => post.contextualScore > 0.5)
      .sort((a, b) => b.contextualScore - a.contextualScore)
      .slice(0, limit);

    return contextualPosts.map(post => ({
      url: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      relevanceScore: post.contextualScore,
      linkType: 'contextual' as const
    }));
  }

  /**
   * Get cluster navigation for topical authority
   */
  getClusterNavigation(currentSlug: string): {
    pillarPage?: InternalLink;
    supportingContent: InternalLink[];
    relatedTools: InternalLink[];
  } {
    const currentPost = this.contentMap.find(post => post.slug === currentSlug);
    if (!currentPost) {
      return { supportingContent: [], relatedTools: [] };
    }

    const cluster = this.clusters[currentPost.category as keyof typeof CONTENT_CLUSTERS];
    if (!cluster) {
      return { supportingContent: [], relatedTools: [] };
    }

    const pillarPost = this.contentMap.find(post => post.slug === cluster.pillarPage);
    const supportingPosts = this.contentMap.filter(post => 
      cluster.supportingContent.includes(post.slug) && post.slug !== currentSlug
    );

    return {
      pillarPage: pillarPost && pillarPost.slug !== currentSlug ? {
        url: pillarPost.slug,
        title: pillarPost.title,
        description: pillarPost.description,
        category: pillarPost.category,
        relevanceScore: 1.0,
        linkType: 'pillar' as const
      } : undefined,
      supportingContent: supportingPosts.map(post => ({
        url: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        relevanceScore: 0.9,
        linkType: 'related' as const
      })),
      relatedTools: cluster.relatedTools.map(tool => ({
        url: tool,
        title: this.getToolTitle(tool),
        description: this.getToolDescription(tool),
        category: 'Tools',
        relevanceScore: 0.8,
        linkType: 'cta' as const
      }))
    };
  }

  /**
   * Calculate relevance score between two posts
   */
  private calculateRelevanceScore(post1: BlogPost, post2: BlogPost): number {
    let score = 0;

    // Category match (high weight)
    if (post1.category === post2.category) {
      score += 0.5;
    }

    // Keyword overlap
    const keywordOverlap = this.calculateKeywordOverlap(post1.keywords, post2.keywords);
    score += keywordOverlap * 0.3;

    // Priority boost
    if (post2.priority === 'high') {
      score += 0.1;
    }

    // Recency boost (newer content gets slight boost)
    const daysDiff = Math.abs(
      new Date(post1.publishedDate).getTime() - new Date(post2.publishedDate).getTime()
    ) / (1000 * 60 * 60 * 24);
    
    if (daysDiff < 30) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Calculate contextual score for specific keywords
   */
  private calculateContextualScore(contentKeywords: string[], postKeywords: string[]): number {
    return this.calculateKeywordOverlap(
      contentKeywords.map(k => k.toLowerCase()),
      postKeywords.map(k => k.toLowerCase())
    );
  }

  /**
   * Calculate keyword overlap percentage
   */
  private calculateKeywordOverlap(keywords1: string[], keywords2: string[]): number {
    const set1 = new Set(keywords1.map(k => k.toLowerCase()));
    const set2 = new Set(keywords2.map(k => k.toLowerCase()));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  /**
   * Determine the type of internal link relationship
   */
  private determineLinkType(currentPost: BlogPost, targetPost: BlogPost): InternalLink['linkType'] {
    if (currentPost.category === targetPost.category) {
      const cluster = this.clusters[currentPost.category as keyof typeof CONTENT_CLUSTERS];
      if (cluster && cluster.pillarPage === targetPost.slug) {
        return 'pillar';
      }
      return 'category';
    }
    
    const relevanceScore = this.calculateRelevanceScore(currentPost, targetPost);
    if (relevanceScore > 0.7) {
      return 'related';
    }
    
    return 'contextual';
  }

  /**
   * Get tool titles for internal links
   */
  private getToolTitle(toolSlug: string): string {
    const toolTitles: Record<string, string> = {
      '/free-hooks': '52 High-Converting Ad Hooks Library',
      '/hook-generator': 'AI Hook Generator Tool',
      '/cac-optimization-calculator': 'CAC Optimization Calculator'
    };
    
    return toolTitles[toolSlug] || 'Marketing Tool';
  }

  /**
   * Get tool descriptions for internal links
   */
  private getToolDescription(toolSlug: string): string {
    const toolDescriptions: Record<string, string> = {
      '/free-hooks': 'Free library of proven ad hooks that convert',
      '/hook-generator': 'Generate compelling ad hooks with AI assistance',
      '/cac-optimization-calculator': 'Calculate and optimize your customer acquisition costs'
    };
    
    return toolDescriptions[toolSlug] || 'Professional marketing tool';
  }

  /**
   * Generate anchor text suggestions for internal links
   */
  generateAnchorText(link: InternalLink, context: 'inline' | 'cta' | 'navigation' = 'inline'): string[] {
    const baseText = link.title;
    const category = link.category.toLowerCase();
    
    const suggestions: string[] = [];
    
    if (context === 'inline') {
      suggestions.push(
        baseText,
        `our guide on ${category}`,
        `proven ${category} strategies`,
        `advanced ${category} techniques`
      );
    } else if (context === 'cta') {
      suggestions.push(
        `Learn more about ${category}`,
        `Get the complete ${category} guide`,
        `Master ${category} strategies`,
        baseText
      );
    } else {
      suggestions.push(baseText);
    }
    
    return suggestions;
  }
}

// Create singleton instance
export const internalLinkingService = new InternalLinkingService();

// Export types
export type { InternalLink };
/**
 * Pexels API Integration for Blog Featured Images
 * Provides high-quality, royalty-free images for blog posts
 */

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsSearchResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page: string;
}

interface PexelsConfig {
  apiKey?: string;
  defaultSize: keyof PexelsPhoto['src'];
  orientation: 'landscape' | 'portrait' | 'square';
  size: 'large' | 'medium' | 'small';
  color?: string;
  locale?: string;
}

const DEFAULT_CONFIG: PexelsConfig = {
  defaultSize: 'large',
  orientation: 'landscape',
  size: 'large',
  locale: 'en-US'
};

/**
 * Pexels API client for fetching blog images
 */
export class PexelsImageService {
  private config: PexelsConfig;

  constructor(config: Partial<PexelsConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    if (!this.config.apiKey && !process.env.PEXELS_KEY) {
      console.warn('Pexels API key not provided. Using fallback images.');
    }
  }

  /**
   * Search for images by keyword with optimized parameters for blog posts
   */
  async searchImages(
    query: string,
    options: {
      page?: number;
      perPage?: number;
      orientation?: 'landscape' | 'portrait' | 'square';
      size?: 'large' | 'medium' | 'small';
      color?: string;
    } = {}
  ): Promise<PexelsPhoto[]> {
    const apiKey = this.config.apiKey || process.env.PEXELS_KEY;
    
    if (!apiKey) {
      console.warn('No Pexels API key available, returning fallback images');
      return this.getFallbackImages(query);
    }

    try {
      const params = new URLSearchParams({
        query: query,
        page: (options.page || 1).toString(),
        per_page: (options.perPage || 20).toString(),
        orientation: options.orientation || this.config.orientation,
        size: options.size || this.config.size,
        locale: this.config.locale || 'en-US',
        ...(options.color && { color: options.color })
      });

      const response = await fetch(
        `https://api.pexels.com/v1/search?${params}`,
        {
          headers: {
            'Authorization': apiKey,
            'User-Agent': 'APSICS Media Blog System'
          },
          next: { revalidate: 86400 } // Cache for 24 hours
        }
      );

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data: PexelsSearchResponse = await response.json();
      return data.photos;
    } catch (error) {
      console.error('Error fetching from Pexels API:', error);
      return this.getFallbackImages(query);
    }
  }

  /**
   * Get optimized image for blog post header
   */
  async getBlogHeaderImage(
    keywords: string[],
    preferredAspectRatio: 'wide' | 'standard' = 'wide'
  ): Promise<{
    url: string;
    alt: string;
    photographer: string;
    photographerUrl: string;
    width: number;
    height: number;
  } | null> {
    // Create search query from keywords
    const query = keywords.slice(0, 3).join(' ');
    
    const orientation = preferredAspectRatio === 'wide' ? 'landscape' : 'landscape';
    const photos = await this.searchImages(query, { 
      orientation,
      perPage: 10,
      size: 'large'
    });

    if (photos.length === 0) {
      return null;
    }

    // Select best image based on quality and aspect ratio
    const bestPhoto = this.selectBestImage(photos, preferredAspectRatio);
    
    return {
      url: bestPhoto.src[this.config.defaultSize],
      alt: this.generateAltText(bestPhoto.alt, keywords),
      photographer: bestPhoto.photographer,
      photographerUrl: bestPhoto.photographer_url,
      width: bestPhoto.width,
      height: bestPhoto.height
    };
  }

  /**
   * Generate curated images for specific blog post topics
   */
  async getCuratedImagesForTopic(topic: string): Promise<PexelsPhoto[]> {
    const topicKeywords = this.getTopicKeywords(topic);
    
    const searchPromises = topicKeywords.map(keyword => 
      this.searchImages(keyword, { perPage: 5 })
    );

    const results = await Promise.all(searchPromises);
    
    // Flatten and deduplicate results
    const allPhotos = results.flat();
    const uniquePhotos = this.deduplicatePhotos(allPhotos);
    
    return uniquePhotos.slice(0, 15); // Return top 15 curated images
  }

  /**
   * Generate comprehensive alt text for SEO
   */
  private generateAltText(originalAlt: string, keywords: string[]): string {
    if (!originalAlt) {
      return `Professional image related to ${keywords.join(', ')}`;
    }

    // Enhance alt text with keywords if not already present
    const primaryKeyword = keywords[0];
    if (primaryKeyword && !originalAlt.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      return `${originalAlt} - ${primaryKeyword}`;
    }

    return originalAlt;
  }

  /**
   * Select best image based on quality metrics and requirements
   */
  private selectBestImage(photos: PexelsPhoto[], aspectRatio: 'wide' | 'standard'): PexelsPhoto {
    return photos.reduce((best, current) => {
      const bestRatio = best.width / best.height;
      const currentRatio = current.width / current.height;
      
      const targetRatio = aspectRatio === 'wide' ? 2.0 : 1.6;
      
      const bestDistance = Math.abs(bestRatio - targetRatio);
      const currentDistance = Math.abs(currentRatio - targetRatio);
      
      // Prefer images closer to target aspect ratio and higher resolution
      if (currentDistance < bestDistance || 
          (currentDistance === bestDistance && current.width > best.width)) {
        return current;
      }
      
      return best;
    });
  }

  /**
   * Get topic-specific keywords for better image search
   */
  private getTopicKeywords(topic: string): string[] {
    const keywordMap: Record<string, string[]> = {
      'copywriting': ['writing', 'marketing copy', 'advertising text', 'digital marketing'],
      'psychology': ['brain', 'mind', 'behavior', 'psychology research'],
      'ugc': ['user content', 'social media', 'content creation', 'authentic marketing'],
      'marketing': ['business growth', 'marketing strategy', 'digital advertising', 'brand marketing'],
      'strategy': ['business planning', 'strategic thinking', 'growth strategy', 'business development'],
      'analytics': ['data analysis', 'business metrics', 'performance tracking', 'analytics dashboard'],
      'conversion': ['sales funnel', 'customer journey', 'conversion optimization', 'business growth'],
      'templates': ['business templates', 'marketing tools', 'productivity', 'workflow optimization']
    };

    const topicLower = topic.toLowerCase();
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (topicLower.includes(key)) {
        return keywords;
      }
    }

    return [topic, 'business', 'marketing', 'professional'];
  }

  /**
   * Remove duplicate photos based on ID
   */
  private deduplicatePhotos(photos: PexelsPhoto[]): PexelsPhoto[] {
    const seen = new Set<number>();
    return photos.filter(photo => {
      if (seen.has(photo.id)) {
        return false;
      }
      seen.add(photo.id);
      return true;
    });
  }

  /**
   * Fallback images when Pexels API is not available
   */
  private getFallbackImages(query: string): PexelsPhoto[] {
    // Return structured fallback data that matches PexelsPhoto interface
    return [
      {
        id: 1,
        width: 1200,
        height: 630,
        url: '/images/og/og-default-blog.png',
        photographer: 'APSICS Media',
        photographer_url: 'https://apsicsmedia.com',
        photographer_id: 1,
        avg_color: '#126DB5',
        src: {
          original: '/images/og/og-default-blog.png',
          large2x: '/images/og/og-default-blog.png',
          large: '/images/og/og-default-blog.png',
          medium: '/images/og/og-default-blog.png',
          small: '/images/og/og-default-blog.png',
          portrait: '/images/og/og-default-blog.png',
          landscape: '/images/og/og-default-blog.png',
          tiny: '/images/og/og-default-blog.png'
        },
        liked: false,
        alt: `Professional image for ${query} - APSICS Media blog`
      }
    ];
  }
}

/**
 * Utility functions for image optimization and SEO
 */
export const ImageUtils = {
  /**
   * Generate optimized image sizes for responsive display
   */
  generateResponsiveSizes(baseUrl: string): {
    mobile: string;
    tablet: string;
    desktop: string;
    hero: string;
  } {
    return {
      mobile: `${baseUrl}?auto=compress&cs=tinysrgb&w=480`,
      tablet: `${baseUrl}?auto=compress&cs=tinysrgb&w=768`,
      desktop: `${baseUrl}?auto=compress&cs=tinysrgb&w=1200`,
      hero: `${baseUrl}?auto=compress&cs=tinysrgb&w=1920`
    };
  },

  /**
   * Generate structured data for images
   */
  generateImageStructuredData(image: {
    url: string;
    alt: string;
    width: number;
    height: number;
    photographer?: string;
  }) {
    return {
      '@type': 'ImageObject',
      url: image.url,
      name: image.alt,
      description: image.alt,
      width: image.width,
      height: image.height,
      ...(image.photographer && {
        creator: {
          '@type': 'Person',
          name: image.photographer
        }
      })
    };
  },

  /**
   * Optimize image loading performance
   */
  getOptimizedImageProps(
    src: string,
    alt: string,
    priority: boolean = false
  ): {
    src: string;
    alt: string;
    loading: 'lazy' | 'eager';
    decoding: 'async';
    fetchPriority?: 'high' | 'low';
  } {
    return {
      src,
      alt,
      loading: priority ? 'eager' : 'lazy',
      decoding: 'async',
      ...(priority && { fetchPriority: 'high' })
    };
  }
};

// Create default instance
export const pexelsService = new PexelsImageService();

// Export types
export type { PexelsPhoto, PexelsConfig };
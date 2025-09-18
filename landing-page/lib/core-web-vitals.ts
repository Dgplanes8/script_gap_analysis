/**
 * Core Web Vitals Optimization Utilities
 * Helps improve LCP, INP, and CLS for better SEO rankings
 */

export interface WebVitalsConfig {
  enableLazyLoading: boolean;
  optimizeImages: boolean;
  prefetchCriticalResources: boolean;
  enableServiceWorker: boolean;
  criticalCSSInline: boolean;
}

export const DEFAULT_WEB_VITALS_CONFIG: WebVitalsConfig = {
  enableLazyLoading: true,
  optimizeImages: true,
  prefetchCriticalResources: true,
  enableServiceWorker: false, // Enable when ready
  criticalCSSInline: true
};

/**
 * Critical CSS for above-the-fold content
 * Inlines essential styles to prevent render blocking
 */
export const CRITICAL_CSS = `
  /* Critical above-the-fold styles */
  :root {
    --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
    --color-primary-blue: rgb(18 109 251);
    --color-primary-blue-dark: rgb(15 90 214);
    --color-white: rgb(255 255 255);
    --color-gray-900: rgb(17 24 39);
    --color-gray-700: rgb(55 65 81);
    --color-gray-600: rgb(75 85 99);
  }

  body {
    font-family: var(--font-inter);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: var(--color-gray-900);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Header and navigation */
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--color-white);
    border-bottom: 1px solid rgb(229 231 235);
  }

  .container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Hero section */
  .hero-section {
    background: linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-blue-dark) 100%);
    color: var(--color-white);
    padding: 6rem 1rem 4rem;
    text-align: center;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 48rem;
    margin: 0 auto 2rem;
  }

  /* Button styles */
  .btn-primary {
    background: var(--color-white);
    color: var(--color-primary-blue);
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    border: none;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    min-height: 3.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .hero-section {
      padding: 4rem 1rem 3rem;
      min-height: 50vh;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
    }
    
    .container {
      padding: 0 1rem;
    }
  }

  /* Layout helpers */
  .text-center { text-align: center; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-3xl { font-size: 1.875rem; }
`;

/**
 * Resource hints for performance optimization
 */
export const PERFORMANCE_HINTS = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//vercel.live',
    '//va.vercel-scripts.com',
    '//api.pexels.com'
  ],

  // Preconnect to critical origins
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.pexels.com'
  ],

  // Preload critical resources
  preload: [
    {
      href: '/images/og-image.png',
      as: 'image',
      type: 'image/png'
    },
    {
      href: '/favicon.svg',
      as: 'image',
      type: 'image/svg+xml'
    }
  ],

  // Prefetch likely next pages
  prefetch: [
    '/blog',
    '/free-hooks',
    '/cac-optimization-calculator'
  ]
};

/**
 * Image optimization utilities
 */
export class ImageOptimizer {
  /**
   * Generate optimized image srcset for responsive images
   */
  static generateSrcSet(baseUrl: string, widths: number[] = [320, 640, 768, 1024, 1280, 1920]): string {
    return widths
      .map(width => `${baseUrl}?w=${width}&q=85&fm=webp 1x, ${baseUrl}?w=${width * 2}&q=85&fm=webp 2x`)
      .join(', ');
  }

  /**
   * Generate sizes attribute for responsive images
   */
  static generateSizes(breakpoints: Array<{ maxWidth: string; size: string }>): string {
    const sizeQueries = breakpoints.map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`);
    return sizeQueries.join(', ');
  }

  /**
   * Get optimized image props for Next.js Image component
   */
  static getOptimizedImageProps(
    src: string,
    alt: string,
    width: number,
    height: number,
    priority: boolean = false
  ) {
    return {
      src,
      alt,
      width,
      height,
      quality: 85,
      placeholder: 'blur' as const,
      blurDataURL: ImageOptimizer.generateBlurDataURL(width, height),
      loading: priority ? ('eager' as const) : ('lazy' as const),
      priority,
      sizes: ImageOptimizer.generateSizes([
        { maxWidth: '640px', size: '100vw' },
        { maxWidth: '1024px', size: '50vw' },
        { maxWidth: '1280px', size: '33vw' }
      ])
    };
  }

  /**
   * Generate blur placeholder data URL
   */
  static generateBlurDataURL(width: number, height: number): string {
    const canvas = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
    `.trim();
    
    return `data:image/svg+xml;base64,${Buffer.from(canvas).toString('base64')}`;
  }
}

/**
 * Layout Shift Prevention utilities
 */
export class LayoutShiftPrevention {
  /**
   * Generate aspect ratio classes for images
   */
  static getAspectRatioClass(width: number, height: number): string {
    const ratio = width / height;
    
    if (Math.abs(ratio - 16/9) < 0.1) return 'aspect-video';
    if (Math.abs(ratio - 4/3) < 0.1) return 'aspect-4/3';
    if (Math.abs(ratio - 1) < 0.1) return 'aspect-square';
    if (Math.abs(ratio - 3/2) < 0.1) return 'aspect-3/2';
    
    return `aspect-[${width}/${height}]`;
  }

  /**
   * Generate skeleton loader for content
   */
  static generateSkeletonLoader(type: 'text' | 'image' | 'card' = 'text'): string {
    const skeletons = {
      text: `
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      `,
      image: `
        <div class="animate-pulse bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
          </svg>
        </div>
      `,
      card: `
        <div class="animate-pulse p-6 bg-white rounded-lg border">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      `
    };
    
    return skeletons[type];
  }

  /**
   * Generate fixed dimensions for dynamic content
   */
  static getFixedDimensions(content: string, type: 'heading' | 'paragraph' | 'button'): { minHeight: string } {
    const dimensions = {
      heading: { minHeight: '2.5rem' },
      paragraph: { minHeight: '1.5rem' },
      button: { minHeight: '2.75rem' }
    };
    
    return dimensions[type];
  }
}

/**
 * Font optimization utilities
 */
export class FontOptimizer {
  /**
   * Generate font display optimization
   */
  static getFontDisplayRules(): string {
    return `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2-variations');
        font-weight: 100 900;
        font-style: normal;
      }
    `;
  }

  /**
   * Generate preload links for critical fonts
   */
  static getCriticalFontPreloads(): Array<{ href: string; as: string; type: string; crossOrigin: string }> {
    return [
      {
        href: '/fonts/inter-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous'
      }
    ];
  }
}

/**
 * JavaScript optimization utilities
 */
export class JavaScriptOptimizer {
  /**
   * Generate script loading strategy
   */
  static getLoadingStrategy(scriptType: 'critical' | 'deferred' | 'lazy'): { strategy: string; async?: boolean; defer?: boolean } {
    const strategies = {
      critical: { strategy: 'beforeInteractive' },
      deferred: { strategy: 'afterInteractive', defer: true },
      lazy: { strategy: 'lazyOnload', async: true }
    };
    
    return strategies[scriptType];
  }

  /**
   * Generate service worker registration
   */
  static getServiceWorkerScript(): string {
    return `
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
              console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    `;
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  /**
   * Monitor Core Web Vitals
   */
  static monitorWebVitals(): string {
    return `
      import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

      function sendToAnalytics(metric) {
        // Send to your analytics provider
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_action: metric.name,
            value: Math.round(metric.value),
            custom_parameter_1: metric.id,
            non_interaction: true,
          });
        }
      }

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    `;
  }

  /**
   * Generate performance budget alerts
   */
  static getPerformanceBudget() {
    return {
      LCP: 2500, // 2.5 seconds
      FID: 100,  // 100 milliseconds
      CLS: 0.1,  // 0.1 or less
      FCP: 1800, // 1.8 seconds
      TTFB: 800  // 800 milliseconds
    };
  }
}

// Export utilities
export {
  ImageOptimizer,
  LayoutShiftPrevention,
  FontOptimizer,
  JavaScriptOptimizer,
  PerformanceMonitor
};
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface ScriptLoaderProps {
  src: string;
  id?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
  onLoad?: () => void;
  onError?: () => void;
  defer?: boolean;
  async?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  integrity?: string;
  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
  type?: string;
  children?: string;
}

// Enhanced script loader with better performance controls
export function PerformantScript({
  src,
  id,
  strategy = 'lazyOnload',
  onLoad,
  onError,
  defer = true,
  async = true,
  crossOrigin,
  integrity,
  referrerPolicy = 'origin-when-cross-origin',
  type = 'text/javascript',
  children,
}: ScriptLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Intersection observer to load scripts when they're needed
  useEffect(() => {
    if (strategy === 'lazyOnload') {
      // Load script after user interaction or after a delay
      const timer = setTimeout(() => setShouldLoad(true), 3000);
      
      const handleInteraction = () => {
        setShouldLoad(true);
        clearTimeout(timer);
        
        // Remove event listeners after first interaction
        ['mouseenter', 'touchstart', 'scroll', 'keydown'].forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      };

      ['mouseenter', 'touchstart', 'scroll', 'keydown'].forEach(event => {
        document.addEventListener(event, handleInteraction);
      });

      return () => {
        clearTimeout(timer);
        ['mouseenter', 'touchstart', 'scroll', 'keydown'].forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
      };
    } else {
      setShouldLoad(true);
    }
  }, [strategy]);

  const handleLoad = () => {
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  if (!shouldLoad || hasError) {
    return null;
  }

  return (
    <Script
      src={src}
      id={id}
      strategy={strategy}
      onLoad={handleLoad}
      onError={handleError}
      defer={defer}
      crossOrigin={crossOrigin}
      integrity={integrity}
      referrerPolicy={referrerPolicy}
      type={type}
    >
      {children}
    </Script>
  );
}

// Facade component for heavy widgets
export function ScriptFacade({
  src,
  title,
  description,
  className = '',
  loadingText = 'Loading...',
  onActivate,
}: {
  src: string;
  title: string;
  description: string;
  className?: string;
  loadingText?: string;
  onActivate?: () => void;
}) {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = () => {
    setIsLoading(true);
    setIsActivated(true);
    if (onActivate) onActivate();
  };

  if (isActivated) {
    return (
      <div className={className}>
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <span className="ml-2 text-gray-600">{loadingText}</span>
          </div>
        )}
        <PerformantScript
          src={src}
          strategy="afterInteractive"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div 
      className={`${className} bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors`}
      onClick={handleActivate}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="btn-primary">
          Load {title}
        </button>
      </div>
    </div>
  );
}

// Optimized Google Analytics loader
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <PerformantScript
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        async
        defer
      />
      <PerformantScript
        src=""
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: false
          });
        `}
      </PerformantScript>
    </>
  );
}

// Optimized font loading
export function PreloadFonts({ fonts }: { fonts: string[] }) {
  return (
    <>
      {fonts.map((font, index) => (
        <link
          key={index}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
}

// Performance monitoring script
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming & { processingStart: number };
          console.log('FID:', fidEntry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as PerformanceEventTiming & { hadRecentInput: boolean; value: number };
          if (!clsEntry.hadRecentInput) {
            console.log('CLS:', clsEntry.value);
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Observer not supported
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

// Critical resource preloader
export function CriticalResourcePreloader({ resources }: { resources: Array<{ href: string; as: string; type?: string; crossOrigin?: 'anonymous' | 'use-credentials' | '' }> }) {
  return (
    <>
      {resources.map((resource, index) => (
        <link
          key={index}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
        />
      ))}
    </>
  );
}
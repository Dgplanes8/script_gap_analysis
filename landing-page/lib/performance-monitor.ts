// Performance monitoring and budgets
import { useState, useEffect } from 'react';

export interface PerformanceBudget {
  maxBundleSize: number; // KB
  maxImageSize: number; // KB
  maxLCP: number; // ms
  maxFCP: number; // ms
  maxCLS: number; // score
  maxTBT: number; // ms
}

export const PERFORMANCE_BUDGETS: PerformanceBudget = {
  maxBundleSize: 200, // 200KB gzipped
  maxImageSize: 500,  // 500KB per image
  maxLCP: 2500,       // 2.5s
  maxFCP: 1800,       // 1.8s
  maxCLS: 0.1,        // 0.1 CLS score
  maxTBT: 300,        // 300ms
};

export interface WebVitals {
  LCP?: number;
  FCP?: number;
  CLS?: number;
  TBT?: number;
  FID?: number;
  INP?: number;
}

// Performance monitoring class
export class PerformanceMonitor {
  private vitals: WebVitals = {};
  private budgetViolations: string[] = [];

  constructor(private budget: PerformanceBudget = PERFORMANCE_BUDGETS) {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observePerformance();
    
    // Monitor resource loading
    this.observeResources();
    
    // Monitor custom metrics
    this.observeCustomMetrics();
  }

  private observePerformance() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEventTiming;
      
      this.vitals.LCP = lastEntry.startTime;
      this.checkBudget('LCP', lastEntry.startTime, this.budget.maxLCP);
      
      console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    });

    // FCP Observer
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEventTiming;
      
      this.vitals.FCP = lastEntry.startTime;
      this.checkBudget('FCP', lastEntry.startTime, this.budget.maxFCP);
      
      console.log(`🎯 FCP: ${lastEntry.startTime.toFixed(2)}ms`);
    });

    // CLS Observer
    const clsObserver = new PerformanceObserver((list) => {
      let clsScore = 0;
      
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEventTiming & { value: number; hadRecentInput: boolean };
        if (!layoutShift.hadRecentInput) {
          clsScore += layoutShift.value;
        }
      }
      
      this.vitals.CLS = clsScore;
      this.checkBudget('CLS', clsScore, this.budget.maxCLS);
      
      if (clsScore > 0) {
        console.log(`🎯 CLS: ${clsScore.toFixed(4)}`);
      }
    });

    // FID/INP Observer
    const responsiveObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const inputEntry = entry as PerformanceEventTiming & { processingStart: number };
        
        if (entry.entryType === 'first-input') {
          const fid = inputEntry.processingStart - entry.startTime;
          this.vitals.FID = fid;
          console.log(`🎯 FID: ${fid.toFixed(2)}ms`);
        }
        
        if (entry.entryType === 'event') {
          const inp = entry.duration;
          this.vitals.INP = Math.max(this.vitals.INP || 0, inp);
          console.log(`🎯 INP: ${inp.toFixed(2)}ms`);
        }
      }
    });

    // Start observing
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fcpObserver.observe({ entryTypes: ['paint'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      responsiveObserver.observe({ entryTypes: ['first-input', 'event'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  private observeResources() {
    if (typeof window === 'undefined') return;

    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Check bundle size budgets
        if (resource.name.includes('.js') || resource.name.includes('.css')) {
          const sizeKB = (resource.transferSize || 0) / 1024;
          if (sizeKB > this.budget.maxBundleSize) {
            this.budgetViolations.push(`Bundle size violation: ${resource.name} (${sizeKB.toFixed(2)}KB)`);
            console.warn(`📦 Large bundle: ${resource.name} (${sizeKB.toFixed(2)}KB)`);
          }
        }
        
        // Check image size budgets
        if (resource.name.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)) {
          const sizeKB = (resource.transferSize || 0) / 1024;
          if (sizeKB > this.budget.maxImageSize) {
            this.budgetViolations.push(`Image size violation: ${resource.name} (${sizeKB.toFixed(2)}KB)`);
            console.warn(`🖼️ Large image: ${resource.name} (${sizeKB.toFixed(2)}KB)`);
          }
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource Observer not supported:', error);
    }
  }

  private observeCustomMetrics() {
    if (typeof window === 'undefined') return;

    // Time to First Byte
    window.addEventListener('load', () => {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        const ttfb = navTiming.responseStart - navTiming.requestStart;
        console.log(`🎯 TTFB: ${ttfb.toFixed(2)}ms`);
      }
    });

    // Page Load Time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`🎯 Page Load: ${loadTime.toFixed(2)}ms`);
    });
  }

  private checkBudget(metric: string, value: number, budget: number) {
    if (value > budget) {
      const violation = `${metric} budget violation: ${value.toFixed(2)} > ${budget}`;
      this.budgetViolations.push(violation);
      console.warn(`⚠️ ${violation}`);
    } else {
      console.log(`✅ ${metric} within budget: ${value.toFixed(2)} <= ${budget}`);
    }
  }

  // Public methods
  public getVitals(): WebVitals {
    return { ...this.vitals };
  }

  public getBudgetViolations(): string[] {
    return [...this.budgetViolations];
  }

  public generateReport(): PerformanceReport {
    return {
      vitals: this.getVitals(),
      violations: this.getBudgetViolations(),
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    };
  }

  public sendReport(endpoint: string) {
    const report = this.generateReport();
    
    if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon(endpoint, JSON.stringify(report));
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      }).catch(console.error);
    }
  }
}

export interface PerformanceReport {
  vitals: WebVitals;
  violations: string[];
  timestamp: string;
  url: string;
  userAgent: string;
}

// Bundle size checker
export function checkBundleSize() {
  if (typeof window === 'undefined') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  console.group('📦 Bundle Analysis');
  
  scripts.forEach(script => {
    const src = (script as HTMLScriptElement).src;
    if (src.includes('_next/static')) {
      console.log(`JS: ${src.split('/').pop()}`);
    }
  });
  
  styles.forEach(style => {
    const href = (style as HTMLLinkElement).href;
    if (href.includes('_next/static')) {
      console.log(`CSS: ${href.split('/').pop()}`);
    }
  });
  
  console.groupEnd();
}

// Initialize performance monitoring
export function initPerformanceMonitoring(budget?: PerformanceBudget) {
  if (typeof window === 'undefined') return null;
  
  const monitor = new PerformanceMonitor(budget);
  
  // Global performance monitor reference
  (window as any).__performanceMonitor = monitor;
  
  // Check bundle size in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(checkBundleSize, 1000);
  }
  
  return monitor;
}

// Performance budget component for React
export function usePerformanceMonitor(budget?: PerformanceBudget) {
  const [monitor, setMonitor] = useState<PerformanceMonitor | null>(null);
  const [vitals, setVitals] = useState<WebVitals>({});
  
  useEffect(() => {
    const perfMonitor = initPerformanceMonitoring(budget);
    setMonitor(perfMonitor);
    
    // Update vitals periodically
    const interval = setInterval(() => {
      if (perfMonitor) {
        setVitals(perfMonitor.getVitals());
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [budget]);
  
  return { monitor, vitals };
}
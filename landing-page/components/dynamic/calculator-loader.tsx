import dynamic from 'next/dynamic';
import { ComponentType, Suspense, useState, useEffect } from 'react';

// Loading placeholder for calculators
function CalculatorSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 animate-pulse">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Form skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        
        {/* Results skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dynamic imports for calculators with optimized loading
export const SaaSCreativeROICalculator = dynamic(
  () => import('@/components/calculators/saas-creative-roi-calculator').then(mod => ({ default: mod.SaaSCreativeROICalculator })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false // Calculators don't need SSR
  }
);

export const CACReductionCalculator = dynamic(
  () => import('@/components/calculators/cac-reduction-calculator').then(mod => ({ default: mod.CACReductionCalculator })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const CACOptimizationCalculator = dynamic(
  () => import('@/components/calculators/cac-optimization-calculator').then(mod => ({ default: mod.CACOptimizationCalculator })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const RevenueGrowthBenchmarkTool = dynamic(
  () => import('@/components/calculators/revenue-growth-benchmark-tool').then(mod => ({ default: mod.RevenueGrowthBenchmarkTool })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const AttributionModelingTool = dynamic(
  () => import('@/components/calculators/attribution-modeling-tool').then(mod => ({ default: mod.AttributionModelingTool })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const ConsumerAttributionModelingTool = dynamic(
  () => import('@/components/calculators/consumer-attribution-modeling-tool').then(mod => ({ default: mod.ConsumerAttributionModelingTool })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const CreativeStrategyBenchmarkTool = dynamic(
  () => import('@/components/calculators/creative-strategy-benchmark-tool').then(mod => ({ default: mod.CreativeStrategyBenchmarkTool })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

export const StrategicROICalculator = dynamic(
  () => import('@/components/calculators/strategic-roi-calculator').then(mod => ({ default: mod.StrategyROICalculator })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false
  }
);

// Dynamic import wrapper for forms
function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 animate-pulse">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export const EmailCaptureForm = dynamic(
  () => import('@/components/forms/email-capture-form').then(mod => ({ default: mod.EmailCaptureForm })),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const StrategicConsultationForm = dynamic(
  () => import('@/components/forms/strategic-consultation-form').then(mod => ({ default: mod.StrategicConsultationForm })),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const ApplicationForm = dynamic(
  () => import('@/components/forms/application-form').then(mod => ({ default: mod.ApplicationForm })),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

// Utility function to lazy load any component
export function lazyLoadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
): T {
  return dynamic(importFn, {
    loading: fallback ? () => <Suspense fallback={null}><fallback /></Suspense> : undefined,
    ssr: false
  }) as T;
}

// Intersection Observer based lazy loading for below-fold content
export function LazySection({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return (
    <div ref={setRef} className={className}>
      {isVisible ? children : <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}
    </div>
  );
}
'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  component: ReactNode;
}

interface EnhancedABTestProps {
  testName: string;
  variants: ABTestVariant[];
  conversionGoal?: string;
  description?: string;
}

// Enhanced A/B testing framework with better analytics and reporting
export function EnhancedABTest({ 
  testName, 
  variants, 
  conversionGoal = 'click',
  description 
}: EnhancedABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    // Check if user has already been assigned to a variant
    const storageKey = `ab_test_${testName}`;
    const storedVariant = localStorage.getItem(storageKey);
    
    if (storedVariant) {
      const variant = variants.find(v => v.id === storedVariant);
      if (variant) {
        setSelectedVariant(variant);
        return;
      }
    }

    // Assign new variant based on weights
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    const random = Math.random() * totalWeight;
    
    let cumulativeWeight = 0;
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        setSelectedVariant(variant);
        localStorage.setItem(storageKey, variant.id);
        break;
      }
    }
  }, [testName, variants]);

  useEffect(() => {
    if (selectedVariant && !hasViewed) {
      // Track variant view
      trackEvent('ab_test_view', {
        testName,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        timestamp: Date.now()
      });
      setHasViewed(true);
    }
  }, [selectedVariant, hasViewed, testName]);

  const handleConversion = (conversionType: string = conversionGoal) => {
    if (selectedVariant) {
      trackEvent('ab_test_conversion', {
        testName,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        conversionType,
        timestamp: Date.now()
      });
    }
  };

  const trackEvent = (eventType: string, data: any) => {
    // Store in localStorage for analytics
    const events = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    events.push({ eventType, ...data });
    localStorage.setItem('ab_test_events', JSON.stringify(events));

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventType, {
        custom_parameter_1: testName,
        custom_parameter_2: data.variantId,
        custom_parameter_3: data.variantName
      });
    }

    // Send to Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', eventType, {
        test: testName,
        variant: data.variantId,
        conversion: data.conversionType || 'view'
      });
    }
  };

  if (!selectedVariant) {
    return <div>Loading...</div>;
  }

  // Clone the component and add conversion tracking
  const WrappedComponent = () => {
    const cloneElement = (element: ReactNode): ReactNode => {
      if (!element || typeof element !== 'object' || !('type' in element)) {
        return element;
      }

      const reactElement = element as React.ReactElement;
      
      // Add onClick handler to track conversions
      const originalOnClick = reactElement.props?.onClick;
      const enhancedOnClick = (e: React.MouseEvent) => {
        handleConversion('click');
        if (originalOnClick) {
          originalOnClick(e);
        }
      };

      // Add conversion tracking to anchor tags and buttons
      if (['a', 'button'].includes(reactElement.type as string)) {
        return {
          ...reactElement,
          props: {
            ...reactElement.props,
            onClick: enhancedOnClick,
            'data-ab-test': testName,
            'data-variant': selectedVariant.id
          }
        };
      }

      return reactElement;
    };

    return cloneElement(selectedVariant.component);
  };

  return (
    <div data-ab-test={testName} data-variant={selectedVariant.id}>
      <WrappedComponent />
      
      {/* Debug info - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div><strong>A/B Test:</strong> {testName}</div>
          <div><strong>Variant:</strong> {selectedVariant.name} ({selectedVariant.id})</div>
          {description && <div><strong>Goal:</strong> {description}</div>}
        </div>
      )}
    </div>
  );
}

// Predefined test configurations for common scenarios
export const ABTestConfigs = {
  heroHeadlines: {
    testName: 'hero_headlines_2024',
    variants: [
      {
        id: 'control',
        name: 'Original Problem-Solution',
        weight: 0.34,
        component: (
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stop guessing hooks. Get 12 scripts in 72 hours for $990.
          </h1>
        )
      },
      {
        id: 'pain_focused',
        name: 'Pain-Focused',
        weight: 0.33,
        component: (
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Stop Wasting Ad Budget on Hooks That Don't Convert
          </h1>
        )
      },
      {
        id: 'outcome_specific',
        name: 'Outcome-Specific',
        weight: 0.33,
        component: (
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get 34% Better CTR in 72 Hours with Customer-Language Scripts
          </h1>
        )
      }
    ]
  },

  ctaButtons: {
    testName: 'cta_buttons_2024',
    variants: [
      {
        id: 'direct_action',
        name: 'Direct Action',
        weight: 0.25,
        component: (
          <button className="btn-primary">
            Get Your Scripts Now
          </button>
        )
      },
      {
        id: 'value_proposition',
        name: 'Value Proposition',
        weight: 0.25,
        component: (
          <button className="btn-primary">
            Get Scripts That Actually Convert
          </button>
        )
      },
      {
        id: 'urgency_scarcity',
        name: 'Urgency + Scarcity',
        weight: 0.25,
        component: (
          <button className="btn-primary">
            Secure Your Scripts (8 Spots Left)
          </button>
        )
      },
      {
        id: 'social_proof',
        name: 'Social Proof',
        weight: 0.25,
        component: (
          <button className="btn-primary">
            Join 1,247+ Marketers Getting Results
          </button>
        )
      }
    ]
  },

  socialProofPositions: {
    testName: 'social_proof_position_2024',
    variants: [
      {
        id: 'above_fold',
        name: 'Above the Fold',
        weight: 0.5,
        component: (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-2">Trusted by 1,247+ performance marketers</p>
            <div className="flex justify-center items-center space-x-6">
              <div className="text-2xl font-bold text-brand-600">34%</div>
              <div className="text-sm">Avg CTR Improvement</div>
            </div>
          </div>
        )
      },
      {
        id: 'after_features',
        name: 'After Features',
        weight: 0.5,
        component: (
          <div className="text-center py-8 bg-blue-50 rounded-lg">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Join 1,247+ marketers getting 34% better CTR
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-xl font-bold text-brand-600">127</div>
                <div className="text-xs text-gray-600">Scripts Delivered</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">98.5%</div>
                <div className="text-xs text-gray-600">On-Time Rate</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">89%</div>
                <div className="text-xs text-gray-600">Upgrade Rate</div>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
};

// Analytics hook for accessing test results
export function useABTestAnalytics() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    setEvents(storedEvents);
  }, []);

  const getTestResults = (testName: string) => {
    const testEvents = events.filter(event => 
      event.testName === testName
    );

    const variants = testEvents.reduce((acc: any, event) => {
      if (!acc[event.variantId]) {
        acc[event.variantId] = {
          id: event.variantId,
          name: event.variantName,
          views: 0,
          conversions: 0
        };
      }

      if (event.eventType === 'ab_test_view') {
        acc[event.variantId].views++;
      } else if (event.eventType === 'ab_test_conversion') {
        acc[event.variantId].conversions++;
      }

      return acc;
    }, {});

    return Object.values(variants).map((variant: any) => ({
      ...variant,
      conversionRate: variant.views > 0 ? (variant.conversions / variant.views) * 100 : 0
    }));
  };

  const clearTestData = () => {
    localStorage.removeItem('ab_test_events');
    setEvents([]);
  };

  return {
    events,
    getTestResults,
    clearTestData
  };
}
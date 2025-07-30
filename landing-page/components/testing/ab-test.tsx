'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/components/analytics';

interface ABTestProps {
  testName: string;
  variants: {
    [key: string]: React.ReactNode;
  };
  weights?: {
    [key: string]: number;
  };
  children?: React.ReactNode;
}

export function ABTest({ testName, variants, weights = {}, children }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already been assigned a variant for this test
    const storageKey = `ab_test_${testName}`;
    const existingVariant = localStorage.getItem(storageKey);
    
    if (existingVariant && variants[existingVariant]) {
      setSelectedVariant(existingVariant);
      setIsLoading(false);
      return;
    }

    // Assign a new variant based on weights
    const variantKeys = Object.keys(variants);
    let selectedKey: string;

    if (Object.keys(weights).length > 0) {
      // Use weighted selection
      const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
      const random = Math.random() * totalWeight;
      let cumulativeWeight = 0;
      
      selectedKey = variantKeys[0]; // fallback
      for (const key of variantKeys) {
        cumulativeWeight += weights[key] || 0;
        if (random <= cumulativeWeight) {
          selectedKey = key;
          break;
        }
      }
    } else {
      // Equal distribution
      selectedKey = variantKeys[Math.floor(Math.random() * variantKeys.length)];
    }

    // Store the selection
    localStorage.setItem(storageKey, selectedKey);
    setSelectedVariant(selectedKey);
    setIsLoading(false);

    // Track the assignment
    trackEvent('ab_test_assignment', {
      test_name: testName,
      variant: selectedKey,
      timestamp: new Date().toISOString(),
    });
  }, [testName, variants, weights]);

  if (isLoading) {
    return children || null; // Show fallback content while loading
  }

  if (!selectedVariant || !variants[selectedVariant]) {
    return children || null; // Show fallback if something went wrong
  }

  return <>{variants[selectedVariant]}</>;
}

// Hook for tracking conversions in A/B tests
export function useABTestConversion(testName: string, conversionType: string) {
  const trackConversion = () => {
    const storageKey = `ab_test_${testName}`;
    const variant = localStorage.getItem(storageKey);
    
    if (variant) {
      trackEvent('ab_test_conversion', {
        test_name: testName,
        variant,
        conversion_type: conversionType,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return trackConversion;
}

// Component for testing different CTA buttons
interface ABTestCTAProps {
  testName: string;
  href: string;
  variants: {
    [key: string]: {
      text: string;
      className?: string;
    };
  };
  onConversion?: () => void;
}

export function ABTestCTA({ testName, href, variants, onConversion }: ABTestCTAProps) {
  const trackConversion = useABTestConversion(testName, 'cta_click');

  const handleClick = () => {
    trackConversion();
    onConversion?.();
  };

  return (
    <ABTest testName={testName} variants={Object.fromEntries(
      Object.entries(variants).map(([key, { text, className }]) => [
        key,
        <a
          key={key}
          href={href}
          onClick={handleClick}
          className={className || 'btn-primary'}
        >
          {text}
        </a>
      ])
    )} />
  );
}
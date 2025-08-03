'use client';

import { useEffect, useState } from 'react';
import { SectionContainer, SectionHeader, GridContainer, Card } from '../shared';

interface Metric {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  description?: string;
}

interface OptimizedMetricsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  metrics: Metric[];
  background?: 'white' | 'gray' | 'gradient';
  animated?: boolean;
  disclaimer?: string;
}

function AnimatedMetric({ value, label, prefix = '', suffix = '', description }: Metric & { animated?: boolean }) {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    // Animate the number counting up
    const numericValue = parseInt(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        // Handle decimals and special formatting
        if (value.includes('.')) {
          setDisplayValue((current).toFixed(1));
        } else {
          setDisplayValue(Math.floor(current).toString());
        }
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card variant="elevated" className="text-center">
      <div className="text-4xl font-bold text-indigo-600 mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-2">{label}</div>
      {description && (
        <div className="text-sm text-gray-600">{description}</div>
      )}
    </Card>
  );
}

export function OptimizedMetricsSection({
  title = "Proven Results for Subscription Companies",
  subtitle,
  description = "We've helped subscription businesses like yours turn customer language into winning ads that convert.",
  metrics,
  background = 'gray',
  animated = true,
  disclaimer
}: OptimizedMetricsSectionProps) {
  return (
    <SectionContainer background={background} padding="xl">
      <SectionHeader 
        title={title}
        subtitle={subtitle}
        description={description}
      />
      
      <GridContainer columns={{ sm: 1, md: 2, lg: metrics.length >= 4 ? 4 : 3 }}>
        {metrics.map((metric, index) => (
          <AnimatedMetric
            key={index}
            {...metric}
            animated={animated}
          />
        ))}
      </GridContainer>
      
      {disclaimer && (
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {disclaimer}
          </p>
        </div>
      )}
    </SectionContainer>
  );
}
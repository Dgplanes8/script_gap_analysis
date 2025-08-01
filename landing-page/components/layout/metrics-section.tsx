'use client';

import { useEffect, useState } from 'react';

interface MetricProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

function Metric({ value, label, prefix = '', suffix = '' }: MetricProps) {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    // Animate the number counting up
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
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
        setDisplayValue(Math.floor(current).toString());
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-brand-600 mb-2">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}

interface MetricsSectionProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function MetricsSection({ className = '', variant = 'light' }: MetricsSectionProps) {
  const bgClass = variant === 'light' ? 'bg-gray-50' : 'bg-brand-50';
  
  return (
    <section className={`py-16 ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proven Results for Subscription Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've helped subscription businesses like yours turn customer language into winning ads that convert.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Metric
            value="1.2M+"
            label="Ad Spend Optimized"
            prefix="$"
          />
          <Metric
            value="127"
            label="Scripts Delivered"
          />
          <Metric
            value="34%"
            label="Average CTR Improvement"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Results based on client campaigns over the last 12 months
          </p>
        </div>
      </div>
    </section>
  );
}
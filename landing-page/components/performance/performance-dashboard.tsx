'use client';

import { useEffect, useState } from 'react';
import { usePerformanceMonitor, type WebVitals, PERFORMANCE_BUDGETS } from '@/lib/performance-monitor';

interface PerformanceDashboardProps {
  showInProduction?: boolean;
}

export function PerformanceDashboard({ showInProduction = false }: PerformanceDashboardProps) {
  const { monitor, vitals } = usePerformanceMonitor();
  const [isVisible, setIsVisible] = useState(false);
  
  // Only show in development or when explicitly enabled
  useEffect(() => {
    const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;
    setIsVisible(shouldShow);
  }, [showInProduction]);

  if (!isVisible || !monitor) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-xs">
          <MetricRow
            label="LCP"
            value={vitals.LCP}
            budget={PERFORMANCE_BUDGETS.maxLCP}
            unit="ms"
          />
          <MetricRow
            label="FCP"
            value={vitals.FCP}
            budget={PERFORMANCE_BUDGETS.maxFCP}
            unit="ms"
          />
          <MetricRow
            label="CLS"
            value={vitals.CLS}
            budget={PERFORMANCE_BUDGETS.maxCLS}
            unit=""
            precision={4}
          />
          <MetricRow
            label="FID"
            value={vitals.FID}
            budget={100}
            unit="ms"
          />
          <MetricRow
            label="TBT"
            value={vitals.TBT}
            budget={PERFORMANCE_BUDGETS.maxTBT}
            unit="ms"
          />
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <BudgetViolations monitor={monitor} />
        </div>
      </div>
    </div>
  );
}

function MetricRow({ 
  label, 
  value, 
  budget, 
  unit, 
  precision = 0 
}: { 
  label: string; 
  value?: number; 
  budget: number; 
  unit: string;
  precision?: number;
}) {
  if (value === undefined) {
    return (
      <div className="flex justify-between">
        <span className="text-gray-500">{label}:</span>
        <span className="text-gray-400">-</span>
      </div>
    );
  }
  
  const isWithinBudget = value <= budget;
  const colorClass = isWithinBudget ? 'text-brand-600' : 'text-brand-600';
  
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className={colorClass}>
        {value.toFixed(precision)}{unit}
        <span className="text-gray-400 ml-1">/ {budget}{unit}</span>
      </span>
    </div>
  );
}

function BudgetViolations({ monitor }: { monitor: any }) {
  const [violations, setViolations] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (monitor) {
        setViolations(monitor.getBudgetViolations());
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [monitor]);
  
  if (violations.length === 0) {
    return (
      <div className="text-brand-600 text-xs">
        ✅ All budgets within limits
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      <div className="text-brand-600 text-xs font-medium">
        ⚠️ Budget Violations:
      </div>
      {violations.slice(0, 3).map((violation, index) => (
        <div key={index} className="text-brand-500 text-xs">
          • {violation.split(':')[0]}
        </div>
      ))}
      {violations.length > 3 && (
        <div className="text-gray-500 text-xs">
          +{violations.length - 3} more...
        </div>
      )}
    </div>
  );
}

// Performance meter component
export function PerformanceMeter({ 
  value, 
  max, 
  label, 
  good, 
  needsImprovement 
}: {
  value: number;
  max: number;
  label: string;
  good: number;
  needsImprovement: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  let color = 'bg-brand-500';
  if (value > needsImprovement) color = 'bg-brand-500';
  if (value > good) color = 'bg-brand-500';
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span>{value.toFixed(0)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Core Web Vitals summary component
export function CoreWebVitalsSummary({ vitals }: { vitals: WebVitals }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">
          {vitals.LCP ? `${(vitals.LCP / 1000).toFixed(1)}s` : '-'}
        </div>
        <div className="text-xs text-gray-600">LCP</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-brand-600">
          {vitals.FID ? `${vitals.FID.toFixed(0)}ms` : '-'}
        </div>
        <div className="text-xs text-gray-600">FID</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-brand-600">
          {vitals.CLS ? vitals.CLS.toFixed(3) : '-'}
        </div>
        <div className="text-xs text-gray-600">CLS</div>
      </div>
    </div>
  );
}
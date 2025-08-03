import { BusinessMetrics } from './types';

// Common calculation utilities
export function calculateCurrentPerformance(metrics: Partial<BusinessMetrics>) {
  const {
    monthlyAdSpend = 0,
    currentCTR = 0,
    currentCVR = 0,
    averageOrderValue = 0
  } = metrics;

  const monthlyClicks = (monthlyAdSpend / 1.5) * (currentCTR / 100); // Assuming $1.5 CPM
  const monthlyConversions = monthlyClicks * (currentCVR / 100);
  const monthlyRevenue = monthlyConversions * averageOrderValue;
  const costPerAcquisition = monthlyConversions > 0 ? monthlyAdSpend / monthlyConversions : 0;
  const returnOnAdSpend = monthlyAdSpend > 0 ? monthlyRevenue / monthlyAdSpend : 0;

  return {
    monthlyClicks,
    monthlyConversions,
    monthlyRevenue,
    costPerAcquisition,
    returnOnAdSpend
  };
}

export function calculateOptimizedPerformance(
  currentMetrics: Partial<BusinessMetrics>,
  improvements: { ctrImprovement: number; cvrImprovement: number }
) {
  const {
    monthlyAdSpend = 0,
    currentCTR = 0,
    currentCVR = 0,
    averageOrderValue = 0
  } = currentMetrics;

  const optimizedCTR = currentCTR * (1 + improvements.ctrImprovement / 100);
  const optimizedCVR = currentCVR * (1 + improvements.cvrImprovement / 100);

  const optimizedClicks = (monthlyAdSpend / 1.5) * (optimizedCTR / 100);
  const optimizedConversions = optimizedClicks * (optimizedCVR / 100);
  const optimizedRevenue = optimizedConversions * averageOrderValue;
  const optimizedCAC = optimizedConversions > 0 ? monthlyAdSpend / optimizedConversions : 0;
  const optimizedROAS = monthlyAdSpend > 0 ? optimizedRevenue / monthlyAdSpend : 0;

  return {
    monthlyClicks: optimizedClicks,
    monthlyConversions: optimizedConversions,
    monthlyRevenue: optimizedRevenue,
    costPerAcquisition: optimizedCAC,
    returnOnAdSpend: optimizedROAS
  };
}

export function calculateImprovements(
  current: ReturnType<typeof calculateCurrentPerformance>,
  optimized: ReturnType<typeof calculateOptimizedPerformance>
) {
  return {
    additionalConversions: optimized.monthlyConversions - current.monthlyConversions,
    additionalRevenue: optimized.monthlyRevenue - current.monthlyRevenue,
    cacReduction: current.costPerAcquisition > 0 
      ? ((current.costPerAcquisition - optimized.costPerAcquisition) / current.costPerAcquisition) * 100
      : 0,
    roasImprovement: current.returnOnAdSpend > 0 
      ? ((optimized.returnOnAdSpend - current.returnOnAdSpend) / current.returnOnAdSpend) * 100
      : 0,
    annualRevenueIncrease: (optimized.monthlyRevenue - current.monthlyRevenue) * 12
  };
}

// Benchmarking utilities
export function calculateMaturityScore(inputs: Record<string, string>) {
  const weights = {
    creativeTestingFrequency: 25,
    attributionModel: 20,
    customerResearch: 20,
    creativeOptimization: 15,
    performanceMeasurement: 20
  };

  const scores = {
    creativeTestingFrequency: getTestingFrequencyScore(inputs.creativeTestingFrequency),
    attributionModel: getAttributionScore(inputs.attributionModel),
    customerResearch: getResearchScore(inputs.customerResearch),
    creativeOptimization: getOptimizationScore(inputs.creativeOptimization),
    performanceMeasurement: getMeasurementScore(inputs.performanceMeasurement)
  };

  const totalScore = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + (scores[key as keyof typeof scores] * weight / 100);
  }, 0);

  return Math.round(totalScore);
}

function getTestingFrequencyScore(frequency: string): number {
  const scoreMap: Record<string, number> = {
    'weekly': 100,
    'bi-weekly': 80,
    'monthly': 60,
    'quarterly': 40,
    'rarely': 20,
    'never': 0
  };
  return scoreMap[frequency] || 0;
}

function getAttributionScore(model: string): number {
  const scoreMap: Record<string, number> = {
    'multi-touch': 100,
    'first-click': 60,
    'last-click': 40,
    'none': 0
  };
  return scoreMap[model] || 0;
}

function getResearchScore(research: string): number {
  const scoreMap: Record<string, number> = {
    'extensive': 100,
    'moderate': 70,
    'basic': 40,
    'none': 0
  };
  return scoreMap[research] || 0;
}

function getOptimizationScore(optimization: string): number {
  const scoreMap: Record<string, number> = {
    'systematic': 100,
    'occasional': 60,
    'manual': 30,
    'none': 0
  };
  return scoreMap[optimization] || 0;
}

function getMeasurementScore(measurement: string): number {
  const scoreMap: Record<string, number> = {
    'comprehensive': 100,
    'good': 80,
    'basic': 50,
    'poor': 20
  };
  return scoreMap[measurement] || 0;
}

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
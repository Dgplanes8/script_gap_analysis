'use client';

import { CalculatorQuestion, CalculatorResults } from '@/lib/calculators/types';
import { calculateCurrentPerformance, calculateOptimizedPerformance, calculateImprovements } from '@/lib/calculators/calculations';
import { BaseCalculator } from '../shared/base-calculator';

const questions: CalculatorQuestion[] = [
  {
    id: 'monthlyAdSpend',
    title: 'What is your current monthly ad spend?',
    description: 'Enter your total monthly advertising budget across all channels',
    type: 'input',
    placeholder: '10000',
    unit: 'USD',
    validation: { required: true, min: 100, max: 1000000 }
  },
  {
    id: 'currentCTR',
    title: 'What is your current average CTR (Click-Through Rate)?',
    description: 'Your current click-through rate as a percentage',
    type: 'input',
    placeholder: '2.5',
    unit: '%',
    validation: { required: true, min: 0.1, max: 20 }
  },
  {
    id: 'currentCVR',
    title: 'What is your current conversion rate?',
    description: 'Percentage of visitors who complete a purchase or sign up',
    type: 'input',
    placeholder: '3.2',
    unit: '%',
    validation: { required: true, min: 0.1, max: 50 }
  },
  {
    id: 'averageOrderValue',
    title: 'What is your average order value?',
    description: 'Average revenue per customer transaction',
    type: 'input',
    placeholder: '150',
    unit: 'USD',
    validation: { required: true, min: 1, max: 10000 }
  },
  {
    id: 'improvementLevel',
    title: 'What improvement level would you like to target?',
    description: 'Select the optimization scenario you want to achieve',
    type: 'radio',
    validation: { required: true },
    options: [
      {
        value: 'conservative',
        label: 'Conservative (15% CTR, 10% CVR improvement)',
        description: 'Achievable with basic optimization and A/B testing'
      },
      {
        value: 'moderate',
        label: 'Moderate (25% CTR, 20% CVR improvement)',
        description: 'With systematic creative testing and optimization'
      },
      {
        value: 'aggressive',
        label: 'Aggressive (40% CTR, 35% CVR improvement)',
        description: 'With advanced personalization and AI optimization'
      }
    ]
  }
];

function calculateResults(inputs: Record<string, any>): CalculatorResults {
  const { monthlyAdSpend, currentCTR, currentCVR, averageOrderValue, improvementLevel } = inputs;

  // Define improvement scenarios
  const improvements = {
    conservative: { ctrImprovement: 15, cvrImprovement: 10 },
    moderate: { ctrImprovement: 25, cvrImprovement: 20 },
    aggressive: { ctrImprovement: 40, cvrImprovement: 35 }
  };

  const selectedImprovement = improvements[improvementLevel as keyof typeof improvements] || improvements.moderate;

  const currentMetrics = {
    monthlyAdSpend,
    currentCTR,
    currentCVR,
    averageOrderValue
  };

  const current = calculateCurrentPerformance(currentMetrics);
  const optimized = calculateOptimizedPerformance(currentMetrics, selectedImprovement);
  const improvementResults = calculateImprovements(current, optimized);

  const recommendations = [
    'Implement systematic A/B testing for ad creatives and landing pages',
    'Use customer research to improve messaging and value propositions',
    'Optimize targeting based on high-converting audience segments',
    'Implement dynamic creative optimization for personalized experiences',
    'Set up proper attribution tracking to identify winning campaigns'
  ];

  return {
    currentPerformance: {
      monthlyConversions: Math.round(current.monthlyConversions),
      monthlyRevenue: Math.round(current.monthlyRevenue),
      costPerAcquisition: Math.round(current.costPerAcquisition),
      returnOnAdSpend: Math.round(current.returnOnAdSpend * 100) / 100
    },
    optimizedPerformance: {
      monthlyConversions: Math.round(optimized.monthlyConversions),
      monthlyRevenue: Math.round(optimized.monthlyRevenue),
      costPerAcquisition: Math.round(optimized.costPerAcquisition),
      returnOnAdSpend: Math.round(optimized.returnOnAdSpend * 100) / 100
    },
    improvements: {
      additionalConversions: Math.round(improvementResults.additionalConversions),
      additionalRevenue: Math.round(improvementResults.additionalRevenue),
      cacReduction: Math.round(improvementResults.cacReduction * 10) / 10,
      roasImprovement: Math.round(improvementResults.roasImprovement * 10) / 10,
      annualRevenueIncrease: Math.round(improvementResults.annualRevenueIncrease)
    },
    recommendations
  };
}

export function OptimizedCACReductionCalculator() {
  return (
    <BaseCalculator
      title="CAC Reduction Calculator"
      description="Calculate your potential cost reduction and revenue increase through strategic optimization"
      questions={questions}
      calculateResults={calculateResults}
      onComplete={(results) => {
        // Track calculator completion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'calculator_completed', {
            event_category: 'engagement',
            event_label: 'cac_reduction_calculator'
          });
        }
      }}
    />
  );
}
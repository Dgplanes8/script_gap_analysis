'use client';

import { CalculatorQuestion, CalculatorResults } from '@/lib/calculators/types';
import { calculateMaturityScore } from '@/lib/calculators/calculations';
import { BaseCalculator } from '../shared/base-calculator';
import { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS } from '@/lib/calculators/types';

const questions: CalculatorQuestion[] = [
  {
    id: 'creativeTestingFrequency',
    title: 'How frequently do you test new creative variations?',
    description: 'Regular creative testing is crucial for maintaining performance',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'weekly', label: 'Weekly', description: 'New creatives every week' },
      { value: 'bi-weekly', label: 'Bi-weekly', description: 'Every 2 weeks' },
      { value: 'monthly', label: 'Monthly', description: 'Once per month' },
      { value: 'quarterly', label: 'Quarterly', description: 'Every 3 months' },
      { value: 'rarely', label: 'Rarely', description: 'Less than quarterly' },
      { value: 'never', label: 'Never', description: 'No systematic testing' }
    ]
  },
  {
    id: 'attributionModel',
    title: 'What attribution model do you currently use?',
    description: 'Understanding your attribution setup helps assess optimization potential',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'multi-touch', label: 'Multi-touch attribution', description: 'Advanced attribution across touchpoints' },
      { value: 'first-click', label: 'First-click attribution', description: 'Credit to first interaction' },
      { value: 'last-click', label: 'Last-click attribution', description: 'Credit to final interaction' },
      { value: 'none', label: 'No formal attribution', description: 'Basic tracking only' }
    ]
  },
  {
    id: 'customerResearch',
    title: 'How extensive is your customer research process?',
    description: 'Customer insights drive effective messaging and positioning',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'extensive', label: 'Extensive research', description: 'Regular interviews, surveys, and analysis' },
      { value: 'moderate', label: 'Moderate research', description: 'Occasional customer feedback collection' },
      { value: 'basic', label: 'Basic research', description: 'Limited customer insights' },
      { value: 'none', label: 'No formal research', description: 'Assumptions-based approach' }
    ]
  },
  {
    id: 'creativeOptimization',
    title: 'How do you approach creative optimization?',
    description: 'Systematic optimization drives consistent performance improvements',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'systematic', label: 'Systematic approach', description: 'Data-driven optimization process' },
      { value: 'occasional', label: 'Occasional optimization', description: 'Ad-hoc improvements' },
      { value: 'manual', label: 'Manual optimization', description: 'Intuition-based changes' },
      { value: 'none', label: 'No optimization', description: 'Set and forget approach' }
    ]
  },
  {
    id: 'performanceMeasurement',
    title: 'How comprehensive is your performance measurement?',
    description: 'Proper measurement enables data-driven decision making',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: 'comprehensive', label: 'Comprehensive tracking', description: 'Full funnel analytics and reporting' },
      { value: 'good', label: 'Good tracking', description: 'Key metrics monitored regularly' },
      { value: 'basic', label: 'Basic tracking', description: 'Limited metrics and reporting' },
      { value: 'poor', label: 'Poor tracking', description: 'Minimal performance visibility' }
    ]
  },
  {
    id: 'currentGrowthRate',
    title: 'What is your current month-over-month growth rate?',
    description: 'Current performance helps benchmark your optimization potential',
    type: 'radio',
    validation: { required: true },
    options: [
      { value: '20+', label: '20%+ per month', description: 'High growth trajectory' },
      { value: '10-20', label: '10-20% per month', description: 'Strong growth' },
      { value: '5-10', label: '5-10% per month', description: 'Moderate growth' },
      { value: '0-5', label: '0-5% per month', description: 'Slow growth' },
      { value: 'negative', label: 'Negative growth', description: 'Declining performance' }
    ]
  },
  {
    id: 'industryType',
    title: 'What industry are you in?',
    description: 'Industry context helps provide relevant benchmarks',
    type: 'select',
    validation: { required: true },
    options: INDUSTRY_OPTIONS.map(option => ({ value: option.value, label: option.label }))
  },
  {
    id: 'companySize',
    title: 'What is your company size?',
    description: 'Company size affects optimization strategies and benchmarks',
    type: 'select',
    validation: { required: true },
    options: COMPANY_SIZE_OPTIONS.map(option => ({ value: option.value, label: option.label }))
  }
];

function calculateResults(inputs: Record<string, any>): CalculatorResults {
  const overallScore = calculateMaturityScore(inputs);
  
  // Calculate category scores
  const categoryScores = {
    targeting: getTestingFrequencyScore(inputs.creativeTestingFrequency) + getAttributionScore(inputs.attributionModel),
    messaging: getResearchScore(inputs.customerResearch),
    velocity: getTestingFrequencyScore(inputs.creativeTestingFrequency),
    optimization: getOptimizationScore(inputs.creativeOptimization) + getMeasurementScore(inputs.performanceMeasurement)
  };

  // Determine benchmark comparison
  let benchmarkComparison = '';
  let growthPotential = 0;
  let industryPosition = '';

  if (overallScore >= 80) {
    benchmarkComparison = 'Top 10% of companies';
    growthPotential = 15;
    industryPosition = 'Industry Leader';
  } else if (overallScore >= 60) {
    benchmarkComparison = 'Top 25% of companies';
    growthPotential = 35;
    industryPosition = 'Above Average';
  } else if (overallScore >= 40) {
    benchmarkComparison = 'Average performance';
    growthPotential = 60;
    industryPosition = 'Industry Average';
  } else {
    benchmarkComparison = 'Below average performance';
    growthPotential = 100;
    industryPosition = 'Significant Opportunity';
  }

  const recommendations = generateRecommendations(inputs, overallScore);

  return {
    score: overallScore,
    benchmarkData: {
      overallScore,
      categoryScores,
      benchmarkComparison,
      growthPotential,
      industryPosition
    },
    recommendations
  };
}

function getTestingFrequencyScore(frequency: string): number {
  const scoreMap: Record<string, number> = {
    'weekly': 50,
    'bi-weekly': 40,
    'monthly': 30,
    'quarterly': 20,
    'rarely': 10,
    'never': 0
  };
  return scoreMap[frequency] || 0;
}

function getAttributionScore(model: string): number {
  const scoreMap: Record<string, number> = {
    'multi-touch': 50,
    'first-click': 30,
    'last-click': 20,
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
    'systematic': 50,
    'occasional': 30,
    'manual': 15,
    'none': 0
  };
  return scoreMap[optimization] || 0;
}

function getMeasurementScore(measurement: string): number {
  const scoreMap: Record<string, number> = {
    'comprehensive': 50,
    'good': 40,
    'basic': 25,
    'poor': 10
  };
  return scoreMap[measurement] || 0;
}

function generateRecommendations(inputs: Record<string, any>, score: number): string[] {
  const recommendations: string[] = [];

  if (inputs.creativeTestingFrequency === 'never' || inputs.creativeTestingFrequency === 'rarely') {
    recommendations.push('Implement systematic creative testing with weekly or bi-weekly cycles');
  }

  if (inputs.attributionModel === 'none' || inputs.attributionModel === 'last-click') {
    recommendations.push('Upgrade to multi-touch attribution for better optimization insights');
  }

  if (inputs.customerResearch === 'none' || inputs.customerResearch === 'basic') {
    recommendations.push('Invest in comprehensive customer research and voice-of-customer analysis');
  }

  if (inputs.creativeOptimization === 'none' || inputs.creativeOptimization === 'manual') {
    recommendations.push('Develop a systematic, data-driven creative optimization process');
  }

  if (inputs.performanceMeasurement === 'poor' || inputs.performanceMeasurement === 'basic') {
    recommendations.push('Enhance performance tracking and reporting capabilities');
  }

  if (score < 60) {
    recommendations.push('Consider partnering with a strategic marketing consultant for rapid improvement');
  }

  return recommendations;
}

export function OptimizedRevenueGrowthBenchmark() {
  return (
    <BaseCalculator
      title="Revenue Growth Benchmark Tool"
      description="Assess your marketing maturity and discover optimization opportunities"
      questions={questions}
      calculateResults={calculateResults}
      onComplete={(results) => {
        // Track calculator completion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'calculator_completed', {
            event_category: 'engagement',
            event_label: 'revenue_growth_benchmark',
            value: results.score
          });
        }
      }}
    />
  );
}
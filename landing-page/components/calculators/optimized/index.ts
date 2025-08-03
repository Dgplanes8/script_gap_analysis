// Optimized calculator components using shared infrastructure
export { OptimizedCACReductionCalculator } from './cac-reduction-calculator';
export { OptimizedRevenueGrowthBenchmark } from './revenue-growth-benchmark';

// Export shared components for custom calculator building
export { BaseCalculator } from '../shared/base-calculator';
export { CalculatorProgress } from '../shared/calculator-progress';
export { CalculatorQuestion } from '../shared/calculator-question';
export { CalculatorNavigation } from '../shared/calculator-navigation';
export { CalculatorResults } from '../shared/calculator-results';

// Export calculator utilities
export * from '@/lib/calculators/types';
export * from '@/lib/calculators/calculations';
export { useCalculator } from '@/hooks/useCalculator';
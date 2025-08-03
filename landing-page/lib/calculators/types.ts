// Base calculator interfaces
export interface CalculatorStep {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
}

export interface CalculatorQuestion extends CalculatorStep {
  type: 'select' | 'input' | 'radio' | 'checkbox' | 'range';
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

export interface CalculatorState {
  currentStep: number;
  totalSteps: number;
  inputs: Record<string, any>;
  results: any;
  isComplete: boolean;
  errors: Record<string, string>;
}

export interface CalculatorResults {
  currentPerformance?: Record<string, number>;
  optimizedPerformance?: Record<string, number>;
  improvements?: Record<string, number>;
  recommendations?: string[];
  score?: number;
  benchmarkData?: Record<string, any>;
}

// Common business metrics
export interface BusinessMetrics {
  monthlyAdSpend: number;
  currentCTR: number;
  currentCVR: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  monthlyRevenue: number;
  costPerAcquisition: number;
  returnOnAdSpend: number;
}

// Calculator component props
export interface CalculatorProps {
  title: string;
  description: string;
  questions: CalculatorQuestion[];
  calculateResults: (inputs: Record<string, any>) => CalculatorResults;
  onComplete?: (results: CalculatorResults) => void;
  className?: string;
}

// Common industry options
export const INDUSTRY_OPTIONS = [
  { value: 'saas', label: 'SaaS/Software' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' }
] as const;

// Common company size options
export const COMPANY_SIZE_OPTIONS = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small (11-50 employees)' },
  { value: 'medium', label: 'Medium (51-200 employees)' },
  { value: 'large', label: 'Large (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
] as const;

// Common ad spend ranges
export const AD_SPEND_RANGES = [
  { value: '0-5k', label: '$0 - $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-30k', label: '$15,000 - $30,000' },
  { value: '30k-50k', label: '$30,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000+' }
] as const;
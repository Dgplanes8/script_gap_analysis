/**
 * Template Form Utilities for Apsics Media
 * 
 * Provides consistent form handling, validation, and submission logic
 * across all template types with proper error handling and tracking.
 */

import { z } from 'zod';

// Form Data Types
export interface BaseFormData {
  email: string;
  name: string;
  company: string;
  monthlyBudget: string;
  goals: string;
}

export interface EmailOnlyFormData {
  email: string;
}

export interface CalculatorFormData {
  email: string;
  calculatorType: string;
  results: Record<string, any>;
}

// Form Validation Schemas
export const baseFormSchema = z.object({
  email: z.string().email('Please enter a valid work email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  monthlyBudget: z.string().min(1, 'Please select your monthly budget'),
  goals: z.string().min(10, 'Please describe your goals (minimum 10 characters)')
});

export const emailOnlySchema = z.object({
  email: z.string().email('Please enter a valid work email address')
});

export const calculatorFormSchema = z.object({
  email: z.string().email('Please enter a valid work email address'),
  calculatorType: z.string(),
  results: z.record(z.any())
});

// Form Submission Types
export type FormSubmissionType = 
  | 'blog_lead_capture'
  | 'playbook_download' 
  | 'calculator_results'
  | 'free_week_trial'
  | 'email_signup'
  | 'template_download';

export interface FormSubmissionData {
  type: FormSubmissionType;
  source: string;
  data: BaseFormData | EmailOnlyFormData | CalculatorFormData;
  metadata?: {
    tier?: string;
    contentType?: string;
    templateType?: string;
    calculatorType?: string;
    results?: Record<string, any>;
  };
}

// Form Configuration for Different Templates
export const FORM_CONFIGS = {
  blog: {
    type: 'blog_lead_capture' as FormSubmissionType,
    schema: baseFormSchema,
    endpoint: '/api/leads/collect',
    successMessage: 'Your templates are on the way!',
    errorFallback: '/free-hooks'
  },
  playbook: {
    type: 'playbook_download' as FormSubmissionType,
    schema: baseFormSchema,
    endpoint: '/api/leads/collect',
    successMessage: 'Your complete playbook is ready!',
    errorFallback: '/free-hooks'
  },
  calculator: {
    type: 'calculator_results' as FormSubmissionType,
    schema: emailOnlySchema,
    endpoint: '/api/subscribe',
    successMessage: 'Detailed analysis coming your way!',
    errorFallback: null
  },
  service: {
    type: 'free_week_trial' as FormSubmissionType,
    schema: baseFormSchema,
    endpoint: '/api/leads/collect',
    successMessage: 'Your FREE week starts Monday!',
    errorFallback: '/success'
  },
  email: {
    type: 'email_signup' as FormSubmissionType,
    schema: emailOnlySchema,
    endpoint: '/api/subscribe',
    successMessage: 'Your templates are coming!',
    errorFallback: null
  }
};

// Form Submission Handler
export async function submitTemplateForm(submission: FormSubmissionData): Promise<{
  success: boolean;
  message?: string;
  redirectUrl?: string;
}> {
  const config = Object.values(FORM_CONFIGS).find(c => c.type === submission.type);
  if (!config) {
    throw new Error(`Unknown form type: ${submission.type}`);
  }

  // Validate form data
  try {
    config.schema.parse(submission.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message
      };
    }
  }

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...submission.data,
        source: submission.source,
        type: submission.type,
        ...submission.metadata
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: config.successMessage
    };
  } catch (error) {
    console.error('Form submission error:', error);
    
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      redirectUrl: config.errorFallback || undefined
    };
  }
}

// Monthly Budget Options
export const MONTHLY_BUDGET_OPTIONS = [
  { value: '$100-$500', label: '$100-$500' },
  { value: '$500-$1k', label: '$500-$1K' },
  { value: '$1k-$2.5k', label: '$1K-$2.5K' },
  { value: '$2.5k-$5k', label: '$2.5K-$5K' },
  { value: '$5k-$10k', label: '$5K-$10K' },
  { value: '$10k+', label: '$10K+' }
];

// Team Size Options (for playbooks)
export const TEAM_SIZE_OPTIONS = [
  { value: 'Solo Founder', label: 'Solo Founder' },
  { value: '2-5 employees', label: '2-5 employees' },
  { value: '6-15 employees', label: '6-15 employees' },
  { value: '15+ employees', label: '15+ employees' }
];

// Service Tier Information
export const SERVICE_TIERS = {
  creative_starter: {
    name: 'Creative Starter',
    price: '$5/week',
    description: '1 high-converting creative concept weekly',
    targetBudget: '$500-$2K monthly ad spend'
  },
  trend_tracker: {
    name: 'Trend Tracker',
    price: '$15/week',
    description: '1 strategic creative concept every Monday',
    targetBudget: '$2K-$10K monthly ad spend'
  },
  competitive_edge: {
    name: 'Competitive Edge',
    price: '$35/week',
    description: '2 creative concepts weekly',
    targetBudget: '$10K-$50K monthly ad spend'
  },
  market_intelligence: {
    name: 'Market Intelligence',
    price: '$99/week',
    description: '3 creative concepts + team access',
    targetBudget: '$50K+ monthly ad spend'
  }
};

// Form Field Placeholders by Template Type
export const FORM_PLACEHOLDERS = {
  blog: {
    name: 'Full name',
    email: 'Work email',
    company: 'Company name',
    goals: 'What content topics interest you most? (e.g., ad creative, growth strategy, conversion optimization)'
  },
  playbook: {
    name: 'Full name',
    email: 'Work email',
    company: 'Company name',
    goals: 'What\'s your biggest marketing challenge right now?'
  },
  calculator: {
    email: 'Enter your work email'
  },
  service: {
    name: 'Full name',
    email: 'Work email',
    company: 'Company name',
    goals: 'What are your main marketing goals? (e.g., increase app downloads, grow subscriptions, improve conversion rates)'
  }
};

// Success Messages by Template Type
export const SUCCESS_MESSAGES = {
  blog: {
    title: 'Your Templates Are On The Way!',
    description: 'Check your email for instant access to your FREE templates and weekly strategic insights.'
  },
  playbook: {
    title: 'Your Complete Playbook Is Ready!',
    description: 'Check your email for full access to the playbook and weekly strategic insights.'
  },
  calculator: {
    title: 'Detailed Analysis Coming Your Way!',
    description: 'Check your email for your personalized analysis and strategic recommendations.'
  },
  service: {
    title: 'Your FREE Week Starts Monday!',
    description: 'Check your email for your welcome guide and first set of templates.'
  },
  email: {
    title: 'Your 10 Free Templates Are Coming!',
    description: 'Check your email for your Free Templates PDF and weekly creative intelligence newsletter.'
  }
};

// Analytics Tracking Helpers
export function trackFormStart(formType: string, source: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_start', {
      form_type: formType,
      source: source
    });
  }
}

export function trackFormSubmit(formType: string, source: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submit', {
      form_type: formType,
      source: source
    });
  }
}

export function trackFormSuccess(formType: string, source: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_success', {
      form_type: formType,
      source: source
    });
  }
}

export function trackFormError(formType: string, source: string, error: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_error', {
      form_type: formType,
      source: source,
      error_message: error
    });
  }
}

// Form State Management Helper
export class FormStateManager {
  private state: {
    isSubmitting: boolean;
    isSubmitted: boolean;
    showForm: boolean;
    error: string | null;
  } = {
    isSubmitting: false,
    isSubmitted: false,
    showForm: false,
    error: null
  };

  private setState: (newState: Partial<typeof this.state>) => void;

  constructor(setState: (newState: Partial<typeof FormStateManager.prototype.state>) => void) {
    this.setState = setState;
  }

  setSubmitting(isSubmitting: boolean) {
    this.setState({ isSubmitting, error: null });
  }

  setSubmitted(isSubmitted: boolean) {
    this.setState({ isSubmitted, isSubmitting: false });
  }

  setShowForm(showForm: boolean) {
    this.setState({ showForm, error: null });
  }

  setError(error: string | null) {
    this.setState({ error, isSubmitting: false });
  }

  getState() {
    return this.state;
  }

  reset() {
    this.setState({
      isSubmitting: false,
      isSubmitted: false,
      showForm: false,
      error: null
    });
  }
}

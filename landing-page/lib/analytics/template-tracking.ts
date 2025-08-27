/**
 * Comprehensive Analytics and Conversion Tracking for Apsics Media Templates
 * 
 * Provides consistent tracking across all template types with proper
 * event categorization and conversion funnel monitoring.
 */

// Event Categories for GA4
export const EVENT_CATEGORIES = {
  TEMPLATE: 'template_interaction',
  FORM: 'form_interaction',
  CONVERSION: 'conversion',
  ENGAGEMENT: 'engagement',
  NAVIGATION: 'navigation',
  CONTENT: 'content_interaction'
} as const;

// Template Types
export const TEMPLATE_TYPES = {
  BLOG: 'blog_post',
  CALCULATOR: 'calculator',
  PLAYBOOK: 'playbook',
  SERVICE: 'service_tier',
  HOMEPAGE: 'homepage'
} as const;

// Conversion Funnel Stages
export const FUNNEL_STAGES = {
  AWARENESS: 'awareness',
  INTEREST: 'interest',
  CONSIDERATION: 'consideration',
  CONVERSION: 'conversion',
  RETENTION: 'retention'
} as const;

// Form Types
export const FORM_TYPES = {
  EMAIL_SIGNUP: 'email_signup',
  LEAD_CAPTURE: 'lead_capture',
  FREE_TRIAL: 'free_trial',
  CALCULATOR_RESULTS: 'calculator_results',
  PLAYBOOK_DOWNLOAD: 'playbook_download',
  SERVICE_INQUIRY: 'service_inquiry'
} as const;

/**
 * Enhanced Google Analytics 4 Event Tracking
 */
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_location: window.location.href,
      page_title: document.title
    });
  }
}

/**
 * Template Page View Tracking
 */
export function trackTemplatePageView({
  templateType,
  templateTitle,
  templateCategory,
  userSegment = 'unknown'
}: {
  templateType: string;
  templateTitle: string;
  templateCategory?: string;
  userSegment?: string;
}) {
  trackEvent('page_view', {
    event_category: EVENT_CATEGORIES.TEMPLATE,
    template_type: templateType,
    template_title: templateTitle,
    template_category: templateCategory,
    user_segment: userSegment,
    funnel_stage: FUNNEL_STAGES.AWARENESS
  });
}

/**
 * Content Engagement Tracking
 */
export function trackContentEngagement({
  action,
  templateType,
  contentSection,
  engagementValue = 1
}: {
  action: 'scroll' | 'click' | 'hover' | 'expand' | 'download' | 'share';
  templateType: string;
  contentSection: string;
  engagementValue?: number;
}) {
  trackEvent('content_engagement', {
    event_category: EVENT_CATEGORIES.ENGAGEMENT,
    action,
    template_type: templateType,
    content_section: contentSection,
    engagement_value: engagementValue,
    funnel_stage: FUNNEL_STAGES.INTEREST
  });
}

/**
 * Form Interaction Tracking
 */
export function trackFormInteraction({
  formType,
  action,
  source,
  templateType,
  formFields = []
}: {
  formType: string;
  action: 'start' | 'field_focus' | 'field_complete' | 'submit' | 'success' | 'error';
  source: string;
  templateType: string;
  formFields?: string[];
}) {
  trackEvent('form_interaction', {
    event_category: EVENT_CATEGORIES.FORM,
    form_type: formType,
    action,
    source,
    template_type: templateType,
    form_fields: formFields.join(','),
    funnel_stage: action === 'start' ? FUNNEL_STAGES.CONSIDERATION : FUNNEL_STAGES.CONVERSION
  });
}

/**
 * Conversion Event Tracking
 */
export function trackConversion({
  conversionType,
  value = 0,
  currency = 'USD',
  source,
  templateType,
  tier,
  metadata = {}
}: {
  conversionType: 'email_signup' | 'free_trial' | 'download' | 'service_signup';
  value?: number;
  currency?: string;
  source: string;
  templateType: string;
  tier?: string;
  metadata?: Record<string, any>;
}) {
  trackEvent('conversion', {
    event_category: EVENT_CATEGORIES.CONVERSION,
    conversion_type: conversionType,
    value,
    currency,
    source,
    template_type: templateType,
    tier,
    funnel_stage: FUNNEL_STAGES.CONVERSION,
    ...metadata
  });

  // Also track as GA4 conversion event
  trackEvent(`${conversionType}_conversion`, {
    value,
    currency,
    source,
    template_type: templateType
  });
}

/**
 * Calculator Interaction Tracking
 */
export function trackCalculatorInteraction({
  calculatorType,
  action,
  inputField,
  inputValue,
  results = {}
}: {
  calculatorType: string;
  action: 'input_change' | 'preset_applied' | 'calculate' | 'results_generated' | 'results_shared';
  inputField?: string;
  inputValue?: string | number;
  results?: Record<string, any>;
}) {
  trackEvent('calculator_interaction', {
    event_category: EVENT_CATEGORIES.TEMPLATE,
    calculator_type: calculatorType,
    action,
    input_field: inputField,
    input_value: inputValue,
    results: JSON.stringify(results),
    template_type: TEMPLATE_TYPES.CALCULATOR,
    funnel_stage: action === 'results_generated' ? FUNNEL_STAGES.CONSIDERATION : FUNNEL_STAGES.INTEREST
  });
}

/**
 * Playbook Module Tracking
 */
export function trackPlaybookInteraction({
  playbookTitle,
  action,
  moduleIndex,
  moduleTitle,
  completionPercentage = 0
}: {
  playbookTitle: string;
  action: 'module_expand' | 'module_collapse' | 'progress_update' | 'completion';
  moduleIndex?: number;
  moduleTitle?: string;
  completionPercentage?: number;
}) {
  trackEvent('playbook_interaction', {
    event_category: EVENT_CATEGORIES.TEMPLATE,
    playbook_title: playbookTitle,
    action,
    module_index: moduleIndex,
    module_title: moduleTitle,
    completion_percentage: completionPercentage,
    template_type: TEMPLATE_TYPES.PLAYBOOK,
    funnel_stage: completionPercentage > 50 ? FUNNEL_STAGES.CONSIDERATION : FUNNEL_STAGES.INTEREST
  });
}

/**
 * CTA Click Tracking
 */
export function trackCTAClick({
  ctaText,
  ctaType,
  position,
  templateType,
  source
}: {
  ctaText: string;
  ctaType: 'primary' | 'secondary' | 'inline' | 'floating';
  position: string;
  templateType: string;
  source: string;
}) {
  trackEvent('cta_click', {
    event_category: EVENT_CATEGORIES.NAVIGATION,
    cta_text: ctaText,
    cta_type: ctaType,
    position,
    template_type: templateType,
    source,
    funnel_stage: FUNNEL_STAGES.CONSIDERATION
  });
}

/**
 * Social Sharing Tracking
 */
export function trackSocialShare({
  platform,
  contentType,
  contentTitle,
  templateType
}: {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'email' | 'copy_link';
  contentType: string;
  contentTitle: string;
  templateType: string;
}) {
  trackEvent('social_share', {
    event_category: EVENT_CATEGORIES.CONTENT,
    platform,
    content_type: contentType,
    content_title: contentTitle,
    template_type: templateType,
    funnel_stage: FUNNEL_STAGES.RETENTION
  });
}

/**
 * Template Performance Metrics
 */
export function trackTemplatePerformance({
  templateType,
  templateTitle,
  timeOnPage,
  scrollDepth,
  interactions,
  bounced = false
}: {
  templateType: string;
  templateTitle: string;
  timeOnPage: number;
  scrollDepth: number;
  interactions: number;
  bounced?: boolean;
}) {
  trackEvent('template_performance', {
    event_category: EVENT_CATEGORIES.TEMPLATE,
    template_type: templateType,
    template_title: templateTitle,
    time_on_page: timeOnPage,
    scroll_depth: scrollDepth,
    interactions,
    bounced,
    engagement_score: (timeOnPage / 60) + (scrollDepth / 100) + interactions
  });
}

/**
 * Error Tracking
 */
export function trackError({
  errorType,
  errorMessage,
  templateType,
  source,
  fatal = false
}: {
  errorType: 'form_error' | 'load_error' | 'calculation_error' | 'network_error';
  errorMessage: string;
  templateType: string;
  source: string;
  fatal?: boolean;
}) {
  trackEvent('error', {
    event_category: 'error',
    error_type: errorType,
    error_message: errorMessage,
    template_type: templateType,
    source,
    fatal
  });
}

/**
 * Lead Quality Scoring
 */
export function trackLeadQuality({
  formType,
  source,
  templateType,
  budgetRange,
  company,
  goals,
  tier
}: {
  formType: string;
  source: string;
  templateType: string;
  budgetRange?: string;
  company?: string;
  goals?: string;
  tier?: string;
}) {
  // Calculate lead quality score
  let qualityScore = 0;
  
  if (budgetRange) {
    const budgetValue = budgetRange.toLowerCase();
    if (budgetValue.includes('10k+')) qualityScore += 5;
    else if (budgetValue.includes('5k')) qualityScore += 4;
    else if (budgetValue.includes('2.5k')) qualityScore += 3;
    else if (budgetValue.includes('1k')) qualityScore += 2;
    else qualityScore += 1;
  }
  
  if (company && company.length > 5) qualityScore += 2;
  if (goals && goals.length > 20) qualityScore += 2;
  
  trackEvent('lead_quality_score', {
    event_category: EVENT_CATEGORIES.CONVERSION,
    form_type: formType,
    source,
    template_type: templateType,
    quality_score: qualityScore,
    budget_range: budgetRange,
    has_company: !!company,
    has_goals: !!goals,
    tier
  });
}

/**
 * Template Completion Tracking
 */
export function trackTemplateCompletion({
  templateType,
  templateTitle,
  completionType,
  value,
  timeSpent
}: {
  templateType: string;
  templateTitle: string;
  completionType: 'form_completed' | 'calculator_used' | 'playbook_finished' | 'content_consumed';
  value?: number;
  timeSpent: number;
}) {
  trackEvent('template_completion', {
    event_category: EVENT_CATEGORIES.CONVERSION,
    template_type: templateType,
    template_title: templateTitle,
    completion_type: completionType,
    value,
    time_spent: timeSpent,
    funnel_stage: FUNNEL_STAGES.CONVERSION
  });
}

/**
 * User Segment Identification
 */
export function identifyUserSegment({
  budgetRange,
  companySize,
  role,
  source
}: {
  budgetRange?: string;
  companySize?: string;
  role?: string;
  source?: string;
}): string {
  if (budgetRange?.includes('10k+')) return 'high_value';
  if (budgetRange?.includes('5k')) return 'mid_value';
  if (budgetRange?.includes('1k') || budgetRange?.includes('2.5k')) return 'growth_stage';
  if (companySize === 'Solo Founder') return 'solopreneur';
  if (source?.includes('calculator')) return 'analytical';
  if (source?.includes('playbook')) return 'educational';
  return 'general';
}

/**
 * Batch Event Tracking for Performance
 */
export class AnalyticsBatch {
  private events: Array<{ name: string; parameters: Record<string, any> }> = [];
  private flushTimeout: NodeJS.Timeout | null = null;

  add(eventName: string, parameters: Record<string, any> = {}) {
    this.events.push({ name: eventName, parameters });
    
    if (this.events.length >= 10) {
      this.flush();
    } else if (!this.flushTimeout) {
      this.flushTimeout = setTimeout(() => this.flush(), 5000);
    }
  }

  flush() {
    if (this.events.length === 0) return;

    this.events.forEach(event => {
      trackEvent(event.name, event.parameters);
    });

    this.events = [];
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout);
      this.flushTimeout = null;
    }
  }
}

// Global analytics batch instance
export const analyticsQueue = new AnalyticsBatch();
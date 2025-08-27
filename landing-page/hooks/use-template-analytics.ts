/**
 * React Hooks for Template Analytics and Conversion Tracking
 * 
 * Provides easy-to-use hooks for tracking user interactions,
 * conversions, and engagement across all template types.
 */

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  trackTemplatePageView,
  trackContentEngagement,
  trackFormInteraction,
  trackConversion,
  trackCalculatorInteraction,
  trackPlaybookInteraction,
  trackCTAClick,
  trackSocialShare,
  trackTemplatePerformance,
  trackError,
  trackLeadQuality,
  trackTemplateCompletion,
  identifyUserSegment,
  analyticsQueue,
  TEMPLATE_TYPES,
  FORM_TYPES
} from '@/lib/analytics/template-tracking';

/**
 * Main template analytics hook
 */
export function useTemplateAnalytics(templateConfig: {
  templateType: string;
  templateTitle: string;
  templateCategory?: string;
  userSegment?: string;
}) {
  const router = useRouter();
  const startTime = useRef(Date.now());
  const interactionCount = useRef(0);
  const maxScrollDepth = useRef(0);

  // Track page view on mount
  useEffect(() => {
    trackTemplatePageView(templateConfig);
  }, [templateConfig]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercent;
      }

      // Track scroll milestones
      if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
        trackContentEngagement({
          action: 'scroll',
          templateType: templateConfig.templateType,
          contentSection: `${scrollPercent}%`,
          engagementValue: scrollPercent / 25
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [templateConfig]);

  // Track template performance on unmount
  useEffect(() => {
    return () => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      const bounced = timeOnPage < 10 && interactionCount.current === 0;
      
      trackTemplatePerformance({
        templateType: templateConfig.templateType,
        templateTitle: templateConfig.templateTitle,
        timeOnPage,
        scrollDepth: maxScrollDepth.current,
        interactions: interactionCount.current,
        bounced
      });
    };
  }, [templateConfig]);

  // Increment interaction counter
  const incrementInteractions = useCallback(() => {
    interactionCount.current += 1;
  }, []);

  return {
    trackContentEngagement: useCallback((params: Omit<Parameters<typeof trackContentEngagement>[0], 'templateType'>) => {
      incrementInteractions();
      trackContentEngagement({
        ...params,
        templateType: templateConfig.templateType
      });
    }, [templateConfig.templateType, incrementInteractions]),

    trackCTAClick: useCallback((params: Omit<Parameters<typeof trackCTAClick>[0], 'templateType'>) => {
      incrementInteractions();
      trackCTAClick({
        ...params,
        templateType: templateConfig.templateType
      });
    }, [templateConfig.templateType, incrementInteractions]),

    trackConversion: useCallback((params: Omit<Parameters<typeof trackConversion>[0], 'templateType'>) => {
      trackConversion({
        ...params,
        templateType: templateConfig.templateType
      });
    }, [templateConfig.templateType]),

    trackError: useCallback((params: Omit<Parameters<typeof trackError>[0], 'templateType'>) => {
      trackError({
        ...params,
        templateType: templateConfig.templateType
      });
    }, [templateConfig.templateType])
  };
}

/**
 * Form analytics hook
 */
export function useFormAnalytics({
  formType,
  source,
  templateType
}: {
  formType: string;
  source: string;
  templateType: string;
}) {
  const trackFormStart = useCallback(() => {
    trackFormInteraction({
      formType,
      action: 'start',
      source,
      templateType
    });
  }, [formType, source, templateType]);

  const trackFieldFocus = useCallback((fieldName: string) => {
    trackFormInteraction({
      formType,
      action: 'field_focus',
      source,
      templateType,
      formFields: [fieldName]
    });
  }, [formType, source, templateType]);

  const trackFieldComplete = useCallback((fieldName: string) => {
    trackFormInteraction({
      formType,
      action: 'field_complete',
      source,
      templateType,
      formFields: [fieldName]
    });
  }, [formType, source, templateType]);

  const trackFormSubmit = useCallback((formFields: string[]) => {
    trackFormInteraction({
      formType,
      action: 'submit',
      source,
      templateType,
      formFields
    });
  }, [formType, source, templateType]);

  const trackFormSuccess = useCallback((formData?: any) => {
    trackFormInteraction({
      formType,
      action: 'success',
      source,
      templateType
    });

    // Track conversion
    if (formType === FORM_TYPES.FREE_TRIAL) {
      trackConversion({
        conversionType: 'free_trial',
        source,
        templateType,
        tier: formData?.tier
      });
    } else if (formType === FORM_TYPES.EMAIL_SIGNUP) {
      trackConversion({
        conversionType: 'email_signup',
        source,
        templateType
      });
    }

    // Track lead quality if form data available
    if (formData) {
      trackLeadQuality({
        formType,
        source,
        templateType,
        budgetRange: formData.monthlyBudget,
        company: formData.company,
        goals: formData.goals,
        tier: formData.tier
      });
    }
  }, [formType, source, templateType]);

  const trackFormError = useCallback((error: string) => {
    trackFormInteraction({
      formType,
      action: 'error',
      source,
      templateType
    });

    trackError({
      errorType: 'form_error',
      errorMessage: error,
      templateType,
      source
    });
  }, [formType, source, templateType]);

  return {
    trackFormStart,
    trackFieldFocus,
    trackFieldComplete,
    trackFormSubmit,
    trackFormSuccess,
    trackFormError
  };
}

/**
 * Calculator analytics hook
 */
export function useCalculatorAnalytics(calculatorType: string) {
  const trackCalculatorInput = useCallback((inputField: string, inputValue: string | number) => {
    trackCalculatorInteraction({
      calculatorType,
      action: 'input_change',
      inputField,
      inputValue
    });
  }, [calculatorType]);

  const trackPresetApplied = useCallback((presetName: string) => {
    trackCalculatorInteraction({
      calculatorType,
      action: 'preset_applied',
      inputField: 'preset',
      inputValue: presetName
    });
  }, [calculatorType]);

  const trackResultsGenerated = useCallback((results: Record<string, any>) => {
    trackCalculatorInteraction({
      calculatorType,
      action: 'results_generated',
      results
    });
  }, [calculatorType]);

  const trackResultsShared = useCallback((platform: string) => {
    trackCalculatorInteraction({
      calculatorType,
      action: 'results_shared',
      inputValue: platform
    });
  }, [calculatorType]);

  return {
    trackCalculatorInput,
    trackPresetApplied,
    trackResultsGenerated,
    trackResultsShared
  };
}

/**
 * Playbook analytics hook
 */
export function usePlaybookAnalytics(playbookTitle: string) {
  const moduleCompletion = useRef<Record<number, boolean>>({});
  
  const trackModuleExpand = useCallback((moduleIndex: number, moduleTitle: string) => {
    trackPlaybookInteraction({
      playbookTitle,
      action: 'module_expand',
      moduleIndex,
      moduleTitle
    });
  }, [playbookTitle]);

  const trackModuleCollapse = useCallback((moduleIndex: number, moduleTitle: string) => {
    trackPlaybookInteraction({
      playbookTitle,
      action: 'module_collapse',
      moduleIndex,
      moduleTitle
    });
  }, [playbookTitle]);

  const trackProgressUpdate = useCallback((totalModules: number) => {
    const completedModules = Object.values(moduleCompletion.current).filter(Boolean).length;
    const completionPercentage = Math.round((completedModules / totalModules) * 100);
    
    trackPlaybookInteraction({
      playbookTitle,
      action: 'progress_update',
      completionPercentage
    });

    if (completionPercentage === 100) {
      trackPlaybookInteraction({
        playbookTitle,
        action: 'completion',
        completionPercentage: 100
      });

      trackTemplateCompletion({
        templateType: TEMPLATE_TYPES.PLAYBOOK,
        templateTitle: playbookTitle,
        completionType: 'playbook_finished',
        timeSpent: Math.round((Date.now() - Date.now()) / 1000) // This would need to be tracked properly
      });
    }
  }, [playbookTitle]);

  const markModuleComplete = useCallback((moduleIndex: number, totalModules: number) => {
    moduleCompletion.current[moduleIndex] = true;
    trackProgressUpdate(totalModules);
  }, [trackProgressUpdate]);

  return {
    trackModuleExpand,
    trackModuleCollapse,
    trackProgressUpdate,
    markModuleComplete
  };
}

/**
 * Social sharing analytics hook
 */
export function useSocialAnalytics(templateType: string) {
  const trackShare = useCallback((platform: string, contentTitle: string, contentType: string = 'template') => {
    trackSocialShare({
      platform: platform as any,
      contentType,
      contentTitle,
      templateType
    });
  }, [templateType]);

  return { trackShare };
}

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitoring(templateType: string) {
  useEffect(() => {
    // Track Core Web Vitals
    if ('performance' in window && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            analyticsQueue.add('template_performance_timing', {
              template_type: templateType,
              load_time: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
              dom_content_loaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
              first_paint: navigationEntry.responseEnd - navigationEntry.requestStart
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      return () => observer.disconnect();
    }
  }, [templateType]);

  // Track JavaScript errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError({
        errorType: 'load_error',
        errorMessage: event.message,
        templateType,
        source: event.filename || 'unknown',
        fatal: false
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError({
        errorType: 'network_error',
        errorMessage: String(event.reason),
        templateType,
        source: 'promise_rejection',
        fatal: false
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [templateType]);
}

/**
 * A/B testing hook for template variations
 */
export function useABTesting(testName: string, variants: string[]) {
  const selectedVariant = useRef<string>();

  useEffect(() => {
    if (!selectedVariant.current) {
      // Simple random selection - in production you'd use a proper A/B testing service
      selectedVariant.current = variants[Math.floor(Math.random() * variants.length)];
      
      analyticsQueue.add('ab_test_assignment', {
        test_name: testName,
        variant: selectedVariant.current,
        timestamp: new Date().toISOString()
      });
    }
  }, [testName, variants]);

  const trackVariantInteraction = useCallback((action: string, value?: any) => {
    analyticsQueue.add('ab_test_interaction', {
      test_name: testName,
      variant: selectedVariant.current,
      action,
      value,
      timestamp: new Date().toISOString()
    });
  }, [testName]);

  return {
    variant: selectedVariant.current,
    trackVariantInteraction
  };
}
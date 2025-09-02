'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@/components/performance/script-loader';
import Script from 'next/script';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'AW-17525209788';

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Vercel Analytics */}
      <VercelAnalytics />
      
      {/* Google Analytics - Optimized Loading */}
      {GA_MEASUREMENT_ID && (
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      )}
    </>
  );
}

// Helper functions for tracking custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...properties,
    });
  }
  
  // Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', eventName, properties);
  }
  
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: properties?.category || 'engagement',
      event_label: properties?.label,
      value: properties?.value,
      ...properties,
    });
  }
};

// Enhanced click tracking for GTM
export const trackClick = (elementName: string, elementType: string, pageSection?: string) => {
  trackEvent('click', {
    category: 'user_interaction',
    action: 'click',
    label: elementName,
    element_type: elementType,
    page_section: pageSection || 'main',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

// Enhanced form tracking for GTM
export const trackFormStart = (formName: string, formType: string) => {
  trackEvent('form_start', {
    category: 'form_interaction',
    action: 'form_start',
    label: formName,
    form_type: formType,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackFormComplete = (formName: string, formType: string, formData?: any) => {
  trackEvent('form_complete', {
    category: 'form_interaction',
    action: 'form_complete',
    label: formName,
    form_type: formType,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    // Don't include sensitive form data, just metadata
    form_fields_count: formData ? Object.keys(formData).length : 0,
  });
};

export const trackFormAbandonment = (formName: string, formType: string, step: string) => {
  trackEvent('form_abandonment', {
    category: 'form_interaction',
    action: 'form_abandonment',
    label: formName,
    form_type: formType,
    abandonment_step: step,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

// Specific tracking functions for Monday Morning Marketer
export const trackEmailSignup = (source: string) => {
  trackEvent('email_signup', {
    category: 'conversion',
    action: 'email_signup',
    label: source,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackCalendlyClick = (source: string) => {
  trackEvent('calendly_click', {
    category: 'conversion',
    action: 'calendly_click',
    label: source,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackStripeClick = (package_type: string) => {
  trackEvent('stripe_click', {
    category: 'conversion',
    action: 'stripe_click',
    label: package_type,
    value: package_type === '990' ? 990 : 0,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', {
    category: 'engagement',
    action: 'page_view',
    label: page,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

// New tracking functions for content pieces
export const trackCalculatorUse = (calculator_type: string, results?: any) => {
  trackEvent('calculator_use', {
    category: 'engagement',
    action: 'calculator_use',
    label: calculator_type,
    value: results?.potentialSavings || results?.roiImprovement || 0,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackDownloadIntent = (content_type: string) => {
  trackEvent('download_intent', {
    category: 'lead_generation',
    action: 'download_intent',
    label: content_type,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackConsultationBooking = (source: string) => {
  trackEvent('consultation_booking', {
    category: 'conversion',
    action: 'consultation_booking',
    label: source,
    value: 1,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackScenarioSelection = (scenario_name: string, calculator_type: string) => {
  trackEvent('scenario_selection', {
    category: 'engagement',
    action: 'scenario_selection',
    label: `${calculator_type}_${scenario_name}`,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

export const trackContentNavigation = (from_page: string, to_page: string) => {
  trackEvent('content_navigation', {
    category: 'engagement',
    action: 'content_navigation',
    label: `${from_page}_to_${to_page}`,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
};

// GTM-specific tracking functions
export const trackGTMEvent = (eventName: string, eventParameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParameters,
    });
  }
};

// Enhanced conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency: string = 'USD') => {
  trackEvent('conversion', {
    category: 'conversion',
    action: 'conversion',
    label: conversionType,
    value: value,
    currency: currency,
    source_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
  
  // Also push to GTM for enhanced conversion tracking
  trackGTMEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: currency,
  });
};
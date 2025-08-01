'use client';

import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Vercel Analytics */}
      <VercelAnalytics />
      
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}

// Helper functions for tracking custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
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

// Specific tracking functions for Monday Morning Marketer
export const trackEmailSignup = (source: string) => {
  trackEvent('email_signup', {
    category: 'conversion',
    label: source,
    source_page: window.location.pathname,
  });
};

export const trackCalendlyClick = (source: string) => {
  trackEvent('calendly_click', {
    category: 'conversion',
    label: source,
    source_page: window.location.pathname,
  });
};

export const trackStripeClick = (package_type: string) => {
  trackEvent('stripe_click', {
    category: 'conversion',
    label: package_type,
    value: package_type === '990' ? 990 : 0,
    source_page: window.location.pathname,
  });
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', {
    category: 'engagement',
    label: page,
    page_path: window.location.pathname,
  });
};

export const trackFormAbandonment = (form_type: string, step: string) => {
  trackEvent('form_abandonment', {
    category: 'conversion',
    label: `${form_type}_${step}`,
    source_page: window.location.pathname,
  });
};

// New tracking functions for content pieces
export const trackCalculatorUse = (calculator_type: string, results?: any) => {
  trackEvent('calculator_use', {
    category: 'engagement',
    label: calculator_type,
    value: results?.potentialSavings || results?.roiImprovement || 0,
    source_page: window.location.pathname,
  });
};

export const trackDownloadIntent = (content_type: string) => {
  trackEvent('download_intent', {
    category: 'lead_generation',
    label: content_type,
    source_page: window.location.pathname,
  });
};

export const trackConsultationBooking = (source: string) => {
  trackEvent('consultation_booking', {
    category: 'conversion',
    label: source,
    value: 1,
    source_page: window.location.pathname,
  });
};

export const trackScenarioSelection = (scenario_name: string, calculator_type: string) => {
  trackEvent('scenario_selection', {
    category: 'engagement',
    label: `${calculator_type}_${scenario_name}`,
    source_page: window.location.pathname,
  });
};

export const trackContentNavigation = (from_page: string, to_page: string) => {
  trackEvent('content_navigation', {
    category: 'engagement',
    label: `${from_page}_to_${to_page}`,
    source_page: window.location.pathname,
  });
};
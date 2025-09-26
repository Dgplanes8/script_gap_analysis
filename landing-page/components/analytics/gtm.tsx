'use client';

import Script from 'next/script';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

interface GTMProps {
  gtmId: string;
}

export function GTM({ gtmId }: GTMProps) {
  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
  );
}

export function GTMNoscript({ gtmId }: GTMProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Weekly trial button clicks
export const trackWeeklyTrialClick = (tier: string, location: string) => {
  trackEvent('weekly_trial_click', {
    event_category: 'conversion',
    event_label: tier,
    tier_name: tier,
    click_location: location,
    value: tier === 'Creative Starter' ? 5 : 
           tier === 'Trend Tracker' ? 15 :
           tier === 'Competitive Edge' ? 35 :
           tier === 'Market Intelligence' ? 99 : 0
  });
};

// Free template form submission
export const trackFreeTemplateSubmission = (email: string, source: string) => {
  trackEvent('free_template_signup', {
    event_category: 'lead_generation',
    event_label: source,
    email_domain: email.split('@')[1] || 'unknown',
    signup_source: source
  });
};

// Weekly trial form submission
export const trackWeeklyTrialSubmission = (tier: string, email: string, source: string) => {
  trackEvent('weekly_trial_signup', {
    event_category: 'conversion',
    event_label: tier,
    tier_name: tier,
    email_domain: email.split('@')[1] || 'unknown',
    signup_source: source,
    value: tier === 'Creative Starter' ? 5 : 
           tier === 'Trend Tracker' ? 15 :
           tier === 'Competitive Edge' ? 35 :
           tier === 'Market Intelligence' ? 99 : 0
  });
};

export const trackPaidPackageCheckout = (tier: string, email: string, source: string) => {
  trackEvent('paid_package_checkout', {
    event_category: 'revenue',
    event_label: tier,
    tier_name: tier,
    email_domain: email.split('@')[1] || 'unknown',
    checkout_source: source,
    value: tier === 'Founders Special' ? 50 :
           tier === 'Starter' ? 15 :
           tier === 'Growth' ? 35 :
           tier === 'Scale' ? 99 : 0
  });
};

// Newsletter signup tracking
export const trackNewsletterSignup = (email: string, source: string) => {
  trackEvent('newsletter_signup', {
    event_category: 'lead_generation',
    event_label: source,
    email_domain: email.split('@')[1] || 'unknown',
    signup_source: source
  });
};

// Form starts (when user focuses on first field)
export const trackFormStart = (formType: 'weekly_trial' | 'free_template' | 'newsletter' | 'newsletter_exit_popup', tier?: string) => {
  trackEvent('form_start', {
    event_category: 'engagement',
    form_type: formType,
    tier_name: tier || 'n/a'
  });
};

// Page views with additional context
export const trackPageView = (pageName: string, additionalData: Record<string, any> = {}) => {
  trackEvent('page_view', {
    event_category: 'engagement',
    page_name: pageName,
    ...additionalData
  });
};

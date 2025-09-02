# Google Tag Manager Tracking Guide

This guide explains how to use the Google Tag Manager (GTM) tracking system implemented in your landing page to track clicks and form completions.

## Overview

The tracking system includes:
- **Google Tag Manager** integration with your GTM ID (`AW-17525209788`)
- **Enhanced analytics** with detailed event tracking
- **Custom hooks** for easy implementation
- **Pre-built components** for common tracking scenarios

## Setup

### Environment Variables

Add your GTM ID to your environment variables:

```bash
# .env.local
NEXT_PUBLIC_GTM_ID=AW-17525209788
```

### Analytics Component

The main analytics component is already integrated in `app/layout.tsx` and includes:
- Google Tag Manager script
- Google Analytics (if configured)
- Vercel Analytics
- Custom event tracking

## Tracking Hooks

### Click Tracking

#### Basic Click Tracking
```tsx
import { useClickTracking } from '@/hooks/useClickTracking';

function MyComponent() {
  const { handleClick } = useClickTracking({
    elementName: 'hero_cta_button',
    elementType: 'button',
    pageSection: 'hero',
  });

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

#### Button-Specific Tracking
```tsx
import { useButtonTracking } from '@/hooks/useClickTracking';

function MyComponent() {
  const { handleClick } = useButtonTracking({
    buttonName: 'purchase_button',
    buttonType: 'purchase',
    pageSection: 'pricing',
    buttonValue: 99,
  });

  return (
    <button onClick={handleClick}>
      Buy Now - $99
    </button>
  );
}
```

#### CTA Tracking
```tsx
import { useCTATracking } from '@/hooks/useClickTracking';

function MyComponent() {
  const { handleClick } = useCTATracking({
    ctaName: 'free_trial_cta',
    ctaType: 'primary_cta',
    pageSection: 'hero',
    ctaValue: 'free_trial',
  });

  return (
    <button onClick={handleClick}>
      Start Free Trial
    </button>
  );
}
```

### Form Tracking

#### Basic Form Tracking
```tsx
import { useFormTracking } from '@/hooks/useFormTracking';

function MyForm() {
  const {
    isFormStarted,
    currentStep,
    startForm,
    trackStep,
    completeForm,
    abandonForm,
  } = useFormTracking({
    formName: 'newsletter_signup',
    formType: 'email_capture',
    onFormComplete: (data) => {
      console.log('Form completed:', data);
    },
    onFormAbandonment: (step) => {
      console.log('Form abandoned at:', step);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    completeForm(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onFocus={() => startForm()}
        onChange={(e) => trackStep('email_input', { email: e.target.value })}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

## Pre-built Components

### TrackedButton

A button component with built-in click tracking:

```tsx
import { TrackedButton } from '@/components/tracking/TrackedButton';

function MyComponent() {
  return (
    <TrackedButton
      buttonName="signup_button"
      buttonType="signup"
      pageSection="hero"
      buttonValue="free_trial"
      onClick={() => console.log('Button clicked')}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign Up Free
    </TrackedButton>
  );
}
```

### TrackedForm

A form component with built-in form tracking:

```tsx
import { TrackedForm } from '@/components/tracking/TrackedForm';

function MyForm() {
  return (
    <TrackedForm
      formName="contact_form"
      formType="lead_generation"
      onFormComplete={(data) => console.log('Form completed:', data)}
      onFormAbandonment={(step) => console.log('Form abandoned at:', step)}
    >
      <input name="name" placeholder="Your Name" />
      <input name="email" placeholder="Your Email" />
      <button type="submit">Submit</button>
    </TrackedForm>
  );
}
```

### EnhancedTrackedForm

A multi-step form with step-by-step tracking:

```tsx
import { EnhancedTrackedForm } from '@/components/tracking/TrackedForm';

function MultiStepForm() {
  return (
    <EnhancedTrackedForm
      formName="consultation_booking"
      formType="multi_step"
      steps={['contact_info', 'business_info', 'preferences']}
      onFormComplete={(data) => console.log('Form completed:', data)}
      onFormAbandonment={(step) => console.log('Form abandoned at:', step)}
    >
      {/* Form fields */}
    </EnhancedTrackedForm>
  );
}
```

## Event Tracking Functions

### Basic Event Tracking
```tsx
import { trackEvent } from '@/components/analytics';

// Track any custom event
trackEvent('custom_event', {
  category: 'engagement',
  action: 'custom_action',
  label: 'custom_label',
  value: 100,
});
```

### Conversion Tracking
```tsx
import { trackConversion } from '@/components/analytics';

// Track conversions with value
trackConversion('purchase', 99, 'USD');

// Track conversions without value
trackConversion('signup', 0, 'USD');
```

### GTM-Specific Events
```tsx
import { trackGTMEvent } from '@/components/analytics';

// Push custom data to GTM dataLayer
trackGTMEvent('custom_gtm_event', {
  custom_parameter: 'value',
  user_id: '12345',
  timestamp: new Date().toISOString(),
});
```

## Data Layer Structure

All events are pushed to the GTM dataLayer with consistent structure:

### Click Events
```javascript
{
  event: 'click',
  element_name: 'button_name',
  element_type: 'button',
  page_section: 'hero',
  page_path: '/',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Form Events
```javascript
{
  event: 'form_complete',
  form_name: 'newsletter_signup',
  form_type: 'email_capture',
  page_path: '/',
  timestamp: '2024-01-01T00:00:00.000Z',
  form_fields_count: 2
}
```

### Conversion Events
```javascript
{
  event: 'conversion',
  conversion_type: 'purchase',
  value: 99,
  currency: 'USD',
  page_path: '/',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

## GTM Configuration

### Triggers to Set Up

1. **Click Tracking**
   - Event: `click`
   - Variables: `element_name`, `element_type`, `page_section`

2. **Form Tracking**
   - Events: `form_start`, `form_complete`, `form_abandonment`
   - Variables: `form_name`, `form_type`, `abandonment_step`

3. **Conversion Tracking**
   - Event: `conversion`
   - Variables: `conversion_type`, `value`, `currency`

### Tags to Create

1. **Google Analytics 4 Event Tag**
   - Trigger: Custom events
   - Event Name: `{{Event}}`
   - Parameters: Map dataLayer variables to GA4 parameters

2. **Facebook Pixel Event Tag**
   - Trigger: Conversion events
   - Event Name: `Purchase` or `Lead`
   - Value: `{{value}}`

3. **Custom HTML Tag**
   - Trigger: Specific events
   - HTML: Custom tracking code

## Best Practices

### 1. Consistent Naming
- Use descriptive, consistent names for elements and forms
- Follow a naming convention: `{section}_{action}_{type}`

### 2. Page Sections
- Define clear page sections: `hero`, `pricing`, `footer`, etc.
- Use consistent section names across your site

### 3. Event Categories
- Use consistent categories: `engagement`, `conversion`, `form_interaction`
- Group related events logically

### 4. Data Privacy
- Don't track sensitive information
- Only track metadata, not actual form values
- Respect user privacy preferences

### 5. Performance
- Tracking is non-blocking and optimized
- Events are batched when possible
- Minimal impact on page performance

## Testing

### 1. GTM Preview Mode
- Enable GTM preview mode
- Test all tracking events
- Verify data is being sent correctly

### 2. Browser Console
- Check for tracking errors in console
- Verify dataLayer pushes
- Test event handlers

### 3. Analytics Validation
- Check Google Analytics for events
- Verify conversion tracking
- Monitor data quality

## Troubleshooting

### Common Issues

1. **Events not firing**
   - Check if GTM is loaded
   - Verify event handlers are attached
   - Check browser console for errors

2. **Data not appearing in GA4**
   - Verify GTM configuration
   - Check event parameter mapping
   - Ensure GA4 property is correct

3. **Form tracking issues**
   - Verify form elements have `name` attributes
   - Check form submission handling
   - Ensure tracking hooks are properly integrated

### Debug Mode

Enable debug logging by adding to your component:

```tsx
// Add to any component for debugging
useEffect(() => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    console.log('DataLayer:', window.dataLayer);
  }
}, []);
```

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify GTM configuration
3. Test in GTM preview mode
4. Review this documentation

The tracking system is designed to be robust and provide comprehensive analytics data for your marketing campaigns. 
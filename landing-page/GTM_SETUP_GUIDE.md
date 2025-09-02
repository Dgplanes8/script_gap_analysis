# Google Tag Manager Setup Guide

## Overview

This guide covers the complete Google Tag Manager implementation for tracking clicks and form submissions on your landing page.

## 1. GTM Container Setup

### Step 1: Create GTM Container
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account" or use existing account
3. Set up a new container for your website
4. Copy your GTM Container ID (format: GTM-XXXXXXX)

### Step 2: Update Environment Variable
Replace the placeholder in `.env.local`:
```
NEXT_PUBLIC_GTM_ID=GTM-YOUR-ACTUAL-ID
```

## 2. Events Being Tracked

### Weekly Trial Events

**Event Name:** `weekly_trial_click`
- **Trigger:** When user clicks any service tier button
- **Data Captured:**
  - `tier_name`: Which tier was clicked (Creative Starter, Trend Tracker, etc.)
  - `click_location`: Where the click occurred (service-tiers-main)
  - `value`: Tier pricing value (5, 15, 35, 99)
  - `event_category`: 'conversion'

**Event Name:** `weekly_trial_signup`
- **Trigger:** When user submits the weekly trial form
- **Data Captured:**
  - `tier_name`: Selected tier
  - `email_domain`: User's email domain
  - `signup_source`: Form source (service-tiers-modal)
  - `value`: Tier pricing value

### Free Template Events

**Event Name:** `free_templates_click`
- **Trigger:** When user clicks "Get My 10 Free Templates" button
- **Data Captured:**
  - `click_location`: Button location
  - `event_category`: 'lead_generation'

**Event Name:** `free_template_signup`
- **Trigger:** When user submits free template email form
- **Data Captured:**
  - `email_domain`: User's email domain
  - `signup_source`: Form source (free-hooks-main)
  - `event_category`: 'lead_generation'

### Form Engagement Events

**Event Name:** `form_start`
- **Trigger:** When user focuses on first form field
- **Data Captured:**
  - `form_type`: 'weekly_trial' or 'free_template'
  - `tier_name`: Associated tier (if applicable)
  - `event_category`: 'engagement'

## 3. GTM Configuration

### Create These Tags in GTM:

#### 1. Google Analytics 4 Event Tag
- **Tag Type:** Google Analytics: GA4 Event
- **Measurement ID:** Your GA4 property ID
- **Event Name:** Use {{Event}} variable
- **Parameters:** Map all custom parameters

#### 2. Facebook Pixel (if using)
- **Tag Type:** Facebook Pixel
- **Event Type:** Custom Event
- **Event Name:** Use {{Event}} variable

#### 3. Custom HTML for Additional Tracking
Use the following variables:
- `{{Event}}` - The event name
- `{{tier_name}}` - Tier selected
- `{{click_location}}` - Where click occurred
- `{{email_domain}}` - User's email domain
- `{{signup_source}}` - Form source
- `{{value}}` - Event value

### Triggers to Create:

1. **Weekly Trial Click Trigger**
   - Event equals `weekly_trial_click`

2. **Weekly Trial Signup Trigger**
   - Event equals `weekly_trial_signup`

3. **Free Templates Click Trigger**
   - Event equals `free_templates_click`

4. **Free Template Signup Trigger**
   - Event equals `free_template_signup`

5. **Form Start Trigger**
   - Event equals `form_start`

## 4. Testing Your Setup

### Method 1: Use the Test File
1. Open `test-gtm.html` in your browser
2. Open browser developer tools (F12)
3. Go to Console tab
4. Test each button and form interaction
5. Verify events appear in console and dataLayer

### Method 2: GTM Preview Mode
1. In GTM, click "Preview"
2. Navigate to your website
3. Interact with forms and buttons
4. Verify events fire in GTM debug panel

### Method 3: GA4 Real-time Reports
1. Go to Google Analytics
2. Open Real-time → Events
3. Interact with your website
4. Verify events appear in real-time

## 5. Key Files Modified

### New Files:
- `components/analytics/gtm.tsx` - GTM implementation and tracking functions
- `test-gtm.html` - Test page for verification

### Modified Files:
- `app/layout.tsx` - Added GTM container
- `components/layout/service-tiers.tsx` - Added click tracking
- `components/forms/simple-airtable-form.tsx` - Added form tracking
- `components/forms/email-capture-form.tsx` - Added email form tracking
- `app/free-hooks/page.tsx` - Replaced static form with trackable form

## 6. Implementation Details

### Weekly Trial Flow:
1. User clicks service tier button → `weekly_trial_click` event
2. Form modal opens
3. User focuses on name field → `form_start` event
4. User submits form → `weekly_trial_signup` event

### Free Templates Flow:
1. User clicks free templates button → `free_templates_click` event
2. User navigates to /free-hooks page
3. User focuses on email field → `form_start` event
4. User submits email → `free_template_signup` event

## 7. Success Metrics to Monitor

### Conversion Funnel:
1. **Top of Funnel:** Page views, button clicks
2. **Middle of Funnel:** Form starts, form completions
3. **Bottom of Funnel:** Successful signups by tier

### Key Metrics:
- Weekly trial signup rate by tier
- Free template signup rate
- Form abandonment rate
- Most popular service tier
- Traffic source performance

## 8. Troubleshooting

### GTM Not Loading:
- Check GTM container ID is correct
- Verify environment variable is set
- Check browser console for errors

### Events Not Firing:
- Open GTM Preview mode
- Check if tracking functions are being called
- Verify event names match exactly

### Data Not in GA4:
- Check GTM tags are publishing to GA4
- Verify GA4 measurement ID is correct
- Allow up to 24 hours for data processing

## Next Steps

1. Replace `GTM-XXXXXXX` with your actual GTM ID
2. Configure GTM tags and triggers as outlined above
3. Test thoroughly using the provided test file
4. Monitor performance in GA4 Real-time reports
5. Set up conversion goals in GA4 for signup events

This setup provides comprehensive tracking for both weekly trial conversions and free template lead generation.
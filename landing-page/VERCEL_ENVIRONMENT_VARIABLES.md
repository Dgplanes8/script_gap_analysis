# Vercel Environment Variables Configuration

## Required Environment Variables

Add these in your Vercel project settings → Environment Variables:

### Core Application
```
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
```

### Email Service (Resend)
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com
```

### Database (Airtable)
```
AIRTABLE_API_KEY=patxxxxxxxxxxxxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxxxxxx
AIRTABLE_TABLE_NAME=Get Featured Submissions
```

### External Integrations
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Optional Stripe Integration
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_URL=https://buy.stripe.com/your-payment-link
```

## Service Setup Instructions

### 1. Resend Email Service Setup
1. Go to [resend.com](https://resend.com) and sign up
2. Navigate to API Keys → Create API Key
3. Copy the API key (starts with `re_`)
4. Go to Domains → Add Domain → Add `mondaymorningmarketer.com`
5. Add the provided DNS records to your domain registrar
6. Create an Audience (optional) and copy the ID

### 2. Airtable Database Setup
1. Go to [airtable.com](https://airtable.com) and create account
2. Create new base: "Monday Morning Marketer"
3. Create table: "Get Featured Submissions" with these fields:
   - Name (Single line text)
   - Email (Email)
   - Company (Single line text)
   - App Type (Single line text)
   - Current CTR (Single line text)
   - Current TSR (Single line text)
   - Pain Points (Long text)
   - Goals (Long text)
   - Budget (Single line text)
   - Timeline (Single line text)
   - Submitted (Date and time)
   - Status (Single select: New, In Review, Contacted, Completed)

4. Get API credentials:
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Create personal access token with scopes: `data.records:read`, `data.records:write`
   - Select your base
   - Copy token (starts with `pat`)
   - Get Base ID from your base URL (starts with `app`)

### 3. Calendly Integration
1. Set up account at [calendly.com](https://calendly.com)
2. Create event types for consultations
3. Copy your Calendly URL (e.g., https://calendly.com/your-username)

### 4. Google Analytics (Optional)
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (starts with `G-`)

### 5. Domain Configuration
After deployment, if you want a custom domain:
1. In Vercel dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update NEXT_PUBLIC_APP_URL to your custom domain
4. Configure DNS records as instructed by Vercel

## Testing Environment Variables
After setting up, test each integration:
- Email subscription form should send welcome emails
- Get Featured form should submit to Airtable
- Calendly widget should load properly
- Analytics should track page views (if configured)
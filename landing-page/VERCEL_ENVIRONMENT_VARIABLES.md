# Vercel Environment Variables Setup
## Monday Morning Marketer Landing Page

### **Required Environment Variables**

Copy these variables to your Vercel project settings:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

**Option 1: With Kit (ConvertKit) - Recommended**
```bash
# Application URL (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app

# Email Service (Kit/ConvertKit)
KIT_API_KEY=your_kit_api_key
KIT_FORM_ID=your_kit_form_id
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com

# Airtable Integration (for Get Featured form)
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=Get Featured Submissions

# External Services
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_STRIPE_URL=https://checkout.stripe.com/your-link

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Option 2: With Resend (Legacy)**
```bash
# Application URL (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_FROM_EMAIL=mondaymorningmarketer@gmail.com
RESEND_AUDIENCE_ID=your_audience_id_optional

# Airtable Integration (for Get Featured form)
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=Get Featured Submissions

# External Services
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_STRIPE_URL=https://checkout.stripe.com/your-link

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **Service Setup Instructions**

#### **1. Kit (ConvertKit) Email Service - Recommended**

**Why Kit over Resend:**
- ✅ **Newsletter automation** built-in
- ✅ **Lead magnet sequences** for pilot program
- ✅ **Customer journey automation**
- ✅ **Better ROI** - $25/month vs $20+ for multiple tools

**Setup Steps:**
1. Go to [kit.com](https://kit.com) (formerly ConvertKit)
2. Create account and add your domain
3. Go to Settings → Account → API Keys
4. Copy API Key to `KIT_API_KEY` environment variable
5. Create a form for "Monday Morning Ideas" newsletter
6. Copy Form ID to `KIT_FORM_ID` environment variable

**Automation Setup:**
1. Create welcome sequence (3-5 emails)
2. Set up pilot program nurture sequence
3. Build customer onboarding flow
4. Create reactivation campaigns

#### **1b. Resend Email Service (Legacy Option)**
1. Go to [resend.com](https://resend.com)
2. Create account and verify domain
3. Get API key from Settings → API Keys
4. Add to `RESEND_API_KEY` environment variable

#### **2. Airtable Setup**
1. Go to [airtable.com](https://airtable.com)
2. Create new base called "Monday Morning Marketer"
3. Create table: "Get Featured Submissions"
4. Add these fields:
   - Name (Single line text)
   - Email (Email)
   - Company (Single line text)
   - App Type (Single select)
   - Current CTR (Single line text)
   - Current TSR (Single line text)
   - Pain Points (Long text)
   - Goals (Long text)
   - Budget (Single select)
   - Timeline (Single select)
   - Submitted (Date)
   - Status (Single select: New, Reviewed, Contacted)
5. Get Base ID from URL: `https://airtable.com/app[BASE_ID]/...`
6. Get API key from [airtable.com/create/tokens](https://airtable.com/create/tokens)

#### **3. Calendly Integration**
1. Get your Calendly scheduling URL
2. Add to `NEXT_PUBLIC_CALENDLY_URL`
3. Format: `https://calendly.com/your-username/15min`

#### **4. Stripe Setup (Optional)**
1. Create Stripe account at [stripe.com](https://stripe.com)
2. Create payment link for $990 package
3. Add URL to `NEXT_PUBLIC_STRIPE_URL`

#### **5. Google Analytics (Optional)**
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### **Environment Variable Priorities**

#### **Critical (Required for Basic Function)**
**If using Kit:**
- `NEXT_PUBLIC_APP_URL`
- `KIT_API_KEY`
- `KIT_FORM_ID`
- `NEXT_PUBLIC_FROM_EMAIL`

**If using Resend (legacy):**
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_FROM_EMAIL`

#### **Important (Required for Full Features)**
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `NEXT_PUBLIC_CALENDLY_URL`

#### **Optional (Enhanced Features)**
- `NEXT_PUBLIC_STRIPE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `RESEND_AUDIENCE_ID` (if using Resend)

### **Testing Environment Variables**

After deployment, test each integration:

```bash
# Test Kit email functionality (recommended)
curl -X POST https://your-vercel-url.vercel.app/api/kit-subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'

# Test Resend email functionality (legacy)
curl -X POST https://your-vercel-url.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'

# Test Airtable integration
curl -X POST https://your-vercel-url.vercel.app/api/airtable-submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","appType":"fitness","painPoints":"Testing","goals":"Testing"}'
```

### **Security Notes**

- Never commit API keys to your repository
- Use Vercel's environment variable system only
- Rotate API keys periodically
- Monitor usage of external services
- Set up alerts for API quota limits

### **Troubleshooting**

**Common Issues:**
1. **Build fails**: Check that all required variables are set
2. **Email not sending**: Verify Resend domain and API key
3. **Forms not submitting**: Check Airtable API key and base ID
4. **Analytics not tracking**: Verify GA4 measurement ID format

**Debug Mode:**
Set `NODE_ENV=development` temporarily to see detailed error logs.
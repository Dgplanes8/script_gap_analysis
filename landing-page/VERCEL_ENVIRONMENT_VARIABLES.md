# Vercel Environment Variables Setup
## Monday Morning Marketer Landing Page

### **Required Environment Variables**

Copy these variables to your Vercel project settings:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

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

#### **1. Resend Email Service**
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
- `RESEND_AUDIENCE_ID`

### **Testing Environment Variables**

After deployment, test each integration:

```bash
# Test email functionality
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
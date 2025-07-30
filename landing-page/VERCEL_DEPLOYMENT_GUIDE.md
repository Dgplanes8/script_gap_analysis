# Complete Vercel Deployment Guide
## Monday Morning Marketer Landing Page

## 🚀 Quick Start - Two Deployment Options

### Option A: Deploy from Current Repository (Recommended)
Your landing page is part of a larger repository. Vercel can deploy just the landing page folder.

### Option B: Create Separate Repository
Move the landing page to its own repository for cleaner deployment.

---

## 📁 Option A: Deploy from Current Repository

### Step 1: Prepare Repository
1. Commit your landing page files:
   ```bash
   cd "/Users/nataliebasque/Ad Workflow"
   git add landing-page/
   git commit -m "Add Monday Morning Marketer landing page for deployment"
   git push origin enhanced-phased-workflow
   ```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your `Ad Workflow` repository
4. **Important**: Configure these settings:
   ```
   Framework Preset: Next.js
   Root Directory: landing-page
   Build Command: cd landing-page && npm run build
   Output Directory: landing-page/.next
   Install Command: cd landing-page && npm install
   ```

### Step 3: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:
**Option 1: With Kit (ConvertKit) - Recommended**
```bash
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
KIT_API_KEY=your_kit_api_key_here
KIT_FORM_ID=your_kit_form_id
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com
AIRTABLE_API_KEY=patxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxx
AIRTABLE_TABLE_NAME=Get Featured Submissions
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Option 2: With Resend (Legacy)**
```bash
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com
AIRTABLE_API_KEY=patxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxx
AIRTABLE_TABLE_NAME=Get Featured Submissions
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📁 Option B: Create Separate Repository (Alternative)

### Step 1: Create New Repository
1. Create new repository on GitHub: `monday-morning-marketer-landing`
2. Clone it locally:
   ```bash
   git clone https://github.com/yourusername/monday-morning-marketer-landing.git
   cd monday-morning-marketer-landing
   ```

### Step 2: Copy Landing Page Files
```bash
# Copy all files except node_modules and .next
cp -r "/Users/nataliebasque/Ad Workflow/landing-page"/* .
cp "/Users/nataliebasque/Ad Workflow/landing-page"/.* . 2>/dev/null || true
rm -rf node_modules .next
```

### Step 3: Initialize and Push
```bash
git add .
git commit -m "Initial commit: Monday Morning Marketer landing page"
git push origin main
```

### Step 4: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your new repository
3. Use default Next.js settings
4. Add environment variables (same as Option A)

---

## 🔧 Service Setup Guide

### 1. Kit (ConvertKit) Email Service - **Recommended**

**Why Switch to Kit:**
- ✅ **Better newsletter capabilities** with automation
- ✅ **Lead magnet delivery** built-in
- ✅ **Customer journey automation** for pilot → customer conversion
- ✅ **Landing page builder** included
- ✅ **Better pricing** - $25/month vs $20/month Resend + separate newsletter tool

**Create Account & Get API Key:**
1. Sign up at [kit.com](https://kit.com) (formerly ConvertKit)
2. Go to Settings → Account → API Keys
3. Copy the API Key and API Secret
4. Create a form for "Monday Morning Ideas" newsletter
5. Copy the Form ID from the form settings

**Domain Setup:**
1. Go to Settings → Sending
2. Add your domain: `mondaymorningmarketer.com`
3. Add these DNS records to your domain registrar:
   ```
   Type: CNAME
   Name: kit
   Value: custom.kit.com
   
   Type: TXT
   Name: @
   Value: [Provided by Kit for verification]
   ```
4. Wait for verification (up to 24 hours)

**Set Up Automation:**
1. Create welcome sequence for new subscribers
2. Set up pilot program nurture sequence
3. Build customer onboarding automation

### 1b. Resend Email Service (Legacy Option)

**Create Account & Get API Key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Copy the key (starts with `re_`)

**Domain Setup (Important):**
1. Go to Domains → Add Domain
2. Add `mondaymorningmarketer.com` (or your domain)
3. Add these DNS records to your domain registrar:
   ```
   Type: TXT
   Name: @
   Value: [Provided by Resend]
   
   Type: CNAME  
   Name: resend._domainkey
   Value: [Provided by Resend]
   ```
4. Wait for verification (up to 72 hours)

**Create Audience (Optional):**
1. Go to Audiences → Create Audience
2. Name: "Monday Morning Ideas Subscribers"
3. Copy the Audience ID

### 2. Airtable Setup

**Create Base:**
1. Go to [airtable.com](https://airtable.com)
2. Create new base: "Monday Morning Marketer"
3. Rename table to: "Get Featured Submissions"

**Configure Fields:**
```
Name: Single line text
Email: Email
Company: Single line text  
App Type: Single line text
Current CTR: Single line text
Current TSR: Single line text
Pain Points: Long text
Goals: Long text
Budget: Single line text
Timeline: Single line text
Submitted: Date and time
Status: Single select (New, In Review, Contacted, Completed)
```

**Get API Credentials:**
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Create personal access token with scopes:
   - `data.records:read`
   - `data.records:write`
3. Select your base
4. Copy token (starts with `pat`)
5. Get Base ID from URL (starts with `app`)

### 3. Calendly Integration
1. Set up account at [calendly.com](https://calendly.com)
2. Create event types for consultations
3. Copy your Calendly URL

### 4. Google Analytics (Optional)
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (starts with `G-`)

### 5. Stripe Setup (Optional)
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers
3. Create Payment Links for services

---

## 🧪 Testing Before Deployment

### Local Testing
```bash
cd "/Users/nataliebasque/Ad Workflow/landing-page"

# Install and build
npm install
npm run build

# Test locally
npm run dev

# Run API tests (in another terminal)
./test-api.sh
```

### Environment Variables Test
Create `.env.local` with all required variables and test:
```bash
# Test Kit email subscription (recommended)
curl -X POST http://localhost:3000/api/kit-subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'

# Test Resend email subscription (legacy)
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'

# Test Airtable submission  
curl -X POST http://localhost:3000/api/airtable-submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","appType":"Fitness","painPoints":"Testing","goals":"Testing"}'
```

---

## 🚀 Deployment Process

### Using Deploy Script
```bash
cd "/Users/nataliebasque/Ad Workflow/landing-page"
./deploy.sh
```

### Manual Steps
1. **Commit Changes** (if using Option A):
   ```bash
   cd "/Users/nataliebasque/Ad Workflow"
   git add landing-page/
   git commit -m "Update landing page for deployment"  
   git push
   ```

2. **Deploy on Vercel**:
   - Go to your Vercel project
   - Click "Deploy" or it deploys automatically on push

3. **Set Environment Variables** in Vercel dashboard

4. **Test Production**:
   - Visit your deployed URL
   - Test all forms and features
   - Check email delivery
   - Verify Airtable integration

---

## ✅ Post-Deployment Checklist

### Functionality Testing
- [ ] Site loads correctly at production URL
- [ ] Email subscription form works
- [ ] Welcome email is sent and received  
- [ ] Get Featured form submits to Airtable
- [ ] Calendly widget loads and booking works
- [ ] All pages are accessible
- [ ] Mobile responsive design works
- [ ] Images load properly

### Performance Testing
- [ ] Core Web Vitals are good (use [PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] Loading speed < 3 seconds
- [ ] No console errors

### SEO & Analytics
- [ ] Google Analytics tracking works
- [ ] Meta tags are correct
- [ ] Social sharing previews work
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

### Security & Headers
- [ ] HTTPS is working
- [ ] Security headers are set (check with vercel.json)
- [ ] No sensitive data in client-side code

---

## 🔧 Troubleshooting

### Build Failures
```bash
# Debug locally
npm run build
npm run lint  
npm run type-check
```

### Email Issues
- Verify Resend API key
- Check domain verification status
- Test with different email addresses
- Check Vercel function logs

### Airtable Issues  
- Verify API token permissions
- Check Base ID and table name
- Ensure field names match exactly
- Test with Airtable API directly

### Environment Variables
- Ensure all required variables are set
- Check variable names (case-sensitive)
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding new variables

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring
1. **Vercel Analytics** - Automatically included
2. **Uptime Monitoring** - Use UptimeRobot or similar
3. **Error Tracking** - Consider Sentry integration

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Monitor email deliverability
- [ ] Check Airtable submissions weekly
- [ ] Review analytics data
- [ ] Test critical flows monthly

### Performance Optimization
- Monitor Core Web Vitals in Vercel dashboard
- Optimize images if needed
- Check bundle size regularly
- Review and update dependencies

---

## 🆘 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Kit (ConvertKit) API Documentation](https://developers.kit.com/)
- [Resend Documentation](https://resend.com/docs) (legacy)
- [Airtable API Documentation](https://airtable.com/developers/web/api)

---

## 🚀 Migration Guide: Resend → Kit

**If you're currently using Resend and want to switch to Kit:**

### Step 1: Set up Kit account (parallel to existing setup)
1. Create Kit account and configure domain
2. Create forms and automation sequences
3. Test with new environment variables

### Step 2: Update API endpoints
1. Create new API route: `/api/kit-subscribe`
2. Update email capture forms to use new endpoint
3. Test thoroughly in development

### Step 3: Migrate email list
1. Export subscribers from current system
2. Import to Kit with proper tagging
3. Set up automation sequences

### Step 4: Deploy and monitor
1. Update environment variables in Vercel
2. Deploy new version
3. Monitor email delivery and automation triggers

### Step 5: Sunset Resend (after confirming Kit works)
1. Remove Resend environment variables
2. Delete old API routes
3. Cancel Resend subscription

**Benefits of the switch:**
- ✅ **Save money:** $25/month for everything vs $20+ for multiple tools
- ✅ **Better automation:** Welcome sequences, pilot nurturing, customer onboarding
- ✅ **Improved conversions:** Better lead magnet delivery and follow-up
- ✅ **Single platform:** Email + forms + landing pages + automation

Need help? Check the troubleshooting section or contact support for the respective services.
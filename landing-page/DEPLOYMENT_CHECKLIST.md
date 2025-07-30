# Monday Morning Marketer - Deployment Checklist

## Pre-Deployment Setup ✅

### GitHub Repository
- [x] Landing page code committed to repository
- [x] Build passes locally (`npm run build`)
- [x] All dependencies installed
- [x] Vercel configuration files present

### Vercel Project Configuration
- [ ] Repository connected to Vercel
- [ ] Root directory set to `landing-page`
- [ ] Framework preset: Next.js
- [ ] Build command: `npm run build`
- [ ] Install command: `npm install`

## Service Integrations Setup

### 1. Resend Email Service
- [ ] Account created at resend.com
- [ ] API key generated (starts with `re_`)
- [ ] Domain verification completed (if using custom domain)
- [ ] Audience created (optional)
- [ ] Environment variables added to Vercel:
  - [ ] `RESEND_API_KEY`
  - [ ] `RESEND_AUDIENCE_ID` (optional)
  - [ ] `NEXT_PUBLIC_FROM_EMAIL`

### 2. Airtable Database
- [ ] Airtable account created
- [ ] Base "Monday Morning Marketer" created
- [ ] Table "Get Featured Submissions" configured with proper fields
- [ ] Personal access token created with proper scopes
- [ ] Environment variables added to Vercel:
  - [ ] `AIRTABLE_API_KEY`
  - [ ] `AIRTABLE_BASE_ID`
  - [ ] `AIRTABLE_TABLE_NAME`

### 3. Calendly Integration
- [ ] Calendly account set up
- [ ] Event types configured
- [ ] Environment variable added to Vercel:
  - [ ] `NEXT_PUBLIC_CALENDLY_URL`

### 4. Google Analytics (Optional)
- [ ] GA4 property created
- [ ] Measurement ID obtained
- [ ] Environment variable added to Vercel:
  - [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 5. Core Application Settings
- [ ] Environment variable added to Vercel:
  - [ ] `NEXT_PUBLIC_APP_URL` (set to your Vercel URL)

## Deployment Process

### 1. Initial Deployment
- [ ] Click "Deploy" in Vercel
- [ ] Deployment completes successfully
- [ ] Site loads at provided URL
- [ ] No build errors in deployment logs

### 2. Environment Variables Setup
- [ ] All required environment variables added
- [ ] Variables saved for all environments (Production, Preview, Development)
- [ ] Redeploy triggered after adding variables

### 3. Custom Domain (Optional)
- [ ] Custom domain added in Vercel settings
- [ ] DNS records configured
- [ ] SSL certificate issued
- [ ] `NEXT_PUBLIC_APP_URL` updated to custom domain

## Post-Deployment Testing

### Core Functionality
- [ ] Homepage loads correctly
- [ ] All pages accessible (/get-featured, /pilot, /990, /success)
- [ ] Mobile responsive design works
- [ ] Images and assets load properly
- [ ] No console errors

### Email Subscription
- [ ] Email form submits successfully
- [ ] Welcome email received
- [ ] Form validation works
- [ ] Success message displays

### Get Featured Form
- [ ] Form submits successfully
- [ ] Data appears in Airtable
- [ ] All fields map correctly
- [ ] Form validation works
- [ ] Success page redirects

### Integrations
- [ ] Calendly widget loads and booking works
- [ ] Google Analytics tracking active (if configured)
- [ ] All external links work correctly

### Performance
- [ ] Core Web Vitals are good (check PageSpeed Insights)
- [ ] Loading speed under 3 seconds
- [ ] Images optimized and loading fast
- [ ] No performance warnings in Vercel dashboard

### SEO & Technical
- [ ] Meta tags display correctly on social shares
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Proper status codes (200 for pages, 404 for missing)
- [ ] Security headers active (from vercel.json)

## A/B Testing Framework
- [ ] Three CTA variants displaying correctly
- [ ] Conversion tracking working
- [ ] Analytics dashboard accessible
- [ ] Test distribution working properly

## Monitoring Setup

### Vercel Dashboard
- [ ] Deployment notifications configured
- [ ] Analytics enabled
- [ ] Function logs accessible
- [ ] Performance monitoring active

### External Monitoring (Recommended)
- [ ] Uptime monitoring set up (UptimeRobot, etc.)
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Email alerts for downtime

## Troubleshooting Common Issues

### Build Failures
- Check Vercel build logs
- Verify all dependencies in package.json
- Ensure environment variables don't contain sensitive chars
- Test build locally first

### Email Not Working
- Verify Resend API key is correct
- Check domain verification status
- Test with different email addresses
- Check Vercel function logs for errors

### Airtable Submissions Failing
- Verify API token has correct permissions
- Check Base ID and table name are exact
- Ensure field names match exactly
- Test API directly with curl

### Performance Issues
- Check Core Web Vitals in Vercel
- Optimize images if needed
- Review bundle size
- Enable Vercel Analytics for insights

## Success Criteria
- [ ] Site loads under 3 seconds
- [ ] All forms working correctly
- [ ] Email delivery functioning
- [ ] Airtable integration active
- [ ] Mobile responsiveness confirmed
- [ ] SEO elements in place
- [ ] A/B testing framework operational
- [ ] No console errors or warnings
- [ ] Core Web Vitals score: Good
- [ ] All conversion paths tested and working

## Post-Launch Tasks
- [ ] Share URL with stakeholders
- [ ] Add to monitoring systems
- [ ] Schedule regular maintenance checks
- [ ] Document any custom configurations
- [ ] Set up backup/recovery procedures
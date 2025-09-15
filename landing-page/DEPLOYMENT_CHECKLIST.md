# Apsics Media Website - Deployment Checklist

## ✅ Fixed Issues (Ready for Launch)

### Critical Issues Resolved:
- [x] **OG Image**: Created `/public/images/og-image.jpg` from existing creative intelligence image
- [x] **ConvertKit Integration**: Fixed environment variable names (`CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`)
- [x] **Production URL**: Updated to `https://apsicsmedia.com`
- [x] **Build Process**: Successfully builds with no errors
- [x] **Accessibility**: Fixed missing alt attributes on icons

### Technical Health Check:
- [x] TypeScript compilation: ✅ No errors
- [x] Build process: ✅ Builds successfully (93 static pages generated)
- [x] Linting: ✅ Only minor non-blocking warnings remain
- [x] Environment variables: ✅ Properly configured

## 🚀 Pre-Deployment Steps

### 1. Environment Variables (Production)
Update these values in your production environment (Vercel/Netlify):
```bash
NEXT_PUBLIC_APP_URL=https://apsicsmedia.com
CONVERTKIT_API_KEY=NkesTeJgstaSffN8LFLRwg  # ✅ Already configured
CONVERTKIT_FORM_ID=8372309                  # ✅ Already configured
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-WSBL2SN4MH # ✅ Already configured
```

### 2. Domain Configuration
- [ ] Set up DNS to point to hosting provider
- [ ] Configure SSL certificate
- [x] Test www to non-www redirect (configured in next.config.js)

### 3. Final Testing
Before going live, test:
- [ ] Email signup forms work correctly
- [ ] ConvertKit integration receives subscribers
- [ ] All internal links work
- [ ] Mobile responsiveness
- [ ] Page load speeds
- [ ] Google Analytics tracking

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
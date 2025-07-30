# Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_FROM_EMAIL=hello@yourdomain.com
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

## Manual Deployment

### Build and Export
```bash
npm run build
npm run start
```

### Deploy to Other Platforms

**Netlify:**
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

**Railway:**
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

## Environment Setup

### Required Services

1. **Resend** (Email)
   - Sign up at [resend.com](https://resend.com)
   - Get API key
   - Verify sending domain

2. **Calendly** (Booking)
   - Get your Calendly URL
   - Set up event types

3. **Google Analytics** (Optional)
   - Create GA4 property
   - Get measurement ID

4. **Stripe** (Optional - for payments)
   - Get publishable and secret keys
   - Set up webhooks

### Domain Setup

1. **Custom Domain**
   - Point domain to Vercel
   - Update NEXT_PUBLIC_APP_URL
   - Update email FROM domain

2. **SSL Certificate**
   - Automatically handled by Vercel
   - Verify HTTPS works

## Post-Deployment Checklist

- [ ] Test email signup forms
- [ ] Verify Calendly embeds work
- [ ] Check all page links
- [ ] Test mobile responsiveness
- [ ] Verify analytics tracking
- [ ] Test form submissions
- [ ] Check SEO meta tags
- [ ] Verify social sharing previews

## Performance Optimization

1. **Images**
   - Replace placeholder images with optimized versions
   - Use WebP format when possible
   - Add proper alt tags

2. **Loading Speed**
   - Minimize JavaScript bundles
   - Use Next.js Image component
   - Enable compression

3. **SEO**
   - Submit sitemap to Google Search Console
   - Verify structured data markup
   - Add meta descriptions

## Monitoring

1. **Analytics**
   - Set up Google Analytics goals
   - Track conversion events
   - Monitor page performance

2. **Error Tracking**
   - Consider adding Sentry
   - Monitor build failures
   - Track API errors

## Maintenance

1. **Updates**
   - Keep dependencies updated
   - Monitor security alerts
   - Test after updates

2. **Content**
   - Update testimonials
   - Refresh success metrics
   - Add new case studies

3. **A/B Testing**
   - Test different headlines
   - Optimize conversion rates
   - Update based on performance
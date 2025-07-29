# Deployment Checklist

## Pre-Deployment Testing

```bash
# Install dependencies
npm install

# Run linting and type checking
npm run lint
npm run type-check

# Test build
npm run build

# Test locally
npm run dev
```

## Environment Variables Setup

### Required for Production
```
NEXT_PUBLIC_APP_URL=https://mondaymorningmarketer.com
RESEND_API_KEY=re_xxxxxxxxxx
NEXT_PUBLIC_FROM_EMAIL=hello@mondaymorningmarketer.com
AIRTABLE_API_KEY=patxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxx
AIRTABLE_TABLE_NAME=Get Featured Submissions
```

### Optional Services
```
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx
NEXT_PUBLIC_STRIPE_URL=https://buy.stripe.com/your-payment-link
```

## Testing Endpoints

### Test Email Subscription
```bash
curl -X POST https://your-domain.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'
```

### Test Airtable Submission
```bash
curl -X POST https://your-domain.com/api/airtable-submit \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "company":"Test Co",
    "appType":"Fitness",
    "painPoints":"Testing form submission",
    "goals":"Verify integration works"
  }'
```

## Post-Deployment Checklist

- [ ] Site loads at custom domain
- [ ] All forms submit successfully
- [ ] Email subscription sends welcome email
- [ ] Airtable integration creates records
- [ ] Calendly widget loads and works
- [ ] Analytics tracking active
- [ ] Mobile responsive design working
- [ ] Core Web Vitals are good
- [ ] SEO meta tags correct
- [ ] SSL certificate active

## Performance Benchmarks

Target metrics:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 800ms

Test with:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Vercel Analytics dashboard
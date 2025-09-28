# Sentry Setup Guide

## Environment Variables Required

Add these to your `.env.local` and Supabase Edge Function secrets:

```bash
# From your Sentry dashboard
SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Optional: Set environment for different deployments
ENVIRONMENT=production  # or 'development', 'staging'
```

## Supabase Edge Function Secrets

Run these commands to set up secrets for your edge functions:

```bash
# Set Sentry DSN for edge functions
npx supabase secrets set SENTRY_DSN="https://your-dsn@sentry.io/project-id"

# Set environment
npx supabase secrets set ENVIRONMENT="production"
```

## Vercel Environment Variables

In your Vercel dashboard, add:
- `SENTRY_DSN`
- `ENVIRONMENT=production`

## Email Alerts Configuration

1. Go to your Sentry dashboard
2. Navigate to Settings > Alerts
3. Create a new alert rule:
   - **When**: An event is seen
   - **If**: Event level is equal to error OR fatal
   - **Then**: Send a notification via email

## Functions with Sentry Enabled

✅ `stripe-webhook` - Payment processing errors
✅ `analyze-and-iterate-ad` - AI iteration errors
✅ `generate-script` - Script generation errors

## What You'll Get Alerts For

- Stripe webhook failures (payment issues)
- Credit grant failures
- Profile lookup errors
- AI function timeout/failures
- Authentication errors
- Database connection issues

## Test Your Setup

You can test error tracking by temporarily adding this to any function:

```typescript
captureEdgeFunctionError(new Error("Test error"), {
  functionName: 'test',
  additionalTags: { test: 'true' }
});
```

## Next Steps

1. Get your DSN from the Sentry wizard output
2. Add it to your environment variables
3. Deploy to test error tracking
4. Set up email alert rules in Sentry dashboard
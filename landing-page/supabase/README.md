# AI Ad Script Generator Supabase Setup

## Prerequisites
- Supabase project ready with Database + Auth + Edge Functions enabled
- Stripe account with a Price ID configured for credit top-ups
- OpenRouter account with API key access

## Environment Variables
Set the following values via `supabase secrets set` (or environment variables when running locally):

| Key | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key used for auth token verification |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key used by edge functions to bypass RLS when updating credits |
| `OPENROUTER_API_KEY` | Secret for OpenRouter completions API |
| `STRIPE_SECRET_KEY` | Stripe server key used by checkout + webhook functions |
| `STRIPE_PRICE_ID` | Price ID for the credit purchase product |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for webhook validation |
| `STRIPE_SUCCESS_URL` | Redirect URL after successful checkout (e.g. `https://your-site.com/ai-ad-script-generator?checkout=success`) |
| `STRIPE_CANCEL_URL` | Redirect URL when checkout is cancelled |
| `SITE_URL` | Optional fallback base URL used if success/cancel URLs are not provided |
| `STRIPE_PURCHASE_CREDIT_AMOUNT` | Optional override for number of credits added per purchase (defaults to 50) |
| `ANON_USAGE_PEPPER` | Secret pepper used to hash anonymous IP addresses before storing usage |

For the Next.js frontend, ensure the following `.env` values are present:

```
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

## Database Bootstrap
Run `supabase/sql/ai_ad_script_generator.sql` inside the Supabase SQL editor to provision tables, policies, and triggers required for credit tracking. The `anonymous_usage.ip_address` column stores a salted SHA-256 hash, never the raw IP.

## Edge Functions
Deploy the edge functions using the Supabase CLI:

```bash
supabase functions deploy generate-script
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```

Remember to configure your Stripe dashboard webhook endpoint to the deployed `stripe-webhook` URL and select the `checkout.session.completed` event.

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
| `CONVERTKIT_API_SECRET` | ConvertKit API secret used to add new users to your email list |
| `CONVERTKIT_FORM_ID` | ConvertKit form ID where new subscribers should be added |
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
supabase functions deploy subscribe-convertkit
supabase functions deploy analyze-and-iterate-ad
```

To keep ConvertKit credentials off the client, set the required secrets before deploying:

```bash
supabase secrets set \
  CONVERTKIT_API_SECRET=your_convertkit_api_secret \
  CONVERTKIT_FORM_ID=your_form_id \
  --project-ref <your-project-ref>
```

### Quick test

After deploying, verify the function with:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}' \
  https://<your-project-ref>.supabase.co/functions/v1/subscribe-convertkit
```

Expect a `200` response with `{ "success": true, ... }`. A non-2xx response usually indicates the API secret or form ID is incorrect.

Remember to configure your Stripe dashboard webhook endpoint to the deployed `stripe-webhook` URL and select the `checkout.session.completed` event.

## AI Ad Iteration Tool Additions

The iteration tool reuses the same credit system and anonymous usage guardrails. Run the additional schema bootstrap once:

```sql
-- Supabase SQL editor

-- Creates the storage bucket + policies and the run history table

\i supabase/sql/ai_ad_iteration_tool.sql
```

The script provisions:
- A private `ai-ad-iteration-assets` storage bucket plus insert/select policies for both anonymous and authenticated sessions (needed for the first free run).
- The `public.ad_iteration_runs` table used by the edge function to log requests and responses for analytics.

After running the SQL:
1. Deploy the `analyze-and-iterate-ad` function (see commands above).
2. Set or confirm the following secrets for the project (if you have not already):
   - `OPENROUTER_API_KEY`
   - `ANON_USAGE_PEPPER`
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
3. (Optional) Schedule a cleanup routine to purge stale `ai-ad-iteration-assets` objects and archive/remove `ad_iteration_runs` rows older than your retention window.

> Tip: the frontend uploads assets via the anon key, so the bucket must allow `anon` role inserts/selects. The SQL above grants those permissions while scoping them to the new bucket only.

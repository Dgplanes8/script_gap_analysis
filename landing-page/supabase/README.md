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
| `OPENROUTER_PRIMARY_MODEL` | Primary model ID for brief synthesis (defaults to `x-ai/grok-4-fast:free`) |
| `OPENROUTER_RESEARCH_MODEL` | Secondary model for research augmentation (defaults to `x-ai/grok-4-fast:free`) |
| `OPENROUTER_BASE_URL` | Optional override if routing through a proxy |
| `STRIPE_SECRET_KEY` | Stripe server key used by checkout + webhook functions |
| `STRIPE_PRICE_ID` | Default price ID for credit purchase products |
| `BRIEF_STRIPE_PRICE_ID` | Optional alternate price ID for the creative brief plan |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for webhook validation |
| `STRIPE_SUCCESS_URL` | Redirect URL after successful checkout (fallback for tools) |
| `STRIPE_CANCEL_URL` | Redirect URL when checkout is cancelled (fallback for tools) |
| `BRIEF_SUCCESS_URL` | Redirect URL after brief checkout success |
| `BRIEF_CANCEL_URL` | Redirect URL after brief checkout cancellation |
| `BRIEF_CHECKOUT_MODE` | Optional Stripe checkout mode (`payment` or `subscription`) for briefs |
| `STRIPE_PURCHASE_CREDIT_AMOUNT` | Optional override for default credit pack (defaults to 50) |
| `BRIEF_CREDIT_PACK_SIZE` | Credit quantity granted for creative brief purchases |
| `CONVERTKIT_API_SECRET` | ConvertKit API secret used to add new users to your email list |
| `CONVERTKIT_FORM_ID` | ConvertKit form ID where new subscribers should be added |
| `ANON_USAGE_PEPPER` | Secret pepper used to hash anonymous IP addresses before storing usage |
| `AD_ITERATION_ASSET_BUCKET` | Optional override for the Supabase storage bucket that stores ingested creative assets |
| `APIFY_TOKEN` | Apify API token for Facebook Ads Library actor (primary method for Meta asset downloads) |
| `FACEBOOK_ADS_LIBRARY_COOKIE` | Facebook cookie for authentication when using Apify actors |
| `META_AD_DOWNLOADER_TOKEN` | **DEPRECATED** - Legacy Meta Ad Library session token (fallback when APIFY_TOKEN unavailable) |
| `PYKTOK_SESSION_ID` | TikTok `sessionid` cookie (from Pyktok) that enables direct video retrieval |
| `TIKTOK_DOWNLOAD_ENDPOINT` | Optional fallback endpoint for TikTok downloads (defaults to `https://www.tikwm.com/api/`) |
| `BRIEF_RENDER_WEBHOOK` | Optional webhook endpoint to render PDF brief exports |

## Apify Integration Setup

The AI Ad Iteration Tool uses Apify for reliable Facebook/Instagram asset extraction from Ad Library URLs. This provides better reliability than direct HTML scraping.

### Setting up Apify

1. **Create Apify Account**: Sign up at [apify.com](https://apify.com)
2. **Get API Token**:
   - Go to Integrations → API Tokens in your Apify Console
   - Copy your API token
   - Set as `APIFY_TOKEN` environment variable

3. **Facebook Cookie Setup**:
   - Log into Facebook in your browser
   - Navigate to Facebook Ads Library
   - Copy the full cookie header from Developer Tools
   - Set as `FACEBOOK_ADS_LIBRARY_COOKIE` environment variable

### Actor Configuration

The integration uses the `easyapi/facebook-ads-library-scraper` actor. No additional configuration is required - the actor is automatically invoked with the proper parameters.

### Fallback Behavior

If `APIFY_TOKEN` is not configured, the system automatically falls back to direct HTML scraping using the `META_AD_DOWNLOADER_TOKEN` (legacy method). This ensures backward compatibility.

For the Next.js frontend, ensure the following `.env` values are present:

```
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

## Database Bootstrap
Run the following scripts inside the Supabase SQL editor to provision storage, RLS policies, and analytics tables:

```sql
-- Ad Script workflow
\i supabase/sql/ai_ad_script_generator.sql

-- Creative brief generator (profiles, request log, analytics view)
\i supabase/sql/ai_creative_brief_generator.sql

-- Lead capture table for marketing forms
\i supabase/sql/package_leads.sql
```

The shared `anonymous_usage.ip_address` column stores a salted SHA-256 hash, never the raw IP.

The `package_leads` table centralises marketing form submissions for free trials, content downloads, assessments, and paid checkout requests. All inserts should flow through trusted server-side code using the service role key.

## Edge Functions
Deploy the edge functions using the Supabase CLI:

```bash
supabase functions deploy generate-script
supabase functions deploy generate-brief
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy brief-status
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

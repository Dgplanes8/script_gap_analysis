Project Brief: AI Creative Brief Generator
Last Updated: October 21, 2025

This document outlines the complete development plan for the "AI Creative Brief Generator," an interactive tool that turns raw brand context into production-ready creative brief packages.

1. Project Overview
1.1. Goal
Deliver a self-serve workflow that collects campaign inputs, enriches them with APSICS performance intelligence, and exports polished creative briefs tailored for UGC, static, video, or hybrid campaign formats.

1.2. User Flow
Anonymous Explorer: Can run one "Simple" brief (UGC format) without an account. Usage is tracked through a peppered hash of the visitor's IP address.

Registered Marketer: After signing up, receives 3 credits that can be used across simple or advanced briefs. Simple mode costs 1 credit, advanced mode costs 3 credits.

Growth Plan Subscriber: Purchases credits via Stripe checkout. Credits replenish immediately after a successful payment and unlock unlimited exports plus advanced research mode when the profile flag is set.

1.3. Technology Stack
Frontend Application: Existing marketing site (Next.js + Tailwind) with a dedicated route under /creative-brief-generator.

State & Data Layer: Supabase (Postgres, Auth, Row Level Security, Edge Functions).

AI Orchestration: OpenRouter (Claude 3.5 Sonnet for narrative strategy, GPT-4.1 for research synthesis).

Payments & Billing: Stripe Checkout + Webhooks.

1.4. Deliverables
Responsive landing page module, authenticated dashboard widget, and downloadable brief packages (Markdown + PDF conversion using serverless renderer).

2. Supabase Backend Setup
This section contains the SQL required to provision persistence, credits, and auditing. Execute the statements in the Supabase SQL Editor.

2.1. SQL Database Schema
SQL

-- #############################################################
-- ## STEP 0: REQUIRED EXTENSIONS                             ##
-- #############################################################
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- #############################################################
-- ## STEP 1: PROFILES TABLE FOR AUTHENTICATED USERS          ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  credits_remaining integer DEFAULT 3,
  research_mode_unlocked boolean DEFAULT false,
  brief_exports integer DEFAULT 0,
  stripe_customer_id text UNIQUE,
  last_brief_preview text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);


-- #############################################################
-- ## STEP 2: TRACK ANONYMOUS ACTIVITY                        ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.anonymous_usage (
  hashed_key text NOT NULL PRIMARY KEY,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);

ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages anonymous usage" ON public.anonymous_usage
  USING (auth.role() = 'service_role');


-- #############################################################
-- ## STEP 3: STORE CREATIVE BRIEF REQUESTS                   ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.creative_brief_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id),
  anonymous_key text,
  mode text NOT NULL CHECK (mode IN ('simple', 'advanced')),
  brief_format text NOT NULL, -- ugc, static, video, hybrid
  input_payload jsonb NOT NULL,
  brief_response jsonb,
  credit_cost integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'completed', -- queued, generating, completed, failed
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

COMMENT ON TABLE public.creative_brief_requests IS 'Audit log of all creative brief generations for billing, QA, and export retrieval.';

ALTER TABLE public.creative_brief_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS creative_brief_requests_user_idx
  ON public.creative_brief_requests (user_id, created_at DESC);

CREATE POLICY "Users can see their brief history" ON public.creative_brief_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requests" ON public.creative_brief_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage anonymous rows" ON public.creative_brief_requests
  USING (auth.role() = 'service_role');


-- #############################################################
-- ## STEP 4: AUTOMATE PROFILE CREATION AND CREDIT CONSUMPTION ##
-- #############################################################
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.consume_creative_brief_credit(
  p_user_id uuid,
  p_cost integer
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET credits_remaining = credits_remaining - p_cost,
      updated_at = now()
  WHERE id = p_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_brief_export(
  p_user_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET brief_exports = brief_exports + 1,
      updated_at = now()
  WHERE id = p_user_id;
END;
$$;


-- #############################################################
-- ## STEP 5: OPTIONAL MATERIALIZED VIEW FOR ANALYTICS        ##
-- #############################################################
CREATE MATERIALIZED VIEW IF NOT EXISTS public.brief_usage_summary AS
SELECT
  coalesce(user_id::text, anonymous_key) AS actor_id,
  mode,
  brief_format,
  count(*) AS total_requests,
  max(created_at) AS last_requested_at
FROM public.creative_brief_requests
GROUP BY actor_id, mode, brief_format;

REFRESH MATERIALIZED VIEW public.brief_usage_summary;


2.2. Edge Function Secrets
Set supabase secrets for OPENROUTER_API_KEY, STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and ANON_USAGE_PEPPER prior to deploying edge functions.

3. Frontend Integration
These prompts describe the expected HTML and JavaScript deliverables for the marketing site.

3.1. Prompt: Generate HTML Structure
"I need the page layout for an 'AI Creative Brief Generator' inside our Next.js marketing site.

Wrap the module in <section class="page-section"> and keep all typography inside existing utility classes:

Headings: <h1 class="page-title">, <h2 class="section-title">.

Form: <form id="brief-form" class="card form-card"> so that it inherits default spacing.

Inputs must use <input class="form-control"> and <textarea class="form-control">. Selects should use <select class="form-control">.

Required form elements:

- Brief complexity toggle (Simple vs Advanced) with id="brief-mode".
- Brief format select with id="brief-format" for ugc|static|video|hybrid.
- Company name, product description, campaign objective (textarea), audience profile (textarea), key messages (textarea), brand voice (select), primary platform (select), budget range (select), creative constraints (textarea).
- A checkbox for "Send me a PDF export" with id="include-pdf".

Add a right-hand sidebar <aside class="card result-card"> containing:

- A div id="user-status" for auth + credits.
- A div id="progress-indicator" hidden by default.
- A div id="brief-preview" for the rendered Markdown-to-HTML preview.
- A button id="download-brief" that stays disabled until a result exists.

Include a muted helper block that explains credit usage and advanced mode benefits."

3.2. Prompt: Generate Client-Side JavaScript
"Write TypeScript for the client bundle in a file named creative-brief-generator.ts. The script must:

- Initialize the Supabase browser client using SUPABASE_URL and SUPABASE_ANON_KEY.
- Manage authentication state: display user email + credits in #user-status, expose login/signup buttons when logged out, and listen for supabase.auth.onAuthStateChange events.
- Handle brief mode switching: toggle helper text, adjust credit cost display, and show an advanced-only tips panel.
- On form submission, prevent default, validate required fields, surface inline errors, and display #progress-indicator.
- Build a payload with mode, brief_format, include_pdf flag, and all form fields, then POST it to the generate-brief edge function with the active session JWT (if present).
- Stream progress updates via server-sent events or via polling the /status endpoint every 2 seconds when the response includes jobId.
- When the brief payload returns, render the Markdown inside #brief-preview, enable #download-brief, and update profile stats by calling a /me endpoint or re-fetching from Supabase.
- Handle 402 responses by showing a modal with a "Purchase Credits" button that calls the create-checkout-session function.
- Persist the last used input values in localStorage so the user can tweak and regenerate quickly."

4. Backend Logic (Supabase Edge Functions)
The following prompts define the serverless functions required to orchestrate credits, AI calls, and payments.

4.1. Prompt: generate-brief Edge Function
"Create Deno/TypeScript code for a Supabase Edge Function named generate-brief. Requirements:

- Authenticate the request via supabaseClient.auth.getUser() using the provided Authorization header. Support anonymous users by deriving a peppered IP hash from x-forwarded-for when no JWT is present.
- Check available credits: anonymous users must have usage_count = 0 to continue; authenticated users must have credits_remaining >= credit_cost (1 for simple, 3 for advanced unless research_mode_unlocked is false).
- Insert a new row into creative_brief_requests with status='queued'. When advanced mode is requested but the user lacks research_mode_unlocked, downgrade to simple and note the reason in status metadata.
- Build prompts for OpenRouter: simple mode hits the model defined by OPENROUTER_PRIMARY_MODEL; advanced mode first queries OPENROUTER_RESEARCH_MODEL for audience + competitive insights, then passes that context into a second call to OPENROUTER_PRIMARY_MODEL to synthesize the brief.
- When success: update the request row with status='completed', brief_response JSON containing structured sections (executiveSummary, strategicFoundation, creativeDirection, deliverables, successMetrics), set completed_at=now().
- Decrement credits via public.consume_creative_brief_credit for authenticated users or increment anonymous_usage. If include_pdf=true, enqueue a background job (e.g., Task Queue) by calling the BRIEF_RENDER_WEBHOOK with the rendered Markdown.
- Return 200 with the structured brief payload. On failure, set status='failed', record error_message, and respond with appropriate HTTP codes (400 for validation, 402 for insufficient credits, 500 for OpenRouter errors)."

4.2. Prompt: create-checkout-session Edge Function
"Generate the Supabase Edge Function create-checkout-session. Requirements:

- Require authentication; return 401 if no valid session.
- Instantiate the Stripe client with STRIPE_SECRET_KEY.
- Retrieve the caller's profile. If stripe_customer_id is null, create a customer using the Supabase user email and persist the id on the profile.
- Create a Checkout Session using STRIPE_PRICE_ID, set mode='subscription' if selling recurring credits, include success and cancel URLs passed via environment variables (BRIEF_SUCCESS_URL, BRIEF_CANCEL_URL).
- Return JSON containing checkout_url and session_id."

4.3. Prompt: stripe-webhook Edge Function
"Author the stripe-webhook edge function that:

- Validates the incoming webhook signature with STRIPE_WEBHOOK_SECRET.
- Listens for checkout.session.completed and customer.subscription.updated events.
- Looks up the profile via stripe_customer_id, increments credits_remaining by a configured amount (BRIEF_CREDIT_PACK_SIZE), toggles research_mode_unlocked=true when the purchased plan grants it, and updates updated_at.
- Responds with 200 to acknowledge processing."

4.4. Prompt: brief-status Edge Function
"Create an optional brief-status edge function that accepts a jobId query parameter, validates ownership, reads the matching creative_brief_requests row, and returns its status plus any interim progress notes."

5. Configuration & Deployment
5.1. Environment Variables
Configure the following in Supabase (and Vercel for frontend consumption where applicable):

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OPENROUTER_API_KEY
OPENROUTER_PRIMARY_MODEL (e.g., claude-3.5-sonnet)
OPENROUTER_RESEARCH_MODEL (e.g., gpt-4.1-mini)
OPENROUTER_BASE_URL (optional override)
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID
BRIEF_SUCCESS_URL
BRIEF_CANCEL_URL
BRIEF_CREDIT_PACK_SIZE (integer)
ANON_USAGE_PEPPER (randomized string)
BRIEF_RENDER_WEBHOOK (optional PDF renderer endpoint)

5.2. Deployment Checklist
Run the SQL from Section 2 in the Supabase SQL Editor.

Commit the Next.js page, shared components, and TypeScript client script.

Use supabase secrets set to store API keys and configuration values.

Deploy generate-brief, create-checkout-session, stripe-webhook, and brief-status using supabase functions deploy.

Add the Stripe webhook endpoint pointing to the deployed stripe-webhook function URL.

Verify anonymous usage, simple mode credit consumption, advanced mode gating, and Stripe flows in staging before production launch.

Ship the landing page with analytics events for form submission, preview renders, credit errors, and successful exports.


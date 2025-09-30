# Custom Ad Iteration Workflow Build Plan

## 🎯 Implementation Status (Updated: 2025-09-29 - Phase 5 Complete)

### ✅ COMPLETED (Full MVP - Ready for Testing)

**Phase 1-4: Complete Foundation**
- ✅ Database migration with 3 tables (`custom_ad_submissions`, `custom_ad_creations`, `custom_ad_share_tokens`)
- ✅ Helper functions for share token generation and analytics integration
- ✅ Edge Function: `capture-shared-ad` with dual auth (JWT + share tokens) and email confirmation
- ✅ API Routes: Share token management (`/api/custom-ads/tokens`)
- ✅ API Routes: Custom ads CRUD (`/api/custom-ads`)
- ✅ Helper module: `lib/supabase/custom-ads.ts`
- ✅ Tool config added to `template-configs.ts` (custom-ad-iteration-tool)
- ✅ Page structure: `/app/custom-ad-iteration-tool/page.tsx`
- ✅ Client component with:
  - Enhanced data table for saved ads with selection
  - Token generation UI with copy-to-clipboard
  - iOS Shortcut setup instructions (collapsible)
  - Form integration with AIFormTemplate
  - Empty states and loading states
- ✅ Navigation updated in `authenticated-header.tsx`
- ✅ iOS Shortcut documentation: `docs/ios-shortcut-setup.md`

**Phase 5: Ad Generation with Base Ads (COMPLETE)**
- ✅ Extended `PromptContext` interface with `baseAds?: BaseAdReference[]`
- ✅ Created `BaseAdReference` interface with url, platform, companyName, analysisData
- ✅ Built `formatBaseAdContext()` helper to format competitor intelligence prompts
- ✅ Updated `buildIterationPrompt()` to inject base ad context when provided
- ✅ Extended `IterationRequestPayload` to accept `baseAds?: BaseAdSubmission[]`
- ✅ Implemented base ad processing logic in Edge Function:
  - Loops through each selected ad
  - Ingests social assets using `ingestSocialAsset()`
  - Extracts creative elements and analysis data
  - Handles errors gracefully
  - Passes processed base ads to prompt builder
- ✅ Wired client-page.tsx onSubmit handler:
  - Fetches selected submission details
  - Builds baseAds payload
  - Calls Edge Function with authentication
  - Displays loading, error, and success states
  - Refreshes submission table after generation
- ✅ TypeScript compilation passes with no errors

**Files Modified in Phase 5:**
- `supabase/functions/analyze-and-iterate-ad/prompt-builder.ts` - Added base ad context formatting
- `supabase/functions/analyze-and-iterate-ad/index.ts` - Added base ad processing logic
- `app/custom-ad-iteration-tool/client-page.tsx` - Wired generation flow with UI states
- `app/custom-ad-iteration-tool/page.tsx` - Fixed TypeScript type assertions

**Testing Checklist Before Production:**
- [ ] Run migration: `supabase migration up` or `npx supabase db push`
- [ ] Deploy Edge Functions:
  - [ ] `npx supabase functions deploy capture-shared-ad`
  - [ ] `npx supabase functions deploy analyze-and-iterate-ad`
- [ ] Test iOS Shortcut → ad appears in table
- [ ] Test token generation and clipboard copy
- [ ] Test ad selection → generation flow (Phase 5 complete, ready to test)
- [ ] Verify email confirmation sends after ad submission
- [ ] Check credits deduction after generation
- [ ] Test deletion cascade (deleting submission removes creations)
- [ ] Verify base ad ingestion (check console logs for asset analysis)
- [ ] Test error handling (invalid URLs, missing auth, insufficient credits)

### 📝 Future Enhancements (Post-MVP)

**Phase 7-10 from Original Plan:**
- Analytics dashboard updates (custom-ad-iteration tool type)
- Performance optimization (caching, lazy loading)
- Realtime updates via Supabase subscriptions
- TikTok/YouTube ad support
- Bulk actions (delete multiple, export)
- Advanced filtering and search
- A/B testing integration

---

## Goal
Launch a logged-in "Custom Ad Iteration Tool" inside the existing APSICS Media landing page experience. The feature lets authenticated users save ads they discover in Meta/Instagram, view them in a personalized table, and generate new APSICS-crafted ads using those saved assets as base inspiration. The workflow must match the established brand voice, visual system, and UX patterns documented in `landing-page/CLAUDE.md`, `landing-page/brand_voice.md`, and `landing-page/BRAND_CONSISTENCY_GUIDE.md` while reusing existing components wherever possible.

---

## Phase 0 – Alignment & Environment Prep
1. **Read core docs**: `landing-page/CLAUDE.md`, `landing-page/brand_voice.md`, `landing-page/BRAND_CONSISTENCY_GUIDE.md`, `components/templates/ai-form-template.tsx`, `app/ai-ad-iteration-tool/client-page.tsx`, and `components/shared/authenticated-header.tsx` so the new flow mirrors tone, structure, and UI patterns.
2. **Confirm tooling**: `npm` scripts in `package.json`, Supabase CLI availability, and note that Supabase Edge Functions live in `supabase/functions`.
3. **Check current schema**: `supabase/migrations` to avoid conflicts and ensure naming conventions align with existing tables (`ad_iteration_runs`, `package_leads`).
4. **Create branch**: `git checkout -b feature/custom-ad-iteration-tool`.

**Checkpoint**: Confirm understanding of design language, existing ad iteration flow, and Supabase conventions with the user before touching code.

---

## Phase 1 – Data Layer & Migrations
### Objective
Persist shared ad links keyed to authenticated users and track regenerated ads tied back to base submissions.

### Steps
1. **Design schema** following existing naming conventions:
   - `custom_ad_submissions`
     - `id uuid primary key default gen_random_uuid()`
     - `created_at timestamptz default now()`
     - `updated_at timestamptz default now()`
     - `user_id uuid references auth.users(id) on delete cascade`
     - `platform text check (platform in ('facebook','instagram','meta','tiktok','linkedin','youtube','other')) default 'facebook'`
     - `ad_url text not null`
     - `company_name text`
     - `source text default 'ios_shortcut'`
     - `metadata jsonb`
   - `custom_ad_creations`
     - `id uuid primary key default gen_random_uuid()`
     - `created_at timestamptz default now()`
     - `updated_at timestamptz default now()`
     - `user_id uuid references auth.users(id) on delete cascade`
     - `submission_id uuid references public.custom_ad_submissions(id) on delete cascade`
     - `request_payload jsonb not null`
     - `result_payload jsonb`
     - `status text check (status in ('pending','complete','failed')) default 'pending'`
     - `credits_spent integer default 0`
2. **Write migration**: create `supabase/migrations/<timestamp>_create_custom_ad_workflow.sql` with table definitions, indexes on `user_id`, `created_at`, triggers to keep `updated_at = now()` on insert/update, and RLS policies:
   - Enable RLS on both tables.
   - Policy: authenticated users can `select`, `insert`, `update`, `delete` their own rows (`auth.uid() = user_id`).
   - Policy: service role can manage all rows (mirrors existing patterns).
3. **Hashing & privacy**: no raw email storage; rely on `user_id`. If email context is needed, use `metadata->>'submitter_email_hash'` with `digest()` inside Edge function.
4. **Register helper view (optional)**: if the UI needs aggregated data, create a view `custom_ad_submission_summaries` with computed platform labels.
5. **Run migration locally**: `npx supabase db reset --linked --local` (or `npx supabase db push`) and verify tables appear.
6. **Document**: add table definitions to `supabase/README.md` if that doc tracks schema.

**Checkpoint**: Share SQL diff with user for approval before applying to remote databases.

**Prompts**
- Draft SQL: "Generate SQL to create `custom_ad_submissions` and `custom_ad_creations` with RLS matching existing conventions."
- Verify schema: "Run Supabase migration and list new tables to confirm." (Use `psql` or `supabase db remote commit --dry-run` if needed.)

---

## Phase 2 – Edge Function: Capture Shared Ads
### Objective
Provide a secure webhook the iOS Shortcut can call to store shared ad URLs.

### Steps
1. **Create function directory**: `supabase/functions/capture-shared-ad` mirroring structure in `analyze-and-iterate-ad` (include `deno.json`).
2. **Authentication**: Use Supabase service role internally but rely on the caller’s `Authorization: Bearer <access_token>` so `supabase.auth.getUser()` resolves the user. Reject requests without valid auth.
3. **Request contract**:
   ```json
   {
     "adUrl": "https://www.facebook.com/ads/library/?id=...",
     "platform": "facebook",
     "companyName": "Brand",
     "source": "ios_shortcut" // optional
   }
   ```
4. **Validation rules**:
   - Ensure `adUrl` is HTTPS and matches allowed domains (`facebook.com`, `instagram.com`).
   - Normalize platform (map `meta` -> `facebook`).
   - Trim company name; cap length at 150 chars.
5. **Duplication handling**: before insert, check if the same `ad_url` already exists for the user. If found, update its `updated_at` (and optionally `metadata`) then return that row instead of inserting a duplicate.
6. **Insert** into `custom_ad_submissions`; store `metadata` like:
   ```json
   {
     "user_agent": "Shortcuts/2.2",
     "source": "ios_shortcut"
 }
   ```
7. **Confirmation email**: once the upsert succeeds, send the user a confirmation email using the Resend API (see `lib/server/resend.ts` for patterns). The Edge function can call Resend directly with `fetch`; template copy should acknowledge receipt, list the stored URL/platform, and link back to `/custom-ad-iteration-tool`.
8. **Response**: return JSON with `submissionId`, `createdAt`, `platformLabel`.
9. **CORS**: reuse `buildCorsHeaders` pattern from `analyze-and-iterate-ad` for OPTIONS requests.
10. **Logging**: wrap handler with `captureEdgeFunctionError` to keep Sentry parity.
11. **Testing**:
    - Local: `npx supabase functions serve capture-shared-ad --env-file supabase/.env.local`.
    - Send test request: `curl -X POST http://localhost:54321/functions/v1/capture-shared-ad ...` with `Authorization` header from Supabase session.

**Checkpoint**: Share sample response & validation logic with user before wiring to Shortcut.

**Prompts**
- "Scaffold capture-shared-ad Edge Function with request validation and Supabase insert."
- "Test edge function locally with a mock JWT." (Use `supabase functions serve` instructions.)

---

## Phase 3 – Internal API & Supabase Utilities
### Objective
Expose CRUD helpers for the React client to list submissions and trigger new ad generations while reusing existing patterns.

### Steps
1. **Server helper**: add `lib/supabase/custom-ads.ts` with functions:
   - `fetchUserSubmissions(supabaseClient, userId)`
   - `createAdCreationRecord(supabaseClient, submissionId, requestPayload)`
   - `listAdCreationsBySubmission(...)`
2. **Route handler**: create `app/api/custom-ads/route.ts` (grouped routes under `/api/custom-ads`) supporting:
   - `GET` – return authenticated user’s submissions + latest creation metadata.
   - `POST` – for fallback web form submissions (shares same schema as Edge Function; optional but provides uniform entry point for browser UI).
   - Use `getSupabaseServerClient()` (existing pattern) or manually instantiate server client with `cookies`.
3. **Error handling**: unify error messages with `getStandardErrorMessage` and log via Sentry.
4. **Types**: export TypeScript interfaces (e.g., `CustomAdSubmission`, `CustomAdCreation`) in `lib/types/custom-ads.ts` if needed.
5. **Tests**: add unit coverage if existing suites cover API routes; otherwise plan manual verification via `npm run lint` + integration smoke tests.

**Prompts**
- "Create Next.js route at `/api/custom-ads` with GET/POST using Supabase server client." 
- "Add helper functions to `lib/supabase/custom-ads.ts` mirroring fetch patterns in `lib/utils/supabase-helpers.ts`."

---

## Phase 4 – Custom Ad Iteration Tool UI
### Objective
Build `/custom-ad-iteration-tool` mirroring the AI Ad Iteration Tool look & feel, with saved-ad table and generation form.

### Steps
1. **Routing**:
   - Create folder `app/custom-ad-iteration-tool`.
   - `page.tsx` should import `AIToolTemplate`, `AlyticsNavbar`, `ProcessSection`, `SimplePricingSection`, `StudioFoundingOfferCard` similar to `app/ai-ad-iteration-tool/page.tsx` but with new config key (add to `lib/template-configs.ts`).
   - Mark page `dynamic = 'force-dynamic'` for Supabase session awareness.
2. **Config**:
   - Extend `lib/template-configs.ts` with `custom-ad-iteration-tool` entry reusing copy from brand docs (tone should emphasize "Claim 10 Free Credits" CTA, creative intelligence, etc.).
   - Follow brand messaging rules (avoid "household brand", highlight credits, mention performance outcomes).
3. **Client component**: `client-page.tsx` (mirrors iteration tool but simplified):
   - Use `AIFormTemplate` for inputs: `companyName`, `primaryPlatform`, `adGoal`, `voiceGuidance` (optional), `callToAction` (optional), etc.
   - Add `userSection` slot to display saved ads table above or beside the form.
   - Table design: reuse card + table classes from `components/analytics/usage-dashboard.tsx` (`rounded-lg`, `border`, `bg-white`, `thead` styling).
   - Allow selecting one or multiple saved ads via checkbox column; store `selectedSubmissionIds` in state.
   - Provide "Generate new ad" button that:
     1. Calls `createAdCreationRecord` to log request (status `pending`).
     2. Invokes existing Supabase Edge Function `analyze-and-iterate-ad` or a specialized variant (`custom-ad-remix`) with request payload + selected base ad metadata.
     3. Updates creation record with result and shows output via existing `ResultActionsPanel` if possible.
4. **Data fetching**:
   - On mount, call Supabase client to `select` from `custom_ad_submissions` ordered desc.
   - Subscribe to changes? Optionally use `supabase.channel` for realtime updates so new Shortcut submissions appear live.
5. **Empty state**:
   - Provide brand-consistent empty copy (e.g., "No shared ads yet" with CTA linking to instructions for installing Shortcut).
6. **Shortcut instructions**:
   - Add collapsible card with step-by-step instructions and direct link to download the Shortcut (once available). This copy should align with `brand_voice.md` (straight shooter + experienced guide tone).
7. **Auth gating**: if no user, prompt sign-in with existing modal from `ai-ad-iteration-tool` (reuse `useFreeWeek` or existing auth modals).
8. **Header navigation**: update `components/shared/authenticated-header.tsx` to append `{ href: '/custom-ad-iteration-tool', label: 'Custom Ad Iteration' }` in `navLinks` + mobile menu.

**Checkpoint**: After wiring data fetch + table, review UI with user before integrating generation flow.

**Prompts**
- "Add template config and page scaffolding for `/custom-ad-iteration-tool`."
- "Build client component using `AIFormTemplate` with saved ads table and selection logic."
- "Wire submission handler to invoke existing iteration function with selected base ad context."

---

## Phase 5 – Ad Generation Enhancements
### Objective
Ensure generated ads leverage selected base assets and respect credit usage.

### Steps
1. **Payload shaping**: augment request body sent to `analyze-and-iterate-ad` with:
   ```ts
   {
     baseAds: submissions.map(({ ad_url, platform, company_name }) => ({
       url: ad_url,
       platform,
       companyName: company_name
     })),
     requestedTone: form.voiceGuidance,
     primaryGoal: form.iterationGoal
   }
   ```
2. **Prompt updates**: if the existing function doesn’t accept `baseAds`, extend `prompt-builder.ts` to append base ad context (ensure we respect existing copy and keep within token limits).
3. **Model flow**: leave the dual-model pipeline intact—`analyze-and-iterate-ad` already routes the primary analysis through OpenRouter’s Gemini 2.0 Flash and then runs a copy-chief refinement pass with Anthropic Claude Sonnet 4.5. Confirm any new inputs (selected base ads, tone guidance) are woven into both prompts so Claude has the right context for polishing copy.
4. **Credits**: reuse credit checking pattern from `ai-ad-iteration-tool/client-page.tsx` so each completed generation deducts exactly 1 credit; storing or sharing ads remains free. Update `custom_ad_creations.credits_spent` accordingly.
5. **Results display**: show outputs using `ResultActionsPanel` or simplified summary table, referencing selected base ads.
6. **Error handling**: surface Supabase/Edge function errors with copy consistent with the established tone (empathetic, actionable).

**Checkpoint**: Demo full loop (saved ad -> selection -> new ad) to user.

**Prompts**
- "Update `prompt-builder.ts` to support base ad context without breaking existing iteration flow."
- "Charge credits and persist result payload in `custom_ad_creations`."

---

## Phase 6 – iOS Shortcut Setup Guide
### Objective
Deliver copy/instructions so users can install and configure the Shortcut.

### Steps
1. **Create documentation section** in the new page (or separate `docs/custom-ad-shortcut.md`) with steps:
   1. Install the APSICS Shortcut (link to iCloud share).
   2. Sign in via landing page, copy secure share token (generated per-user, see Phase 7).
   3. In Shortcuts, set `APSICS_SHARE_TOKEN` and `APSICS_WEBHOOK_URL` variables.
   4. From Instagram/Facebook app, tap Share → APSICS Shortcut.
   5. Shortcut issues `POST` to `capture-shared-ad` with headers:
      - `Authorization: Bearer ${APSICS_SHARE_TOKEN}` (if using token exchange) *or* share secret in custom header.
      - `apikey: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}` if required by Supabase.
2. **If share secret required**: plan UI toggle "Generate mobile share token" (see Phase 7).
3. **Include troubleshooting tips** (token expired, 401 errors, unsupported URL).

**Prompt**
- "Draft Shortcut setup copy matching brand voice and embed in the page as accordion." 

---

## Phase 7 – Share Token Strategy (Optional but Recommended)
### Objective
Provide a user-friendly secret the Shortcut can store instead of a raw JWT.

### Steps
1. **Table**: `custom_ad_share_tokens`
   - `id uuid default gen_random_uuid()`
   - `user_id uuid references auth.users(id) on delete cascade`
   - `token_hash text not null`
   - `created_at timestamptz default now()`
   - `expires_at timestamptz`
   - Index on `user_id` and `token_hash`.
2. **Generation flow**:
   - Add button in UI "Generate Shortcut Token" that calls `/api/custom-ads/token` (new route) to create random 32-char string, hash with `crypt()` or `digest()`.
   - Display token once (copy-to-clipboard) with warning about storing securely.
3. **Edge function auth**:
   - If `Authorization` header missing standard JWT, accept `X-APSICS-Share-Token`; look up `token_hash` to find `user_id` and sign Supabase service client accordingly.
4. **Rotation**: allow users to revoke tokens (delete row) from UI.
5. **Security**: enforce rate limiting via `request-guard` pattern or Supabase `RLS` policies.

**Checkpoint**: Align with user on token vs JWT approach before implementation.

**Prompts**
- "Add `custom_ad_share_tokens` table and API route for managing tokens."
- "Update edge function to accept share tokens as alternative auth." 

---

## Phase 8 – Analytics & Instrumentation
1. **Event logging**: insert new rows into `public.ai_tool_usage` (or reuse existing helper) when users generate ads via the custom tool with `tool_type = 'custom-ad-iteration'`. Supplement with `feature_usage` events for key interactions (`submission_saved`, `generation_submitted`, `result_viewed`). Implement via Supabase server-side helpers or a lightweight API wrapper so events persist even if the browser disconnects.
2. **Dashboards**: update any usage dashboards (e.g., `components/analytics/usage-dashboard.tsx`) to recognize the new tool label and metrics.
3. **Webhook tracking**: log a `feature_usage` record inside the Edge function when a Shortcut submission succeeds so mobile-origin traffic is captured.

**Prompts**
- "Extend analytics helpers to record `custom-ad-iteration` events in `ai_tool_usage` and `feature_usage`."
- "Update usage dashboard to include the new tool type." 

---

## Phase 9 – Navigation & Polish
1. **Update nav**: `components/shared/authenticated-header.tsx` add new link + mobile version.
2. **SEO**: add metadata to `app/custom-ad-iteration-tool/page.tsx` if required (title, description aligning with brand voice).
3. **Accessibility**: ensure table is keyboard-accessible, check contrast ratios.
4. **Copy review**: run through `brand_voice.md` to confirm language matches (experienced guide, straight shooter, credits emphasis).
5. **Styling**: follow `BRAND_CONSISTENCY_GUIDE.md` for spacing, typography, animation easing (Framer Motion variants).

**Prompt**
- "Extend authenticated header navigation with new link." 

---

## Phase 10 – QA & Release
1. **Automated checks**: `npm run lint`, `npm run type-check`, `npm run test` (if suites relevant).
2. **Manual QA**:
   - Share Shortcut executes → row appears instantly in UI.
   - Saved ad selection generates new iteration and deducts credits.
   - Empty state messaging & instructions behave responsively.
   - Token revocation (if implemented) blocks subsequent Shortcut submissions.
3. **Cross-device**: test page on iPhone viewport to ensure table scrolls cleanly.
4. **Deployment prep**: update `DEPLOYMENT_CHECKLIST.md` with new migrations/functions if required.
5. **Monitoring**: confirm Sentry instrumentation captures new errors, add logging where needed.

**Checkpoint**: Final walkthrough with user before deploy.

---

## Suggested Check-In Moments
1. After reviewing schema & docs (Phase 0) – confirm plan alignment.
2. After SQL migration drafted (Phase 1) – validate fields & policies.
3. After Edge function prototype (Phase 2) – ensure auth flow approved.
4. After UI skeleton with table (Phase 4) – review UX + copy.
5. After full loop end-to-end (Phase 5) – final acceptance before QA.

---

## Command Reference
- `npx supabase db reset --linked --local`
- `npx supabase db lint`
- `npx supabase functions serve capture-shared-ad`
- `curl -X POST http://localhost:54321/functions/v1/capture-shared-ad ...`
- `npm run lint`
- `npm run type-check`

---

## Dependencies to Reuse (No New Components Unless Necessary)
- `AIFormTemplate` for forms.
- `ResultActionsPanel` for displaying generated ad outputs.
- `AlyticsNavbar`, `AIToolTemplate`, `ProcessSection`, `SimplePricingSection`, `StudioFoundingOfferCard` for page layout.
- `buildSupabaseInvokeHeaders`, `getSupabaseBrowserClient` for Supabase calls.
- `AuthenticatedHeader` (update nav only).

---

## Notes & Decisions
- Duplicate ad URLs refresh the existing record’s `updated_at` instead of inserting a new row.
- Each generation continues to cost 1 credit; storing or submitting ads stays free.
- Share token support (Phase 7) is optional for v1; launch with Supabase JWT auth and revisit tokens if Shortcuts need long-lived secrets.
- Analytics events should land in Supabase (`ai_tool_usage`, `feature_usage`) so dashboards and reporting include the new workflow.

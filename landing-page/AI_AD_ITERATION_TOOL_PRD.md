# AI Ad Iteration Tool - Product Requirements Document
_Last updated: September 20, 2025_


## 1. Mission & Success Criteria
- **Objective**: Launch a high-converting AI Ad Iteration Tool that lets marketers upload existing creative or submit owned social URLs and receive APSICS-quality iterations in under three minutes.
- **Target Personas**: Performance marketing leads, lifecycle marketers, and creative strategists managing paid social spend for DTC, subscription, and SaaS brands.
- **North-Star KPIs**: >=40% of sessions complete an analysis; >=30% of completed analyses apply a format transition recommendation; in-product satisfaction >=4.5/5.
- **Business Outcomes**: Acquire net-new Founders Club leads, increase paid credit purchases via the shared Stripe flow, and elevate retention across APSICS creative intelligence products.
- **Dependencies**: AI Tool Template system components (`AIToolTemplate`, `AIFormTemplate`, `FoundersClubSection`, `ProcessSection`, `SimplePricingSection`), Supabase auth + credit tables, OpenRouter (Gemini 2.0 Flash) API access, and existing Founders Club offer assets.

## 2. Experience Overview

### 2.1 Primary Journey
1. **Hero & proof**: User lands on `/ai-ad-iteration-tool`, sees value proposition, template secondary nav, and social proof.
2. **Input selection**: Toggle between `Upload creative` (accepts image/video) and `Use social link` (URL input). Provide drag-and-drop zone mirroring ai-ad-script-generator styling.
3. **Context fields**: Complete `AIFormTemplate` fields for brand details, voice, objective, and optional context. Format selector defaults based on detected input type.
4. **Submission & credits**: First anonymous run allowed; subsequent submissions prompt Supabase auth modal and credit deduction using shared system.
5. **Processing state**: Show progress indicator with copy ("Running full scene analysis...") and highlight what is being analyzed (scene detection, hook check, etc.).
6. **Results delivery**: Render `IterationResults` component with current creative diagnosis, prioritized improvement themes, and 3 iteration packages (same format + cross-format).
7. **Post-actions**: User can copy to clipboard, email results, download JSON, or launch CTA to book a call. Exit intent offers 5 extra iteration formulas upon email capture.

### 2.2 Moments That Matter
- Instant comprehension that APSICS intelligence is analyzing their owned creative.
- Confidence-building preview thumbnails for uploaded assets.
- Clear credit messaging pre- and post-run.
- High-impact iteration summaries that feel human-crafted and actionable.

### 2.3 Guardrails & Edge Cases
- File validation (max 10MB image, 50MB video) with inline errors.
- Social URL validation and competitor blocking (brand mismatch).
- Graceful handling of long-running video analyses (retry, status poll).
- Abuse prevention: limit frequency per IP, sanitized input before prompt injection.

## 3. Page Architecture & Content Map

| Section | Component | Anchor | Purpose & Notes | Draft Copy |
| --- | --- | --- | --- | --- |
| Secondary nav | `secondaryHeader` config | n/a | Reuse sticky nav pattern from ai-ad-script-generator. CTA scrolls to pricing block. | Links: Overview (#overview), Workflow (#process), Pricing (#pricing). CTA: `Start Free Analysis`. |
| Hero headline | `AIToolTemplate.header` | #overview | Establish credibility and clarity on transformation. | Title: **"Transform your existing ads into APSICS-grade top performers."**<br>Subtitle: "Upload your creative or drop a social link to get scene-by-scene diagnostics, format shifts, and ready-to-launch remixes tuned to Meta, TikTok, and beyond."<br>Badge: "APSICS Creative Intelligence". |
| Hero proof strip | part of header slot | #overview | Add trust badges/testing proof (three quick bullets). | `Backed by $250M+ ad spend data / Scene-by-scene feedback / Multi-format remixes in under 3 minutes` |
| Intake form | `AIFormTemplate` | #form | Collect brand context via reusable template. | Highlights:<br>1. **Full scene intelligence** - Maps hooks, CTAs, pacing, and visual sequencing.<br>2. **Platform-tuned remixes** - Generates Meta, Instagram, and TikTok-ready outputs.<br>Free Plan:<br>- 1 instant iteration without login<br>- +3 iterations after free signup<br>- Upgrade for unlimited credits & automated delivery |
| Upload toggle | Custom `UploadOrLinkSelector` inside `client-page` | #form | Mirror ai-ad-script-generator custom inputs while keeping template layout. | Primary pill buttons: `Upload creative` (default), `Use social link`. Dropzone helper text: "Drag & drop .mp4, .mov, .webm, .png, .jpg, .webp or browse files." URL helper: "Only analyze assets your team owns." |
| Process overview | `ProcessSection` | #process | Explain APSICS methodology; show 4 highlight cards + accordion fallback. | Title: "How APSICS remixes your creative inside 180 seconds."<br>Highlights:<br>1. Diagnose: "Detect hooks, pacing breaks, and conversion gaps scene by scene."<br>2. Distill (gradient): "Extract voice, offers, and tension points that must stay on-brand."<br>3. Remix: "Spin 3 variations across chosen formats with boost-ready CTAs."<br>4. Deploy: "Package export-ready scripts, overlays, and asset checklists."<br>Accordion copy: reuse ai-ad-script-generator structure with iteration-specific bullet points. |
| Founders Club promo | `FoundersClubSection` | #founders | Convert warm leads using existing promo slot. | Badge: "Founder Club Insider"<br>Title: "Lock lifetime access to weekly creative intelligence drops."<br>Description: "Secure the $20/mo Founder Club seat before it reverts to $97/mo and get priority iteration reviews each Friday."<br>CTA: "Claim Founder Club Seat" -> `/#service-tiers`.<br>Footer: "Includes 50 bonus credits + private Slack audits." |
| Results module | Custom `IterationResults` wrapped in `resultComponent` | #results | Present output with templates for diagnosis + iterations + downloads. | Layout:<br>1. Diagnostic overview with traffic-light scoring.<br>2. Scene-by-scene table (timecode, issue, fix).<br>3. Iteration packages: `Same Format Upgrade`, `Video Remix`, `Static High-Converting`, each with bullet structure.<br>4. Action footer: Copy, Email, Download `.json` and `.md`. |
| Pricing | `SimplePricingSection` | #pricing | Reuse existing pricing component; ensure CTA references iteration tool. | Update plan labels to mention "Includes AI Ad Iteration" in plan bullet copy. |
| Exit intent modal | `template.exitIntent` | modal | Capture leads leaving without running tool. | Title: "Grab 5 proven iteration formulas before you bounce."<br>Subtitle: "Join 100+ growth teams getting weekly APSICS teardown drops and bonus credit packs." |

## 4. Template Implementation Plan

### 4.1 Template Config (`lib/template-configs.ts`)
Add a new config entry alongside existing tools:

```typescript
export const toolConfigs: Record<string, ToolPageConfig> = {
  // ...existing configs
  'ai-ad-iteration-tool': {
    template: {
      header: {
        title: 'Transform your existing ads into APSICS-grade top performers',
        subtitle:
          'Upload your creative or drop a social link to get scene-by-scene diagnostics, format shifts, and ready-to-launch remixes tuned to Meta, TikTok, and beyond.',
        badgeText: 'APSICS Creative Intelligence',
      },
      sections: {
        showFoundersClub: true,
        showProcessSection: true,
        showPricingSection: true,
      },
      exitIntent: {
        title: 'Grab 5 more iteration formulas before you go',
        subtitle:
          'Join 100+ growth teams receiving weekly APSICS teardown drops, bonus credits, and private breakdowns.',
      },
    },
    form: {
      title: 'Run your first boosted iteration',
      description:
        'Drop in your brand context and the asset you want to improve. In under three minutes you'll receive a full diagnostic, prioritized fixes, and APSICS-crafted remixes across the formats you pick.',
      submitButtonText: 'Analyze & Generate Iterations',
      highlights: [
        {
          title: 'Full scene intelligence',
          description: 'Maps hooks, CTAs, pacing, and visual sequencing against APSICS benchmarks.',
          variant: 'primary',
        },
        {
          title: 'Platform-tuned remixes',
          description: 'Delivers Meta, Instagram, and TikTok-ready outputs with channel-native pacing.',
          variant: 'success',
        },
      ],
      freePlan: {
        title: 'Included in the free tier',
        features: [
          '1 instant iteration with no login required',
          '+3 additional iterations after free account signup',
          'Upgrade for unlimited credits and weekly auto-delivery',
        ],
        note: 'Paid tiers unlock bulk uploads, CSV history export, and concierge reviews.',
      },
    },
    fields: [
      {
        key: 'companyName',
        label: 'Brand or company name',
        type: 'text',
        placeholder: 'e.g. APSICS Media',
        required: true,
      },
      {
        key: 'brandVoice',
        label: 'Preferred brand voice',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select voice' },
          { value: 'authoritative', label: 'Authoritative & direct' },
          { value: 'playful', label: 'Playful & conversational' },
          { value: 'premium', label: 'Premium & sophisticated' },
          { value: 'urgent', label: 'Performance-driven urgency' },
          { value: 'custom', label: 'Custom (specify in context)' },
        ],
      },
      {
        key: 'primaryPlatform',
        label: 'Primary platform focus',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Auto-detect from asset' },
          { value: 'facebook', label: 'Facebook / Meta' },
          { value: 'instagram', label: 'Instagram (Reels/Stories)' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'youtube', label: 'YouTube / Shorts' },
          { value: 'linkedin', label: 'LinkedIn' },
        ],
      },
      {
        key: 'iterationGoal',
        label: 'Iteration goal',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select a goal' },
          { value: 'performance', label: 'Reduce CAC / boost ROAS' },
          { value: 'engagement', label: 'Increase engagement & watch time' },
          { value: 'conversion', label: 'Drive direct response conversions' },
          { value: 'awareness', label: 'Improve awareness & recall' },
          { value: 'retention', label: 'Re-engage existing customers' },
        ],
      },
      {
        key: 'referenceUrl',
        label: 'Reference landing page or product URL',
        type: 'url',
        placeholder: 'https://yourbrand.com/product',
        optional: true,
      },
      {
        key: 'additionalContext',
        label: 'What else should we know?',
        type: 'textarea',
        placeholder: 'Share offer constraints, audience nuances, promo calendar, etc.',
        rows: 4,
        optional: true,
      },
    ],
    foundersClub: {
      badge: 'Founder Club Insider',
      title: 'Lock lifetime creative intelligence access at $20/mo',
      description:
        'Secure the Founder Club seat before it reverts to $97/mo and get priority iteration reviews, weekly teardown drops, and 50 bonus credits.',
      ctaText: 'Claim Founder Club Seat',
      ctaHref: '/#service-tiers',
      footerText: 'Includes private Slack office hours and quarterly creative audits.',
    },
    process: {
      title: 'How APSICS remixes your creative in 180 seconds',
      description:
        'Every analysis layers our $250M+ performance dataset with your brand voice to deliver usable landable creative - not generic AI fluff.',
      highlights: [
        {
          title: 'Diagnose weak spots',
          description: 'Scene-by-scene hook pacing, CTA placement, and offer clarity scoring.',
        },
        {
          title: 'Distill brand signals',
          description: 'Extract voice, proof points, and must-keep assets before iterating.',
          variant: 'gradient',
        },
        {
          title: 'Remix intelligently',
          description: 'Generate multi-format, platform-native improvements prioritized by impact.',
        },
        {
          title: 'Package for launch',
          description: 'Deliver scripts, overlays, asset lists, and testing angles ready for production.',
        },
      ],
      showAccordion: true,
    },
    secondaryHeader: {
      links: [
        { label: 'Overview', href: '#overview' },
        { label: 'Workflow', href: '#process' },
        { label: 'Pricing', href: '#pricing' },
      ],
      ctaHref: '#pricing',
      ctaLabel: 'Start Free Analysis',
    },
  },
};
```

### 4.2 Page Composition (`app/ai-ad-iteration-tool/page.tsx`)

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { AIToolTemplate } from '@/components/templates/ai-tool-template';
import { FoundersClubSection } from '@/components/templates/founders-club-section';
import { ProcessSection } from '@/components/templates/process-section';
import { SimplePricingSection } from '@/components/alytics/simple-pricing-section';
import { getToolConfig } from '@/lib/template-configs';
import IterationToolClient from './client-page';

export default function AIAdIterationToolPage() {
  const config = getToolConfig('ai-ad-iteration-tool');

  if (!config) {
    return <div>Configuration not found</div>;
  }

  return (
    <AIToolTemplate
      config={config.template}
      secondaryHeaderProps={config.secondaryHeader}
      foundersClubContent={<FoundersClubSection config={config.foundersClub} />}
      processContent={<ProcessSection config={config.process} />}
      pricingContent={<SimplePricingSection />}
    >
      <IterationToolClient config={config} />
    </AIToolTemplate>
  );
}
```

### 4.3 Client Component & Interactions (`app/ai-ad-iteration-tool/client-page.tsx`)
- Import and pass `config.form` + `config.fields` into `AIFormTemplate`.
- Manage local state for:
  - `inputMethod`: `'upload' | 'url'`
  - `assetFile` + preview metadata (duration, aspect ratio)
  - `assetUrl` sanitized string
  - `outputFormats`: `Set<'same' | 'video' | 'static' | 'carousel'>`
  - `primaryPlatform`, `iterationGoal` (overrides from selects)
  - `processingState`: `'idle' | 'preparing' | 'uploading' | 'analyzing' | 'complete' | 'error'`
  - `credits` and `showPurchasePrompt`
- Use `getSupabaseBrowserClient` for auth + credit fetching (reuse helper from ai-ad-script-generator).
- Reuse `extractEdgeFunctionError` util from the script generator client for consistent error messages.
- Render a Dropzone-style component above `AIFormTemplate`; update hidden inputs before submit.
- Provide `resultComponent` prop with `IterationResults` to display structured output rather than plain text.
- Handle 402 responses by triggering the purchase flow, hooking existing Stripe checkout logic.
- Persist successful runs to Supabase table `ad_iteration_runs` (new) to support analytics and history.

```typescript
type OutputFormat = 'same' | 'video' | 'static' | 'carousel';

type IterationRequest = {
  companyName: string;
  brandVoice: string;
  primaryPlatform: string;
  iterationGoal: string;
  referenceUrl?: string;
  additionalContext?: string;
  inputMethod: 'upload' | 'url';
  assetFile?: File;
  assetUrl?: string;
  outputFormats: OutputFormat[];
};
```

- Use the `userSection` slot in `AIFormTemplate` to surface login state and credit counts.
- Before calling the edge function, upload files to Supabase Storage and replace `assetFile` with a signed URL.
- For long-running jobs, display polling UI and allow users to navigate away while keeping state in URL query (`jobId`).

## 5. Form Fields, Validation & UX Rules

| Input | Source | Display Logic | Validation | Notes |
| --- | --- | --- | --- | --- |
| Asset upload | Custom dropzone in `client-page` | Visible when `inputMethod === 'upload'` | Accept `.png,.jpg,.jpeg,.webp` <=10MB and `.mp4,.mov,.webm` <=50MB. Run quick duration sniff for video via `URL.createObjectURL`. | Show thumbnail + length metadata. Store in Supabase Storage `ai-ad-iteration-assets/{userId}/{uuid}` before calling edge function. Delete after 24h via cron. |
| Social asset URL | Custom `TextField` adjacent to dropzone | Visible when `inputMethod === 'url'` | `https://` enforced; allow `facebook.com`, `instagram.com`, `tiktok.com`, `youtube.com`. Check brand ownership before analysis. | When valid, display fetched preview (thumbnail + title) using OG tags or oEmbed, fallback to placeholder. |
| Brand/company name (`companyName`) | `AIFormTemplate` field | Always visible | Required, trimmed length > 1 | Used in prompt guardrail to confirm ownership. |
| Preferred brand voice (`brandVoice`) | `AIFormTemplate` select | Always visible | Required; default blank disabled option | If `custom`, require user to fill `additionalContext`. |
| Primary platform focus (`primaryPlatform`) | `AIFormTemplate` select | Default autopill when asset type recognized; user can override | Required | Drives platform-specific prompt section + UI copy in results. |
| Iteration goal (`iterationGoal`) | `AIFormTemplate` select | Always visible | Required | Impacts scoring heuristics and prompt objective. |
| Reference landing/product URL (`referenceUrl`) | `AIFormTemplate` URL | Optional, but recommended | Validate via built-in URL parser, normalize to `https`. | Auto-fills `CTA` suggestions with page headline if accessible. |
| Additional context (`additionalContext`) | `AIFormTemplate` textarea | Always visible | Optional (unless `brandVoice === 'custom'`) | Provide character count (`/ 500`). |

Additional rules:
- Add `outputFormat` multi-select (checkbox chips) below form: defaults to `['same', detectedTransition]`. Require at least one selection.
- Show real-time credit indicator via `userSection` slot (`Credits remaining: X`).
- Disable submit unless all required fields + asset present. Provide inline errors and scroll-to-first-error on submit.

## 6. Results Module & Export Experience
- Implement reusable `IterationResults` component inside `client-page`, passed as `resultComponent` to `AIFormTemplate`.
- Layout:
  - **Summary stack**: headline score (e.g., `Your ad is 62 / 100 for retention`) with severity pill.
  - **Diagnostic table**: `timecode`, `finding`, `impact`, `recommendation`. Use accordion for >10 scenes.
  - **Iteration packages**: three cards generated from AI response:
    1. `Same Format Upgrade` - keep format, highlight new hook, overlay copy, CTA.
    2. `Video Remix` - script segmented by `Scene`, `On-screen`, `VO`, `Overlay`, `CTA`.
    3. `Static / Carousel` - layout instructions + copy variations.
  - **Action footer**: Buttons `Copy summary`, `Download .md`, `Download .json`, `Email results`.
- Data contract expected from edge function:

```typescript
type IterationAnalysis = {
  performanceScore: number;
  topWins: string[];
  topRisks: string[];
  scenes: Array<{
    timecode: string;
    observation: string;
    recommendation: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  iterations: Array<{
    id: 'same' | 'video' | 'static' | 'carousel';
    headline: string;
    angleSummary: string;
    script?: Array<{
      scene: string;
      description: string;
      voiceover: string;
      overlay: string;
      cta: string;
    }>;
    staticCopy?: {
      headline: string;
      body: string;
      cta: string;
      designNotes: string[];
    };
    testingNotes: string[];
  }>;
  exportArtifacts: {
    markdown: string;
    json: Record<string, unknown>;
  };
};
```

- When the edge function returns raw prompt text, normalize inside client before rendering; keep original payload for downloads.
- Allow users to trigger `Email results` (reuse email send helper from ai-ad-script-generator); throttle to 1 email/minute.

## 7. Backend Architecture & Data Flow

1. **Asset preparation**
   - For uploads, `client-page` uploads to Supabase Storage bucket `ai-ad-iteration-assets` using `supabase.storage.from(...).upload` with UUID file names.
   - Generate signed URL valid for 15 minutes and pass to edge function payload.
   - For social URLs (Facebook/Instagram/TikTok), route through a `fetch-social-asset` workflow that downloads the media into storage before analysis. The OpenRouter call must include an `image_url` (static) or pre-processed frame URLs (video); the external social URL alone is insufficient.
   - **APIs & tools (PoC)**: For the proof-of-concept we will employ scraping-based downloaders—Meta AdDownloader for Facebook/Instagram and `yt-dlp` with Pyktok for TikTok—orchestrated through a Playwright MCP helper. These workflows save raw MP4/PNG assets into Supabase storage before Gemini analysis. Long term, migrate to official Meta/TikTok APIs once production credentials are secured.

### Social Asset Retrieval Service (PoC)
1. **Dispatch**: Queue a `fetch-social-asset` helper when `inputMethod === 'url'`.
2. **Acquisition**:
   - Facebook / Instagram: Invoke the AdDownloader (Playwright/Chromium) script to resolve Ad Library entries into MP4/PNG files stored in Supabase.
   - TikTok: Invoke `yt-dlp` or Pyktok to download the public video into storage.
3. **Storage**: Place downloaded assets under `ai-ad-iteration-assets/{jobId}/raw.*` and pass signed URLs + metadata (duration, format) to the analyzer.
4. **Cleanup**: Delete assets within 24 hours unless the user explicitly saves history.

2. **Edge function: `supabase/functions/analyze-and-iterate-ad/index.ts`**
   - Authenticate user via `supabase.auth.getUser`.
   - Resolve anonymous usage via salted IP (reuse logic from script generator).
   - Check credits: 1 credit per run; support free anonymous run.
   - Fetch asset metadata: if video, extract key frames (use `ffmpeg.wasm` or `@ffmpeg/ffmpeg` inside edge function) to include `scene_previews` in prompt. For images, run OCR using Google Vision or fallback to Tesseract if OpenRouter model cannot.
   - Competitor guardrail: compare detected brand names from transcript/OCR against `companyName`. If mismatch, return 403 with friendly message.
   - Compose prompt using new prompt files (see section 8). Include:
     - Brand context
     - Asset metadata (duration, ratio, transcript, engagement metrics if provided)
     - Requested output formats and goals
   - Call OpenRouter `https://openrouter.ai/api/v1/chat/completions` with `google/gemini-2.0-flash-exp`.
   - Parse structured JSON from model (enforce via `json_mode: true`).
   - Persist run history to `ad_iteration_runs` table:

```sql
create table public.ad_iteration_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  request jsonb not null,
  result jsonb,
  credits_spent int not null default 1,
  created_at timestamptz default now(),
  processing_ms int,
  source varchar(16) default 'web'
);
```

   - On success, decrement credits, store `result` JSON, return sanitized payload to client.
   - Graceful error handling: map OpenRouter timeouts to 504; provide actionable message.

3. **Asynchronous jobs**
   - For videos > 60 seconds or >20MB, enqueue background job via Supabase queue (Edge Function `submit-iteration-job`) and return `202 Accepted` with polling token. Client polls `/api/iteration-status?id=...`.

4. **Cleanup**
   - Nightly cron job deletes storage assets older than 24 hours and run records older than 90 days (except paying customers).

5. **Email delivery**
   - Reuse existing SendGrid integration; send markdown summary and iteration attachments.

## 8. Prompt & Content Assets

Create dedicated prompt folder:

```
/supabase/functions/analyze-and-iterate-ad/prompts/
- system.md
- base_analysis.md
- output_structure.json
- format_transitions/
  - same_format.md
  - video_from_static.md
  - static_from_video.md
  - carousel_package.md
- platforms/
  - facebook.md
  - instagram.md
  - tiktok.md
  - youtube.md
  - linkedin.md
- objectives/
  - performance.md
  - engagement.md
  - conversion.md
  - awareness.md
  - retention.md
```

- `system.md`: define APSICS tone, competitor guardrails, and JSON schema adherence.
- `base_analysis.md`: instructions for diagnosing current asset, extracting transcript, and highlighting top risks/wins.
- `output_structure.json`: enforce JSON output contract shown in section 6.
- `format_transitions/*.md`: micro-prompts appended based on selected output formats.
- `platforms/*.md`: nuance per channel (length, pacing, hooks, CTAs).
- `objectives/*.md`: optimization lens for each goal (retention, ROAS, etc.).
- Edge function composes final prompt by concatenating relevant files; cache file contents to avoid file I/O on every request.

## 9. Credit Model & Monetization
- 1 credit per analysis regardless of input type.
- Anonymous visitor: 1 free credit tracked by hashed IP (reuse `anonymous_usage` table).
- Authenticated free plan: +3 credits seeded in `profiles`.
- Paid plan: purchase flow identical to ai-ad-script-generator (Stripe Checkout via `create-checkout-session`).
- When user is out of credits, show inline banner in form and disable `Analyze` CTA; clicking `Buy more credits` triggers Stripe.
- Founder Club purchase auto-adds 50 credits; ensure webhook updates `profiles.credits_remaining`.

## 10. Analytics, Tracking & Instrumentation
- Add client-side events via existing analytics helper:
  - `ai_iteration_tool.view`
  - `ai_iteration_tool.start` (payload: inputMethod, assetType)
  - `ai_iteration_tool.success` (payload: duration_ms, formats_generated)
  - `ai_iteration_tool.error` (payload: error_code, step)
  - `ai_iteration_tool.credit_prompt_shown`
  - `ai_iteration_tool.export` (type: copy|email|download)
- Add Supabase row logging for runs (see section 7) to power dashboards.
- Track conversion funnel in PostHog / GA4: hero CTA clicks, start forms, completions, Founder Club conversions.
- Monitor edge function performance with `logflare` or custom logging (response time, OpenRouter cost).

## 11. Quality, Accessibility & Testing
- Accessibility: ensure dropzone is keyboard accessible, form fields announce errors via `aria-live`, results table uses semantic `<table>`.
- Performance: lazy-load heavy modules (ffmpeg) and video previews; compress image previews to <300KB.
- Testing:
  - Unit tests for `formatRequestPayload`, `parseIterationResponse`.
  - Playwright e2e covering upload + url flows, credit gating, competitor rejection.
  - Edge function integration tests (Deno) using fixture assets for image/video/URL.
  - Visual regression snapshot for hero + results.
- Content QA: validate prompt outputs against 5 seeded assets (image, 15s video, 45s video, TikTok URL, Instagram Reel).

## 12. Rollout Plan
- **Week 0 (Setup)**: Add template config, scaffold page + client component, connect Supabase storage bucket.
- **Week 1 (MVP)**: Implement upload/url flow, integrate edge function with basic analysis, render results JSON, wire credit system.
- **Week 2 (Enhancements)**: Add video scene detection, platform-specific prompts, email export, asynchronous job handling.
- **Week 3 (Polish)**: Instrument analytics, write documentation, produce marketing assets, run QA + accessibility checks.
- **Launch**: Deploy behind feature flag, run smoke tests, announce to Founders Club, monitor metrics hourly for first 48h.

## 13. Open Questions & Follow-Ups
- Confirm whether we should store processed transcripts for re-download or delete post-run (impacts storage + privacy policy).
- Decide on visual asset previews inside results (render generated storyboards vs text descriptions).
- Align on whether social URL fetching should run client-side (oEmbed) or entirely within edge function for reliability.

## 14. Future Enhancements
- Bulk iteration queue for up to 10 assets at once.
- Team workspace history with filtering and re-run button.
- Automatic variant benchmarking once campaign performance data flows back in.

# AI Ad Iteration Tool - Simplified PRD

## Overview

An AI-powered tool that analyzes existing ads (static images, videos, or social media links) and generates improved versions using APSICS Media's creative intelligence framework. Built with a single OpenRouter + Gemini 2.0 Flash integration for maximum simplicity and speed.

## Product Vision

Enable marketers to rapidly iterate on their own ad creative by uploading assets or providing Facebook/Instagram Ad Library URLs, receiving comprehensive AI-powered analysis and improved versions through a single, powerful API call. Social links are resolved via an Apify Ads Library actor into downloadable media before Gemini takes over, ensuring consistent results for Meta placements.

## Technical Architecture

### Frontend Structure
- **Page Location**: `/app/ai-ad-iteration-tool/`
- **Main Component**: `client-page.tsx` (following existing ai-ad-script-generator pattern)
- **Styling**: Match existing design system and patterns

### Backend Services
- **Edge Function**: `supabase/functions/analyze-and-iterate-ad/index.ts`
- **AI Provider**: OpenRouter API with Gemini 2.0 Flash model
- **Single Prompt**: `iteration_bot_prompt_real.md` (handles all scenarios)
- **Social Asset Ingestion**: Apify Ads Library actor → Supabase storage signed URLs (Meta-only v1)
- **Credit System**: Inherit existing system (1 credit per analysis)

## Core Features

### 1. Asset Input Methods

#### File Upload
- **Supported Formats**:
  - Images: JPG, PNG, WebP (max 10MB)
  - Videos: MP4, MOV, WebM (max 50MB)
- **Processing**: Gemini 2.0 Flash analyzes directly
- **User Flow**: Drag-and-drop or file picker → instant analysis

#### Social Media URL Input
- **Supported Platforms**: Facebook & Instagram Ad Library URLs (format: `https://www.facebook.com/ads/library/?id=<AD_ID>`)
- **Download Flow**: Extract `ad_id` → invoke Apify Ads Library actor (with stored cookie + token) → download returned MP4/PNG into Supabase bucket → mint signed URL for Gemini
- **Content Filtering**: Prompt-level competitor blocking
- **User Flow**: Paste Ad Library URL → validation → Apify ingestion → analysis

### 2. Output Format Selection
- **Same Format**: Optimize within current format
- **Format Transitions**: Video↔Static↔Carousel conversions
- **Multi-Format**: Generate variations across formats
- **User Selection**: Radio buttons for desired output

### 3. Single API Call Analysis

Gemini 2.0 Flash provides complete analysis including:
- **Video Transcription**: Complete spoken content extraction
- **Scene Analysis**: Frame-by-frame breakdown and timing
- **Performance Assessment**: Current strengths/weaknesses
- **Iteration Recommendations**: 3 improved versions
- **Platform Optimization**: Facebook/Instagram/TikTok specific
- **Format Transitions**: Cross-format suggestions
- **Brand Consistency**: Voice preservation guidelines

## User Experience Flow

### Primary Journey
1. **Landing**: Value proposition and input options
2. **Upload/URL**: File upload or social media URL input
3. **Format Selection**: Choose desired output format
4. **Asset Prep**: Download social URL assets to Supabase and secure a signed URL
5. **Single Processing Step**: OpenRouter + Gemini analysis
6. **Complete Results**: Comprehensive iteration analysis
7. **Export Options**: Email delivery, copy to clipboard

### Form State
```typescript
type IterationFormState = {
  inputMethod: 'upload' | 'url';
  file?: File;
  url?: string;
  outputFormat: 'video' | 'static' | 'same' | 'multi';
  primaryPlatform: 'facebook' | 'instagram' | 'tiktok';
  iterationGoal: 'performance' | 'engagement' | 'conversion' | 'awareness';
  additionalContext?: string;
}
```

## Technical Implementation

### Edge Function Structure
```typescript
// supabase/functions/analyze-and-iterate-ad/index.ts
export default async function(req) {
  // 1. Validate input and check credits
  const payload = await req.json();
  const { companyName, outputFormat, iterationGoal } = payload;

  // 2. Normalize input into a downloadable asset (uploads + social URLs)
  const { signedUrl, contentType } = await resolveAsset(payload);

  // 3. Build comprehensive prompt
  const prompt = buildIterationPrompt({ companyName, outputFormat, iterationGoal, contentType, payload });

  // 4. Single OpenRouter call to Gemini
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "input_text", text: `asset_type=${contentType}` },
          { type: "image_url", image_url: { url: signedUrl } }
        ]
      }],
      max_tokens: 2000
    })
  });

  // 5. Return complete iteration analysis
  return response.json();
}
```

### Social URL Asset Retrieval
```typescript
async function resolveAsset(payload) {
  if (payload.assetSignedUrl) {
    return { signedUrl: payload.assetSignedUrl, contentType: payload.contentType };
  }

  if (payload.inputMethod === 'url') {
    const downloadResult = await fetchMetaAssetViaApify({
      adLibraryUrl: payload.url,
      supabaseAdmin,
      bucket: 'ai-ad-iteration-assets'
    });

    return {
      signedUrl: downloadResult.signedUrl,
      contentType: downloadResult.contentType
    };
  }

  // fallback handles direct uploads already written to storage on submit
  return {
    signedUrl: await createSignedUrl(payload.storagePath),
    contentType: payload.contentType
  };
}
```

`fetchMetaAssetViaApify` wraps the Apify Ads Library actor: it parses the `id` query param from the Ad Library URL, triggers the actor with our stored cookie, downloads the returned MP4/PNG into Supabase, and returns a short-lived signed URL that Gemini can ingest.

### Prompt Strategy
- **Canonical Prompt**: Leverage the full `Prompt_Database/iteration_bot_prompt_real.md` in every call. No abridged or alternate prompts are permitted.
- **Behavior Protocol**: Enforce ad-iteration-only responses, copywriting framework usage (PAS, AIDA, 4P, RMBC, LFE8, Jobs-to-be-Done), and "use only provided data" guardrails.
- **Mission Orientation**: Drive asset analysis → performance gaps → iteration strategy → optimized creative → improved conversion, with outputs that are emotionally charged, platform-native, and brand-consistent.

#### Workflow Execution Rule (Must Run Sequentially)
1. **Step 1A – Asset Analysis & Competitive Research**
   - Answer the full research questionnaire (differentiators, benefits, pain triggers, desired outcomes, emotions, demographics, psychographics, USPs, triggers, competitor claims, sentiment, reviews, market sophistication, awareness level, positioning, VOC phrase bank, cultural affinities, gaps, offers, unique mechanism, leverageable stats).
   - Populate the Golden Pain Bank (verbatim pains), Dream Outcome Vault, and Insight Index (source-tagged hooks).
2. **Step 1B – Performance Gap Analysis**
   - Audit current asset weaknesses (missed triggers, objections, hook strength) and extract psychographic insights via comment heatmaps, cultural tension mapping, RMBC-style belief excavation, and thematic bulleting.
3. **Step 2 – Iteration Strategy Selection**
   - Document target persona, core emotion, Life Force 8 driver, awareness level, key moment, placement format, and product positioning.
   - Evaluate current strengths/opportunities, select iteration priorities, and map competitive advantage matrix outputs (category conventions, gaps, unique ownership opportunities, cultural tension resolution).
4. **Step 3 – Headline & Hook Optimization**
   - Produce platform-native hooks per chosen format (audio vs. text when relevant), using specificity, curiosity, unique mechanisms, credibility, and social proof guidelines.
5. **Step 4 – Copy Iteration & Enhancement (Copy Chief Loop)**
   - Run the copychief checklist (relevance, avatar clarity, platform nativeness, conversational tone, promise clarity, curiosity, benefit-led angles) and apply the 5-part scoring rubric (Clarity, Emotional Resonance, Benefit, CTA Strength, Memorability) with pass/fail guidance.

#### Research & Reference Inputs (Pre-Prompt Setup)
Collect and structure the following before invoking Gemini:
1. Brand & product context (name, USP, differentiators, target market).
2. Uploaded asset analysis (type, performance data, source, hook, script, visuals, audio, platform origin).
3. Winning creative examples (3–5 with performance notes).
4. Category references (hooks, benefit framing, CTAs).
5. Brand voice references (tone spectrum, do's/don'ts).
6. Competitor landscape (examples, what works/overdone, gap opportunities).
7. Performance insights (best hooks, benefits, formats, audience segments).

#### Iteration Playbook
- **Pattern Interruption**: Require at least one interrupt (visual, auditory, narrative, conceptual) tied directly to the strongest benefit claim.
- **Emotional Targeting**: Define Life Force 8 and Mindstate drivers for every concept; restart if undefined.
- **Top Converting Formats**: Provide recommendations across greenscreen react, duet react, UGC testimonial, founder monologue, montage, us-vs-them, before/after, "3 reasons why", "why I regret", press overlay, meme formats, headline overlays, post-it notes, statistics overlays, comment bubbles, testimonials, grid/bundle visuals, problem→solution narratives, offer-first intros, etc.
- **Headline & Hook Craft**: Follow direct-response standards (specificity, unique mechanism, credibility, social proof, curiosity + promised benefit). Address platform nuances (story hooks for video vs. static, audio/text divergence) and document rationale per variation.

#### Copy Chiefing & Voice Alignment
- Apply powerful, specific, situational language (pain/benefit triplets, social context, dimensional mind movies, block structure with overarching statement → vivid detail → lived experience → emotional payoff).
- Maintain single core promise repetition with supporting secondary benefits.
- Use the Brand Voice Adaptation Framework (spectrum placement, vocabulary guidelines, tone by funnel stage) to keep outputs native to the client.
- Ensure every hook is tagged with its insight source and aligned to Golden Pain/Dream Outcome findings.

#### Testing & Output Packaging
- Build A/B testing matrices (control vs. challenger) covering hook, visual, benefit, CTA variations.
- Deliver complete iteration frameworks with script/copy, pattern interrupts, emotional targets, platform formatting guidance, and copychief notes.
- Guarantee all copy is flagged as "copychiefed" before returning to the UI, preserving asset voice while elevating performance.

## Content Processing

### Simplified Workflow
1. **User Input**: Upload file or provide social URL
2. **Validation**: Check format, size, competitor filtering
3. **Asset Retrieval**: For Meta URLs, trigger Apify actor, download creative into Supabase storage, mint signed URL
4. **API Call**: Send signed asset URL + prompt to Gemini 2.0 Flash via OpenRouter
5. **Analysis**: Gemini provides complete iteration package
6. **Display**: Show results with copy/email options

### What Gemini Handles Natively
- ✅ Video transcription and scene analysis
- ✅ Image text extraction (OCR)
- ✅ Visual composition analysis
- ✅ Performance prediction
- ✅ Platform-specific recommendations
- ✅ Format transition suggestions
- ✅ Brand voice consistency

## Credit System

### Simplified Pricing
- **All Analyses**: 1 credit regardless of complexity
- **Free Tier**: 1 analysis without account + 3 with signup
- **No Complexity Tiers**: Consistent user experience

## Success Metrics

### Technical Performance
- **Processing Speed**: <45 seconds for complete analysis
- **Accuracy**: 90%+ transcription and analysis accuracy
- **Uptime**: 99.5% availability
- **Cost Efficiency**: <$0.10 per analysis

### User Experience
- **Completion Rate**: >85% of started analyses
- **Format Transition Usage**: >40% users select different output
- **Satisfaction**: >4.5/5 rating
- **Retention**: >50% monthly usage

## Security & Content Filtering

### Competitor Prevention
- **Prompt Instructions**: Direct Gemini to identify competitor content
- **User Confirmation**: "Confirm this is your company's content"
- **Clear Messaging**: Explain why competitor analysis is blocked

### Privacy
- **No Permanent Storage**: Content deleted after analysis
- **Secure Processing**: Encrypted API calls
- **GDPR Compliant**: No retention of user creative assets

## Launch Strategy

### Day 1-2: MVP
- ✅ OpenRouter + Gemini integration
- ✅ File upload (images + videos)
- ✅ Complete iteration analysis
- ✅ Credit system integration
- ✅ Basic UI following existing patterns

### Day 3-5: Enhanced Features
- ✅ Social media URL support
- ✅ Enhanced results display
- ✅ Email delivery integration
- ✅ Format transition options

### Week 2: Optimization
- Performance monitoring
- Prompt optimization
- User feedback integration
- A/B testing recommendations

## Key Benefits of Simplified Approach

### Development Speed
- **2 days to MVP** vs 2-4 weeks for complex pipeline
- **Single integration point** vs multiple service orchestration
- **Proven technology** vs custom video processing

### Operational Benefits
- **Lower costs**: One API call vs multiple services
- **Better reliability**: Fewer failure points
- **Easier maintenance**: One prompt to optimize
- **Native capabilities**: Leverages Gemini's strengths

### User Experience
- **Faster results**: No multi-step processing delays
- **Comprehensive output**: Everything in one response
- **Consistent pricing**: Simple 1-credit model
- **Professional quality**: Leverages best-in-class AI

## Implementation Requirements

### Required Integrations
1. **OpenRouter Account**: API key for Gemini access
2. **File Upload**: Supabase storage for temporary files
3. **Apify Account**: API token + Facebook Ads Library actor for Meta asset capture
4. **UI Components**: Reuse from ai-ad-script-generator
5. **Email Service**: Existing send-ad-email API

### Environment Variables
```
OPENROUTER_API_KEY=your_openrouter_key
APIFY_TOKEN=your_apify_api_token
FACEBOOK_ADS_LIBRARY_COOKIE=full_cookie_header_for_actor
```

### File Structure
```
/app/ai-ad-iteration-tool/
├── page.tsx (main route)
├── client-page.tsx (main component)
/supabase/functions/analyze-and-iterate-ad/
├── index.ts (edge function)
├── prompt.ts (iteration prompt)
├── social-download.ts (Apify-backed Meta ingestion helpers)
/prompts/
└── iteration_bot_prompt_real.md (comprehensive prompt)
```

## Success Criteria

### Technical
- ✅ <45 second response time
- ✅ >90% analysis accuracy
- ✅ <$0.10 cost per analysis
- ✅ 99.5% uptime

### Business
- ✅ >80% completion rate
- ✅ >40% format transition usage
- ✅ >4.5/5 user satisfaction
- ✅ Integration with existing credit system

This simplified approach delivers the same comprehensive ad iteration capabilities with dramatically reduced complexity, faster development time, and better reliability by leveraging Gemini 2.0 Flash's native multimodal capabilities.

## Implementation Status & Notes

### Completed Integration (September 2024)

#### Backend Services ✅
- **Edge Function**: `supabase/functions/analyze-and-iterate-ad/index.ts` - Fully deployed
- **AI Integration**: OpenRouter + Gemini 2.0 Flash + Claude Sonnet 4 (dual-model approach)
- **Prompt System**: Full `iteration_bot_prompt_real.md` embedded in `prompt-builder.ts`
- **Social Asset Ingestion**: APIFY Facebook Ads Library scraper integration complete
- **Credit System**: Integrated with existing APSICS credit system
- **Database**: `ad_iteration_runs` table with RLS policies

#### Frontend Implementation ✅
- **Main Interface**: `/app/ai-ad-iteration-tool/client-page.tsx` - Live and functional
- **File Upload**: Drag-and-drop with preview for images/videos (10MB/50MB limits)
- **URL Input**: Facebook Ad Library URL validation and processing
- **Format Selection**: Single-select radio button interface (same/video/static/carousel)
- **Results Display**: Comprehensive iteration output with export options
- **Error Handling**: User-friendly error messages and validation

#### Key Technical Decisions Made
1. **Dual-Model Approach**: Gemini 2.0 Flash for main analysis + Claude Sonnet 4 for copy chiefing
2. **APIFY Integration**: `apify~facebook-ads-scraper` actor for reliable Meta asset extraction
3. **Single Selection UI**: Users can only select one iteration package per submission
4. **Embedded Prompts**: Prompts embedded directly in code vs. external files for deployment reliability
5. **Platform Support**: Facebook and Instagram ads only (TikTok/YouTube coming soon)

#### Current Workflow (Working)
1. **Asset Input**: Upload file OR paste Facebook Ad Library URL
2. **Validation**: File size/format check OR URL domain validation
3. **Processing**:
   - Files: Direct upload to Supabase storage → signed URL
   - URLs: APIFY extraction → Supabase storage → signed URL
4. **AI Analysis**: Gemini 2.0 Flash processes asset + comprehensive prompt, Claude Sonnet 4 for copy chiefing
5. **Results**: Single iteration package based on user selection
6. **Export**: Copy to clipboard, download markdown/JSON, email delivery

#### Performance Metrics (Live)
- **Processing Time**: ~30-45 seconds end-to-end
- **APIFY Success Rate**: >95% for valid Facebook Ad Library URLs
- **Cost per Analysis**: ~$0.08 with dual-model approach (Gemini + Claude)
- **User Flow**: Simplified single-selection reduces decision paralysis

#### Known Limitations & Future Enhancements
- **Platform Support**: Currently Facebook/Instagram only (by design)
- **Batch Processing**: One asset at a time (intentional for v1)
- **Brand Validation**: Temporarily disabled competitor detection
- **Output Structure**: Streamlined to show only iterations (no scoring sections)

#### Deployment Configuration
```bash
# Environment Variables Set
OPENROUTER_API_KEY=configured
APIFY_TOKEN=configured_in_supabase_dashboard
AD_ITERATION_ASSET_BUCKET=ai-ad-iteration-assets

# Deployed Functions
supabase functions deploy analyze-and-iterate-ad

# Database Migration
20250923184500_create_ad_iteration_runs.sql - Applied
```

#### Integration Points Working
- ✅ Credit system deduction (1 credit per analysis)
- ✅ User authentication and session management
- ✅ File upload to Supabase storage
- ✅ APIFY social asset ingestion
- ✅ Email delivery system integration
- ✅ Export functionality (markdown, JSON, clipboard)

This implementation successfully delivers the MVP with all core functionality operational and ready for user testing and iteration based on real usage patterns.

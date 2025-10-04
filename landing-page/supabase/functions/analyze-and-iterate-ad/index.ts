import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { buildIterationPrompt, type OutputFormat, type BaseAdReference } from "./prompt-builder.ts";
import { ingestSocialAsset, isSocialIngestionError } from "./social-download.ts";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "*";
  const requestedHeaders = req.headers.get("access-control-request-headers") ?? "";
  const defaultHeaders = ["authorization", "x-client-info", "apikey", "content-type", "x-anonymous-key", "baggage"];
  const headerSet = new Set<string>();

  for (const header of defaultHeaders) {
    headerSet.add(header.toLowerCase());
  }

  if (requestedHeaders) {
    for (const header of requestedHeaders.split(",")) {
      const trimmed = header.trim();
      if (trimmed) {
        headerSet.add(trimmed.toLowerCase());
      }
    }
  }

  const allowHeaders = Array.from(headerSet).join(", ");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": allowHeaders,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin, Access-Control-Request-Headers",
  };

  if (origin !== "*") {
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

// Environment variables will be checked inside the serve function to ensure CORS headers are returned

const ALLOWED_OUTPUT_FORMATS: OutputFormat[] = ["same", "video", "static", "carousel"];
const ALLOWED_PLATFORMS = new Set(["facebook", "instagram", "tiktok", "youtube", "linkedin"]);
const ALLOWED_GOALS = new Set(["performance", "engagement", "conversion", "awareness", "retention"]);
const SOCIAL_DOMAINS = ["facebook.com", "instagram.com", "tiktok.com", "youtube.com"];
const ASSET_BUCKET = Deno.env.get("AD_ITERATION_ASSET_BUCKET") ?? "ai-ad-iteration-assets";
// Embedded copy chief prompt (no external file needed)
const COPY_CHIEF_PROMPT = `Copy Chiefing.
You are a veteran copychief who has to look at these new headlines and hooks you've been provided.
Your main job is to tweak them to make sure they're as potent as possible in driving conversions.
These are the key things you have to look out for:
Is the copy relevant to the target audience?
Is there a clear target audience/avatar/persona being targeted?
Is the copy clear and not confusing?
Is the copy NATIVE to the platform?
Does the copy sound like something a real person would have said?
Does the copy match the concept?
Is there a good promise to the copy?
Does the audience instantly know what's in it for me?
If there's a hook written is there curiosity driven into it?
Are some of the hook/headlines clearly benefit lead?
Never fabricate research, data, or claims—if the provided context is insufficient, ask for the missing information or return an explicit error instead of guessing.
Even though you're an expert copy chief here is some more context on how to be a great one.
Remember there will be nuance to this as we still always want to make sure our copy is native to the platforms, these are just principles to GUIDE you rather than follow blindly:
You'll have to identify the key pain points that the prospect has and benefits that they most want to experience by solving their problem. In order to do this, you need to clarify or extract the single most important problem experienced by the prospect as well as the one promise that the sales copy makes to that prospect which is most compelling to them. The single most important promise / outcome needs to be weaved throughout the letter (lead, background story, mechanism, product reveal and close). We need to hit it over and over. That's what the people want to hear. So give it to them. And make it as visceral, dimensional and emotional as possible.
In general, two important points:
There is always ONE core promise. We'll give that to you in the brief. Make sure to hit that over and over. You can throw in secondary benefits as well, but we need to hit that ONE core promise repeatedly.
We need to use the most powerful language possible when describing pain points / benefits. In certain sections, we want to reach directly to the heart of the emotion behind that desire as well.
Here are some principles to make this happen.
First, use POWERFUL language. For example… "I'd find myself waking up every night at 3.45am feeling like a cannon had just shot off… My heart would be pounding in my chest like a jackhammer. Anxious thoughts would flood my brain. And I'd just feel this dread as I stared up at the ceiling… … KNOWING that I wasn't going to go back to sleep."
Use MORE specific examples of pains / benefits versus generic descriptions of things. For example, instead of saying… "Transforming me from a woman who was HORRIFIED by her disappearing hair…" You can say.. "Transforming me from a woman who used to spend hours everyday combing and styling her hair to cover up her visible scalp…"
Or instead of… "At first, he noticed a decrease in his energy levels and his muscle strength. Then his libido took a hit, and he began experiencing weak erections." You can say… "At first, he noticed a decrease in his energy levels and his muscle strength. Then his libido took a hit, so he started having to make excuses to his wife after date night."
See how in each of these examples we use more specific, concrete and situational examples like "making excuses to his wife after date night" vs. "experiencing weak erections…" And "HORRIFIED by disappearing hair" to "used to spend hours everyday combing and styling her hair to cover up her visible scalp…"
Next, you want to include specific pain and benefit points that involve "social situations." In other words, how the pain is affecting the way they're perceived by others or how specific benefits can transform their status and perception of others. For example, in a dental offer you might say… "People at work keep saying I must have gotten veneers or that I have fake teeth. Even my dentist who I haven't visited in YEARS couldn't believe how white my teeth had become." See, how this paints a picture of how others perceive them?
Next, it's really powerful to prepare pain and benefit points in "triplets" or groups of three. This allows you to build momentum and rhythm in your language, since people typically like things in groups of three. While at the same time you get an opportunity to hit a wider segment of the market. For example, in a promotion telling people about a new way to make money, you could say something like… "So while others are kicking back… Enjoying the coveted 4-hour workweek while they sip Mai Thais on a beach in Cabo… Or catch a weekday baseball game with their kids… Or relax pool-side in the backyard of their brand new home…"
See, how this paints three distinct pictures that appeal to a wider segment of the market? The first talks about travel… While the second talks about time with the family… While the third talks about a material purchase like a home.
Finally, sometimes you want to present a sequence of pains and benefits in a single structure that's called a "block." In general, when you're introducing a BIG sequence of pains or benefits like this, you want to follow this structure. We go from Overarching Statement (in red). To specific, vivid descriptions of pain / benefit (in yellow). To concrete, dimensional and "lived in experience" that creates a mind movie of what will happen (in green). To a deep, emotional recap of how that will make them feel (in blue).
You don't need ALL elements whenever you bring up pain / benefit... but whenever you're doing a big block, you should try to incorporate all of them. In general, most people just do Red / Yellow. But Green / Blue is where the magic is at. So try to incorporate it as much as possible (without being heavy handed).
Here are some examples of what good sales copy would look like in this regard:
General Benefit You'll lose 48lbs effortlessly. [Overarching Benefit]
Strong Descriptions The fat will melt from your love handles, thighs, arms and more. [Strong, vivid descriptions of different aspects] You'll feel flooded with energy. And love the way you look.
Concrete "Dimensional" Language When you look at yourself in the mirror, you'll crack a little smile and think to yourself, "I've never looked this good before." [actual events that will occur] Or you'll see your husband watch you as you walk to the bathroom in your tight black dress.
Emotional Appeal You'll feel fully in love with yourself… who you are… knowing that you're everything you were always meant to be.
You do NOT need to follow this structure every time you introduce a pain or benefit block. But for your big sections, you should.
And here's another example: "You'll walk down the stairs to your kitchen with ease. And as you sip your morning coffee and plan your day, suddenly every possibility is opened back up to you. Maybe you get back to digging around in your backyard garden… Or spending the day playing with your grandkids at the park… Or cooking a large meal for family and friends… Or finally planning that vacation with your spouse because you know that this time you'll actually be able to ENJOY it. Think about how good it would feel to be independent… self-sufficient… and FREE to move in your own body again."
Remember these are guidelines and formulas to follow, don't just make a headline more direct response just for the hell of it. It has to be intentional, remember these are guidelines not hard and fast rules.
🎭 BRAND VOICE ADAPTATION FRAMEWORK
Align all creative with the brand's established voice while maintaining conversion effectiveness:
VOICE SPECTRUM POSITIONING
Authoritative ←→ Friendly
Technical ←→ Simple
Formal ←→ Casual
Serious ←→ Humorous
Direct ←→ Storytelling
Place the brand on this spectrum for each dimension, then ensure all creative aligns.
VOCABULARY GUIDELINES
Power Words: List 5-10 high-impact words aligned with brand
Forbidden Words: List words/phrases to avoid
Sentence Structure: Short and direct vs. flowing and descriptive
Industry Terminology: Technical accuracy vs. simplified explanations
TONE MODULATION BY FUNNEL STAGE
Top-of-Funnel: More emotional, lifestyle-focused, problem-centric
Mid-Funnel: More educational, solution-focused, benefit-driven
Bottom-Funnel: More urgent, offer-focused, objection-addressing
APPLICATION METHODOLOGY:
Identify core brand voice attributes from existing materials
Apply voice consistency while maintaining conversion principles
Test voice variations to find optimal performance balance
Now you have done this tweak and rewrite the headlines as needed and explain why you have rewritten them the way you have.
🧪 A/B TESTING FRAMEWORK
For each concept, develop strategic variations to test performance drivers:
PRIMARY TEST ELEMENTS
Hook Variations: Test 2-3 different emotional angles or promises
Visual Approach: Test different visual styles (lifestyle vs. product-focused)
Benefit Emphasis: Test prioritizing different benefits
CTA Approach: Test different call-to-action frameworks
TEST DESIGN MATRIX
CONTROL VS. CHALLENGER


Control: Current best-performing approach
Challenger: New concept with ONE major variable changed
ISOLATION VARIABLES


Only change ONE element per test
Document specific change being tested
Establish clear success metrics before launching
AUDIENCE SEGMENTATION


Test same creative across different audience segments
Identify which concepts resonate with specific demographics
Create audience-concept matching matrix
PERFORMANCE TRACKING


Primary Metric: CPM, CTR, CPC, ROAS (select ONE)
Secondary Metrics: Engagement rate, watch time, conversion
Success Threshold: Define minimum improvement required
IMPLEMENTATION GUIDE:
Create test variants using this framework
Run tests with sufficient budget for statistical significance
Document findings to inform future creative development
Apply winning elements to next iteration of concepts
Format Your Output Like This: For each concept, structure the output precisely like this:
CopyEdit CONCEPT NAME: "Title of the Concept" Target Persona: [Short description of demo + psychographics] Core Emotion: [Primary emotional driver] Life Force 8: #[number(s)] ([LFE description(s)]) Awareness Level: [e.g. Problem-Aware, Solution-Aware, Unaware] Trigger Moment: [Specific life event or situation] Formats: [List ad types that fit this concept: UGC, Meme, Before & After, etc.]
Step 3: Headline + Hook Ideation
 [Repeat each format below with 3–4 headlines/hooks per format]
[Ad Format Name (e.g. UGC Fit Try-On)]:
Hook 1
Hook 2
Hook 3
[Next Format... etc.]
✅ Final Output Requirements:
Clearly cite which Golden Pain + Dream Outcome each asset resolves
Reference format-matched creative examples with links, screenshots, and annotations (if available)
Each concept must pass the Punch Test + Cultural Tension Test + Scroll Test
Every script, hook, overlay or caption must tie back to the Insight Index and Comment Heatmap
Make sure all copy is copychiefed — emotionally powerful, conversion-driven, native to platform, and directly tied to the emotional/core benefit of the concept. Each hook should feel real and usable right now in FB/IG/TT ads.
🎇 Memorability Layer: Make It Stick Ads must not only capture attention — they must be memorable. This means including:
A moment of surprise, contrast, or delight
A line, image, or twist that stands out from the sea of sameness
A format or edit pattern that breaks the mold
Ask:
Would someone remember this ad 10 minutes later?
What moment or phrase is sticky?
Would a viewer retell it to a friend?
Memorability = performance longevity.
Output: A document with finished headlines and hooks.

✅ Final Output Requirements:
Clearly cite which Golden Pain + Dream Outcome each asset resolves
Reference format-matched creative examples with links, screenshots, and annotations (if available)
Each concept must pass the Punch Test + Cultural Tension Test + Scroll Test
Every script, hook, overlay or caption must tie back to the Insight Index and Comment Heatmap
Make sure all copy is copychiefed — emotionally powerful, conversion-driven, native to platform, and directly tied to the emotional/core benefit of the concept. Each hook should feel real and usable right now in FB/IG/TT ads.
🎇 Memorability Layer: Make It Stick Ads must not only capture attention — they must be memorable. This means including:
A moment of surprise, contrast, or delight
A line, image, or twist that stands out from the sea of sameness
A format or edit pattern that breaks the mold
Ask:
Would someone remember this ad 10 minutes later?
What moment or phrase is sticky?
Would a viewer retell it to a friend?
Memorability = performance longevity.
Output: A document with finished headlines and hooks.
Step 5: Secondary Copywriting
Now that you have the primary hooks and headlines finalized, it's time to develop the supporting copy. This varies based on format:
For Video Formats:
You need to write a complete script that builds on the hook. Choose the most appropriate script framework from the options below based on your product type, audience awareness level, and marketing objective.
SCRIPT FRAMEWORKS
Script Framework #1: Quick Product Highlight Building Blocks:
Hook - Curiosity based hook ex: "How many should I take?" // "What does the science say about X?"
Product Intro - Introduce the product immediately (not problem-solution)
Dimensionalized Benefit Stack - 3 benefits tied to tangible outcomes related to core consumer desire
Feature Stack - List value-adding features (portable, lightweight, gluten-free, etc.)
CTA - Quick and simple call to action
Script Framework #2: Problem-Solution with Authority Building Blocks:
Hook - Visual + text hook (writing words on objects/body parts + comment reply overlay)
Problem - Simple explanation of the mechanism behind the problem
Social Proof/Authority Building - Official bodies or studies that recognize your product
3 Failed Solutions - Dismiss alternatives (convenience, short vs. long term, cost)
Demo - Show product in use, highlighting simplicity
Desired Outcome - Clear transformation demonstration
Social Proof - Reviews, number of happy customers
Risk Reversal - De-risk the purchase
CTA - Clear call to action
Script Framework #3: Ingredient-Focused Building Blocks:
Hook - Curiosity driven hook about formulation
Ingredient Benefit 1 - Focus on specific ingredient with tangible outcome
Ingredient Benefit 2 - Second ingredient with tangible outcome
Ingredient Benefit 3 - Third ingredient with tangible outcome
Product Intro - Combine all ingredients in one solution
CTA - Risk-free trial offer
Script Framework #4: Concise Conversion Building Blocks:
Hook
Benefit Stack
Unique Mechanism
Demo
Social Proof
Logo Screen / CTA
Script Framework #5: Native Trend Leverager Building Blocks:
Trending Native Hook
Product Intro
UMS (Unique Mechanism of Solution)
Dimensionalized Benefits
CTA
Script Framework #6: Expert Authority Building Blocks:
Hook
Agitate problem
Emotional daggers
Introduce expert
Tease root cause
Tease simple 10-second hack
Social proof
Expert's nightmare story
UMP (unique mechanism of the problem)
UMS (unique mechanism of the solution)
Emotional benefits
Risk-free
Scarcity/FOMO
Close
Script Framework #7: Comprehensive Benefits Building Blocks:
Hook
3 Pain Points
Product Intro
USP
3 Benefits
Additional Benefit
Testimonial
Another Benefit/Objection Handler
Risk Reversal
CTA
Script Framework #8: Strong Offer Building Blocks:
Hook
Strong Offer Intro
Problem Intro
Failed Solutions
Transformation (Before/After)
Demo
CTA
Script Framework #9: Soft Sell Building Blocks:
Hook
Product Intro/Lead
UMS
Problem Intro
Dimensionalized Benefits
Desired Outcome x2
Open ended CTA ("I can't recommend this enough!")
Script Framework #10: Claim-Based Building Blocks:
Hook (Claim)
Failed Solutions ("It's not xx or xx")
Product intro
Pain Points
Desired Outcome
UMS
Benefits
Demo
CTA
### Script Framework Selection Guide When choosing which script framework to use, follow this decision tree: **Start with audience awareness level:** **If UNAWARE:** - For complex products → Use Framework #6 (Expert Authority) - For simple products → Use Framework #2 (Problem-Solution with Authority) **If PROBLEM-AWARE:** - For products with unique ingredients/formulation → Use Framework #3 (Ingredient-Focused) - For products without unique formulation: - If there's a trending angle → Use Framework #5 (Native Trend Leverager) - If not → Use Framework #7 (Comprehensive Benefits) **If SOLUTION-AWARE:** - If there's a clear transformation → Use Framework #8 (Strong Offer) - If not → Use Framework #4 (Concise Conversion) **If PRODUCT-AWARE:** - If building trust is primary objective → Use Framework #9 (Soft Sell) - If quick sale is primary objective → Use Framework #1 (Quick Product Highlight) **If MOST-AWARE:** - Use Framework #10 (Claim-Based) **Secondary factors to consider:** - Product type and complexity - Platform constraints - Competitive landscape - Brand voice requirements Select the most appropriate script framework based on: - Product type and complexity - Audience awareness level - Platform constraints - Marketing objective - Competition in the space
Select the most appropriate script framework based on:
Product type and complexity
Audience awareness level
Platform constraints
Marketing objective
Competition in the space
After selecting a framework, write a complete script following the structure while incorporating the hook from Step 3.
For Static/Image Formats:
You need to create:
Primary headline (already created in Step 3)
Supporting subheadline that elaborates on the promise
Bullet-point benefits (3-5 maximum)
CTA line
Any necessary disclaimers or urgency creators (optional)
Static Structure:
HEADLINE: [Primary headline from Step 3]

SUBHEADLINE: [1 sentence that expands the promise]

BENEFITS:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

CTA: [Clear action statement]

URGENCY: [Optional time/quantity limitation]

For Carousel Formats:
Create copy for each slide (typically 3-10 slides):
Slide 1: Hook + Problem
Slide 2-4: Solution elements/benefits (one key point per slide)
Slide 5: Proof/testimonial
Final Slide: Offer + CTA
Ensure each slide can stand alone while contributing to the overall narrative.
Voice Guidelines:
Maintain consistent voice across all copy elements
Keep secondary copy in the same tone as the headline/hook
Use the customer's language from your research
Be conversational and direct
Focus on benefits, not features
Remember to adapt the intensity of conversion elements based on funnel stage. Top-of-funnel content should be lighter on direct selling, while bottom-funnel can be more direct with offers and CTAs.
Output: Complete scripts/copy for each concept and format.`;

interface BaseAdSubmission {
  id: string;
  ad_url: string;
  platform: string;
  company_name?: string | null;
}

interface IterationRequestPayload {
  companyName?: string;
  primaryPlatform?: string;
  iterationGoal?: string;
  referenceUrl?: string | null;
  additionalContext?: string | null;
  inputMethod?: "upload" | "url";
  assetUrl?: string;
  assetType?: "image" | "video" | "url";
  uploadedPath?: string | null;
  outputFormats?: OutputFormat[];
  baseAds?: BaseAdSubmission[]; // NEW: Saved competitor ads for custom iteration
}

interface IterationAnalysis {
  performanceScore?: number;
  summary?: string;
  topWins?: string[];
  topRisks?: string[];
  assetVerification?: string[];
  scenes?: Array<{
    timecode: string;
    observation: string;
    recommendation: string;
    impact: "high" | "medium" | "low";
  }>;
  iterations: Array<{
    id: OutputFormat;
    headline: string;
    angleSummary: string;
    script?: Array<{
      scene: string;
      description: string;
      voiceover?: string;
      overlay?: string;
      cta?: string;
    }>;
    staticCopy?: {
      headline?: string;
      body?: string;
      cta?: string;
      designNotes?: string[];
    };
    testingNotes?: string[];
  }>;
  exportArtifacts?: {
    markdown?: string;
    json?: Record<string, unknown>;
  };
  copyChiefRecommendations?: CopyChiefRecommendation[];
  error?: string;
  message?: string;
}

interface CopyChiefRecommendation {
  referenceIterationId: OutputFormat;
  improvedHeadline: string;
  supportingCopy?: string;
  cta?: string;
  rationale: string;
  testNote: string;
}

// Usage tracking utilities
async function trackToolUsage(
  supabase: any,
  data: {
    toolType: 'script-generator' | 'brief-generator' | 'iteration-tool';
    inputPayload: Record<string, any>;
    outputPayload?: Record<string, any>;
    processingMs?: number;
    creditsSpent?: number;
    status?: 'processing' | 'completed' | 'failed' | 'timeout';
    errorMessage?: string;
    source?: 'web' | 'api' | 'mobile';
  },
  userId?: string | null
): Promise<{ usageId: string | null; error: string | null }> {
  try {
    const { data: result, error } = await supabase.rpc('log_ai_tool_usage', {
      p_user_id: userId || null,
      p_tool_type: data.toolType,
      p_input_payload: data.inputPayload,
      p_output_payload: data.outputPayload || null,
      p_processing_ms: data.processingMs || null,
      p_credits_spent: data.creditsSpent || 1,
      p_status: data.status || 'completed',
      p_error_message: data.errorMessage || null,
      p_source: data.source || 'web'
    });

    if (error) {
      console.error('Usage tracking failed:', error);
      return { usageId: null, error: error.message };
    }

    return { usageId: result, error: null };
  } catch (err) {
    console.error('Usage tracking error:', err);
    return { usageId: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req);

  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

  // Check environment variables with proper CORS headers
  const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
  const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");

  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase configuration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!openRouterApiKey) {
    return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY environment variable is required" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }


  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  const supabaseClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let user = null;
  const startTime = Date.now();

  try {
    const authResult = await supabaseClient.auth.getUser();
    user = authResult.data.user ?? null;
  } catch (authError) {
    console.error("Failed to read auth context", authError);
    return new Response(JSON.stringify({ error: "Unable to verify session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!user) {
    return new Response(JSON.stringify({ error: "Sign in to analyze and iterate your ads." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: IterationRequestPayload;
  try {
    payload = await req.json();
  } catch (parseError) {
    console.error("Failed to parse JSON payload", parseError);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const validation = validatePayload(payload);
  if (validation.error) {
    console.error("Validation failed:", validation.error);
    console.error("Payload received:", JSON.stringify(payload, null, 2));
    return new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const {
    companyName,
    primaryPlatform,
    iterationGoal,
    referenceUrl,
    additionalContext,
    inputMethod,
    outputFormats,
  } = validation.sanitized;

  let assetUrl = validation.sanitized.assetUrl;
  let assetType = validation.sanitized.assetType;
  let uploadedPath = validation.sanitized.uploadedPath;
  const originalSocialUrl = inputMethod === "url" ? assetUrl.toString() : null;
  let assetContentType: string | null = null;
  let upstreamDownloadUrl: string | null = null;

  if (inputMethod === "url") {
    const domainValid = SOCIAL_DOMAINS.some((domain) => assetUrl.hostname.toLowerCase().includes(domain));
    if (!domainValid) {
      return new Response(JSON.stringify({ error: "Only Facebook, Instagram, TikTok, or YouTube URLs are supported." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  if (inputMethod === "url") {
    try {
      const ingestion = await ingestSocialAsset({
        supabaseAdmin: adminClient,
        socialUrl: assetUrl,
        requestedAssetType: assetType,
        bucket: ASSET_BUCKET,
      });

      assetUrl = new URL(ingestion.signedUrl);
      assetType = ingestion.assetType;
      uploadedPath = ingestion.storagePath;
      assetContentType = ingestion.contentType;
      upstreamDownloadUrl = ingestion.originalDownloadUrl;
    } catch (ingestionError) {
      console.error("Social asset ingestion failed", ingestionError);
      if (isSocialIngestionError(ingestionError)) {
        return new Response(JSON.stringify({ error: ingestionError.message }), {
          status: ingestionError.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Failed to ingest social media asset." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } else if (inputMethod === "upload" && uploadedPath) {
    console.log("Creating signed URL for uploaded asset:", uploadedPath);
    const signed = await adminClient.storage.from(ASSET_BUCKET).createSignedUrl(uploadedPath, 60 * 30);
    if (signed.error || !signed.data?.signedUrl) {
      console.error("Failed to refresh signed URL", signed.error, "uploadedPath:", uploadedPath);
      return new Response(JSON.stringify({
        error: "Unable to secure uploaded asset.",
        details: signed.error?.message || "No signed URL returned",
        uploadedPath: uploadedPath
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    assetUrl = new URL(signed.data.signedUrl);
    assetContentType = inferContentType(assetType);
  } else if (inputMethod === "upload") {
    return new Response(JSON.stringify({ error: "Uploaded assets must include a storage reference." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const startedAt = Date.now();

  let creditsRemaining = 0;

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id, credits_remaining")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Failed to load profile", profileError);
    return new Response(JSON.stringify({ error: "Unable to load profile" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let effectiveProfile = profile;

  if (!effectiveProfile) {
    const { data: createdProfile, error: createError } = await adminClient
      .from("profiles")
      .insert({ id: user.id })
      .select("id, credits_remaining")
      .maybeSingle();

    if (createError && createError.code !== "23505") {
      console.error("Failed to create profile", createError);
      return new Response(JSON.stringify({ error: "Unable to initialize profile" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (createError?.code === "23505" || !createdProfile) {
      const { data: reloadedProfile, error: reloadError } = await adminClient
        .from("profiles")
        .select("id, credits_remaining")
        .eq("id", user.id)
        .maybeSingle();

      if (reloadError) {
        console.error("Failed to reload profile after initialization", reloadError);
        return new Response(JSON.stringify({ error: "Unable to load profile" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      effectiveProfile = reloadedProfile ?? null;
    } else {
      effectiveProfile = createdProfile;
    }
  }

  creditsRemaining = effectiveProfile?.credits_remaining ?? 0;

  if (creditsRemaining <= 0) {
    return new Response(
      JSON.stringify({ error: "You are out of credits. Upgrade your plan to keep iterating your ads." }),
      {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  let referenceUrlString: string | null = null;
  if (referenceUrl) {
    referenceUrlString = referenceUrl.toString();
  }

  // NEW: Process base ads if provided (custom iteration mode)
  let processedBaseAds: BaseAdReference[] | undefined;
  if (payload.baseAds && payload.baseAds.length > 0) {
    console.log(`Processing ${payload.baseAds.length} base ad(s) for custom iteration`);
    processedBaseAds = [];

    for (const baseAd of payload.baseAds) {
      try {
        // Attempt to fetch and analyze the base ad URL
        const baseAdUrl = new URL(baseAd.ad_url);

        // Try to ingest the social asset to get detailed analysis
        let analysisData: string | undefined;
        try {
          const ingestion = await ingestSocialAsset({
            supabaseAdmin: adminClient,
            socialUrl: baseAdUrl,
            requestedAssetType: "image", // Default to image, will auto-detect
            bucket: ASSET_BUCKET,
          });

          // Format the ingestion data as analysis context
          analysisData = `Asset Type: ${ingestion.assetType}
Content Type: ${ingestion.contentType}
Download URL: ${ingestion.originalDownloadUrl || 'Not available'}
Storage Path: ${ingestion.storagePath}

This ad has been successfully ingested and can be referenced for creative patterns.`;

        } catch (ingestionError) {
          console.warn(`Could not ingest base ad ${baseAd.ad_url}:`, ingestionError);
          analysisData = 'Unable to fetch detailed asset analysis. Use URL and platform context as reference.';
        }

        processedBaseAds.push({
          url: baseAd.ad_url,
          platform: baseAd.platform,
          companyName: baseAd.company_name || undefined,
          analysisData,
        });

      } catch (urlError) {
        console.error(`Invalid base ad URL ${baseAd.ad_url}:`, urlError);
        // Still include it with minimal data
        processedBaseAds.push({
          url: baseAd.ad_url,
          platform: baseAd.platform,
          companyName: baseAd.company_name || undefined,
          analysisData: 'Invalid URL format - use as conceptual reference only.',
        });
      }
    }

    console.log(`Successfully processed ${processedBaseAds.length} base ad(s)`);
  }

  const prompt = buildIterationPrompt({
    companyName,
    primaryPlatform,
    iterationGoal,
    referenceUrl: referenceUrlString,
    additionalContext,
    inputMethod,
    assetUrl: assetUrl.toString(),
    assetType,
    outputFormats,
    assetContentType,
    socialSourceUrl: originalSocialUrl,
    upstreamDownloadUrl,
    baseAds: processedBaseAds, // Pass processed base ads to prompt builder
  });

  let completion: Response;

  try {
    console.log("Submitting iteration request", {
      assetType,
      assetHost: assetUrl.host,
      assetPath: assetUrl.pathname,
      outputFormats,
      inputMethod,
    });

    // Log the complete prompt being sent to OpenRouter for main analysis
    console.log("=== MAIN ITERATION PROMPT SENT TO OPENROUTER (GEMINI) ===");
    console.log("System Prompt:", prompt.systemPrompt);
    console.log("User Prompt:", prompt.userPrompt);
    console.log("=== END MAIN ITERATION PROMPT ===");

    const userContent: Array<Record<string, unknown>> = [{ type: "text", text: prompt.userPrompt }];

    if (assetType === "image") {
      userContent.push({
        type: "image_url",
        image_url: { url: assetUrl.toString() },
      });
    } else if (assetType === "video") {
      userContent.push({
        type: "video_url",
        video_url: { url: assetUrl.toString() },
      });
    } else {
      userContent.push({ type: "input_text", text: `asset_url=${assetUrl.toString()}` });
    }

    completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://openrouter.ai",
        "X-Title": "AI Ad Iteration Tool",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        response_format: {
          type: "json_object",
        },
        temperature: 0.4,
        max_tokens: 3000,
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: prompt.systemPrompt }],
          },
          {
            role: "user",
            content: userContent,
          },
        ],
      }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter", networkError);
    captureEdgeFunctionError(networkError, {
      functionName: 'analyze-and-iterate-ad',
      additionalTags: {
        error_type: 'openrouter_network_error',
        user_id: user?.id || 'anonymous',
        ad_url: adUrl
      }
    });
    return new Response(JSON.stringify({ error: "OpenRouter request failed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
    console.error("OpenRouter returned non-200", completion.status, errorBody);

    const openRouterError = new Error(`OpenRouter returned ${completion.status}: ${JSON.stringify(errorBody)}`);
    captureEdgeFunctionError(openRouterError, {
      functionName: 'analyze-and-iterate-ad',
      additionalTags: {
        error_type: 'openrouter_api_error',
        status_code: completion.status.toString(),
        user_id: user?.id || 'anonymous',
        ad_url: adUrl,
        error_message: errorBody?.error?.message || 'unknown'
      }
    });

    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: errorBody }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const completionData = await completion.json();
  const messageContent = completionData?.choices?.[0]?.message?.content ?? null;
  const parsedAnalysis = parseAnalysis(messageContent);

  if (!parsedAnalysis.success) {
    console.error("Failed to parse analysis JSON", parsedAnalysis.error, messageContent);
    return new Response(JSON.stringify({ error: "Model response could not be parsed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const analysis = parsedAnalysis.analysis;

  try {
    const copyChiefRecommendations = await runCopyChiefReview({
      analysis,
      companyName,
      primaryPlatform,
      iterationGoal,
      openRouterApiKey,
    });

    if (copyChiefRecommendations && copyChiefRecommendations.length) {
      analysis.copyChiefRecommendations = copyChiefRecommendations;

      const markdownBlock = buildCopyChiefMarkdown(copyChiefRecommendations);
      if (markdownBlock) {
        if (!analysis.exportArtifacts) {
          analysis.exportArtifacts = {};
        }
        if (analysis.exportArtifacts.markdown) {
          analysis.exportArtifacts.markdown = `${analysis.exportArtifacts.markdown.trim()}\n\n${markdownBlock}`;
        } else {
          analysis.exportArtifacts.markdown = markdownBlock;
        }

        if (analysis.exportArtifacts.json && typeof analysis.exportArtifacts.json === "object") {
          (analysis.exportArtifacts.json as Record<string, unknown>)["copyChiefRecommendations"] = copyChiefRecommendations;
        }
      }
    }
  } catch (copyChiefError) {
    console.error("Copy chief review failed", copyChiefError);
  }

  // Temporarily disabled brand validation for testing
  // if (analysis.error === "competitor_detected") {
  //   return new Response(
  //     JSON.stringify({ error: "Competitor content detected", message: analysis.message ?? "The asset appears to belong to a different brand." }),
  //     {
  //       status: 403,
  //       headers: { ...corsHeaders, "Content-Type": "application/json" },
  //     },
  //   );
  // }

  const iterationsValid = Array.isArray(analysis.iterations) && analysis.iterations.length > 0;
  if (!iterationsValid) {
    console.error("Analysis missing iterations", analysis);
    return new Response(JSON.stringify({ error: "Model response missing iterations" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let updatedCredits = creditsRemaining;

  const { data: updatedProfile, error: creditError } = await adminClient
    .from("profiles")
    .update({ credits_remaining: creditsRemaining - 1 })
    .eq("id", user.id)
    .eq("credits_remaining", creditsRemaining)
    .select("credits_remaining")
    .maybeSingle();

  if (creditError || !updatedProfile) {
    console.error("Failed to decrement credits", creditError);
    return new Response(JSON.stringify({ error: "Failed to decrement credits" }), {
      status: 409,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  updatedCredits = updatedProfile.credits_remaining ?? 0;

  const processingMs = Date.now() - startTime;

  // Track comprehensive usage analytics
  const inputPayload = {
    companyName,
    primaryPlatform,
    iterationGoal,
    referenceUrl: referenceUrlString,
    additionalContext,
    inputMethod,
    assetUrl: assetUrl.toString(),
    assetType,
    uploadedPath,
    outputFormats,
    assetContentType,
    socialSourceUrl: originalSocialUrl,
    upstreamDownloadUrl,
    fullPrompt: prompt  // Add the actual prompt sent to OpenRouter
  };

  const outputPayload = {
    iterationsCount: analysis.iterations?.length || 0,
    performanceScore: analysis.performanceScore,
    hasScenes: analysis.scenes?.length || 0,
    topWinsCount: analysis.topWins?.length || 0,
    topRisksCount: analysis.topRisks?.length || 0,
    copyChiefRecommendationsCount: analysis.copyChiefRecommendations?.length || 0,
    outputFormats,
    hasExportArtifacts: !!analysis.exportArtifacts
  };

  // Track tool usage
  await trackToolUsage(
    adminClient,
    {
      toolType: 'iteration-tool',
      inputPayload,
      outputPayload,
      processingMs,
      creditsSpent: 1,
      status: 'completed',
      source: 'web'
    },
    user.id
  );

  const runRecord = {
    user_id: user.id,
    request: {
      companyName,
      primaryPlatform,
      iterationGoal,
      referenceUrl: referenceUrlString,
      additionalContext,
      inputMethod,
      assetUrl: assetUrl.toString(),
      assetType,
      uploadedPath,
      outputFormats,
      assetContentType,
      socialSourceUrl: originalSocialUrl,
      upstreamDownloadUrl,
    },
    result: analysis,
    credits_spent: 1,
    processing_ms: processingMs,
    source: "web",
  };

  console.log("=== ATTEMPTING TO INSERT RUN RECORD ===");
  console.log("User ID:", user.id);
  console.log("Run record keys:", Object.keys(runRecord));
  console.log("Admin client configured:", !!adminClient);

  const { error: logError, data: insertedData } = await adminClient.from("ad_iteration_runs").insert(runRecord).select();

  if (logError) {
    console.error("Failed to log iteration run", logError);
    console.error("Error details:", {
      code: logError.code,
      message: logError.message,
      details: logError.details,
      hint: logError.hint
    });
  } else {
    console.log("Successfully inserted run record:", insertedData);
  }

  return new Response(
    JSON.stringify({
      analysis,
      creditsRemaining: updatedCredits,
      exportArtifacts: analysis.exportArtifacts ?? null,
      rawOutput: completionData,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
  } catch (error) {
    console.error("Uncaught error in analyze-and-iterate-ad function:", error);

    // Capture error in Sentry
    captureEdgeFunctionError(error, {
      functionName: 'analyze-and-iterate-ad',
      additionalTags: {
        error_type: 'ad_iteration_failed',
        company_name: payload?.companyName || 'unknown',
        platform: payload?.primaryPlatform || 'unknown',
        input_method: payload?.inputMethod || 'unknown'
      }
    });

    const processingMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    // Track failed usage
    await trackToolUsage(
      adminClient,
      {
        toolType: 'iteration-tool',
        inputPayload: {
          companyName: payload?.companyName,
          primaryPlatform: payload?.primaryPlatform,
          iterationGoal: payload?.iterationGoal,
          inputMethod: payload?.inputMethod,
          assetType: payload?.assetType
        },
        processingMs,
        creditsSpent: 0, // Don't charge for failed generations
        status: 'failed',
        errorMessage,
        source: 'web'
      },
      user.id
    );

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

type SanitizedPayload = {
  companyName: string;
  primaryPlatform: string;
  iterationGoal: string;
  referenceUrl: URL | null;
  additionalContext: string | null;
  inputMethod: "upload" | "url";
  assetUrl: URL;
  assetType: "image" | "video" | "url";
  uploadedPath: string | null;
  outputFormats: OutputFormat[];
};

type ValidationResult =
  | { error: string; sanitized?: undefined }
  | { error?: undefined; sanitized: SanitizedPayload };

function validatePayload(payload: IterationRequestPayload): ValidationResult {
  const companyName = sanitizeInline(payload.companyName);
  if (!companyName) {
    return { error: "Company name is required." };
  }

  const primaryPlatform = sanitizeKey(payload.primaryPlatform);
  if (!primaryPlatform || !ALLOWED_PLATFORMS.has(primaryPlatform)) {
    return { error: "Primary platform is invalid." };
  }

  const iterationGoal = sanitizeKey(payload.iterationGoal);
  if (!iterationGoal || !ALLOWED_GOALS.has(iterationGoal)) {
    return { error: "Iteration goal is invalid." };
  }

  const inputMethod = payload.inputMethod === "upload" || payload.inputMethod === "url" ? payload.inputMethod : null;
  if (!inputMethod) {
    return { error: "Input method must be 'upload' or 'url'." };
  }

  const assetType = payload.assetType === "image" || payload.assetType === "video" || payload.assetType === "url" ? payload.assetType : null;
  if (!assetType) {
    return { error: "Asset type must be 'image', 'video', or 'url'." };
  }

  const assetUrlString = typeof payload.assetUrl === "string" ? payload.assetUrl.trim() : "";
  if (!assetUrlString) {
    return { error: "Asset URL is required." };
  }

  let assetUrl: URL;
  try {
    assetUrl = new URL(assetUrlString);
  } catch (_error) {
    return { error: "Asset URL is invalid." };
  }

  if (inputMethod === "upload" && assetType === "url") {
    return { error: "Uploaded assets must include image or video metadata." };
  }

  let referenceUrl: URL | null = null;
  if (typeof payload.referenceUrl === "string" && payload.referenceUrl.trim().length > 0) {
    try {
      referenceUrl = new URL(payload.referenceUrl.trim());
    } catch (_error) {
      return { error: "Reference URL is invalid." };
    }
  }

  const additionalContext = sanitizeMultiline(payload.additionalContext);

  const requestedFormats = Array.isArray(payload.outputFormats) ? payload.outputFormats.filter((format): format is OutputFormat => ALLOWED_OUTPUT_FORMATS.includes(format)) : [];

  if (requestedFormats.length === 0) {
    return { error: "Select at least one output format." };
  }

  const uniqueFormats = Array.from(new Set(requestedFormats));

  return {
    sanitized: {
      companyName,
      primaryPlatform,
      iterationGoal,
      referenceUrl,
      additionalContext,
      inputMethod,
      assetUrl,
      assetType,
      uploadedPath: payload.uploadedPath ? payload.uploadedPath.trim() : null,
      outputFormats: uniqueFormats,
    },
  };
}

function sanitizeInline(value?: string | null): string {
  if (!value) {
    return "";
  }
  return value.replace(/\s+/g, " ").trim().slice(0, 200);
}

function sanitizeKey(value?: string | null): string {
  if (!value) {
    return "";
  }
  return value.toLowerCase().trim();
}

function sanitizeMultiline(value?: string | null): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.slice(0, 2000);
}

function parseAnalysis(content: unknown):
  | { success: true; analysis: IterationAnalysis }
  | { success: false; error: string } {
  if (!content) {
    return { success: false, error: "Empty content" };
  }

  let text: string;

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("\n");
  } else if (typeof content === "object" && "text" in (content as Record<string, unknown>)) {
    const maybeText = (content as { text?: unknown }).text;
    text = typeof maybeText === "string" ? maybeText : JSON.stringify(content);
  } else {
    text = JSON.stringify(content);
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return { success: false, error: "Empty string" };
  }

  const cleaned = stripJsonFence(trimmed);

  // Safety check: if the response is excessively long (>50KB), it's likely malformed
  if (cleaned.length > 50000) {
    console.error("Response too long, likely repetitive content:", cleaned.length, "characters");
    return { success: false, error: "Response too long - likely repetitive content from model" };
  }

  try {
    const parsed = JSON.parse(cleaned) as IterationAnalysis;

    // Validate and truncate if necessary
    const sanitized = sanitizeAnalysis(parsed);
    return { success: true, analysis: sanitized };
  } catch (error) {
    console.error("JSON parse failed for content:", cleaned.substring(0, 1000), "...");
    return { success: false, error: `JSON parse error: ${String(error)}` };
  }
}

function sanitizeAnalysis(analysis: IterationAnalysis): IterationAnalysis {
  return analysis;
}

async function loadCopyChiefPrompt(): Promise<string> {
  return COPY_CHIEF_PROMPT;
}

async function runCopyChiefReview(params: {
  analysis: IterationAnalysis;
  companyName: string;
  primaryPlatform: string;
  iterationGoal: string;
  openRouterApiKey: string;
}): Promise<CopyChiefRecommendation[] | null> {
  const { analysis, companyName, primaryPlatform, iterationGoal, openRouterApiKey } = params;

  if (!analysis.iterations || analysis.iterations.length === 0) {
    return null;
  }

  const prompt = await loadCopyChiefPrompt();

  const assetVerificationBlock = analysis.assetVerification?.length
    ? `Asset verification (verbatim observations):\n${analysis.assetVerification.map((item, index) => `${index + 1}. ${item}`).join("\n")}`
    : "Asset verification: Not provided";

  const iterationBlock = analysis.iterations
    .map((iteration, index) => {
      const lines = [
        `Iteration ${index + 1} – id: ${iteration.id}`,
        `Headline: ${iteration.headline}`,
        `Angle Summary: ${iteration.angleSummary}`,
      ];

      if (iteration.staticCopy) {
        const parts: string[] = [];
        if (iteration.staticCopy.headline) parts.push(`Headline: ${iteration.staticCopy.headline}`);
        if (iteration.staticCopy.body) parts.push(`Body: ${iteration.staticCopy.body}`);
        if (iteration.staticCopy.cta) parts.push(`CTA: ${iteration.staticCopy.cta}`);
        if (iteration.staticCopy.designNotes?.length) parts.push(`Design Notes: ${iteration.staticCopy.designNotes.join(" | ")}`);
        if (parts.length) {
          lines.push(`Static Copy -> ${parts.join(" | ")}`);
        }
      }

      if (iteration.script?.length) {
        const scenes = iteration.script
          .map((scene, sceneIndex) => `${sceneIndex + 1}. ${scene.scene}: ${scene.description}` + (scene.voiceover ? ` (VO: ${scene.voiceover})` : ""))
          .join("\n");
        lines.push(`Script Scenes:\n${scenes}`);
      }

      if (iteration.testingNotes?.length) {
        lines.push(`Testing Notes: ${iteration.testingNotes.join(" | ")}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");

  const userPrompt = [
    `Brand: ${companyName}`,
    `Primary Platform: ${primaryPlatform}`,
    `Iteration Goal: ${iterationGoal}`,
    assetVerificationBlock,
    `Original Iterations:\n${iterationBlock}`,
    "TASK: Using the veteran copy chief guidance, deliver exactly two improved iteration recommendations ready for A/B testing.",
    "Each recommendation must build on one of the provided iterations (reference by id).",
    "Elevate clarity, promise, specificity, and testing insight without introducing elements not grounded in the asset verification.",
    "Response format: strict JSON matching the schema below:",
    '{"recommendations": [{"reference_iteration_id": "same", "improved_headline": "...", "supporting_copy": "...", "cta": "...", "rationale": "...", "test_note": "..."}]}'
  ].join("\n\n");

  // Log the complete prompt being sent to OpenRouter for copy chief review
  console.log("=== COPY CHIEF PROMPT SENT TO OPENROUTER (CLAUDE) ===");
  console.log("System Prompt:", prompt);
  console.log("User Prompt:", userPrompt);
  console.log("=== END COPY CHIEF PROMPT ===");

  let response: Response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://openrouter.ai",
        "X-Title": "AI Ad Iteration Tool - Copy Chief",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4.5",
        temperature: 0.2,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content: [{ type: "text", text: prompt }],
          },
          {
            role: "user",
            content: [{ type: "text", text: userPrompt }],
          },
        ],
      }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter for copy chief", networkError);
    captureEdgeFunctionError(networkError, {
      functionName: 'analyze-and-iterate-ad',
      additionalTags: {
        error_type: 'openrouter_copychief_network_error',
        company_name: companyName
      }
    });
    throw new Error(`Copy chief network error: ${String(networkError)}`);
  }

  if (!response.ok) {
    const errorBody = await safeReadJson(response);

    const openRouterError = new Error(`Copy chief model error ${response.status}: ${JSON.stringify(errorBody)}`);
    captureEdgeFunctionError(openRouterError, {
      functionName: 'analyze-and-iterate-ad',
      additionalTags: {
        error_type: 'openrouter_copychief_api_error',
        status_code: response.status.toString(),
        company_name: companyName,
        error_message: errorBody?.error?.message || 'unknown'
      }
    });

    throw openRouterError;
  }

  const payload = await response.json();
  const messageContent = payload?.choices?.[0]?.message?.content ?? null;
  const parsed = parseCopyChiefResponse(messageContent);

  if (!parsed.success) {
    throw new Error(parsed.error);
  }

  return parsed.recommendations;
}

function parseCopyChiefResponse(content: unknown):
  | { success: true; recommendations: CopyChiefRecommendation[] }
  | { success: false; error: string } {
  if (!content) {
    return { success: false, error: "Empty content" };
  }

  let text: string;

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("\n");
  } else if (typeof content === "object" && "text" in (content as Record<string, unknown>)) {
    const maybeText = (content as { text?: unknown }).text;
    text = typeof maybeText === "string" ? maybeText : JSON.stringify(content);
  } else {
    text = JSON.stringify(content);
  }

  const cleaned = stripJsonFence(text.trim());

  try {
    const parsed = JSON.parse(cleaned) as {
      recommendations?: Array<{
        reference_iteration_id?: string;
        improved_headline?: string;
        supporting_copy?: string;
        cta?: string;
        rationale?: string;
        test_note?: string;
      }>;
    };

    if (!parsed || !Array.isArray(parsed.recommendations)) {
      return { success: false, error: "Missing recommendations array" };
    }

    const mapped: CopyChiefRecommendation[] = parsed.recommendations
      .filter(Boolean)
      .slice(0, 2)
      .map((item, index) => ({
        referenceIterationId: (item.reference_iteration_id as OutputFormat) ?? "same",
        improvedHeadline: item.improved_headline ?? `Improved headline ${index + 1}`,
        supportingCopy: item.supporting_copy ?? undefined,
        cta: item.cta ?? undefined,
        rationale: item.rationale ?? "",
        testNote: item.test_note ?? "",
      }));

    return { success: true, recommendations: mapped };
  } catch (error) {
    return { success: false, error: `Copy chief JSON parse error: ${String(error)}` };
  }
}

function buildCopyChiefMarkdown(recommendations: CopyChiefRecommendation[]): string {
  if (!recommendations.length) {
    return "";
  }

  const blocks = recommendations.map((rec, index) => {
    const lines = [
      `### Copy Chief Recommendation ${index + 1} (ref: ${rec.referenceIterationId})`,
      `- **Improved Headline:** ${rec.improvedHeadline}`,
    ];

    if (rec.supportingCopy) {
      lines.push(`- **Supporting Copy:** ${rec.supportingCopy}`);
    }

    if (rec.cta) {
      lines.push(`- **CTA:** ${rec.cta}`);
    }

    if (rec.rationale) {
      lines.push(`- **Rationale:** ${rec.rationale}`);
    }

    if (rec.testNote) {
      lines.push(`- **Testing Note:** ${rec.testNote}`);
    }

    return lines.join("\n");
  });

  return [`## Copy Chief Recommendations`, ...blocks].join("\n\n");
}

function stripJsonFence(value: string): string {
  if (value.startsWith("```")) {
    const withoutFence = value.replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    return withoutFence.trim();
  }
  return value;
}

async function safeReadJson(response: Response) {
  try {
    return await response.json();
  } catch (_error) {
    return await response.text();
  }
}

function inferContentType(assetType: "image" | "video" | "url"): string | null {
  if (assetType === "video") {
    return "video/mp4";
  }

  if (assetType === "image") {
    return "image/jpeg";
  }

  return null;
}

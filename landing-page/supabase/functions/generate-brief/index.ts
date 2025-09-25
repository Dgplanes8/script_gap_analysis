import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { createHash } from "https://deno.land/std@0.208.0/crypto/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");
const primaryModel = Deno.env.get("OPENROUTER_PRIMARY_MODEL") ?? "x-ai/grok-4-fast:free";
const researchModel = Deno.env.get("OPENROUTER_RESEARCH_MODEL") ?? "x-ai/grok-4-fast:free";
const openRouterBaseUrl = Deno.env.get("OPENROUTER_BASE_URL") ?? "https://openrouter.ai/api/v1";
const briefRenderWebhook = Deno.env.get("BRIEF_RENDER_WEBHOOK");

const simpleModeCost = 1;
const advancedModeCost = 3;

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}


type BriefMode = "simple" | "advanced";
type BriefFormat = "ugc" | "static" | "video" | "hybrid";

type BriefRequestPayload = {
  mode: BriefMode;
  brief_format: BriefFormat;
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  campaignObjective: string;
  audienceProfile: string;
  keyMessages?: string;
  brandVoice?: string;
  primaryPlatform?: string;
  budgetRange?: string;
  creativeConstraints?: string;
  include_pdf?: boolean;
};

type StructuredBrief = {
  executiveSummary: string;
  strategicFoundation: string;
  creativeDirection: string;
  deliverables: string;
  successMetrics: string;
};

type StoredBriefResponse = {
  requestedMode: BriefMode;
  processedMode: BriefMode;
  researchSummary?: string | null;
  structuredBrief: StructuredBrief;
  includePdf?: boolean;
};

// Usage tracking utilities
function generateAnonymousKey(request: Request): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';

  const ipHash = createHash('sha256').update(ip + 'apsics-salt').digest('hex');
  const uaHash = createHash('md5').update(userAgent).digest('hex').substring(0, 8);
  return `${ipHash}_${uaHash}`;
}

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
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
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

  let userId: string | null = null;
  const startTime = Date.now();
  try {
    const { data } = await supabaseClient.auth.getUser();
    userId = data.user?.id ?? null;
  } catch (error) {
    console.error("Failed to evaluate auth context", error);
    return jsonError("Unable to verify session", 401);
  }

  if (!userId) {
    return jsonError("Sign in to generate creative briefs.", 401);
  }

  let requestPayload: BriefRequestPayload;
  try {
    requestPayload = await req.json();
  } catch (error) {
    console.error("Invalid JSON payload", error);
    return jsonError("Invalid JSON payload", 400);
  }

  const validationError = validatePayload(requestPayload);
  if (validationError) {
    return jsonError(validationError, 400);
  }

  const requestedMode = requestPayload.mode;
  let processedMode: BriefMode = requestedMode;
  let creditCost = requestedMode === "advanced" ? advancedModeCost : simpleModeCost;
  const includePdf = Boolean(requestPayload.include_pdf);

  let researchModeUnlocked = false;
  let creditsRemaining = 0;

  const profile = await upsertProfile(adminClient, userId);
  if (!profile) {
    return jsonError("Unable to access profile", 500);
  }

  researchModeUnlocked = profile.research_mode_unlocked ?? false;
  creditsRemaining = profile.credits_remaining ?? 0;

  if (requestedMode === "advanced" && !researchModeUnlocked) {
    processedMode = "simple";
    creditCost = simpleModeCost;
  }

  if (creditsRemaining < creditCost) {
    return jsonError("You are out of credits. Upgrade your plan to keep generating briefs.", 402);
  }

  const nowIso = new Date().toISOString();

  const insertPayload = {
    user_id: userId,
    mode: processedMode,
    brief_format: requestPayload.brief_format,
    input_payload: requestPayload,
    credit_cost: creditCost,
    status: "queued",
    created_at: nowIso,
  } as const;

  const { data: requestRecord, error: insertError } = await adminClient
    .from("creative_brief_requests")
    .insert(insertPayload)
    .select("id")
    .maybeSingle();

  if (insertError || !requestRecord) {
    console.error("Failed to enqueue brief request", insertError);
    return jsonError("Unable to create brief request", 500);
  }

  const jobId = requestRecord.id as string;

  try {
    const researchSummary = processedMode === "advanced"
      ? await runResearchCall(requestPayload, researchModel)
      : null;

    const structuredBrief = await runBriefSynthesisCall(requestPayload, processedMode, researchSummary, primaryModel);

    const processingTime = Date.now() - startTime;

    const storedResponse: StoredBriefResponse = {
      requestedMode,
      processedMode,
      researchSummary,
      structuredBrief,
      includePdf,
    };

    // Track comprehensive usage analytics
    const inputPayload = {
      mode: requestedMode,
      brief_format: requestPayload.brief_format,
      companyName: requestPayload.companyName,
      websiteUrl: requestPayload.websiteUrl,
      productDescription: requestPayload.productDescription,
      campaignObjective: requestPayload.campaignObjective,
      audienceProfile: requestPayload.audienceProfile,
      keyMessages: requestPayload.keyMessages,
      brandVoice: requestPayload.brandVoice,
      primaryPlatform: requestPayload.primaryPlatform,
      budgetRange: requestPayload.budgetRange,
      creativeConstraints: requestPayload.creativeConstraints,
      includePdf
    };

    const outputPayload = {
      processedMode,
      briefSections: {
        executiveSummary: structuredBrief.executiveSummary?.length || 0,
        strategicFoundation: structuredBrief.strategicFoundation?.length || 0,
        creativeDirection: structuredBrief.creativeDirection?.length || 0,
        deliverables: structuredBrief.deliverables?.length || 0,
        successMetrics: structuredBrief.successMetrics?.length || 0
      },
      researchIncluded: !!researchSummary,
      researchLength: researchSummary?.length || 0,
      pdfRequested: includePdf
    };

    // Track tool usage
    await trackToolUsage(
      adminClient,
      {
        toolType: 'brief-generator',
        inputPayload,
        outputPayload,
        processingMs: processingTime,
        creditsSpent: creditCost,
        status: 'completed',
        source: 'web'
      },
      userId,
    );

    await adminClient
      .from("creative_brief_requests")
      .update({
        status: "completed",
        brief_response: storedResponse,
        completed_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    await adminClient.rpc("consume_creative_brief_credit", {
      p_user_id: userId,
      p_cost: creditCost,
    });

    const previewSnippet = buildPreviewSnippet(structuredBrief);
    await adminClient
      .from("profiles")
      .update({ last_brief_preview: previewSnippet, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (includePdf && briefRenderWebhook) {
      await triggerRenderWebhook(briefRenderWebhook, {
        jobId,
        structuredBrief,
        mode: processedMode,
        format: requestPayload.brief_format,
      });
      await adminClient.rpc("increment_brief_export", { p_user_id: userId });
    }

    return new Response(
      JSON.stringify({
        jobId,
        mode: processedMode,
        requestedMode,
        creditCost,
        brief: structuredBrief,
        researchSummary,
        includePdf,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Brief generation failed", error);

    const processingTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Track failed usage
    await trackToolUsage(
      adminClient,
      {
        toolType: 'brief-generator',
        inputPayload: {
          mode: requestPayload.mode,
          brief_format: requestPayload.brief_format,
          companyName: requestPayload.companyName,
          websiteUrl: requestPayload.websiteUrl,
          productDescription: requestPayload.productDescription,
          campaignObjective: requestPayload.campaignObjective,
          audienceProfile: requestPayload.audienceProfile
        },
        processingMs: processingTime,
        creditsSpent: 0, // Don't charge for failed generations
        status: 'failed',
        errorMessage,
        source: 'web'
      },
      userId,
    );

    await adminClient
      .from("creative_brief_requests")
      .update({
        status: "failed",
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    return jsonError("Failed to generate creative brief", 500);
  }
});

function validatePayload(payload: BriefRequestPayload): string | null {
  if (!payload) {
    return "Missing request payload";
  }

  if (!payload.mode || (payload.mode !== "simple" && payload.mode !== "advanced")) {
    return "Mode must be 'simple' or 'advanced'";
  }

  if (!payload.brief_format || !["ugc", "static", "video", "hybrid"].includes(payload.brief_format)) {
    return "Brief format must be ugc, static, video, or hybrid";
  }

  const requiredFields: (keyof BriefRequestPayload)[] = [
    "companyName",
    "websiteUrl",
    "productDescription",
    "campaignObjective",
    "audienceProfile",
  ];

  for (const field of requiredFields) {
    const value = payload[field];
    if (!value || (typeof value === "string" && !value.trim())) {
      return `Field '${field}' is required`;
    }
  }

  return null;
}

async function upsertProfile(adminClient: ReturnType<typeof createClient>, userId: string) {
  const { data: profile, error } = await adminClient
    .from("profiles")
    .select("id, credits_remaining, research_mode_unlocked")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load profile", error);
    return null;
  }

  if (profile) {
    return profile;
  }

  const { data: created, error: createError } = await adminClient
    .from("profiles")
    .insert({ id: userId })
    .select("id, credits_remaining, research_mode_unlocked")
    .maybeSingle();

  if (createError) {
    console.error("Failed to create profile", createError);
    return null;
  }

  return created;
}

async function runResearchCall(payload: BriefRequestPayload, model: string): Promise<string> {
  const messages = [
    {
      role: "system" as const,
      content:
        "You are a senior marketing strategist. Summarize the most relevant audience, competitive, and positioning insights based on the campaign request. Respond in under 250 words.",
    },
    {
      role: "user" as const,
      content: buildResearchPrompt(payload),
    },
  ];

  const response = await callOpenRouter(model, messages, 0.4);
  return response.trim();
}

async function runBriefSynthesisCall(
  payload: BriefRequestPayload,
  mode: BriefMode,
  researchSummary: string | null,
  model: string,
): Promise<StructuredBrief> {
  const messages = [
    {
      role: "user" as const,
      content: buildBriefPrompt(payload, mode, researchSummary ?? undefined),
    },
  ];

  const rawResponse = await callOpenRouter(model, messages, mode === "advanced" ? 0.3 : 0.4);

  try {
    const parsed = JSON.parse(rawResponse) as StructuredBrief;
    return parsed;
  } catch (error) {
    console.error("Failed to parse brief JSON", rawResponse, error);
    throw new Error("Model response was not valid JSON");
  }
}

async function callOpenRouter(model: string, messages: Array<{ role: "system" | "user" | "assistant"; content: string }>, temperature: number) {
  const response = await fetch(`${openRouterBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openRouterApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature,
      messages,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenRouter call failed", response.status, errorBody);
    throw new Error(`OpenRouter request failed with status ${response.status}`);
  }

  const data = await response.json();
  const choices = data?.choices;
  const message = choices?.[0]?.message?.content;
  if (!message || typeof message !== "string") {
    throw new Error("OpenRouter response missing message content");
  }

  return message.trim();
}


const BRIEF_GENERATOR_PROMPT = `🚀 ULTIMATE DIRECT RESPONSE CREATIVE STRATEGIST
CORE MISSION
You are a specialized direct response creative strategist AI trained to ideate, write, and optimize high-converting ad creative for Facebook, Instagram, and TikTok. Your outputs include hooks, headlines, UGC scripts, and multi-format conversion-focused ads.

WORKFLOW OVERVIEW
Follow this sequential process without pausing:
RESEARCH: Extract customer insights, competitor gaps, and emotional drivers
IDEATE: Create differentiated concepts built on strategic frameworks
CRAFT: Develop platform-optimized headlines and hooks
OPTIMIZE: Chief and refine copy for maximum conversion impact

🔍 PHASE 1: STRATEGIC RESEARCH
A. Product & Market Intelligence
Research these elements for [BRAND NAME] and [PRODUCT(S)]:
Unique Superiority: Evidence-based advantages over alternatives
Core Benefits: Primary and secondary value propositions
Pain Points: What drives customers to seek solutions
Dream Outcomes: Aspirational and practical results customers desire
Emotional States: Pre-purchase pain and post-purchase gain
Demographics & Psychographics: Who buys and why
Trigger Moments: Specific events that prompt purchase decisions
Competitive Landscape: Direct and indirect competitors, their claims
Voice of Customer: Collect verbatim language from reviews, forums, social
Awareness Level: Where do prospects sit on the awareness spectrum
Life Force 8 Alignment: Which of Drew Whitman's motivators apply

B. Insight Mining (RMBC-Inspired)
Extract and organize:
📦 GOLDEN PAIN BANK
 Raw emotional pain points, verbatim, that feel uncomfortably true Specific, authentic, "I've never said this out loud" level
🏆 DREAM OUTCOME VAULT
 Aspirational transformations and identity-level shifts Small wins to life-changing results
🔥 CULTURAL TENSION LAYER
 Contradictory desires and pressures felt by the avatar "I want to be seen as professional but also authentic"
💬 COMMENT HEATMAP
 Actual platform-specific user language from TikTok/YouTube/Amazon Use to inform tone, objections, and pattern interruptions

📊 COMPETITIVE ADVANTAGE MATRIX
Before ideation, complete this analysis:
CATEGORY CONVENTIONS: What messaging do ALL competitors use?
COMPETITIVE GAP ANALYSIS: What pain points are underserved?
OWNERSHIP OPPORTUNITIES: What can ONLY our brand credibly claim?
CULTURAL TENSION RESOLUTION: What contradictions can we solve?

💡 PHASE 2: CONCEPT IDEATION
Strategic Approach
Develop 3 concepts, each with 3-5 format executions (max 15 total ads). Each concept must include:
Target Avatar: Specific persona description
Core Emotion: Primary emotional driver
Life Force 8: Which fundamental motivator(s)
Awareness Level: Match to appropriate content approach
Trigger Moment: Specific situational context
Format Mix: Varied executions (UGC, meme, etc.)
Product Positioning: How product solves the pain

Format Options
UGC (User-Generated Content)
Founder/Expert Video
Before & After Transformation
Us vs. Them Comparison
Meme/Cultural Reference
Testimonial/Social Proof
3 Reasons Why/Listicle
Negative Angle ("Why I regret...")
Press/News Style
Post-it Note/Handwritten
Statistics/Data-Driven

Awareness-Lead Alignment
Level | Lead Type | Example
Unaware | Story | Slow reveal narrative
Problem-Aware | Proclamation | "Why you're tired all the time..."
Solution-Aware | Problem-Solution | "Stop waking up exhausted..."
Product-Aware | Promise | "Sleep 2x deeper tonight"
Most-Aware | Offer | "20% OFF sleep trackers"

Pattern Interruption Strategy
Every concept must include at least ONE:
Visual Interrupt: Unexpected movement, composition break
Auditory Interrupt: Tone shift, strategic silence
Narrative Interrupt: Story direction change, pattern break
Conceptual Interrupt: Category convention violation

✍️ PHASE 3: HEADLINE & HOOK CRAFTING
Core Formula
Interest = Curiosity + Promise

Every headline/hook must:
Stop the scroll in 0.5 seconds
Sound like authentic human speech
Target specific emotion
Present clear benefit/promise
Create productive curiosity

Elements of Winning Hooks
SPECIFICITY: "Lose weight" vs. "Melt 23 pounds in 5 weeks"
NOVELTY: New methodology/approach/origin
CREDIBILITY: Authority source or creator
SOCIAL PROOF: Relatable results from similar users
JUXTAPOSITION: Unexpected contrast or source
NEWSWORTHY: Time-sensitive or discovery framing

Platform-Native Optimization
Each hook must be platform-customized:
TikTok: Raw, POV, 1.5s hook, conversation-style
Instagram: Visual-first, aesthetic, aspirational
Facebook: Detailed, educational, community-focused

First 5 Framework
80% of effort on first 3-5 seconds:
Immediate hook (sight/sound/text)
Show product quickly
Clear promise/benefit
Curiosity escalation
Zero confusion

🔧 PHASE 4: COPY CHIEFING
Apply these refinement principles:
Audience Relevance: Is it speaking directly to target?
Clarity: Zero confusion about offer/benefit
Platform Nativity: Does it feel organic to the platform?
Authenticity: Sounds like real human speech
Concept Alignment: Matches strategic approach
Benefit Clarity: Clear "what's in it for me"
Curiosity Driver: Creates desire to learn more
Emotional Impact: Triggers specific feeling

Optimization Techniques
Replace generic language with specific examples
Add social dimension to benefits
Structure key points in threes
Use concrete "dimensional" language
Create mini emotional journeys

📱 CROSS-PLATFORM ADAPTATION
TIKTOK
Pacing: Fast, 1.5s hook
Style: POV/UGC, conversational
Specs: 9:16, captions essential
Context: Creator authenticity

INSTAGRAM
Pacing: Medium, aesthetic focus
Style: Aspirational, visually-led
Specs: Multiple ratios (9:16, 4:5, 1:1)
Context: Discovery mindset

FACEBOOK
Pacing: Medium to detailed
Style: Educational, testimonial
Specs: Multiple ratios, text-friendly
Context: Community emphasis

📈 PERFORMANCE EVALUATION
Rate each concept 1-5 on:
Attention Capture: Scroll-stopping power
Emotional Resonance: Specific feeling triggered
Benefit Clarity: "What's in it for me" clarity
CTA Strength: Next-step motivation
Memorability: Unique, shareable element

Scoring Guide:
21-25: Ready to launch
16-20: Optimize weak areas
<16: Rework concept

🎬 TECHNICAL PARAMETERS
VIDEO SPECS
UGC: Natural lighting, authentic environment
Founder: Professional but approachable
Testimonial: Real setting, emotional authenticity

DESIGN ELEMENTS
Text: Max 40% screen coverage
Font: Hierarchy of importance
Color: High contrast for CTAs

PLATFORM REQUIREMENTS
Facebook: 1080x1080 (1:1), 125 char limit
Instagram: 1080x1920 (9:16), 2200 char caption
TikTok: 1080x1920 (9:16), 150 char description

🧪 A/B TESTING STRATEGY
Test variations of:
Hooks: Different emotional angles
Visuals: Style and approach
Benefits: Priority/emphasis
CTAs: Call-to-action framing
Change ONE element per test and track specific metrics.

⚠️ GUARDRAILS
Create ONLY ad creative, not emails/landing pages
Extract insights from real customer language
Match concept to awareness level
Structure all outputs with complete context
Maintain platform authenticity

Step 6: Final Creative Brief
The final step is to compile all your work into a comprehensive creative brief that can be handed off to a production team. This serves as the definitive document that ensures all teams understand the strategic direction.

Creative Brief Structure:
1. CAMPAIGN OVERVIEW
Campaign Name: [Name]
Primary Objective: [Conversion, Awareness, etc.]
Target Audience: [Consolidated description]
Key Message: [One-sentence core message]
Unique Value Proposition: [What makes this product/offer special]

2. CONCEPT SUMMARY For each concept (1-3), provide:
Concept Name: [Name]
Strategic Approach: [Brief explanation]
Target Persona: [Specific demographic + psychographic details]
Core Emotion: [Primary emotional driver]
Life Force 8: [Which motivational drivers]
Awareness Level: [Level of audience awareness]
Formats: [List of formats being used]
Performance Prediction Score: [Score from evaluation framework]

3. FORMAT EXECUTIONS For each format within each concept, provide:
Format Type: [UGC, Static, etc.]
Primary Hook/Headline: [Final version]
Complete Copy: [All supporting copy]
Key Visuals: [Description of imagery/scenes]
Talent Notes: [Age, style, personality if applicable]
Golden Pain Addressed: [Specific pain point from research]
Dream Outcome Promised: [Specific outcome from research]

4. BRAND GUIDELINES
Voice Positioning: [Where brand falls on voice spectrum]
Power Words: [Key words to use]
Forbidden Language: [Words/phrases to avoid]
Required Disclaimers: [Legal requirements if any]
Output: Complete creative brief document.

EXECUTION RULE
Complete all phases sequentially without pausing. Each output should build directly on insights from previous phases.

You must respond with properly structured JSON matching this exact schema:
{
  "executiveSummary": "string",
  "strategicFoundation": "string",
  "creativeDirection": "string",
  "deliverables": "string",
  "successMetrics": "string"
}

Do not include markdown fences or commentary. Focus on actionable, insight-rich direction that creators can execute immediately.`;

function buildBriefPrompt(payload: BriefRequestPayload, mode: BriefMode, researchSummary?: string): string {
  const formatLabel = (format: BriefFormat) => {
    switch (format) {
      case "ugc": return "UGC / Influencer";
      case "static": return "Static Display";
      case "video": return "Video";
      case "hybrid": return "Hybrid Multi-format";
      default: return "Unknown";
    }
  };

  const baseDetails = `Company: ${payload.companyName}
Website: ${payload.websiteUrl}
Campaign Objective: ${payload.campaignObjective}
Product/Service: ${payload.productDescription}
Audience Profile: ${payload.audienceProfile}
Key Messages: ${payload.keyMessages ?? "Not provided"}
Brand Voice: ${payload.brandVoice ?? "Infer from context"}
Primary Platform: ${payload.primaryPlatform ?? "Multi-platform"}
Budget Range: ${payload.budgetRange ?? "Not specified"}
Creative Constraints: ${payload.creativeConstraints ?? "None"}
Brief Format: ${formatLabel(payload.brief_format)}
Mode: ${mode.toUpperCase()}`;

  if (researchSummary) {
    return `${BRIEF_GENERATOR_PROMPT}

COMPANY BRIEF DATA:
${baseDetails}

RESEARCH SUMMARY:
${researchSummary}

Using the research summary and company data above, execute all phases of the Ultimate Direct Response Creative Strategist workflow and provide the final creative brief as structured JSON.`;
  }

  return `${BRIEF_GENERATOR_PROMPT}

COMPANY BRIEF DATA:
${baseDetails}

Execute all phases of the Ultimate Direct Response Creative Strategist workflow using the company data above and provide the final creative brief as structured JSON.`;
}

function buildResearchPrompt(payload: BriefRequestPayload): string {
  const formatLabel = (format: BriefFormat) => {
    switch (format) {
      case "ugc": return "UGC / Influencer";
      case "static": return "Static Display";
      case "video": return "Video";
      case "hybrid": return "Hybrid Multi-format";
      default: return "Unknown";
    }
  };

  return `Company: ${payload.companyName}
Website: ${payload.websiteUrl}
Objective: ${payload.campaignObjective}
Product: ${payload.productDescription}
Audience: ${payload.audienceProfile}
Key Messages: ${payload.keyMessages ?? "Not provided"}
Primary Platform: ${payload.primaryPlatform ?? "Multi-channel"}
Budget: ${payload.budgetRange ?? "Not specified"}
Brief Format: ${formatLabel(payload.brief_format)}

Provide: 1) audience insight summary, 2) competitive positioning guidance, 3) strategic whitespace opportunities, 4) tone and hook direction. Do not exceed 4 short paragraphs.`;
}

async function triggerRenderWebhook(url: string, payload: Record<string, unknown>) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn("Render webhook returned non-200", response.status);
    }
  } catch (error) {
    console.error("Render webhook call failed", error);
  }
}

function buildPreviewSnippet(structuredBrief: StructuredBrief) {
  const summary = structuredBrief.executiveSummary ?? "";
  if (summary.length <= 500) {
    return summary;
  }
  return `${summary.slice(0, 497)}...`;
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

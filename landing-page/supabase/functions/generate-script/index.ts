import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { basePrompt } from "./prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-anonymous-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("EDGE_SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");

if (!supabaseUrl || !serviceRoleKey || !anonKey) {
  throw new Error("Missing Supabase configuration for edge function");
}

if (!openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}


type RequestPayload = {
  companyName?: string;
  websiteUrl?: string;
  productDescription?: string;
  platform?: string;
  objective?: string;
  adFormat?: 'video' | 'static';
};

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
  userId?: string | null,
  anonymousKey?: string | null
): Promise<{ usageId: string | null; error: string | null }> {
  try {
    const { data: result, error } = await supabase.rpc('log_ai_tool_usage', {
      p_user_id: userId || null,
      p_anonymous_key: anonymousKey || null,
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

async function trackScriptGeneration(
  supabase: any,
  data: {
    usageId?: string;
    companyName: string;
    websiteUrl: string;
    productDescription?: string;
    platform?: string;
    objective?: string;
    adFormat: 'video' | 'static';
    generatedScript: string;
    creditsUsed?: number;
    qualityScore?: number;
  },
  userId?: string | null,
  anonymousKey?: string | null
): Promise<{ scriptId: string | null; error: string | null }> {
  try {
    const wordCount = data.generatedScript.trim().split(/\s+/).length;

    const { data: result, error } = await supabase
      .from('ai_script_generations')
      .insert({
        usage_id: data.usageId || null,
        user_id: userId || null,
        anonymous_key: anonymousKey || null,
        company_name: data.companyName,
        website_url: data.websiteUrl,
        product_description: data.productDescription || null,
        platform: data.platform || null,
        objective: data.objective || null,
        ad_format: data.adFormat,
        generated_script: data.generatedScript,
        script_word_count: wordCount,
        script_quality_score: data.qualityScore || null,
        credits_used: data.creditsUsed || 1,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) {
      console.error('Script generation tracking failed:', error);
      return { scriptId: null, error: error.message };
    }

    return { scriptId: result.id, error: null };
  } catch (err) {
    console.error('Script tracking error:', err);
    return { scriptId: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  x: 'X (Twitter)',
  youtube: 'YouTube',
};

const OBJECTIVE_LABELS: Record<string, string> = {
  awareness: 'Awareness',
  leads: 'Leads',
  sales: 'Sales',
  engagement: 'Engagement',
  downloads: 'Downloads',
  installs: 'Installs',
};

const PLATFORM_BEHAVIOR_NOTES: Record<string, string> = {
  facebook:
    'Facebook Feed/In-Stream: Hook within 3 seconds, support with bold captions, balance emotional storytelling with clear benefit-led copy, include social proof cues (reacts, comments) and a direct CTA in the first 45 seconds.',
  instagram:
    'Instagram Reels/Stories: Lead with an aesthetic visual or motion transition, keep clips under 30 seconds, use on-screen text sized for vertical framing, and close with swipe-up or tap CTA language.',
  tiktok:
    'TikTok UGC: Raw POV intro within 1 second, conversational VO, jump-cut pacing, incorporate native text overlays, comment-bait question, and platform slang/emojis sparingly.',
  linkedin:
    'LinkedIn Feed: Professional tone with an insight-led hook, emphasize ROI or team impact, use concise bullet-style messaging, and reference credible data or leadership voice.',
  x:
    'X (Twitter) Timeline: 120-200 character hooks, high-contrast visual, provocative statement or stat, invite replies/quote tweets, include a short URL-style CTA.',
  youtube:
    'YouTube Pre-roll/Feed: Deliver the promise in the first 5 seconds to beat the skip, combine VO with dynamic b-roll, use chapter-like pacing, and restate CTA verbally and on-screen near the end.',
};

serve(async (req) => {
  console.log("generate-script invoked", { method: req.method, url: req.url });

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

  let user = null;
  let resolvedAnonymousKey: string | null = null;
  try {
    const authResult = await supabaseClient.auth.getUser();
    user = authResult.data.user;
  } catch (authError) {
    console.error("Failed to read auth context", authError);
    return new Response(JSON.stringify({ error: "Please sign in to continue" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: RequestPayload;

  try {
    payload = await req.json();
  } catch (parseError) {
    console.error("Failed to parse JSON", parseError);
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { companyName, websiteUrl, productDescription, platform, objective, adFormat } = payload;

  if (!companyName || !companyName.trim() || !websiteUrl || !websiteUrl.trim()) {
    return new Response(JSON.stringify({ error: "Please enter your company name and website URL" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!adFormat || (adFormat !== 'video' && adFormat !== 'static')) {
    return new Response(JSON.stringify({ error: "Ad format must be either 'video' or 'static'" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let normalizedWebsiteUrl: string;

  try {
    const withScheme = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    const parsedUrl = new URL(withScheme);
    normalizedWebsiteUrl = parsedUrl.toString();
  } catch (urlError) {
    console.error('Invalid website URL provided', websiteUrl, urlError);
    return new Response(JSON.stringify({ error: "Please enter a valid website URL (like example.com)" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const startTime = Date.now();
  let creditsRemaining = 0;

  if (!user) {
    const headerKey = req.headers.get("x-anonymous-key")?.trim() ?? "";
    resolvedAnonymousKey = headerKey.length > 0 && headerKey.length <= 128 ? headerKey : crypto.randomUUID();

    const { count: anonUsageCount, error: anonUsageError } = await adminClient
      .from("ai_tool_usage")
      .select("id", { count: "exact", head: true })
      .eq("tool_type", "script-generator")
      .eq("anonymous_key", resolvedAnonymousKey);

    if (anonUsageError) {
      console.error("Failed to read anonymous usage", anonUsageError);
      return new Response(JSON.stringify({ error: "Unable to verify usage" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((anonUsageCount ?? 0) >= 1) {
      return new Response(JSON.stringify({ error: "You've used your free script! Create an account to get 10 more credits each month." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } else {
    const { data: profile, error } = await adminClient
      .from("profiles")
      .select("id, credits_remaining")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to load profile", error);
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
        JSON.stringify({ error: "You've used all your credits! Upgrade to Essentials ($19/month) to get 150 more credits." }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  }

  const prompt = buildPrompt({
    companyName: companyName.trim(),
    websiteUrl: normalizedWebsiteUrl,
    productDescription: productDescription?.trim() ?? '',
    platform: platform?.trim() ?? '',
    objective: objective?.trim() ?? '',
    adFormat,
  });

  let completion: Response;
  try {
    completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": "https://openrouter.ai",
        "X-Title": "AI Ad Script Generator",
      },
      body: JSON.stringify({
        model: "x-ai/grok-4-fast:free",
        messages: [
          {
            role: "system",
            content:
              "You are a direct-response marketing strategist. Produce concise, high-performing video ad scripts with hooks, narrative structure, and platform-native pacing. Never invent research or data; if required inputs are missing, ask for clarification or return an explicit error.",
          },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 800,
    }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter", networkError);
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: String(networkError) }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
    console.error("OpenRouter request returned non-200", completion.status, errorBody);
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: errorBody }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const completionData = await completion.json();
  const rawContent = completionData?.choices?.[0]?.message?.content;

  if (!rawContent) {
    return new Response(JSON.stringify({ error: "Our AI is having trouble right now. Please try again in a moment." }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Try to parse as JSON first (new format), fallback to raw string (legacy format)
  let structuredData = null;
  let script = rawContent;

  try {
    structuredData = JSON.parse(rawContent);
    // If we successfully parsed JSON, extract the script content for legacy compatibility
    if (structuredData.contentType === 'video' && structuredData.script?.scenes) {
      // For video, concatenate scenes into a readable script format
      script = structuredData.script.scenes.map((scene: any) =>
        `[${scene.timing}] ${scene.description}\nVO: ${scene.voiceover}\nOn-screen: ${scene.onScreenText}${scene.cta ? `\nCTA: ${scene.cta}` : ''}`
      ).join('\n\n');
    } else if (structuredData.contentType === 'static' && structuredData.staticCopy) {
      // For static, format the copy structure
      const copy = structuredData.staticCopy;
      script = `${copy.headline}\n\n${copy.subheadline}\n\n${copy.body}\n\n${copy.bullets.map((b: string) => `• ${b}`).join('\n')}\n\n${copy.cta}\n\nDesign Notes: ${copy.designNotes}`;
    }
  } catch (parseError) {
    // If JSON parsing fails, use raw content as script (legacy format)
    console.log('Using legacy text format, JSON parsing failed:', parseError);
  }

  const processingTime = Date.now() - startTime;

  // Track comprehensive usage analytics
  const inputPayload = {
    companyName: companyName.trim(),
    websiteUrl: normalizedWebsiteUrl,
    productDescription: productDescription?.trim() || '',
    platform: platform?.trim() || '',
    objective: objective?.trim() || '',
    adFormat,
    fullPrompt: prompt  // Add the actual prompt sent to OpenRouter
  };

  const outputPayload = {
    script,
    wordCount: script.trim().split(/\s+/).length,
    scriptLength: script.length
  };

  // Track tool usage
  const { usageId } = await trackToolUsage(
    adminClient,
    {
      toolType: 'script-generator',
      inputPayload,
      outputPayload,
      processingMs: processingTime,
      creditsSpent: 1,
      status: 'completed',
      source: 'web'
    },
    user?.id ?? null,
    resolvedAnonymousKey
  );

  // Track specific script generation details
  await trackScriptGeneration(
    adminClient,
    {
      usageId,
      companyName: companyName.trim(),
      websiteUrl: normalizedWebsiteUrl,
      productDescription: productDescription?.trim(),
      platform: platform?.trim(),
      objective: objective?.trim(),
      adFormat,
      generatedScript: script,
      creditsUsed: 1
    },
    user?.id ?? null,
    resolvedAnonymousKey
  );

  if (!user) {
    return new Response(JSON.stringify({
      script,
      data: structuredData,
      anonymousKey: resolvedAnonymousKey
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: updatedProfile, error: creditUpdateError } = await adminClient
    .from("profiles")
    .update({ credits_remaining: creditsRemaining - 1 })
    .eq("id", user.id)
    .eq("credits_remaining", creditsRemaining)
    .select("credits_remaining")
    .maybeSingle();

  if (creditUpdateError || !updatedProfile) {
    console.error("Failed to decrement credits", creditUpdateError);
    return new Response(JSON.stringify({ error: "Failed to decrement credits" }), {
      status: 409,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({
    script,
    data: structuredData,
    creditsRemaining: updatedProfile.credits_remaining ?? 0
  }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

type PromptParams = {
  companyName: string;
  websiteUrl: string;
  productDescription: string;
  platform: string;
  objective: string;
  adFormat: 'video' | 'static';
};

function buildPrompt({
  companyName,
  websiteUrl,
  productDescription,
  platform,
  objective,
  adFormat,
}: PromptParams) {
  const descriptionLine = productDescription.length > 0 ? productDescription : 'Product description was not provided.';
  const platformLabel = platform.length > 0 ? PLATFORM_LABELS[platform] ?? humanize(platform) : 'Strategist can choose the optimal placement';
  const objectiveLabel = objective.length > 0 ? OBJECTIVE_LABELS[objective] ?? humanize(objective) : 'Drive measurable conversions';
  const adFormatInstruction = adFormat === 'video'
    ? 'The creative team requires VIDEO deliverables. Step 3 hooks must specify on-screen vs voiceover text. Step 5 scripts must follow an appropriate video framework with scene-by-scene directions, voiceover lines, on-screen text overlays, b-roll guidance, and CTA moments aligned to TikTok/IG/FB video behavior. Do not include static-only elements.'
    : 'The creative team requires STATIC IMAGE/GRAPHIC deliverables. Step 3 hooks must provide headline, subheadline, and overlay text options. Step 5 secondary copy must include subhead, 3-5 bullet benefits, CTA copy, and optional urgency/risk reversal for static placements (feed, stories, carousel). Do not include video scripting, shot lists, or voiceover guidance.';
  const platformInstruction = platform && PLATFORM_BEHAVIOR_NOTES[platform]
    ? PLATFORM_BEHAVIOR_NOTES[platform]
    : 'No specific platform provided — include cross-platform adaptation notes for Facebook, Instagram, and TikTok with platform-native pacing, hook style, and CTA guidance.';
  const completenessInstruction = 'If any research data points are missing or unspecified, proceed using best-practice insights and the provided campaign info. Never respond with "This information is not available in the provided training data"—always generate the best possible creative output. Avoid refusal language entirely.';

  const campaignBriefSection = `Campaign Brief:
Company Name: ${companyName}
Website URL: ${websiteUrl}
Product Description: ${descriptionLine}
Primary Platform: ${platformLabel}
Campaign Objective: ${objectiveLabel}
Requested Output Format: ${adFormat === 'video' ? 'Video Ad Creative' : 'Static Ad Creative'}

Additional Format Direction:
${adFormatInstruction}

Platform-Specific Guidance:
${platformInstruction}

Completeness Requirement:
${completenessInstruction}`;

  return `${campaignBriefSection.trim()}

---
${basePrompt.trim()}

Use the above strategic workflow to craft a finished advertising script that aligns with the campaign brief provided above.

CRITICAL OUTPUT FORMAT REQUIREMENT:
You MUST return your response as valid JSON in exactly this structure:

FOR VIDEO FORMAT:
{
  "contentType": "video",
  "script": {
    "scenes": [
      {
        "timing": "0-3s",
        "description": "Visual scene description",
        "voiceover": "Spoken content",
        "onScreenText": "Text overlays",
        "cta": "Call to action if applicable"
      }
    ]
  },
  "recommendations": [
    {
      "improvedElement": "Expert-optimized hook variation",
      "frameworkUsed": "Which script framework was applied",
      "awarenessStage": "Unaware|Problem-Aware|Solution-Aware|Product-Aware|Most-Aware",
      "rationale": "Why this approach works",
      "testingStrategy": "How to test and optimize"
    }
  ],
  "platformAdaptations": {
    "tiktok": "TikTok-specific optimization notes",
    "instagram": "Instagram-specific optimization notes",
    "facebook": "Facebook-specific optimization notes",
    "x": "X (Twitter)-specific optimization notes",
    "linkedin": "LinkedIn-specific optimization notes",
    "youtube": "YouTube-specific optimization notes"
  }
}

FOR STATIC FORMAT:
{
  "contentType": "static",
  "staticCopy": {
    "headline": "Primary headline",
    "subheadline": "Supporting subhead",
    "body": "Main body copy",
    "bullets": ["Benefit 1", "Benefit 2", "Benefit 3"],
    "cta": "Call to action",
    "designNotes": "Layout and visual guidance"
  },
  "recommendations": [
    {
      "improvedElement": "Expert-optimized headline variation",
      "frameworkUsed": "Which copy framework was applied",
      "awarenessStage": "Unaware|Problem-Aware|Solution-Aware|Product-Aware|Most-Aware",
      "rationale": "Why this approach works",
      "testingStrategy": "How to test and optimize"
    }
  ],
  "platformAdaptations": {
    "tiktok": "TikTok-specific optimization notes",
    "instagram": "Instagram-specific optimization notes",
    "facebook": "Facebook-specific optimization notes",
    "x": "X (Twitter)-specific optimization notes",
    "linkedin": "LinkedIn-specific optimization notes",
    "youtube": "YouTube-specific optimization notes"
  }
}

Output Requirements:
1. Select the optimal framework based on the campaign brief and platform.
2. Structure content cleanly with separate fields for each element.
3. Include expert-level recommendations for optimization.
4. Provide platform-specific adaptation guidance.
5. Return ONLY valid JSON - no additional text outside the JSON structure.
6. Ensure all strings are properly escaped for JSON format.
`;
}

async function safeReadJson(response: Response) {
  try {
    return await response.json();
  } catch (_error) {
    return await response.text();
  }
}

function humanize(value: string) {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

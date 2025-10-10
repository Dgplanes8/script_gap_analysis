import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { basePrompt } from "./prompt.ts";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";
import {
  normalizeOpenRouterContent,
  parseJsonWithRecovery,
  stripMarkdownFence,
  sliceBalanced,
} from "../_shared/openrouter.ts";

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "*";
  const requestedHeaders = req.headers.get("access-control-request-headers") ?? "";
  const defaultHeaders = ["authorization", "x-client-info", "apikey", "content-type", "x-anonymous-key"];
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

type ScriptScene = {
  timing?: string;
  description?: string;
  voiceover?: string;
  onScreenText?: string;
  cta?: string | null;
};

type StaticCopy = {
  headline?: string;
  subheadline?: string;
  body?: string;
  bullets?: string[];
  cta?: string;
  designNotes?: string;
};

type ScriptRecommendation = {
  improvedElement?: string;
  frameworkUsed?: string;
  awarenessStage?: string;
  rationale?: string;
  testingStrategy?: string;
};

type PlatformAdaptations = {
  tiktok?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
};

type ScriptGenerationData = {
  contentType: 'video' | 'static';
  script?: { scenes: ScriptScene[] };
  staticCopy?: StaticCopy;
  recommendations?: ScriptRecommendation[];
  platformAdaptations?: PlatformAdaptations;
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

    return { scriptId: (result as { id: string } | null)?.id ?? null, error: null };
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

  const corsHeaders = buildCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {

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
        model: "anthropic/claude-sonnet-4.5",
        messages: [
          {
            role: "system",
            content:
              "You are a direct-response marketing strategist. You MUST return valid JSON only. Never return plain text. Always follow the exact JSON structure provided in the prompt. If you cannot generate the full response within token limits, prioritize the core content sections first.",
          },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 1500,
    }),
    });
  } catch (networkError) {
    console.error("Failed to call OpenRouter", networkError);
    captureEdgeFunctionError(networkError, {
      functionName: 'generate-script',
      additionalTags: {
        error_type: 'openrouter_network_error',
        user_id: user?.id || 'anonymous'
      }
    });
    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: String(networkError) }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!completion.ok) {
    const errorBody = await safeReadJson(completion);
    console.error("OpenRouter request returned non-200", completion.status, errorBody);

    // Determine specific error type
    const errorType = completion.status === 429 ? 'openrouter_rate_limit' : 'openrouter_api_error';

    const openRouterError = new Error(`OpenRouter returned ${completion.status}: ${JSON.stringify(errorBody)}`);
    captureEdgeFunctionError(openRouterError, {
      functionName: 'generate-script',
      additionalTags: {
        error_type: errorType,
        status_code: completion.status.toString(),
        user_id: user?.id || 'anonymous',
        error_message: errorBody?.error?.message || 'unknown',
        rate_limit_reset: completion.headers.get('x-ratelimit-reset') || 'unknown'
      }
    });

    return new Response(JSON.stringify({ error: "OpenRouter request failed", details: errorBody }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const completionData = await completion.json();
  const rawContent = normalizeOpenRouterContent(completionData?.choices?.[0]?.message?.content);

  if (!rawContent) {
    const emptyResponseError = new Error('OpenRouter returned empty content');
    captureEdgeFunctionError(emptyResponseError, {
      functionName: 'generate-script',
      additionalTags: {
        error_type: 'openrouter_empty_response',
        user_id: user?.id || 'anonymous'
      }
    });
    return new Response(JSON.stringify({ error: "Our AI is having trouble right now. Please try again in a moment." }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parse JSON response and create structured data
  let structuredData = null;
  let script = rawContent;

  // Clean up the content and try to extract JSON
  let cleanedContent = stripMarkdownFence(rawContent);

  if (!cleanedContent) {
    cleanedContent = rawContent.trim();
  }

  // Drop any leading text before the first JSON object
  const jsonStart = cleanedContent.indexOf('{');
  if (jsonStart > 0) {
    cleanedContent = cleanedContent.substring(jsonStart);
  }

  // Remove any trailing text after the JSON block
  const jsonEnd = cleanedContent.lastIndexOf('}');
  if (jsonEnd !== -1) {
    cleanedContent = cleanedContent.substring(0, jsonEnd + 1);
  }

  try {
    structuredData = parseJsonWithRecovery(cleanedContent);

    // Validate the structure matches our expected schema
    if (structuredData && typeof structuredData === 'object') {
      const isValidVideo = structuredData.contentType === 'video' &&
                          Array.isArray(structuredData.script?.scenes) &&
                          structuredData.script.scenes.length > 0;

      const isValidStatic = structuredData.contentType === 'static' &&
                           structuredData.staticCopy &&
                           typeof structuredData.staticCopy === 'object';

      if (isValidVideo || isValidStatic) {
        script = formatLegacyScript(structuredData as ScriptGenerationData);
      } else {
        const recovered = recoverStructuredDataFromJsonish(cleanedContent);
        if (recovered) {
          structuredData = recovered;
          script = formatLegacyScript(recovered);
        } else {
          const invalidData = structuredData as Record<string, unknown> | null;
          structuredData = null;

          const invalidStructureError = new Error(`AI returned JSON with invalid structure for ${adFormat} format`);
          const invalidContentType = (() => {
            if (!invalidData) {
              return 'missing';
            }
            const value = (invalidData as { contentType?: unknown }).contentType;
            return typeof value === 'string' ? value : 'missing';
          })();
          captureEdgeFunctionError(invalidStructureError, {
            functionName: 'generate-script',
            additionalTags: {
              error_type: 'json_invalid_structure',
              user_id: user?.id || 'anonymous',
              ad_format: adFormat,
              has_content_type: invalidData ? Object.prototype.hasOwnProperty.call(invalidData, 'contentType') : false,
              actual_content_type: invalidContentType
            }
          });
        }
      }
    }
  } catch (parseError) {
    // Try to fix truncated JSON by adding missing closing braces
    try {
      let fixedContent = cleanedContent;

      // Count opening vs closing braces to detect truncation
      const openBraces = (fixedContent.match(/\{/g) || []).length;
      const closeBraces = (fixedContent.match(/\}/g) || []).length;
      const missingBraces = openBraces - closeBraces;

      if (missingBraces > 0) {
        // Add missing closing braces
        fixedContent += '}]'.repeat(Math.min(missingBraces, 3));
      }

      structuredData = parseJsonWithRecovery(fixedContent);

      // Validate and extract script as above
      if (structuredData && typeof structuredData === 'object') {
        const isValidVideo = structuredData.contentType === 'video' &&
                            Array.isArray(structuredData.script?.scenes) &&
                            structuredData.script.scenes.length > 0;

        if (isValidVideo) {
          script = formatLegacyScript(structuredData as ScriptGenerationData);
        }
      }
    } catch (secondError) {
      // Both attempts failed, use raw content as fallback
      structuredData = null;

      // Track JSON parsing failure in Sentry
      const jsonParseError = new Error(`Failed to parse AI JSON response after two attempts`);
      captureEdgeFunctionError(jsonParseError, {
        functionName: 'generate-script',
        additionalTags: {
          error_type: 'json_parsing_failure',
          user_id: user?.id || 'anonymous',
          ad_format: adFormat,
          first_error: String(parseError),
          second_error: String(secondError),
          content_preview: cleanedContent.substring(0, 200)
        }
      });
    }
  }

  if (!structuredData) {
    const recovered = recoverStructuredDataFromJsonish(cleanedContent);
    if (recovered) {
      structuredData = recovered;
      script = formatLegacyScript(recovered);
    }
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

    // Track credit deduction failure in Sentry
    const creditError = new Error(`Credit deduction failed after successful script generation`);
    captureEdgeFunctionError(creditError, {
      functionName: 'generate-script',
      additionalTags: {
        error_type: 'credit_deduction_failure',
        user_id: user?.id || 'unknown',
        credits_before: creditsRemaining.toString(),
        error_message: creditUpdateError?.message || 'no_updated_profile'
      }
    });

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

  } catch (error) {
    console.error("Generate script function failed", error);
    captureEdgeFunctionError(error, {
      functionName: 'generate-script',
      additionalTags: {
        error_type: 'script_generation_failed'
      }
    });

    return new Response(JSON.stringify({ error: "Script generation failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
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
You MUST return your response as valid JSON. Follow these rules strictly:

JSON FORMATTING RULES:
- All string values must be properly escaped (use \\" for quotes, \\n for line breaks)
- No trailing commas
- No comments or additional text outside the JSON
- Ensure all quotes and special characters are escaped

REQUIRED JSON STRUCTURE:

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
      "rationale": "Why this approach works for this brief",
      "testingStrategy": "How to test and optimize performance"
    }
  ],
  "platformAdaptations": {
    "tiktok": "TikTok-specific adaptation notes",
    "instagram": "Instagram-specific adaptation notes",
    "facebook": "Facebook-specific adaptation notes",
    "x": "X/Twitter-specific adaptation notes",
    "linkedin": "LinkedIn-specific adaptation notes",
    "youtube": "YouTube-specific adaptation notes"
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
      "rationale": "Why this approach works for this brief",
      "testingStrategy": "How to test and optimize performance"
    }
  ],
  "platformAdaptations": {
    "tiktok": "TikTok-specific adaptation notes",
    "instagram": "Instagram-specific adaptation notes",
    "facebook": "Facebook-specific adaptation notes",
    "x": "X/Twitter-specific adaptation notes",
    "linkedin": "LinkedIn-specific adaptation notes",
    "youtube": "YouTube-specific adaptation notes"
  }
}

CRITICAL OUTPUT REQUIREMENTS:
- Return ONLY valid JSON - no markdown, no explanations, no extra text
- Start response with { and end with }
- If hitting token limits, include scenes/staticCopy and recommendations first, platformAdaptations second
- Ensure all JSON strings are properly escaped (use \\" for quotes)
`;
}

function formatLegacyScript(data: ScriptGenerationData): string {
  if (data.contentType === 'video' && data.script?.scenes?.length) {
    return data.script.scenes
      .filter(Boolean)
      .map((scene) => {
        const safeScene = scene || {};
        const timing = safeScene.timing || 'Scene';
        const description = safeScene.description || '';
        const voiceover = safeScene.voiceover || '';
        const onScreenText = safeScene.onScreenText ? `\nText: ${safeScene.onScreenText}` : '';
        const cta = safeScene.cta ? `\nCTA: ${safeScene.cta}` : '';
        return `[${timing}] ${description}\n${voiceover}${onScreenText}${cta}`.trim();
      })
      .filter((block) => block.length > 0)
      .join('\n\n');
  }

  if (data.contentType === 'static' && data.staticCopy) {
    const copy = data.staticCopy;
    const parts: string[] = [];
    if (copy.headline) {
      parts.push(copy.headline);
    }
    if (copy.subheadline) {
      parts.push('', copy.subheadline);
    }
    if (copy.body) {
      parts.push('', copy.body);
    }
    if (Array.isArray(copy.bullets) && copy.bullets.length > 0) {
      parts.push('', copy.bullets.map((bullet) => `• ${bullet}`).join('\n'));
    }
    if (copy.cta) {
      parts.push('', copy.cta);
    }
    return parts.join('\n');
  }

  return '';
}

function recoverStructuredDataFromJsonish(raw: string): ScriptGenerationData | null {
  const contentTypeMatch = raw.match(/"contentType"\s*:\s*"(video|static)"/i);
  if (!contentTypeMatch) {
    return null;
  }

  const type = contentTypeMatch[1].toLowerCase() as 'video' | 'static';

  if (type === 'video') {
    const scenesBlock = extractJsonSection(raw, '"scenes"', '[', ']');
    if (!scenesBlock) {
      return null;
    }

    try {
      const scenes = parseJsonWithRecovery(scenesBlock) as ScriptScene[];
      return {
        contentType: 'video',
        script: { scenes: Array.isArray(scenes) ? scenes.filter(Boolean) : [] },
        recommendations: [],
        platformAdaptations: defaultPlatformAdaptations(),
      };
    } catch (_error) {
      return null;
    }
  }

  if (type === 'static') {
    const staticBlock = extractJsonSection(raw, '"staticCopy"', '{', '}');
    if (!staticBlock) {
      return null;
    }

    try {
      const staticCopy = parseJsonWithRecovery(staticBlock) as StaticCopy;
      return {
        contentType: 'static',
        staticCopy,
        recommendations: [],
        platformAdaptations: defaultPlatformAdaptations(),
      };
    } catch (_error) {
      return null;
    }
  }

  return null;
}

function extractJsonSection(raw: string, key: string, openChar: '[' | '{', closeChar: ']' | '}'): string | null {
  const keyIndex = raw.indexOf(key);
  if (keyIndex === -1) {
    return null;
  }

  const start = raw.indexOf(openChar, keyIndex);
  if (start === -1) {
    return null;
  }

  return sliceBalanced(raw, start, openChar, closeChar);
}

function defaultPlatformAdaptations(): PlatformAdaptations {
  return {
    tiktok: '',
    instagram: '',
    facebook: '',
    x: '',
    linkedin: '',
    youtube: '',
  };
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

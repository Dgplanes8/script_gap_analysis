import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";
import { captureEdgeFunctionError } from "../_shared/sentry.ts";

// CORS helper
function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "*";
  const requestedHeaders = req.headers.get("access-control-request-headers") ?? "";
  const defaultHeaders = [
    "authorization",
    "x-client-info",
    "apikey",
    "content-type",
    "x-apsics-share-token",
    "baggage",
  ];
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
    Vary: "Origin, Access-Control-Request-Headers",
  };

  if (origin !== "*") {
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

// Validate and normalize platform
function normalizePlatform(platform?: string): string {
  const normalized = (platform || "facebook").toLowerCase().trim();

  // Map aliases
  if (normalized === "meta") return "facebook";
  if (normalized === "ig") return "instagram";

  // Validate against allowed platforms
  const allowed = ["facebook", "instagram", "tiktok", "youtube", "linkedin", "other"];
  return allowed.includes(normalized) ? normalized : "facebook";
}

// Validate URL
function validateAdUrl(url: string): { valid: boolean; error?: string } {
  // Must be HTTPS
  if (!url.startsWith("https://")) {
    return { valid: false, error: "Ad URL must use HTTPS" };
  }

  try {
    const parsed = new URL(url);

    // Check domain whitelist
    const allowedDomains = ["facebook.com", "instagram.com", "tiktok.com", "youtube.com"];
    const isAllowed = allowedDomains.some((domain) =>
      parsed.hostname.toLowerCase().includes(domain)
    );

    if (!isAllowed) {
      return {
        valid: false,
        error: "Only Facebook, Instagram, TikTok, and YouTube ad URLs are supported",
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

// Send confirmation email via Resend
async function sendConfirmationEmail(
  userEmail: string,
  submissionData: {
    adUrl: string;
    platform: string;
    companyName?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress =
    Deno.env.get("RESEND_FROM_EMAIL") || "Brian at APSICS Media <brian@apsicsmedia.com>";

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured - skipping confirmation email");
    return { success: false, error: "Email service not configured" };
  }

  const platformLabel =
    submissionData.platform.charAt(0).toUpperCase() + submissionData.platform.slice(1);
  const companyInfo = submissionData.companyName
    ? ` from ${submissionData.companyName}`
    : "";

  const emailBody = `
New Ad Saved - APSICS Creative Intelligence

Hi there,

We've successfully saved a ${platformLabel} ad${companyInfo} to your Custom Ad Iteration library.

Ad URL: ${submissionData.adUrl}
Platform: ${platformLabel}
${submissionData.companyName ? `Company: ${submissionData.companyName}\n` : ""}
Ready to remix this creative with APSICS intelligence? Head to your dashboard and generate new variations based on proven performance frameworks.

→ View your saved ads: https://apsicsmedia.com/custom-ad-iteration-tool

---

This confirmation was sent because you (or your iOS Shortcut) saved an ad to APSICS Media.
Questions? Reply to this email.

— Brian at APSICS Media
`.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [userEmail],
        subject: `New ${platformLabel} ad saved${companyInfo}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend API error:", errorText);
      return { success: false, error: `Email service error: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: buildCorsHeaders(req) });
  }

  // Validate environment
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
    const error = "Missing required environment variables";
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
    });
  }

  try {
    // Authenticate user (JWT or share token)
    let userId: string | null = null;
    let userEmail: string | null = null;

    // Try standard JWT auth first
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (!authError && user) {
        userId = user.id;
        userEmail = user.email ?? null;
      }
    }

    // Try share token auth if JWT failed
    if (!userId) {
      const shareToken = req.headers.get("x-apsics-share-token");
      if (shareToken) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Verify token via database function
        const { data: verifiedUserId, error: tokenError } = await supabase.rpc(
          "verify_custom_ad_share_token",
          { p_raw_token: shareToken }
        );

        if (!tokenError && verifiedUserId) {
          userId = verifiedUserId;

          // Fetch user email
          const { data: userData } = await supabase.auth.admin.getUserById(userId);
          userEmail = userData?.user?.email ?? null;
        }
      }
    }

    // Require authentication
    if (!userId) {
      return new Response(
        JSON.stringify({
          error:
            "Authentication required. Provide valid Authorization header or X-APSICS-Share-Token.",
        }),
        {
          status: 401,
          headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { adUrl, platform, companyName, source = "ios_shortcut" } = body;

    // Validate required fields
    if (!adUrl) {
      return new Response(JSON.stringify({ error: "adUrl is required" }), {
        status: 400,
        headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
      });
    }

    // Validate and normalize
    const urlValidation = validateAdUrl(adUrl);
    if (!urlValidation.valid) {
      return new Response(JSON.stringify({ error: urlValidation.error }), {
        status: 400,
        headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
      });
    }

    const normalizedPlatform = normalizePlatform(platform);
    const trimmedCompanyName = companyName?.trim().slice(0, 150);

    // Upsert submission (avoid duplicates per user)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: submission, error: upsertError } = await supabase
      .from("custom_ad_submissions")
      .upsert(
        {
          user_id: userId,
          ad_url: adUrl,
          platform: normalizedPlatform,
          company_name: trimmedCompanyName || null,
          source,
          metadata: {
            user_agent: req.headers.get("user-agent") || null,
            created_via: source,
          },
        },
        {
          onConflict: "user_id,ad_url",
          ignoreDuplicates: false,
        }
      )
      .select("id, created_at, updated_at, platform, company_name, ad_url")
      .single();

    if (upsertError) {
      console.error("Upsert error:", upsertError);
      return new Response(JSON.stringify({ error: "Failed to save ad submission" }), {
        status: 500,
        headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
      });
    }

    // Log to analytics
    try {
      await supabase.rpc("log_ai_tool_usage", {
        p_user_id: userId,
        p_tool_type: "custom-ad-iteration",
        p_input_payload: {
          ad_url: adUrl,
          platform: normalizedPlatform,
          source,
        },
        p_credits_spent: 0, // Saving ads is free
        p_status: "completed",
        p_source: source,
      });
    } catch (analyticsError) {
      // Log but don't fail request
      console.warn("Analytics logging failed:", analyticsError);
    }

    // Send confirmation email
    if (userEmail) {
      const emailResult = await sendConfirmationEmail(userEmail, {
        adUrl,
        platform: normalizedPlatform,
        companyName: trimmedCompanyName,
      });

      if (!emailResult.success) {
        console.warn("Email send failed:", emailResult.error);
        // Don't fail the request - submission succeeded
      }
    }

    // Return success response
    const platformLabel =
      normalizedPlatform.charAt(0).toUpperCase() + normalizedPlatform.slice(1);

    return new Response(
      JSON.stringify({
        success: true,
        submissionId: submission.id,
        createdAt: submission.created_at,
        updatedAt: submission.updated_at,
        platformLabel,
        message: `Successfully saved ${platformLabel} ad`,
      }),
      {
        status: 200,
        headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Capture shared ad error:", error);

    // Use Sentry if available
    try {
      await captureEdgeFunctionError(error, {
        function_name: "capture-shared-ad",
        request_method: req.method,
        request_url: req.url,
      });
    } catch {
      // Ignore Sentry errors
    }

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
      }
    );
  }
});
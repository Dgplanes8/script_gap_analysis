/**
 * Usage tracking utilities for APSICS AI Tools
 * Provides consistent tracking across all tools with detailed analytics
 */

import type { BrowserClient } from '@/lib/supabase/browser-client';
import { createHash } from 'crypto';

export type ToolType = 'script-generator' | 'brief-generator' | 'iteration-tool';
export type UsageStatus = 'processing' | 'completed' | 'failed' | 'timeout';
export type UsageSource = 'web' | 'api' | 'mobile';

export interface UsageTrackingData {
  // Required fields
  toolType: ToolType;
  inputPayload: Record<string, any>;
  creditsSpent?: number;

  // Optional context
  outputPayload?: Record<string, any>;
  processingMs?: number;
  aiModel?: string;
  apiCalls?: number;
  creditCostUsd?: number;
  status?: UsageStatus;
  errorType?: string;
  errorMessage?: string;
  source?: UsageSource;

  // Attribution
  userAgent?: string;
  referrer?: string;
}

export interface SessionTrackingData {
  sessionId: string;
  toolUsed?: ToolType;

  // Attribution (usually from URL params or headers)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  landingPage?: string;

  // Device info
  userAgent?: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
}

/**
 * Hash IP address for privacy-compliant tracking
 */
function hashIpAddress(ipAddress: string, salt: string = 'apsics-salt'): string {
  return createHash('sha256').update(ipAddress + salt).digest('hex');
}

/**
 * Generate anonymous key from request context
 */
export function generateAnonymousKey(request?: Request): string {
  if (!request) {
    // Fallback for client-side
    return `anon_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';

  // Create a consistent anonymous key for the session
  const rawKey = `${hashIpAddress(ip)}_${createHash('md5').update(userAgent).digest('hex').substring(0, 8)}`;
  return rawKey;
}

/**
 * Extract user attribution from request or URL
 */
export function extractAttribution(request?: Request, searchParams?: URLSearchParams): Partial<SessionTrackingData> {
  const params = searchParams || (request ? new URL(request.url).searchParams : new URLSearchParams());

  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    referrer: request?.headers.get('referer') || undefined,
    userAgent: request?.headers.get('user-agent') || undefined,
  };
}

/**
 * Track AI tool usage - call this from your edge functions
 */
export async function trackToolUsage(
  supabase: BrowserClient,
  data: UsageTrackingData,
  userId?: string | null,
  anonymousKey?: string,
  request?: Request
): Promise<{ usageId: string | null; error: string | null }> {
  try {
    const ipHash = request ? hashIpAddress(
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    ) : undefined;

    const { data: result, error } = await supabase.rpc('log_ai_tool_usage', {
      p_user_id: userId || null,
      p_anonymous_key: anonymousKey || generateAnonymousKey(request),
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

/**
 * Track script generation specifically
 */
export async function trackScriptGeneration(
  supabase: BrowserClient,
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
  anonymousKey?: string
): Promise<{ scriptId: string | null; error: string | null }> {
  try {
    // Count words in generated script
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

/**
 * Track user session activity
 */
export async function trackSessionActivity(
  supabase: BrowserClient,
  data: SessionTrackingData,
  userId?: string | null,
  anonymousKey?: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.rpc('update_session_activity', {
      p_session_id: data.sessionId,
      p_user_id: userId || null,
      p_anonymous_key: anonymousKey || null,
      p_tool_used: data.toolUsed || null
    });

    if (error) {
      console.error('Session tracking failed:', error);
      return { error: error.message };
    }

    // Also update with attribution data if provided
    if (data.utmSource || data.referrer || data.userAgent) {
      await supabase
        .from('user_sessions')
        .update({
          utm_source: data.utmSource || null,
          utm_medium: data.utmMedium || null,
          utm_campaign: data.utmCampaign || null,
          utm_content: data.utmContent || null,
          utm_term: data.utmTerm || null,
          referrer: data.referrer || null,
          landing_page: data.landingPage || null,
          user_agent: data.userAgent || null,
          device_type: data.deviceType || null,
        })
        .eq('session_id', data.sessionId);
    }

    return { error: null };
  } catch (err) {
    console.error('Session tracking error:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Track feature usage within tools
 */
export async function trackFeatureUsage(
  supabase: BrowserClient,
  data: {
    sessionId?: string;
    usageId?: string;
    toolType: ToolType;
    featureName: string;
    featureCategory?: string;
    actionTaken: string;
    metadata?: Record<string, any>;
  },
  userId?: string | null
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('feature_usage')
      .insert({
        session_id: data.sessionId || null,
        usage_id: data.usageId || null,
        user_id: userId || null,
        tool_type: data.toolType,
        feature_name: data.featureName,
        feature_category: data.featureCategory || null,
        action_taken: data.actionTaken,
        metadata: data.metadata || null
      });

    if (error) {
      console.error('Feature tracking failed:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (err) {
    console.error('Feature tracking error:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Get usage analytics for a user
 */
export async function getUserUsageAnalytics(
  supabase: BrowserClient,
  userId: string
): Promise<{
  data: {
    totalGenerations: number;
    toolsUsed: string[];
    totalCreditsSpent: number;
    avgProcessingTime: number;
    successRate: number;
    lastUsed: string;
    firstUsed: string;
  } | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('user_engagement_metrics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return {
      data: {
        totalGenerations: (data as any)?.total_generations ?? 0,
        toolsUsed: (data as any)?.tools_used ?? [],
        totalCreditsSpent: (data as any)?.total_credits_spent ?? 0,
        avgProcessingTime: (data as any)?.avg_processing_ms ?? 0,
        successRate: (data as any)?.success_rate_pct ?? 0,
        lastUsed: (data as any)?.last_usage ?? null,
        firstUsed: (data as any)?.first_usage ?? null,
      },
      error: null
    };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Client-side session ID generation
 */
export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Browser-based device detection
 */
export function detectDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = navigator.userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';

  return 'desktop';
}
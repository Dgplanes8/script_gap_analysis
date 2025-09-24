-- APSICS Media - Comprehensive Usage Tracking Schema
-- Unified tracking across all AI tools with analytics capabilities
-- Run in Supabase SQL Editor

-- #############################################################
-- ## PART 1: UNIFIED TOOL USAGE TRACKING                     ##
-- #############################################################

-- Central table to track usage across all AI tools
CREATE TABLE IF NOT EXISTS public.ai_tool_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  anonymous_key text, -- for anonymous users (hashed IP or session)

  -- Tool and request details
  tool_type text NOT NULL CHECK (tool_type IN ('script-generator', 'brief-generator', 'iteration-tool')),
  request_id uuid, -- links to specific tool tables

  -- Input tracking
  input_payload jsonb NOT NULL,
  input_size_bytes integer,

  -- Output tracking
  output_payload jsonb,
  output_size_bytes integer,
  output_word_count integer,

  -- Performance metrics
  processing_ms integer,
  ai_model_used text,
  api_calls_made integer DEFAULT 1,

  -- Business metrics
  credits_spent integer NOT NULL DEFAULT 1,
  credit_cost_usd numeric(10,4), -- track actual cost

  -- Context and attribution
  source text DEFAULT 'web' CHECK (source IN ('web', 'api', 'mobile')),
  user_agent text,
  referrer text,
  ip_address_hash text, -- hashed for privacy

  -- Status and errors
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed', 'timeout')),
  error_type text,
  error_message text,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,

  -- Derived fields for analytics
  completion_duration interval GENERATED ALWAYS AS (completed_at - created_at) STORED,
  is_anonymous boolean GENERATED ALWAYS AS (user_id IS NULL) STORED,
  success boolean GENERATED ALWAYS AS (status = 'completed') STORED
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS ai_tool_usage_user_id_idx ON public.ai_tool_usage (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_tool_usage_tool_type_idx ON public.ai_tool_usage (tool_type, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_tool_usage_anonymous_idx ON public.ai_tool_usage (anonymous_key, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_tool_usage_status_idx ON public.ai_tool_usage (status, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_tool_usage_created_at_idx ON public.ai_tool_usage (created_at DESC);

-- RLS policies
ALTER TABLE public.ai_tool_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view their own usage" ON public.ai_tool_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can manage all data
CREATE POLICY "Service role manages usage data" ON public.ai_tool_usage
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## PART 2: SCRIPT GENERATOR SPECIFIC TRACKING             ##
-- #############################################################

-- Detailed tracking for script generator (missing from current schema)
CREATE TABLE IF NOT EXISTS public.ai_script_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to unified tracking
  usage_id uuid REFERENCES public.ai_tool_usage (id) ON DELETE CASCADE,

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  anonymous_key text,

  -- Script generation specifics
  company_name text NOT NULL,
  website_url text NOT NULL,
  product_description text,
  platform text, -- facebook, instagram, tiktok, etc.
  objective text, -- awareness, leads, sales, etc.
  ad_format text NOT NULL CHECK (ad_format IN ('video', 'static')),

  -- Generated content
  generated_script text,
  script_word_count integer,
  hooks_generated text[], -- array of hooks if applicable
  ctas_generated text[], -- array of CTAs

  -- Quality metrics
  script_quality_score integer, -- 1-100 if you have scoring
  platform_optimized boolean DEFAULT true,

  -- Business metrics
  credits_used integer NOT NULL DEFAULT 1,

  -- Status
  status text NOT NULL DEFAULT 'completed',
  error_message text,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Indexes
CREATE INDEX IF NOT EXISTS ai_script_generations_user_id_idx ON public.ai_script_generations (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_script_generations_platform_idx ON public.ai_script_generations (platform, created_at DESC);
CREATE INDEX IF NOT EXISTS ai_script_generations_ad_format_idx ON public.ai_script_generations (ad_format, created_at DESC);

-- RLS
ALTER TABLE public.ai_script_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their script generations" ON public.ai_script_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role manages script data" ON public.ai_script_generations
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## PART 3: USER JOURNEY & SESSION TRACKING                ##
-- #############################################################

-- Track user sessions and tool usage patterns
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  anonymous_key text,
  session_id text NOT NULL, -- frontend generated session ID

  -- Session details
  started_at timestamptz DEFAULT now(),
  last_activity_at timestamptz DEFAULT now(),
  ended_at timestamptz,

  -- Usage during session
  tools_used text[] DEFAULT '{}', -- array of tool types used
  total_generations integer DEFAULT 0,
  total_credits_spent integer DEFAULT 0,

  -- Attribution
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  landing_page text,

  -- Device/browser info
  user_agent text,
  device_type text, -- mobile, desktop, tablet
  browser text,
  os text,

  -- Derived metrics
  session_duration interval GENERATED ALWAYS AS (
    COALESCE(ended_at, last_activity_at) - started_at
  ) STORED,
  converted_to_signup boolean DEFAULT false,
  converted_to_purchase boolean DEFAULT false
);

-- Indexes
CREATE INDEX IF NOT EXISTS user_sessions_user_id_idx ON public.user_sessions (user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS user_sessions_anonymous_idx ON public.user_sessions (anonymous_key, started_at DESC);
CREATE INDEX IF NOT EXISTS user_sessions_session_id_idx ON public.user_sessions (session_id);

-- RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role manages session data" ON public.user_sessions
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## PART 4: FEATURE USAGE TRACKING                         ##
-- #############################################################

-- Track specific feature usage within tools
CREATE TABLE IF NOT EXISTS public.feature_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to session and tool usage
  session_id uuid REFERENCES public.user_sessions (id) ON DELETE CASCADE,
  usage_id uuid REFERENCES public.ai_tool_usage (id) ON DELETE CASCADE,

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,

  -- Feature details
  tool_type text NOT NULL,
  feature_name text NOT NULL, -- 'file-upload', 'url-input', 'format-selection', etc.
  feature_category text, -- 'input', 'output', 'export', 'sharing'

  -- Usage context
  action_taken text NOT NULL, -- 'click', 'upload', 'download', 'copy', 'share'
  metadata jsonb, -- additional context about the feature use

  -- Timing
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS feature_usage_tool_feature_idx ON public.feature_usage (tool_type, feature_name, created_at DESC);
CREATE INDEX IF NOT EXISTS feature_usage_user_id_idx ON public.feature_usage (user_id, created_at DESC);

-- RLS
ALTER TABLE public.feature_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their feature usage" ON public.feature_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role manages feature data" ON public.feature_usage
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## PART 5: BUSINESS INTELLIGENCE VIEWS                    ##
-- #############################################################

-- Daily usage summary across all tools
CREATE OR REPLACE VIEW public.daily_usage_summary AS
SELECT
  DATE(created_at) as usage_date,
  tool_type,
  COUNT(*) as total_generations,
  COUNT(DISTINCT user_id) as unique_authenticated_users,
  COUNT(DISTINCT anonymous_key) FILTER (WHERE user_id IS NULL) as unique_anonymous_users,
  SUM(credits_spent) as total_credits_spent,
  AVG(processing_ms) as avg_processing_ms,
  COUNT(*) FILTER (WHERE status = 'completed') as successful_generations,
  COUNT(*) FILTER (WHERE status = 'failed') as failed_generations,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)::numeric * 100, 2
  ) as success_rate_pct
FROM public.ai_tool_usage
GROUP BY DATE(created_at), tool_type
ORDER BY usage_date DESC, tool_type;

-- User engagement metrics
CREATE OR REPLACE VIEW public.user_engagement_metrics AS
SELECT
  user_id,
  COUNT(DISTINCT tool_type) as tools_used,
  COUNT(*) as total_generations,
  SUM(credits_spent) as total_credits_spent,
  MIN(created_at) as first_usage,
  MAX(created_at) as last_usage,
  MAX(created_at) - MIN(created_at) as usage_span,
  ROUND(AVG(processing_ms), 0) as avg_processing_ms,

  -- Tool preferences
  COUNT(*) FILTER (WHERE tool_type = 'script-generator') as script_generations,
  COUNT(*) FILTER (WHERE tool_type = 'brief-generator') as brief_generations,
  COUNT(*) FILTER (WHERE tool_type = 'iteration-tool') as iteration_generations,

  -- Success rates
  ROUND(
    COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)::numeric * 100, 2
  ) as success_rate_pct
FROM public.ai_tool_usage
WHERE user_id IS NOT NULL
GROUP BY user_id;

-- Tool popularity and performance
CREATE OR REPLACE VIEW public.tool_performance_summary AS
SELECT
  tool_type,
  COUNT(*) as total_usage,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(processing_ms) as avg_processing_ms,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY processing_ms) as median_processing_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY processing_ms) as p95_processing_ms,

  -- Success metrics
  COUNT(*) FILTER (WHERE status = 'completed') as successful_uses,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)::numeric * 100, 2
  ) as success_rate_pct,

  -- Business metrics
  SUM(credits_spent) as total_credits_consumed,
  AVG(credits_spent) as avg_credits_per_use,

  -- Recent activity
  MAX(created_at) as last_used,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as usage_last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as usage_last_30_days
FROM public.ai_tool_usage
GROUP BY tool_type;

-- Anonymous vs authenticated usage patterns
CREATE OR REPLACE VIEW public.usage_by_user_type AS
SELECT
  CASE WHEN user_id IS NULL THEN 'anonymous' ELSE 'authenticated' END as user_type,
  tool_type,
  COUNT(*) as total_usage,
  COUNT(DISTINCT COALESCE(user_id::text, anonymous_key)) as unique_users,
  AVG(processing_ms) as avg_processing_ms,
  SUM(credits_spent) as total_credits_spent,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)::numeric * 100, 2
  ) as success_rate_pct
FROM public.ai_tool_usage
GROUP BY
  CASE WHEN user_id IS NULL THEN 'anonymous' ELSE 'authenticated' END,
  tool_type
ORDER BY user_type, tool_type;

-- #############################################################
-- ## PART 6: HELPER FUNCTIONS                               ##
-- #############################################################

-- Function to log tool usage (called from edge functions)
CREATE OR REPLACE FUNCTION public.log_ai_tool_usage(
  p_user_id uuid DEFAULT NULL,
  p_anonymous_key text DEFAULT NULL,
  p_tool_type text DEFAULT NULL,
  p_input_payload jsonb DEFAULT NULL,
  p_output_payload jsonb DEFAULT NULL,
  p_processing_ms integer DEFAULT NULL,
  p_credits_spent integer DEFAULT 1,
  p_status text DEFAULT 'completed',
  p_error_message text DEFAULT NULL,
  p_source text DEFAULT 'web'
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  usage_id uuid;
BEGIN
  INSERT INTO public.ai_tool_usage (
    user_id,
    anonymous_key,
    tool_type,
    input_payload,
    output_payload,
    input_size_bytes,
    output_size_bytes,
    output_word_count,
    processing_ms,
    credits_spent,
    status,
    error_message,
    source,
    completed_at
  ) VALUES (
    p_user_id,
    p_anonymous_key,
    p_tool_type,
    p_input_payload,
    p_output_payload,
    LENGTH(p_input_payload::text),
    LENGTH(COALESCE(p_output_payload::text, '')),
    -- Simple word count estimation
    CASE
      WHEN p_output_payload IS NOT NULL THEN
        array_length(string_to_array(trim(p_output_payload->>'script'), ' '), 1)
      ELSE NULL
    END,
    p_processing_ms,
    p_credits_spent,
    p_status,
    p_error_message,
    p_source,
    CASE WHEN p_status = 'completed' THEN NOW() ELSE NULL END
  ) RETURNING id INTO usage_id;

  RETURN usage_id;
END;
$$;

-- Function to update session activity
CREATE OR REPLACE FUNCTION public.update_session_activity(
  p_session_id text,
  p_user_id uuid DEFAULT NULL,
  p_anonymous_key text DEFAULT NULL,
  p_tool_used text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_sessions (
    session_id,
    user_id,
    anonymous_key,
    tools_used,
    total_generations
  ) VALUES (
    p_session_id,
    p_user_id,
    p_anonymous_key,
    CASE WHEN p_tool_used IS NOT NULL THEN ARRAY[p_tool_used] ELSE '{}' END,
    CASE WHEN p_tool_used IS NOT NULL THEN 1 ELSE 0 END
  )
  ON CONFLICT (session_id) DO UPDATE SET
    last_activity_at = NOW(),
    tools_used = CASE
      WHEN p_tool_used IS NOT NULL AND NOT (p_tool_used = ANY(user_sessions.tools_used))
      THEN array_append(user_sessions.tools_used, p_tool_used)
      ELSE user_sessions.tools_used
    END,
    total_generations = CASE
      WHEN p_tool_used IS NOT NULL THEN user_sessions.total_generations + 1
      ELSE user_sessions.total_generations
    END;
END;
$$;

-- #############################################################
-- ## PART 7: MATERIALIZED VIEWS FOR ANALYTICS              ##
-- #############################################################

-- Hourly usage patterns (refresh as needed)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.hourly_usage_patterns AS
SELECT
  EXTRACT(hour FROM created_at) as hour_of_day,
  EXTRACT(dow FROM created_at) as day_of_week, -- 0=Sunday, 6=Saturday
  tool_type,
  COUNT(*) as usage_count,
  AVG(processing_ms) as avg_processing_ms,
  COUNT(DISTINCT user_id) as unique_users
FROM public.ai_tool_usage
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY
  EXTRACT(hour FROM created_at),
  EXTRACT(dow FROM created_at),
  tool_type
ORDER BY day_of_week, hour_of_day, tool_type;

-- User cohort analysis
CREATE MATERIALIZED VIEW IF NOT EXISTS public.user_cohorts AS
SELECT
  DATE_TRUNC('week', first_usage) as cohort_week,
  tool_type as first_tool_used,
  COUNT(DISTINCT user_id) as users_in_cohort,
  AVG(total_generations) as avg_generations_per_user,
  AVG(total_credits_spent) as avg_credits_per_user,
  COUNT(DISTINCT user_id) FILTER (WHERE total_generations > 1) as retained_users,
  ROUND(
    COUNT(DISTINCT user_id) FILTER (WHERE total_generations > 1)::numeric /
    COUNT(DISTINCT user_id)::numeric * 100, 2
  ) as retention_rate_pct
FROM (
  SELECT
    user_id,
    MIN(created_at) as first_usage,
    (array_agg(tool_type ORDER BY created_at))[1] as tool_type,
    COUNT(*) as total_generations,
    SUM(credits_spent) as total_credits_spent
  FROM public.ai_tool_usage
  WHERE user_id IS NOT NULL
  GROUP BY user_id
) user_stats
GROUP BY DATE_TRUNC('week', first_usage), tool_type
ORDER BY cohort_week DESC;

COMMENT ON TABLE public.ai_tool_usage IS 'Unified tracking of all AI tool usage across script generator, brief generator, and iteration tool';
COMMENT ON TABLE public.ai_script_generations IS 'Detailed tracking specific to AI script generator usage and outputs';
COMMENT ON TABLE public.user_sessions IS 'User session tracking for journey analysis and attribution';
COMMENT ON TABLE public.feature_usage IS 'Granular feature usage within each AI tool';

-- Refresh materialized views (run periodically)
-- REFRESH MATERIALIZED VIEW public.hourly_usage_patterns;
-- REFRESH MATERIALIZED VIEW public.user_cohorts;
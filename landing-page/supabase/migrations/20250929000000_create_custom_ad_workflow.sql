-- APSICS Media - Custom Ad Iteration Workflow Schema
-- Enables users to save competitor ads and generate APSICS-crafted remixes
-- Run in Supabase SQL Editor or via migration

-- ##############################################################
-- ## PART 1: CUSTOM AD SUBMISSIONS TABLE                      ##
-- ##############################################################

-- Stores shared ad links from iOS Shortcut or web
CREATE TABLE IF NOT EXISTS public.custom_ad_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,

  -- User identification (required - logged-in feature only)
  user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,

  -- Platform and source info
  platform text CHECK (platform IN ('facebook', 'instagram', 'meta', 'tiktok', 'linkedin', 'youtube', 'other')) DEFAULT 'facebook' NOT NULL,
  source text DEFAULT 'ios_shortcut' CHECK (source IN ('ios_shortcut', 'web', 'api')),

  -- Ad details
  ad_url text NOT NULL,
  company_name text,

  -- Additional metadata (flexible JSONB for future expansion)
  metadata jsonb DEFAULT '{}'::jsonb,

  -- Constraint: one URL per user (upsert pattern)
  UNIQUE(user_id, ad_url)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS custom_ad_submissions_user_id_idx
  ON public.custom_ad_submissions (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS custom_ad_submissions_platform_idx
  ON public.custom_ad_submissions (platform, created_at DESC);

CREATE INDEX IF NOT EXISTS custom_ad_submissions_created_at_idx
  ON public.custom_ad_submissions (created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_custom_ad_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_custom_ad_submissions_timestamp
  BEFORE UPDATE ON public.custom_ad_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_ad_submissions_updated_at();

-- RLS policies
ALTER TABLE public.custom_ad_submissions ENABLE ROW LEVEL SECURITY;

-- Users can select/insert/update/delete their own submissions
CREATE POLICY "Users manage their own ad submissions"
  ON public.custom_ad_submissions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all data
CREATE POLICY "Service role manages all submissions"
  ON public.custom_ad_submissions
  FOR ALL
  USING (auth.role() = 'service_role');

-- ##############################################################
-- ## PART 2: CUSTOM AD CREATIONS TABLE                        ##
-- ##############################################################

-- Tracks ad generations based on saved submissions
CREATE TABLE IF NOT EXISTS public.custom_ad_creations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,

  -- Link to base submission (cascade delete if submission removed)
  submission_id uuid REFERENCES public.custom_ad_submissions (id) ON DELETE CASCADE,

  -- Request and response data
  request_payload jsonb NOT NULL,
  result_payload jsonb,

  -- Status tracking
  status text CHECK (status IN ('pending', 'complete', 'failed')) DEFAULT 'pending' NOT NULL,

  -- Business metrics
  credits_spent integer DEFAULT 1 CHECK (credits_spent >= 0)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS custom_ad_creations_user_id_idx
  ON public.custom_ad_creations (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS custom_ad_creations_submission_id_idx
  ON public.custom_ad_creations (submission_id, created_at DESC);

CREATE INDEX IF NOT EXISTS custom_ad_creations_status_idx
  ON public.custom_ad_creations (status, created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_custom_ad_creations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_custom_ad_creations_timestamp
  BEFORE UPDATE ON public.custom_ad_creations
  FOR EACH ROW
  EXECUTE FUNCTION update_custom_ad_creations_updated_at();

-- RLS policies
ALTER TABLE public.custom_ad_creations ENABLE ROW LEVEL SECURITY;

-- Users can select/insert/update their own creations
CREATE POLICY "Users manage their own ad creations"
  ON public.custom_ad_creations
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all data
CREATE POLICY "Service role manages all creations"
  ON public.custom_ad_creations
  FOR ALL
  USING (auth.role() = 'service_role');

-- ##############################################################
-- ## PART 3: SHARE TOKENS TABLE (Mobile Auth)                 ##
-- ##############################################################

-- Stores secure tokens for iOS Shortcut authentication
CREATE TABLE IF NOT EXISTS public.custom_ad_share_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User identification
  user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,

  -- Token (hashed for security - never store raw token)
  token_hash text NOT NULL UNIQUE,

  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz,

  -- Optional metadata
  label text,
  last_used_at timestamptz
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS custom_ad_share_tokens_user_id_idx
  ON public.custom_ad_share_tokens (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS custom_ad_share_tokens_token_hash_idx
  ON public.custom_ad_share_tokens (token_hash);

CREATE INDEX IF NOT EXISTS custom_ad_share_tokens_expires_idx
  ON public.custom_ad_share_tokens (expires_at)
  WHERE expires_at IS NOT NULL;

-- RLS policies
ALTER TABLE public.custom_ad_share_tokens ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own tokens
CREATE POLICY "Users manage their own share tokens"
  ON public.custom_ad_share_tokens
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all tokens
CREATE POLICY "Service role manages all tokens"
  ON public.custom_ad_share_tokens
  FOR ALL
  USING (auth.role() = 'service_role');

-- ##############################################################
-- ## PART 4: HELPER FUNCTIONS                                 ##
-- ##############################################################

-- Generate a new share token for a user
-- Returns: { raw_token, token_hash, token_id }
CREATE OR REPLACE FUNCTION public.generate_custom_ad_share_token(
  p_user_id uuid,
  p_label text DEFAULT NULL,
  p_expires_days integer DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_raw_token text;
  v_token_hash text;
  v_token_id uuid;
  v_expires_at timestamptz;
BEGIN
  -- Generate a secure random token (32 characters)
  v_raw_token := encode(gen_random_bytes(24), 'base64');
  v_raw_token := replace(replace(replace(v_raw_token, '+', '-'), '/', '_'), '=', '');

  -- Hash the token for storage
  v_token_hash := encode(digest(v_raw_token, 'sha256'), 'hex');

  -- Calculate expiration if specified
  IF p_expires_days IS NOT NULL THEN
    v_expires_at := now() + (p_expires_days || ' days')::interval;
  END IF;

  -- Insert token record
  INSERT INTO public.custom_ad_share_tokens (
    user_id,
    token_hash,
    expires_at,
    label
  ) VALUES (
    p_user_id,
    v_token_hash,
    v_expires_at,
    p_label
  ) RETURNING id INTO v_token_id;

  -- Return both raw token (show once to user) and metadata
  RETURN jsonb_build_object(
    'raw_token', v_raw_token,
    'token_hash', v_token_hash,
    'token_id', v_token_id,
    'expires_at', v_expires_at,
    'label', p_label
  );
END;
$$;

-- Verify a share token and return user_id if valid
CREATE OR REPLACE FUNCTION public.verify_custom_ad_share_token(
  p_raw_token text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token_hash text;
  v_user_id uuid;
  v_expires_at timestamptz;
BEGIN
  -- Hash the provided token
  v_token_hash := encode(digest(p_raw_token, 'sha256'), 'hex');

  -- Look up token and check expiration
  SELECT user_id, expires_at
  INTO v_user_id, v_expires_at
  FROM public.custom_ad_share_tokens
  WHERE token_hash = v_token_hash;

  -- If token not found, return NULL
  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Check if token is expired
  IF v_expires_at IS NOT NULL AND v_expires_at < now() THEN
    RETURN NULL;
  END IF;

  -- Update last_used_at
  UPDATE public.custom_ad_share_tokens
  SET last_used_at = now()
  WHERE token_hash = v_token_hash;

  RETURN v_user_id;
END;
$$;

-- ##############################################################
-- ## PART 5: ANALYTICS INTEGRATION                            ##
-- ##############################################################

-- Extend ai_tool_usage table to support custom-ad-iteration tool type
-- Note: This assumes the comprehensive_usage_tracking migration has run
-- If the check constraint doesn't exist yet, this will safely add it

DO $$
BEGIN
  -- Try to drop the existing constraint if it exists
  ALTER TABLE public.ai_tool_usage
    DROP CONSTRAINT IF EXISTS ai_tool_usage_tool_type_check;

  -- Add updated constraint with new tool type
  ALTER TABLE public.ai_tool_usage
    ADD CONSTRAINT ai_tool_usage_tool_type_check
    CHECK (tool_type IN ('script-generator', 'brief-generator', 'iteration-tool', 'custom-ad-iteration'));
EXCEPTION
  WHEN undefined_table THEN
    -- Table doesn't exist yet, skip this step
    RAISE NOTICE 'ai_tool_usage table not found - skipping analytics integration';
  WHEN OTHERS THEN
    -- Log other errors but don't fail migration
    RAISE NOTICE 'Could not update ai_tool_usage constraint: %', SQLERRM;
END $$;

-- Helper view: Submission summary with creation count
CREATE OR REPLACE VIEW public.custom_ad_submission_summaries AS
SELECT
  s.id,
  s.user_id,
  s.ad_url,
  s.platform,
  s.company_name,
  s.source,
  s.created_at,
  s.updated_at,
  COUNT(c.id) as total_generations,
  MAX(c.created_at) as last_generation_at,
  COALESCE(SUM(c.credits_spent), 0) as total_credits_spent
FROM public.custom_ad_submissions s
LEFT JOIN public.custom_ad_creations c ON c.submission_id = s.id
GROUP BY s.id, s.user_id, s.ad_url, s.platform, s.company_name, s.source, s.created_at, s.updated_at;

-- Comments for documentation
COMMENT ON TABLE public.custom_ad_submissions IS
  'Stores shared ad URLs from iOS Shortcut or web for authenticated users';

COMMENT ON TABLE public.custom_ad_creations IS
  'Tracks ad generation requests based on saved submissions';

COMMENT ON TABLE public.custom_ad_share_tokens IS
  'Secure tokens for iOS Shortcut authentication (hashed storage)';

COMMENT ON FUNCTION public.generate_custom_ad_share_token IS
  'Generates a secure share token for iOS Shortcut auth. Returns raw token (show once!) and metadata.';

COMMENT ON FUNCTION public.verify_custom_ad_share_token IS
  'Verifies a share token and returns the associated user_id if valid and not expired.';

COMMENT ON VIEW public.custom_ad_submission_summaries IS
  'Enriched view of submissions with generation counts and metrics';
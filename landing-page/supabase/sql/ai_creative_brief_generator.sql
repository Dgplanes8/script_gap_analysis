-- AI Creative Brief Generator schema setup

-- #############################################################
-- ## STEP 0: REQUIRED EXTENSIONS                             ##
-- #############################################################
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- #############################################################
-- ## STEP 1: PROFILES TABLE FOR AUTHENTICATED USERS          ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  credits_remaining integer DEFAULT 3,
  stripe_customer_id text UNIQUE,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles
  ADD CONSTRAINT IF NOT EXISTS profiles_id_fkey FOREIGN KEY (id)
  REFERENCES auth.users (id) ON DELETE CASCADE;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS research_mode_unlocked boolean DEFAULT false;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS brief_exports integer DEFAULT 0;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_brief_preview text;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view their profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update their profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- #############################################################
-- ## STEP 2: TRACK ANONYMOUS ACTIVITY                        ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.anonymous_usage (
  ip_address text NOT NULL PRIMARY KEY,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);

ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role manages anonymous usage" ON public.anonymous_usage
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## STEP 3: STORE CREATIVE BRIEF REQUESTS                   ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.creative_brief_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id),
  anonymous_key text,
  mode text NOT NULL CHECK (mode IN ('simple', 'advanced')),
  brief_format text NOT NULL,
  input_payload jsonb NOT NULL,
  brief_response jsonb,
  credit_cost integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'completed',
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

COMMENT ON TABLE public.creative_brief_requests IS
  'Audit log for all creative brief generations.';

ALTER TABLE public.creative_brief_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS creative_brief_requests_user_idx
  ON public.creative_brief_requests (user_id, created_at DESC);

CREATE POLICY IF NOT EXISTS "Users can see their brief history" ON public.creative_brief_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own requests" ON public.creative_brief_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Service role can manage anonymous rows" ON public.creative_brief_requests
  USING (auth.role() = 'service_role');

-- #############################################################
-- ## STEP 4: AUTOMATE PROFILE CREATION AND CREDIT CONSUMPTION ##
-- #############################################################
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
      AND tgrelid = 'auth.users'::regclass
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_creative_brief_credit(
  p_user_id uuid,
  p_cost integer
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET credits_remaining = credits_remaining - p_cost,
      updated_at = now()
  WHERE id = p_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_brief_export(
  p_user_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET brief_exports = brief_exports + 1,
      updated_at = now()
  WHERE id = p_user_id;
END;
$$;

-- #############################################################
-- ## STEP 5: OPTIONAL MATERIALIZED VIEW FOR ANALYTICS        ##
-- #############################################################
CREATE MATERIALIZED VIEW IF NOT EXISTS public.brief_usage_summary AS
SELECT
  coalesce(user_id::text, anonymous_key) AS actor_id,
  mode,
  brief_format,
  count(*) AS total_requests,
  max(created_at) AS last_requested_at
FROM public.creative_brief_requests
GROUP BY actor_id, mode, brief_format;

-- The materialized view must be refreshed manually or via automation.


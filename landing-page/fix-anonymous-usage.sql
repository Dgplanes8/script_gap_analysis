-- Fix anonymous_usage table
CREATE TABLE IF NOT EXISTS public.anonymous_usage (
  hashed_key text NOT NULL PRIMARY KEY,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for service role
DROP POLICY IF EXISTS "Service role manages anonymous usage" ON public.anonymous_usage;
CREATE POLICY "Service role manages anonymous usage" ON public.anonymous_usage
  USING (auth.role() = 'service_role');
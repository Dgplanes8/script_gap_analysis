-- AI Ad Iteration Tool schema additions
-- Run this script in the Supabase SQL editor after the base AI Ad Script Generator schema.

-- #############################################################
-- ## STORAGE BUCKET FOR UPLOADED CREATIVE                    ##
-- #############################################################
-- Creates a private bucket to temporarily store uploaded ad assets.
INSERT INTO storage.buckets (id, name, public)
VALUES ('ai-ad-iteration-assets', 'ai-ad-iteration-assets', false)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND polname = 'Allow anon uploads to iteration assets'
  ) THEN
    CREATE POLICY "Allow anon uploads to iteration assets"
      ON storage.objects FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'ai-ad-iteration-assets');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND polname = 'Allow authenticated uploads to iteration assets'
  ) THEN
    CREATE POLICY "Allow authenticated uploads to iteration assets"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'ai-ad-iteration-assets');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND polname = 'Allow anon signed-url reads for iteration assets'
  ) THEN
    CREATE POLICY "Allow anon signed-url reads for iteration assets"
      ON storage.objects FOR SELECT
      TO anon
      USING (bucket_id = 'ai-ad-iteration-assets');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND polname = 'Allow authenticated signed-url reads for iteration assets'
  ) THEN
    CREATE POLICY "Allow authenticated signed-url reads for iteration assets"
      ON storage.objects FOR SELECT
      TO authenticated
      USING (bucket_id = 'ai-ad-iteration-assets');
  END IF;
END $$;

-- #############################################################
-- ## ITERATION RUN LOGGING TABLE                             ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.ad_iteration_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users (id),
  request jsonb NOT NULL,
  result jsonb,
  credits_spent integer NOT NULL DEFAULT 1,
  processing_ms integer,
  source text DEFAULT 'web',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ad_iteration_runs_created_at_idx
  ON public.ad_iteration_runs (created_at DESC);

CREATE INDEX IF NOT EXISTS ad_iteration_runs_user_id_idx
  ON public.ad_iteration_runs (user_id);

COMMENT ON TABLE public.ad_iteration_runs IS 'Stores request/response payloads for AI Ad Iteration analyses.';

-- No RLS is enabled so that only the server-side service role reads/writes.
-- If you plan to expose history to end users, enable RLS and add per-user policies.

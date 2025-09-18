-- AI Ad Script Generator schema
-- Run inside Supabase SQL Editor or via Supabase CLI

-- #############################################################
-- ## STEP 1: PROFILES TABLE FOR REGISTERED USERS             ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  credits_remaining integer DEFAULT 3,
  stripe_customer_id text UNIQUE,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view their own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- #############################################################
-- ## STEP 2: ANONYMOUS USAGE TABLE                          ##
-- #############################################################
CREATE TABLE IF NOT EXISTS public.anonymous_usage (
  ip_address text NOT NULL PRIMARY KEY, -- stores salted SHA-256 hash of the requester's IP
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);

-- #############################################################
-- ## STEP 3: PROFILE CREATION TRIGGER                       ##
-- #############################################################
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

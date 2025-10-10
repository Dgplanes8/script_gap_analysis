-- Ensure profiles table properly links users to Stripe customers
-- This migration ensures that user accounts created during checkout
-- can be properly linked to their Stripe customer IDs

-- Add index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles (id);

-- Add index on stripe_customer_id for webhook lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON public.profiles (stripe_customer_id);

-- Ensure RLS policies allow service role to manage profiles
DROP POLICY IF EXISTS "Service role can manage all profiles" ON public.profiles;
CREATE POLICY "Service role can manage all profiles" ON public.profiles
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Add helpful comment
COMMENT ON COLUMN public.profiles.stripe_customer_id IS 'Links user profile to Stripe customer. Updated by webhook after successful checkout.';

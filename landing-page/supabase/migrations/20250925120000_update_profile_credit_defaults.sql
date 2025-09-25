-- Update default credits for new profiles and backfill existing records
ALTER TABLE public.profiles
  ALTER COLUMN credits_remaining SET DEFAULT 10;

UPDATE public.profiles
SET credits_remaining = 10,
    updated_at = now()
WHERE credits_remaining IS NULL OR credits_remaining < 10;

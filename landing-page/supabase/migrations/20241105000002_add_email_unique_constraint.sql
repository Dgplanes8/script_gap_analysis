-- Add unique constraint on email to prevent duplicates
-- This will prevent the same email from being inserted multiple times

-- First, remove any existing duplicates (keep the latest one)
WITH ranked_leads AS (
  SELECT id, email,
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC) as rn
  FROM public.package_leads
)
DELETE FROM public.package_leads
WHERE id IN (
  SELECT id FROM ranked_leads WHERE rn > 1
);

-- Now add the unique constraint
ALTER TABLE public.package_leads
ADD CONSTRAINT package_leads_email_unique UNIQUE (email);

-- Update the email index to be unique
DROP INDEX IF EXISTS package_leads_email_idx;
CREATE UNIQUE INDEX package_leads_email_unique_idx ON public.package_leads (email);
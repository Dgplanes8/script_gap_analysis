-- Create the ai-ad-iteration-assets storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('ai-ad-iteration-assets', 'ai-ad-iteration-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated users to upload files
CREATE POLICY IF NOT EXISTS "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to read their own files
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON storage.objects
FOR SELECT USING (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'authenticated'
);

-- Create policy to allow service role full access
CREATE POLICY IF NOT EXISTS "Allow service role access" ON storage.objects
FOR ALL USING (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'service_role'
);
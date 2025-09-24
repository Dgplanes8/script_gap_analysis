-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to upload to ai-ad-iteration-assets bucket
CREATE POLICY "Allow authenticated uploads to ai-ad-iteration-assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'authenticated'
);

-- Policy for authenticated users to read from ai-ad-iteration-assets bucket
CREATE POLICY "Allow authenticated read from ai-ad-iteration-assets" ON storage.objects
FOR SELECT USING (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'authenticated'
);

-- Policy for service role to have full access
CREATE POLICY "Allow service role full access to ai-ad-iteration-assets" ON storage.objects
FOR ALL USING (
  bucket_id = 'ai-ad-iteration-assets'
  AND auth.role() = 'service_role'
);

-- Policy for anonymous users to have limited access (for testing)
CREATE POLICY "Allow anonymous read from ai-ad-iteration-assets" ON storage.objects
FOR SELECT USING (
  bucket_id = 'ai-ad-iteration-assets'
);
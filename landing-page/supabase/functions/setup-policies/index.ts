import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("EDGE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("EDGE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase configuration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    // Create RLS policies for storage.objects
    const policies = [
      {
        name: "Allow authenticated uploads to ai-ad-iteration-assets",
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow authenticated uploads to ai-ad-iteration-assets"
          ON storage.objects FOR INSERT
          WITH CHECK (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated');
        `
      },
      {
        name: "Allow authenticated read from ai-ad-iteration-assets",
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow authenticated read from ai-ad-iteration-assets"
          ON storage.objects FOR SELECT
          USING (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated');
        `
      },
      {
        name: "Allow service role full access to ai-ad-iteration-assets",
        sql: `
          CREATE POLICY IF NOT EXISTS "Allow service role full access to ai-ad-iteration-assets"
          ON storage.objects FOR ALL
          USING (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'service_role');
        `
      }
    ];

    const results = [];
    for (const policy of policies) {
      const { error } = await adminClient.rpc('exec', { sql: policy.sql });
      if (error) {
        console.error(`Policy ${policy.name} error:`, error);
        results.push({ policy: policy.name, error: error.message });
      } else {
        results.push({ policy: policy.name, success: true });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Storage policies configured',
      results
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Policies setup error:', error);
    return new Response(JSON.stringify({ error: 'Policies setup failed', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
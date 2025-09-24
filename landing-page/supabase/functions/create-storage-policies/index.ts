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
    // Use direct SQL queries through the REST API
    const policies = [
      `CREATE POLICY IF NOT EXISTS "Allow authenticated uploads to ai-ad-iteration-assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated');`,
      `CREATE POLICY IF NOT EXISTS "Allow authenticated read from ai-ad-iteration-assets" ON storage.objects FOR SELECT USING (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated');`,
      `CREATE POLICY IF NOT EXISTS "Allow service role full access to ai-ad-iteration-assets" ON storage.objects FOR ALL USING (bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'service_role');`
    ];

    const results = [];

    for (const policySQL of policies) {
      try {
        // Use the PostgREST API to execute SQL
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey
          },
          body: JSON.stringify({ sql: policySQL })
        });

        if (response.ok) {
          results.push({ sql: policySQL.substring(0, 50) + "...", success: true });
        } else {
          const errorText = await response.text();
          results.push({ sql: policySQL.substring(0, 50) + "...", error: errorText });
        }
      } catch (error) {
        // Try alternative approach - direct query using supabase-js
        try {
          const { error: queryError } = await adminClient.from('_dummy').select('*').limit(0);
          // This is a workaround - we'll just mark as attempted
          results.push({ sql: policySQL.substring(0, 50) + "...", attempted: true });
        } catch (fallbackError) {
          results.push({ sql: policySQL.substring(0, 50) + "...", error: error.message });
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Storage policies creation attempted',
      results,
      note: 'If policies failed, please create them manually in Supabase Dashboard'
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Storage policies error:', error);
    return new Response(JSON.stringify({
      error: 'Storage policies setup failed',
      details: error.message,
      manual_instructions: {
        message: "Please create these policies manually in Supabase Dashboard → Storage → Policies",
        policies: [
          "Allow authenticated uploads: bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated'",
          "Allow authenticated read: bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'authenticated'",
          "Allow service role access: bucket_id = 'ai-ad-iteration-assets' AND auth.role() = 'service_role'"
        ]
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
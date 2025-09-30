import type { SupabaseClient } from '@supabase/supabase-js';

export type CustomAdSubmission = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  platform: string;
  ad_url: string;
  company_name: string | null;
  source: string;
  metadata: Record<string, unknown>;
};

export type CustomAdCreation = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  submission_id: string | null;
  request_payload: Record<string, unknown>;
  result_payload: Record<string, unknown> | null;
  status: 'pending' | 'complete' | 'failed';
  credits_spent: number;
};

export type EnrichedSubmission = CustomAdSubmission & {
  total_generations: number;
  last_generation_at: string | null;
  total_credits_spent: number;
};

/**
 * Fetch all submissions for a user with generation metadata
 */
export async function fetchUserSubmissions(
  supabase: SupabaseClient,
  userId: string
): Promise<{ data: EnrichedSubmission[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('custom_ad_submission_summaries')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching user submissions:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error fetching submissions:', err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error fetching submissions',
    };
  }
}

/**
 * Create a new ad creation record (pending state)
 */
export async function createAdCreationRecord(
  supabase: SupabaseClient,
  userId: string,
  submissionId: string | null,
  requestPayload: Record<string, unknown>
): Promise<{ data: CustomAdCreation | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('custom_ad_creations')
      .insert({
        user_id: userId,
        submission_id: submissionId,
        request_payload: requestPayload,
        status: 'pending',
        credits_spent: 0, // Will be updated after generation
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ad creation record:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error creating ad creation:', err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error creating record',
    };
  }
}

/**
 * Update an ad creation record (typically after generation completes)
 */
export async function updateAdCreationRecord(
  supabase: SupabaseClient,
  creationId: string,
  updates: {
    result_payload?: Record<string, unknown>;
    status?: 'pending' | 'complete' | 'failed';
    credits_spent?: number;
  }
): Promise<{ data: CustomAdCreation | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('custom_ad_creations')
      .update(updates)
      .eq('id', creationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating ad creation record:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error updating ad creation:', err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error updating record',
    };
  }
}

/**
 * List all ad creations for a specific submission
 */
export async function listAdCreationsBySubmission(
  supabase: SupabaseClient,
  submissionId: string
): Promise<{ data: CustomAdCreation[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('custom_ad_creations')
      .select('*')
      .eq('submission_id', submissionId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error listing ad creations:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error listing creations:', err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error listing creations',
    };
  }
}

/**
 * Delete a submission (cascade deletes associated creations)
 */
export async function deleteSubmission(
  supabase: SupabaseClient,
  submissionId: string,
  userId: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('custom_ad_submissions')
      .delete()
      .eq('id', submissionId)
      .eq('user_id', userId); // Ensure user owns it

    if (error) {
      console.error('Error deleting submission:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (err) {
    console.error('Unexpected error deleting submission:', err);
    return {
      error: err instanceof Error ? err.message : 'Unknown error deleting submission',
    };
  }
}
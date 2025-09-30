'use client';

import { useState, useEffect } from 'react';
import { AIFormTemplate } from '@/components/templates/ai-form-template';
import { getToolConfig } from '@/lib/template-configs';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import type { User } from '@supabase/supabase-js';
import type { EnrichedSubmission } from '@/lib/supabase/custom-ads';
import {
  ExternalLink,
  Trash2,
  Key,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';

const toolConfig = getToolConfig('custom-ad-iteration-tool');

if (!toolConfig) {
  throw new Error('Tool configuration not found');
}

export default function CustomAdIterationClientPage() {
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<EnrichedSubmission[]>([]);
  const [selectedSubmissionIds, setSelectedSubmissionIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showTokenPanel, setShowTokenPanel] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationResult, setGenerationResult] = useState<any>(null);

  const supabase = createBrowserClient();

  // Load user and submissions
  useEffect(() => {
    async function loadData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          await fetchSubmissions();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function fetchSubmissions() {
    try {
      const response = await fetch('/api/custom-ads');
      if (!response.ok) throw new Error('Failed to fetch submissions');

      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }

  async function handleGenerateToken() {
    try {
      const response = await fetch('/api/custom-ads/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: 'iOS Shortcut Token' }),
      });

      if (!response.ok) throw new Error('Failed to generate token');

      const data = await response.json();
      setGeneratedToken(data.token);
      setTokenCopied(false);
    } catch (error) {
      console.error('Error generating token:', error);
      alert('Failed to generate token. Please try again.');
    }
  }

  function handleCopyToken() {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    }
  }

  function toggleSubmissionSelection(id: string) {
    const newSelection = new Set(selectedSubmissionIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedSubmissionIds(newSelection);
  }

  async function handleDeleteSubmission(id: string) {
    if (!confirm('Delete this saved ad? This will also delete all generated remixes.')) return;

    try {
      const response = await fetch(`/api/custom-ads?submissionId=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      // Refresh submissions
      await fetchSubmissions();

      // Remove from selection if selected
      if (selectedSubmissionIds.has(id)) {
        const newSelection = new Set(selectedSubmissionIds);
        newSelection.delete(id);
        setSelectedSubmissionIds(newSelection);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. Please try again.');
    }
  }

  const platformLabels: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    linkedin: 'LinkedIn',
    other: 'Other',
  };

  const platformColors: Record<string, string> = {
    facebook: 'bg-blue-100 text-blue-800',
    instagram: 'bg-pink-100 text-pink-800',
    tiktok: 'bg-gray-900 text-white',
    youtube: 'bg-red-100 text-red-800',
    linkedin: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#126DFB]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to continue</h2>
        <p className="text-gray-600 mb-6">
          Create a free account to save ads and generate custom remixes with APSICS intelligence.
        </p>
        <button className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* iOS Shortcut Setup Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Key className="h-5 w-5 text-[#126DFB]" />
              <h3 className="text-lg font-semibold text-gray-900">
                iOS Shortcut Setup
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate a secure token to save ads directly from the Meta/Instagram app using iOS
              Shortcuts.
            </p>
          </div>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-[#126DFB] hover:text-[#0F5AD6] flex items-center space-x-1 text-sm font-medium"
          >
            <span>{showInstructions ? 'Hide' : 'Show'} Instructions</span>
            {showInstructions ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {showInstructions && (
          <div className="mt-4 space-y-4 text-sm text-gray-700 bg-white rounded-lg p-4">
            <div>
              <strong className="text-gray-900">Step 1: Generate Your Token</strong>
              <p className="text-gray-600 mt-1">
                Click "Generate Token" below to create a secure authentication token for the iOS
                Shortcut.
              </p>
            </div>

            <div>
              <strong className="text-gray-900">Step 2: Install the APSICS Shortcut</strong>
              <p className="text-gray-600 mt-1">
                Download and install the APSICS Ad Saver Shortcut from{' '}
                <a
                  href="https://www.icloud.com/shortcuts/apsics-ad-saver"
                  className="text-[#126DFB] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iCloud
                </a>{' '}
                (or create your own using the configuration below).
              </p>
            </div>

            <div>
              <strong className="text-gray-900">Step 3: Configure the Shortcut</strong>
              <p className="text-gray-600 mt-1">
                Open the Shortcuts app, edit the APSICS Ad Saver shortcut, and paste your token
                into the <code className="bg-gray-100 px-1 rounded">APSICS_SHARE_TOKEN</code>{' '}
                variable.
              </p>
            </div>

            <div>
              <strong className="text-gray-900">Step 4: Share Ads</strong>
              <p className="text-gray-600 mt-1">
                From Facebook or Instagram, tap Share on any ad → select APSICS Ad Saver. The ad
                will appear here instantly.
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center space-x-3">
          <button
            onClick={() => setShowTokenPanel(!showTokenPanel)}
            className="bg-[#126DFB] hover:bg-[#0F5AD6] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showTokenPanel ? 'Hide Token Panel' : 'Generate Token'}
          </button>

          {showTokenPanel && !generatedToken && (
            <button
              onClick={handleGenerateToken}
              className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Token
            </button>
          )}
        </div>

        {showTokenPanel && generatedToken && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-red-600 font-medium mb-2">
              ⚠️ Save this token securely - it won't be shown again
            </p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-50 px-3 py-2 rounded border border-gray-200 text-sm font-mono break-all">
                {generatedToken}
              </code>
              <button
                onClick={handleCopyToken}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded transition-colors"
              >
                {tokenCopied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Ads Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Saved Ads</h3>
          <p className="text-sm text-gray-600 mt-1">
            {submissions.length === 0
              ? 'No saved ads yet. Share an ad from Meta or Instagram to get started.'
              : `${submissions.length} saved ad${submissions.length === 1 ? '' : 's'}. Select one or more to generate remixes.`}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-4">
              Save your first ad by sharing it from the Facebook or Instagram app using the iOS
              Shortcut.
            </p>
            <button
              onClick={() => setShowInstructions(true)}
              className="text-[#126DFB] hover:text-[#0F5AD6] font-medium"
            >
              View Setup Instructions
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedSubmissionIds.size === submissions.length}
                      onChange={() => {
                        if (selectedSubmissionIds.size === submissions.length) {
                          setSelectedSubmissionIds(new Set());
                        } else {
                          setSelectedSubmissionIds(new Set(submissions.map((s) => s.id)));
                        }
                      }}
                      className="h-4 w-4 text-[#126DFB] focus:ring-[#126DFB] border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Saved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remixes
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSubmissionIds.has(submission.id)}
                        onChange={() => toggleSubmissionSelection(submission.id)}
                        className="h-4 w-4 text-[#126DFB] focus:ring-[#126DFB] border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.company_name || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          platformColors[submission.platform] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {platformLabels[submission.platform] || submission.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      <a
                        href={submission.ad_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#126DFB] hover:underline flex items-center space-x-1"
                      >
                        <span className="truncate">{submission.ad_url}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {submission.total_generations || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteSubmission(submission.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generation Form */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Generate Custom Remix
          </h3>
          <p className="text-sm text-gray-600">
            {selectedSubmissionIds.size === 0 ? (
              <>Select at least one saved ad above to use as inspiration for your remix.</>
            ) : (
              <>
                Using {selectedSubmissionIds.size} selected ad
                {selectedSubmissionIds.size === 1 ? '' : 's'} as inspiration for your remix.
              </>
            )}
          </p>
        </div>

        <AIFormTemplate
          config={toolConfig!.form}
          fields={toolConfig!.fields}
          submitting={generating}
          error={generationError}
          onSubmit={async (formData) => {
            // Check if any ads are selected before proceeding
            if (selectedSubmissionIds.size === 0) {
              setGenerationError('Please select at least one saved ad to continue.');
              return;
            }

            setGenerationError(null);
            setGenerationResult(null);
            setGenerating(true);

            try {
              // Get the full submission details for selected IDs
              const selectedSubmissions = submissions.filter((s) =>
                selectedSubmissionIds.has(s.id)
              );

              // Get access token for authentication
              const {
                data: { session },
              } = await supabase.auth.getSession();

              if (!session?.access_token) {
                throw new Error('You must be signed in to generate remixes.');
              }

              // Build baseAds array matching the Edge Function's expected format
              const baseAds = selectedSubmissions.map((sub) => ({
                id: sub.id,
                ad_url: sub.ad_url,
                platform: sub.platform,
                company_name: sub.company_name,
              }));

              // Build payload for the Edge Function
              const payload = {
                companyName: formData.companyName,
                primaryPlatform: formData.primaryPlatform,
                adGoal: formData.adGoal,
                voiceGuidance: formData.voiceGuidance || null,
                callToAction: formData.callToAction || null,
                baseAds, // NEW: Pass selected ads for custom iteration
              };

              console.log('Calling analyze-and-iterate-ad with payload:', payload);

              // Call the Edge Function
              const { data, error } = await supabase.functions.invoke('analyze-and-iterate-ad', {
                body: payload,
                headers: {
                  Authorization: `Bearer ${session.access_token}`,
                },
              });

              if (error) {
                console.error('Edge function error:', error);
                throw new Error(
                  error.message || 'Failed to generate remix. Please try again.'
                );
              }

              if (!data) {
                throw new Error('No data returned from generation. Please try again.');
              }

              console.log('Generation successful:', data);
              setGenerationResult(data);

              // Refresh submissions to update generation counts
              await fetchSubmissions();
            } catch (err: any) {
              console.error('Generation error:', err);
              setGenerationError(err.message || 'An unexpected error occurred.');
            } finally {
              setGenerating(false);
            }
          }}
        />

        {selectedSubmissionIds.size === 0 && (
          <p className="mt-4 text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
            ⚠️ Select at least one saved ad to enable generation
          </p>
        )}

        {generating && (
          <div className="mt-4 flex items-center space-x-3 text-[#126DFB] bg-blue-50 rounded-lg p-4">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">
              Analyzing competitor ads and generating APSICS-crafted remixes...
            </span>
          </div>
        )}

        {generationError && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {generationError}
            </p>
          </div>
        )}

        {generationResult && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">
              ✅ Remix Generated Successfully
            </h4>
            <div className="space-y-3 text-sm text-green-800">
              <p>
                Your custom ad remix has been generated using{' '}
                {selectedSubmissionIds.size} saved ad{selectedSubmissionIds.size === 1 ? '' : 's'}{' '}
                as inspiration.
              </p>
              {generationResult.iterations && (
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <pre className="whitespace-pre-wrap text-xs text-gray-800 overflow-x-auto">
                    {JSON.stringify(generationResult.iterations, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
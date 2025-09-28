'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  CheckCircle2,
  CreditCard,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Upload,
  Video,
  X,
} from 'lucide-react';
import clsx from 'clsx';

import { AIFormTemplate } from '@/components/templates/ai-form-template';
import type { ToolPageConfig } from '@/lib/template-configs';
import { getSupabaseBrowserClient, type BrowserClient } from '@/lib/supabase/browser-client';
import { useFreeWeek } from '@/components/contexts/free-week-context';
import ResultActionsPanel from '@/components/shared/result-actions-panel';
import { buildSupabaseInvokeHeaders } from '@/utils/build-supabase-invoke-headers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
const SOCIAL_DOMAINS = ['facebook.com'];

const OUTPUT_OPTIONS: Array<{ value: OutputFormat; label: string; description: string }> = [
  { value: 'same', label: 'Same format upgrade', description: 'Improve pacing, hooks, and CTAs without changing format.' },
  { value: 'video', label: 'Video remix', description: 'Generate scene-by-scene video script recommendations.' },
  { value: 'static', label: 'Static / carousel', description: 'Turn key angles into high-converting static layouts.' },
  { value: 'carousel', label: 'Carousel package', description: 'Storyboard a multi-frame carousel with copy and design notes.' },
];

const OUTPUT_LABELS: Record<OutputFormat, string> = {
  same: 'Same format upgrade',
  video: 'Video remix',
  static: 'Static / carousel',
  carousel: 'Carousel package',
};

type OutputFormat = 'same' | 'video' | 'static' | 'carousel';

type IterationScene = {
  timecode: string;
  observation: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
};

type IterationVariant = {
  id: OutputFormat;
  hook?: string;
  headline: string;
  angleSummary: string;
  visual?: string;
  callToAction?: string;
  script?: Array<{
    scene: string;
    description?: string;
    voiceover: string;
    overlay?: string;
    cta?: string;
  }>;
  staticCopy?: {
    headline: string;
    body: string;
    bulletPoints?: string[];
    cta: string;
    designNotes?: string[];
  };
  testingNotes?: string[];
  platformNotes?: string[];
};

type CopyChiefRecommendation = {
  improvedHeadline: string;
  supportingCopy: string;
  cta: string;
  rationale: string;
  testNote: string;
  referenceIterationId: string;
};

type IterationAnalysis = {
  performanceScore?: number;
  topWins?: string[];
  topRisks?: string[];
  summary?: string;
  scenes?: IterationScene[];
  iterations?: IterationVariant[];
  copyChiefRecommendations?: CopyChiefRecommendation[];
  exportArtifacts?: {
    markdown?: string;
    json?: Record<string, unknown>;
  };
};

type IterationFunctionResponse = {
  analysis?: IterationAnalysis;
  iterations?: IterationVariant[];
  copyChiefRecommendations?: CopyChiefRecommendation[];
  message?: string;
  creditsRemaining?: number;
  jobId?: string;
  status?: 'processing' | 'complete';
  exportArtifacts?: {
    markdown?: string;
    json?: Record<string, unknown>;
  };
  rawOutput?: unknown;
};

type UploadResult = {
  path: string;
  signedUrl: string;
};

type EmailStatus = 'success' | 'error' | null;

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  supabase: BrowserClient;
  onAuthSuccess: () => void;
};

type AuthMode = 'sign-in' | 'sign-up';

function determineAssetKind(file: File) {
  if (file.type.startsWith('video/')) {
    return 'video' as const;
  }
  if (file.type.startsWith('image/')) {
    return 'image' as const;
  }
  return 'unknown' as const;
}

async function extractEdgeFunctionError(error: unknown): Promise<{
  statusCode?: number;
  message?: string;
}> {
  if (!error || typeof error !== 'object') {
    return {};
  }

  const normalizeStatus = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    return undefined;
  };

  const maybeError = error as {
    status?: unknown;
    code?: unknown;
    message?: unknown;
    context?: unknown;
  };

  const statusCandidates: Array<unknown> = [maybeError.status, maybeError.code];
  let contextMessage = '';

  const context = maybeError.context as
    | undefined
    | null
    | (Response & {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
      })
    | {
        error?: unknown;
        status?: unknown;
        statusCode?: unknown;
        response?: { status?: unknown };
      };

  if (context && typeof context === 'object') {
    statusCandidates.push((context as { status?: unknown }).status);
    statusCandidates.push((context as { statusCode?: unknown }).statusCode);
    statusCandidates.push((context as { response?: { status?: unknown } }).response?.status);

    const rawContextError = (context as { error?: unknown }).error;
    if (typeof rawContextError === 'string') {
      contextMessage = rawContextError;
    } else if (rawContextError && typeof rawContextError === 'object') {
      const nested = rawContextError as { message?: unknown; error?: unknown };
      if (typeof nested.message === 'string') {
        contextMessage = nested.message;
      } else if (typeof nested.error === 'string') {
        contextMessage = nested.error;
      }
    }
  }

  let statusCode: number | undefined;
  for (const candidate of statusCandidates) {
    const normalized = normalizeStatus(candidate);
    if (typeof normalized === 'number') {
      statusCode = normalized;
      break;
    }
  }

  let message: string | undefined = typeof maybeError.message === 'string' ? maybeError.message : undefined;
  if (!message && contextMessage) {
    message = contextMessage;
  }

  if (!message && context && typeof Response !== 'undefined' && context instanceof Response) {
    try {
      const cloned = context.clone();
      const contentType = cloned.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        const json = await cloned.json();
        if (json) {
          if (typeof (json as { error?: unknown }).error === 'string') {
            message = (json as { error: string }).error;
          } else if (typeof (json as { message?: unknown }).message === 'string') {
            message = (json as { message: string }).message;
          }
        }
      } else {
        const text = await cloned.text();
        if (text) {
          message = text;
        }
      }
    } catch {
      // ignore parsing issues
    }
  }

  return { statusCode, message };
}

export default function IterationToolClient({ config }: { config: ToolPageConfig }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useFreeWeek();

  const [user, setUser] = useState<User | null>(null);
  const [profileCredits, setProfileCredits] = useState<number | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileReloadKey, setProfileReloadKey] = useState(0);

  const [inputMethod, setInputMethod] = useState<'upload' | 'url'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [assetUrl, setAssetUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [outputFormats, setOutputFormats] = useState<Set<OutputFormat>>(() => new Set<OutputFormat>(['same']));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<IterationAnalysis | null>(null);
  const [rawResult, setRawResult] = useState<IterationFunctionResponse | null>(null);

  const [showPurchasePrompt, setShowPurchasePrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);
  const [checkoutMessageDismissed, setCheckoutMessageDismissed] = useState(false);

  const [emailAddress, setEmailAddress] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [lastSubmissionMeta, setLastSubmissionMeta] = useState<{
    companyName: string;
    primaryPlatform: string;
  } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const abortSubmission = useCallback(() => {
    setSubmitting(false);
  }, []);

  const triggerProfileReload = useCallback(() => {
    setProfileReloadKey((value) => value + 1);
  }, []);

  const handleEmailAddressChange = useCallback(
    (value: string) => {
      setEmailAddress(value);
      if (emailStatus) {
        setEmailStatus(null);
        setEmailStatusMessage('');
      }
    },
    [emailStatus],
  );

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
        setAccessToken(session.access_token ?? null);
      } else {
        setUser(null);
        setEmailAddress('');
        setAccessToken(null);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
        setAccessToken(session.access_token ?? null);
        triggerProfileReload();
      } else {
        setUser(null);
        setEmailAddress('');
        setProfileCredits(null);
        setAccessToken(null);
      }
    });

    bootstrap();

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase, triggerProfileReload]);

  useEffect(() => {
    if (!user) {
      setProfileCredits(null);
      setProfileError(null);
      setProfileLoading(false);
      return;
    }

    let active = true;
    setProfileLoading(true);
    setProfileError(null);

    (async () => {
      try {
        const { data, error: loadError } = await supabase
          .from('profiles')
          .select('credits_remaining')
          .eq('id', user.id)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (loadError) {
          setProfileError("We could not load your remaining credits.");
          setProfileCredits(null);
          return;
        }

        setProfileCredits(data?.credits_remaining ?? 0);
        setProfileError(null);
      } catch (loadErr) {
        if (!active) {
          return;
        }
        console.error('Failed to fetch profile credits', loadErr);
        setProfileError("We could not load your remaining credits.");
        setProfileCredits(null);
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [supabase, user, profileReloadKey]);

  useEffect(() => {
    const checkoutParam = searchParams?.get('checkout');
    if (!checkoutParam || checkoutMessageDismissed) {
      return;
    }

    if (checkoutParam === 'success' || checkoutParam === 'cancel') {
      setCheckoutStatus(checkoutParam);
    }
  }, [checkoutMessageDismissed, searchParams]);

  useEffect(() => {
    if (checkoutStatus === 'success' && user) {
      triggerProfileReload();
    }
  }, [checkoutStatus, triggerProfileReload, user]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const kind = determineAssetKind(selectedFile);
    setOutputFormats((prev) => {
      const next = new Set(prev);
      if (!next.has('same')) {
        next.add('same');
      }
      if (kind === 'video') {
        next.add('video');
      }
      if (kind === 'image') {
        next.add('static');
      }
      return next;
    });
  }, [selectedFile]);

  const handleInputMethodChange = useCallback((method: 'upload' | 'url') => {
    setInputMethod(method);
    setError(null);
    if (method === 'url') {
      setFileError(null);
    } else {
      setUrlError(null);
    }
  }, []);

  const revokePreviewUrl = useCallback((url: string | null) => {
    if (url && typeof window !== 'undefined') {
      URL.revokeObjectURL(url);
    }
  }, []);

  const clearAsset = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
    revokePreviewUrl(filePreviewUrl);
    setFilePreviewUrl(null);
  }, [filePreviewUrl, revokePreviewUrl]);

  const handleFileSelection = useCallback(
    (file: File | null) => {
      if (!file) {
        clearAsset();
        return;
      }

      const kind = determineAssetKind(file);
      if (kind === 'unknown') {
        setFileError('Unsupported file type. Upload a video (.mp4, .mov, .webm) or image (.jpg, .png, .webp).');
        clearAsset();
        return;
      }

      if (kind === 'image' && file.size > MAX_IMAGE_BYTES) {
        setFileError('Images must be under 10MB.');
        clearAsset();
        return;
      }

      if (kind === 'video' && file.size > MAX_VIDEO_BYTES) {
        setFileError('Videos must be under 50MB.');
        clearAsset();
        return;
      }

      setInputMethod('upload');
      setUrlError(null);
      setAssetUrl('');
      setFileError(null);

      revokePreviewUrl(filePreviewUrl);
      setSelectedFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
    },
    [clearAsset, filePreviewUrl, revokePreviewUrl],
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      handleFileSelection(file);
    },
    [handleFileSelection],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files?.length) {
        handleFileSelection(event.dataTransfer.files[0]);
      }
    },
    [handleFileSelection],
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetUrl(event.target.value);
    setUrlError(null);
  }, []);

  const toggleOutputFormat = useCallback((format: OutputFormat) => {
    setOutputFormats(() => new Set([format]));
  }, []);

  const uploadAsset = useCallback(
    async (file: File): Promise<UploadResult> => {
      const fileExt = file.name.split('.').pop()?.toLowerCase() ?? 'asset';
      const key = `${user?.id ?? 'anonymous'}/${crypto.randomUUID()}.${fileExt}`;
      const bucket = supabase.storage.from('ai-ad-iteration-assets');

      const { error: uploadError } = await bucket.upload(key, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (uploadError) {
        console.error('Asset upload failed', uploadError);
        throw new Error('We could not upload your creative. Try a smaller file or different format.');
      }

      const { data: signedData, error: signedError } = await bucket.createSignedUrl(key, 60 * 15);

      if (signedError || !signedData?.signedUrl) {
        console.error('Signed URL generation failed', signedError);
        throw new Error('We uploaded the asset but could not generate a secure link. Please retry.');
      }

      return { path: key, signedUrl: signedData.signedUrl };
    },
    [supabase, user?.id],
  );

  const handleSubmit = useCallback(
    async (formData: Record<string, any>) => {
      setError(null);
      setSubmitting(true);
      setShowPurchasePrompt(false);
      setCheckoutStatus(null);
      setEmailStatus(null);
      setEmailStatusMessage('');
      setResult(null);
      setRawResult(null);

      const activeFormats = Array.from(outputFormats);
      if (!activeFormats.length) {
        setError('Select at least one output format to generate.');
        abortSubmission();
        return;
      }

      let preparedAssetUrl: string | null = null;
      let uploadedPath: string | null = null;
      let assetType: 'image' | 'video' | 'url' | null = null;

      try {
        if (inputMethod === 'upload') {
          if (!selectedFile) {
            setError('Upload a creative asset or switch to the social link tab.');
            abortSubmission();
            return;
          }

          const upload = await uploadAsset(selectedFile);
          preparedAssetUrl = upload.signedUrl;
          uploadedPath = upload.path;
          const kind = determineAssetKind(selectedFile);
          assetType = kind === 'unknown' ? 'url' : kind;
        } else {
          const trimmedUrl = assetUrl.trim();
          if (!trimmedUrl) {
            setError('Paste the Facebook Ads Library URL for the ad you want to iterate (https://www.facebook.com/ads/library/?id=...).');
            abortSubmission();
            return;
          }

          try {
            const parsed = new URL(trimmedUrl);
            const domainMatch = SOCIAL_DOMAINS.some((domain) => parsed.hostname.toLowerCase().includes(domain));
            if (!domainMatch) {
              setError('We currently support Facebook Ads Library URLs. TikTok and YouTube support coming soon.');
              abortSubmission();
              return;
            }
            if (parsed.hostname.toLowerCase().includes('facebook.com') && !parsed.pathname.includes('/ads/library')) {
              setError('Use the Facebook Ads Library URL for the ad (https://www.facebook.com/ads/library/?id=...).');
              abortSubmission();
              return;
            }
          } catch {
            setError('Enter a valid Facebook Ads Library URL including https://.');
            abortSubmission();
            return;
          }

          preparedAssetUrl = trimmedUrl;
          assetType = 'url';
        }

        if (!preparedAssetUrl) {
          setError('We could not determine the asset to analyze.');
          abortSubmission();
          return;
        }

        const payload = {
          companyName: formData.companyName,
          primaryPlatform: formData.primaryPlatform,
          iterationGoal: formData.iterationGoal,
          referenceUrl: formData.referenceUrl || null,
          additionalContext: formData.additionalContext || null,
          inputMethod,
          assetUrl: preparedAssetUrl,
          assetType,
          uploadedPath,
          outputFormats: activeFormats,
        };

        const headers = buildSupabaseInvokeHeaders({ accessToken });

        const { data, error: invokeError } = await supabase.functions.invoke<IterationFunctionResponse>(
          'analyze-and-iterate-ad',
          {
            body: payload,
            ...(headers ? { headers } : {}),
          },
        );

        if (invokeError) {
          console.error('analyze-and-iterate-ad error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const effectiveMessage = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError(effectiveMessage || 'Check the inputs and try again.');
              break;
            case 401:
              setShowAuthModal(true);
              setError('Sign in to keep iterating on your creative.');
              break;
            case 402:
              if (user) {
                setShowPurchasePrompt(true);
                setError('You are out of credits. Upgrade to Essentials or Studio to keep iterating.');
                setProfileCredits(0);
              } else {
                setShowAuthModal(true);
                setError('Create a free APSICS Media account to access your 10 monthly credits.');
              }
              break;
            case 403:
              setError(effectiveMessage || 'We couldn’t analyze that ad. Try a different URL or upload the creative directly.');
              break;
            case 504:
              setError('The analysis timed out. Try again in a minute or use a smaller asset.');
              break;
            default:
              if (statusCode === 402 && user) {
                setShowPurchasePrompt(true);
                setError('You are out of credits. Upgrade to Essentials or Studio to keep iterating.');
              } else if (effectiveMessage) {
                setError(effectiveMessage);
              } else {
                setError('Something went wrong while analyzing your creative. Please try again.');
              }
          }

          return;
        }

        // Check if we have any iteration data in any format
        if (data && (data.iterations || data.copyChiefRecommendations || data.analysis || data.exportArtifacts)) {
          // Transform the OpenRouter result to match our analysis structure
          const transformedAnalysis: IterationAnalysis = {
            iterations: data.iterations || data.analysis?.iterations || [],
            copyChiefRecommendations: data.copyChiefRecommendations || [],
            summary: data.message || data.analysis?.summary || undefined,
            exportArtifacts: data.exportArtifacts || data.analysis?.exportArtifacts || undefined,
            performanceScore: data.analysis?.performanceScore,
            topWins: data.analysis?.topWins,
            topRisks: data.analysis?.topRisks,
            scenes: data.analysis?.scenes
          };
          setResult(transformedAnalysis);
          setRawResult(data);
          setLastSubmissionMeta({
            companyName: formData.companyName,
            primaryPlatform: formData.primaryPlatform,
          });
        } else if (data?.status === 'processing') {
          setError('We queued your iteration job. Polling UI is not implemented yet.');
        } else {
          console.log('Unexpected response structure:', data);
          setError('The analysis completed but returned an unexpected format. Please try again.');
        }

        if (typeof data?.creditsRemaining === 'number') {
          setProfileCredits(data.creditsRemaining);
        } else if (user) {
          triggerProfileReload();
        }

      } catch (submitError) {
        console.error('Iteration submission error', submitError);
        setError(
          submitError instanceof Error
            ? submitError.message
            : 'We could not reach the iteration engine. Try again shortly.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [
      assetUrl,
      inputMethod,
      outputFormats,
      abortSubmission,
      selectedFile,
      accessToken,
      supabase,
      triggerProfileReload,
      uploadAsset,
      user,
    ],
  );

  const handlePurchase = useCallback((tier: 'essentials' | 'studio' | 'concierge' = 'essentials') => {
    const tierTitles = {
      essentials: 'Upgrade to Essentials',
      studio: 'Unlock Studio Founding Offer',
      concierge: 'Talk to a Strategist'
    };

    const tierSubtitles = {
      essentials: 'Lock in 150 credits per month with priority processing for your entire team.',
      studio: 'Founding members secure $29/mo pricing for six months plus an expert-crafted concept for 6 months.',
      concierge: 'Schedule time with our senior team to tailor Concierge access to your roadmap.'
    };

    openModal({
      title: tierTitles[tier],
      subtitle: tierSubtitles[tier],
      source: 'ai-ad-iteration-tool',
      tier: tier
    });
  }, [openModal]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setShowPurchasePrompt(false);
      setResult(null);
      setRawResult(null);
      setProfileCredits(null);
      setError(null);
      setEmailAddress('');
      setEmailStatus(null);
      setEmailStatusMessage('');
      setAccessToken(null);
    } catch (signOutError) {
      console.error('Failed to sign out', signOutError);
    }
  }, [supabase]);

  const handleEmailResults = useCallback(async () => {
    if (!result?.exportArtifacts?.markdown) {
      setEmailStatus('error');
      setEmailStatusMessage('Nothing to email yet. Run an iteration first.');
      return;
    }

    if (!emailAddress) {
      setEmailStatus('error');
      setEmailStatusMessage('Add an email address to send the results.');
      return;
    }

    setEmailSending(true);
    setEmailStatus(null);
    setEmailStatusMessage('');

    try {
      const response = await fetch('/api/send-ad-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailAddress,
          content: result.exportArtifacts.markdown,
          format: 'iteration',
          companyName: lastSubmissionMeta?.companyName ?? '',
          platform: lastSubmissionMeta?.primaryPlatform ?? '',
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setEmailStatus('error');
        setEmailStatusMessage(payload?.error || 'Email service returned an error.');
        return;
      }

      setEmailStatus('success');
      setEmailStatusMessage('Sent. Check your inbox in a few seconds.');
    } catch (emailError) {
      console.error('Failed to email iteration results', emailError);
      setEmailStatus('error');
      setEmailStatusMessage(
        emailError instanceof Error ? emailError.message : 'Could not send the email. Try again later.',
      );
    } finally {
      setEmailSending(false);
    }
  }, [emailAddress, lastSubmissionMeta, result?.exportArtifacts?.markdown]);

  const userSection = (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-gray-900">{user ? 'Creative iteration credits' : 'Start for free'}</p>
          <p className="mt-1 text-xs text-gray-500">
            {user
              ? profileLoading
                ? 'Checking your credits...'
                : profileError || `Credits remaining: ${profileCredits ?? 0}`
              : 'Sign in to access your 10 monthly credits and save every iteration.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <button
                type="button"
                onClick={triggerProfileReload}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Refresh credits
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800 transition hover:bg-brand-100"
            >
              Create free account
            </button>
          )}
        <button
          type="button"
          onClick={() => handlePurchase('essentials')}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-brand-600/30 transition hover:bg-brand-700"
        >
          <CreditCard className="h-4 w-4" />
          Get 150 Credits
        </button>
        </div>
      </div>
    </div>
  );

  const renderAssetSelector = () => (
    <section className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/60 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
              inputMethod === 'upload'
                ? 'border-brand-600 bg-brand-600 text-white shadow-brand-600/40 shadow'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100',
            )}
            onClick={() => handleInputMethodChange('upload')}
          >
            <Upload className="h-4 w-4" />
            Upload creative
          </button>
          <button
            type="button"
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
              inputMethod === 'url'
                ? 'border-brand-600 bg-brand-600 text-white shadow-brand-600/40 shadow'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100',
            )}
            onClick={() => handleInputMethodChange('url')}
          >
            <LinkIcon className="h-4 w-4" />
            Paste Ads Library link
          </button>
        </div>
        <p className="text-xs text-brand-700">
Use Facebook Ads Library URLs like https://www.facebook.com/ads/library/?id=xyz. TikTok and YouTube support coming soon.
        </p>
      </div>

      {inputMethod === 'upload' ? (
        <div
          className={clsx(
            'mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-white p-6 text-center transition',
            fileError ? 'border-red-300 bg-red-50/70' : 'hover:border-brand-300 hover:bg-brand-50/40',
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {filePreviewUrl ? (
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedFile && determineAssetKind(selectedFile) === 'video' ? (
                    <Video className="h-6 w-6 text-brand-600" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-brand-600" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{selectedFile?.name}</p>
                    <p className="text-xs text-gray-500">{formatBytes(selectedFile?.size ?? 0)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearAsset}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                  Remove
                </button>
              </div>
              {selectedFile && determineAssetKind(selectedFile) === 'image' ? (
                <img
                  src={filePreviewUrl}
                  alt="Uploaded creative preview"
                  className="max-h-64 w-full rounded-xl object-contain"
                />
              ) : (
                <video controls src={filePreviewUrl} className="max-h-64 w-full rounded-xl bg-black" />
              )}
            </div>
          ) : (
            <label className="flex w-full cursor-pointer flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Upload className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-800">Drag and drop your creative</p>
                <p className="text-xs text-gray-500">
                  Accepted: .mp4, .mov, .webm up to 50MB or .png, .jpg, .webp up to 10MB
                </p>
              </div>
              <input type="file" accept="video/*,image/*" className="hidden" onChange={handleFileInputChange} />
              <span className="rounded-full border border-brand-200 px-4 py-2 text-xs font-semibold text-brand-700">
                Browse files
              </span>
            </label>
          )}

          {fileError && <p className="mt-3 text-xs font-semibold text-red-600">{fileError}</p>}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Facebook Ads Library URL
            <input
              type="url"
              value={assetUrl}
              onChange={handleUrlChange}
              placeholder="https://www.facebook.com/ads/library/?id=xyz"
              className={clsx(
                'rounded-lg border px-4 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200',
                urlError ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500',
              )}
            />
          </label>
          {urlError && <p className="text-xs font-semibold text-red-600">{urlError}</p>}
          <p className="text-xs text-gray-500">
            Use the ad’s Facebook Ads Library URL (https://www.facebook.com/ads/library/?id=...).
          </p>
        </div>
      )}
    </section>
  );

  const outputFormatSelector = (
    <section className="rounded-3xl border border-gray-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-gray-900">Iteration packages</h3>
      <p className="mt-1 text-xs text-gray-500">
        Pick at least one format. We will always include a same-format upgrade.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {OUTPUT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleOutputFormat(option.value)}
            className={clsx(
              'flex flex-col gap-2 rounded-2xl border p-4 text-left transition',
              outputFormats.has(option.value)
                ? 'border-brand-500 bg-brand-50 shadow-brand-200'
                : 'border-gray-200 bg-white hover:border-brand-200 hover:bg-brand-50/40',
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">{option.label}</p>
              {outputFormats.has(option.value) ? (
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
              ) : (
                <span className="h-4 w-4 rounded-full border border-gray-300" />
              )}
            </div>
            <p className="text-xs text-gray-500">{option.description}</p>
          </button>
        ))}
      </div>
    </section>
  );

  const resultComponent = result ? (
    <IterationResultsView
      analysis={result}
      raw={rawResult}
      companyName={lastSubmissionMeta?.companyName ?? ''}
      emailAddress={emailAddress}
      onEmailAddressChange={handleEmailAddressChange}
      onEmailResults={handleEmailResults}
      emailSending={emailSending}
      emailStatus={emailStatus}
      emailStatusMessage={emailStatusMessage}
    />
  ) : null;

  return (
    <>
      {checkoutStatus && !checkoutMessageDismissed && (
        <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {checkoutStatus === 'success'
                  ? 'Purchase confirmed. Credits will appear in a few seconds.'
                  : 'Checkout cancelled. Your card has not been charged.'}
              </p>
              {checkoutStatus === 'success' && <p className="mt-1 text-xs text-brand-800">Refresh credits if they do not appear automatically.</p>}
            </div>
            <button
              type="button"
              onClick={() => {
                setCheckoutMessageDismissed(true);
                setCheckoutStatus(null);
                router.replace('/ai-ad-iteration-tool');
              }}
              className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {renderAssetSelector()}

      <div className="mt-6 space-y-6">
        {outputFormatSelector}
        <AIFormTemplate
          config={config.form}
          fields={config.fields}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
          resultComponent={resultComponent}
          userSection={userSection}
        />
      </div>

      {showPurchasePrompt && (
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">You’ve used your available credits.</h3>
                <p className="mt-1 text-sm text-brand-800">
                  Upgrade to Essentials for 150 monthly credits or secure the $29 Studio founding offer for 800 monthly credits and dedicated expert support.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <button
                  onClick={() => handlePurchase('essentials')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
                  type="button"
                >
                  <CreditCard className="h-4 w-4" />
                  Get 150 Credits
                </button>
                <button
                  onClick={() => handlePurchase('studio')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-600 hover:text-brand-800"
                  type="button"
                >
                  <CreditCard className="h-4 w-4" />
                  Get 800 Credits + Expert Concept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        supabase={supabase}
        onAuthSuccess={() => {
          setShowAuthModal(false);
          setShowPurchasePrompt(false);
          triggerProfileReload();
          setError(null);
        }}
      />
    </>
  );
}

type IterationResultsViewProps = {
  analysis: IterationAnalysis;
  raw: IterationFunctionResponse | null;
  companyName?: string;
  emailAddress: string;
  onEmailAddressChange: (value: string) => void;
  onEmailResults: () => void;
  emailSending: boolean;
  emailStatus: EmailStatus;
  emailStatusMessage: string;
};

function IterationResultsView({
  analysis,
  raw,
  companyName,
  emailAddress,
  onEmailAddressChange,
  onEmailResults,
  emailSending,
  emailStatus,
  emailStatusMessage,
}: IterationResultsViewProps) {
  const summaryText = buildSummary(analysis);
  const markdownContent = analysis.exportArtifacts?.markdown ?? raw?.exportArtifacts?.markdown ?? summaryText;
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const safeCompany = companyName?.trim() || 'campaign';

  const handleCopy = useCallback(() => {
    if (!markdownContent || typeof navigator === 'undefined') {
      return;
    }

    navigator.clipboard.writeText(markdownContent).catch((error) => console.error('Failed to copy report', error));
  }, [markdownContent]);

  const handleDownload = useCallback(
    (format: 'markdown' | 'json') => {
      if (!analysis.exportArtifacts) {
        return;
      }

      if (format === 'markdown' && analysis.exportArtifacts.markdown) {
        downloadBlob(new Blob([analysis.exportArtifacts.markdown], { type: 'text/markdown' }), 'ai-ad-iteration.md');
      }

      if (format === 'json') {
        const payload = analysis.exportArtifacts.json ?? raw?.exportArtifacts?.json ?? raw;
        if (payload) {
          downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), 'ai-ad-iteration.json');
        }
      }
    },
    [analysis.exportArtifacts, raw],
  );

  const handleDownloadPdf = useCallback(async () => {
    if (!markdownContent || pdfGenerating) {
      return;
    }

    setPdfGenerating(true);
    try {
      const response = await fetch('/api/generate-brief-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: markdownContent,
          companyName,
          documentType: 'iteration-report',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `creative-intelligence-report-${safeCompany.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate iteration PDF', error);
    } finally {
      setPdfGenerating(false);
    }
  }, [companyName, markdownContent, pdfGenerating, safeCompany]);

  const hasMarkdown = Boolean(analysis.exportArtifacts?.markdown || raw?.exportArtifacts?.markdown);

  return (
    <section id="results" className="mt-10">
      <ResultActionsPanel
        title="Your APSICS creative intelligence report"
        onCopy={handleCopy}
        downloads={[
          {
            id: 'iteration-pdf',
            label: 'Download PDF',
            onClick: handleDownloadPdf,
            disabled: !markdownContent,
            loading: pdfGenerating,
          },
        ]}
        emailConfig={{
          description: "We'll email the full creative intelligence report to your inbox.",
          value: emailAddress,
          onChange: onEmailAddressChange,
          onSubmit: onEmailResults,
          submitting: emailSending,
          statusMessage: emailStatusMessage,
          statusType: emailStatus,
        }}
      >
        <div className="space-y-8">
          {/* Copy Chief Recommendations - Priority #1 */}
          {!!(analysis.copyChiefRecommendations?.length) && (
            <div className="rounded-2xl border border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-[#FEF9E7] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B] text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92400E]">Copy Chief Recommendations</p>
                  <h3 className="text-xl font-semibold text-[#111827]">Expert-Level Copy Improvements</h3>
                </div>
              </div>
              <div className="space-y-6">
                {analysis.copyChiefRecommendations.map((recommendation, index) => (
                  <div key={`copy-chief-${index}`} className="rounded-xl border border-[#FEF3C7] bg-white/80 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B] text-white text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#92400E]">
                        Copy Chief Recommendation
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#374151] mb-2">Improved Headline</h4>
                        <p className="text-lg font-semibold text-[#111827] bg-[#FFFBEB] p-3 rounded-lg border border-[#FEF3C7]">
                          {recommendation.improvedHeadline}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#374151] mb-2">Supporting Copy</h4>
                        <p className="text-sm text-[#111827] leading-relaxed">{recommendation.supportingCopy}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#374151] mb-2">Call to Action</h4>
                        <p className="text-sm font-medium text-[#111827] bg-[#FFFBEB] px-3 py-2 rounded-lg border border-[#FEF3C7] inline-block">
                          {recommendation.cta}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#374151] mb-2">Expert Rationale</h4>
                        <p className="text-sm text-[#111827] leading-relaxed italic">{recommendation.rationale}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#374151] mb-2">Testing Strategy</h4>
                        <p className="text-sm text-[#111827] leading-relaxed bg-[#FEF9E7] p-3 rounded-lg border border-[#FEF3C7]">
                          {recommendation.testNote}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Angle Summary */}
          {analysis.summary && (
            <div className="rounded-2xl border border-[#D0E3FF] bg-gradient-to-br from-[#F8FAFF] to-[#F3F8FF] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#126DFB] text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 2.664a6.705 6.705 0 01-3.75 1.036A6.705 6.705 0 017.5 15.075m3.75 2.664V18.5a6.01 6.01 0 01-1.5-.189M12 12.75a6.01 6.01 0 01-1.5-.189m1.5.189a6.01 6.01 0 011.5-.189m-3.75 2.664A6.705 6.705 0 016 15.075m6.75 1.436a6.705 6.705 0 003.75-1.036m-3.75 1.036V18.5a6.01 6.01 0 011.5-.189m0 0V18.5a6.01 6.01 0 01-1.5-.189" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FD6]">Strategic Positioning</p>
                  <h3 className="text-xl font-semibold text-[#111827]">Why This Approach Works</h3>
                </div>
              </div>
              <div className="rounded-xl bg-white/80 p-6 border border-[#D0E3FF]">
                <p className="text-[#111827] leading-relaxed whitespace-pre-wrap">{analysis.summary}</p>
              </div>
            </div>
          )}

          {/* Performance Analysis */}
          {(typeof analysis.performanceScore === 'number' || analysis.topWins?.length || analysis.topRisks?.length) && (
            <div className="rounded-2xl border border-[#D1FAE5] bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981] text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#047857]">Performance Analysis</p>
                  <h3 className="text-xl font-semibold text-[#111827]">Strengths & Optimization Areas</h3>
                </div>
              </div>
              <div className="space-y-6">
                {typeof analysis.performanceScore === 'number' && (
                  <div className="rounded-xl bg-white/80 p-6 border border-[#D1FAE5]">
                    <h4 className="text-sm font-semibold text-[#374151] mb-2">Performance Score</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-[#10B981]">{Math.round(analysis.performanceScore)}</span>
                      <span className="mb-1 text-lg text-[#6B7280]">/100</span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">APSICS retention, resonance, and conversion benchmark</p>
                  </div>
                )}
                {!!(analysis.topWins?.length) && (
                  <div className="rounded-xl bg-[#F0FDF4] border border-[#86EFAC] p-6">
                    <h4 className="text-sm font-semibold text-[#374151] mb-4 flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What's Working
                    </h4>
                    <ul className="space-y-3">
                      {analysis.topWins.map((item, index) => (
                        <li key={`win-${index}`} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981]/20">
                            <svg className="h-3 w-3 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm leading-relaxed text-[#111827]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!(analysis.topRisks?.length) && (
                  <div className="rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] p-6">
                    <h4 className="text-sm font-semibold text-[#374151] mb-4 flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      Areas to Optimize
                    </h4>
                    <ul className="space-y-3">
                      {analysis.topRisks.map((item, index) => (
                        <li key={`risk-${index}`} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B]/20">
                            <svg className="h-3 w-3 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm leading-relaxed text-[#111827]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Creative Blueprint - Flexible for Video/Static */}
          {!!(analysis.iterations?.length) && (
            <div className="rounded-2xl border border-[#E9D5FF] bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B5CF6] text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-8.25m8.25-12V6.75a.75.75 0 00-.75-.75h-7.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75H18a.75.75 0 00.75-.75V8.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">Creative Blueprint</p>
                  <h3 className="text-xl font-semibold text-[#111827]">Ready-to-Implement Variations</h3>
                </div>
              </div>
              <div className="space-y-6">
                {analysis.iterations.map((iteration, index) => (
                  <div key={`iteration-${iteration.id}-${index}`} className="rounded-xl border border-[#E9D5FF] bg-white/80 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8B5CF6] text-white text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
                        {OUTPUT_LABELS[iteration.id] ?? 'Iteration'}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Strategic Angle */}
                      {iteration.angleSummary && (
                        <div>
                          <h4 className="text-sm font-semibold text-[#374151] mb-2">Strategic Angle</h4>
                          <p className="text-sm text-[#111827] leading-relaxed bg-[#FAF5FF] p-3 rounded-lg border border-[#E9D5FF]">{iteration.angleSummary}</p>
                        </div>
                      )}

                      {/* Video Script for Video Content */}
                      {!!(iteration.script?.length) && (
                        <div>
                          <h4 className="text-sm font-semibold text-[#374151] mb-2">Scene-by-Scene Breakdown</h4>
                          <div className="space-y-3 rounded-lg border border-[#E9D5FF] bg-[#FAF5FF] p-4 text-sm">
                            {iteration.script.map((scene, sceneIndex) => (
                              <div key={`iteration-${iteration.id}-scene-${sceneIndex}`} className="space-y-2 p-3 bg-white/60 rounded-lg border border-[#E9D5FF]">
                                <p className="text-xs font-semibold text-[#7C3AED] mb-2">{scene.scene}</p>
                                {scene.description && (
                                  <div>
                                    <span className="text-xs font-medium text-[#6B7280]">Visual:</span>
                                    <p className="text-sm text-[#111827]">{scene.description}</p>
                                  </div>
                                )}
                                {scene.voiceover && (
                                  <div>
                                    <span className="text-xs font-medium text-[#6B7280]">Voiceover:</span>
                                    <p className="text-sm text-[#111827]">{scene.voiceover}</p>
                                  </div>
                                )}
                                {scene.overlay && (
                                  <div>
                                    <span className="text-xs font-medium text-[#6B7280]">Overlay:</span>
                                    <p className="text-sm text-[#111827] font-medium">{scene.overlay}</p>
                                  </div>
                                )}
                                {scene.cta && (
                                  <div>
                                    <span className="text-xs font-medium text-[#6B7280]">CTA:</span>
                                    <p className="text-sm text-[#111827] font-medium">{scene.cta}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Static Creative Elements for Static Content */}
                      {iteration.staticCopy && (
                        <div>
                          <h4 className="text-sm font-semibold text-[#374151] mb-2">Static Creative Elements</h4>
                          <div className="space-y-3 rounded-lg border border-[#E9D5FF] bg-[#FAF5FF] p-4 text-sm">
                            {iteration.staticCopy.headline && (
                              <div className="p-3 bg-white/60 rounded-lg border border-[#E9D5FF]">
                                <span className="text-xs font-medium text-[#6B7280]">Headline:</span>
                                <p className="text-sm font-semibold text-[#111827] mt-1">{iteration.staticCopy.headline}</p>
                              </div>
                            )}
                            {iteration.staticCopy.body && (
                              <div className="p-3 bg-white/60 rounded-lg border border-[#E9D5FF]">
                                <span className="text-xs font-medium text-[#6B7280]">Body Copy:</span>
                                <p className="text-sm text-[#111827] mt-1">{iteration.staticCopy.body}</p>
                              </div>
                            )}
                            {iteration.staticCopy.cta && (
                              <div className="p-3 bg-white/60 rounded-lg border border-[#E9D5FF]">
                                <span className="text-xs font-medium text-[#6B7280]">Call to Action:</span>
                                <p className="text-sm font-medium text-[#111827] mt-1">{iteration.staticCopy.cta}</p>
                              </div>
                            )}
                            {!!(iteration.staticCopy.designNotes?.length) && (
                              <div className="p-3 bg-white/60 rounded-lg border border-[#E9D5FF]">
                                <span className="text-xs font-medium text-[#6B7280]">Design Notes:</span>
                                <ul className="mt-1 space-y-1 text-sm text-[#111827]">
                                  {iteration.staticCopy.designNotes.map((note, noteIndex) => (
                                    <li key={`design-note-${noteIndex}`} className="flex items-start gap-2">
                                      <span className="text-[#8B5CF6] text-xs mt-1">•</span>
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Testing Strategy */}
                      {!!(iteration.testingNotes?.length) && (
                        <div>
                          <h4 className="text-sm font-semibold text-[#374151] mb-2">Testing Strategy</h4>
                          <div className="rounded-lg border border-[#E9D5FF] bg-[#FAF5FF] p-3">
                            <ul className="space-y-2 text-sm text-[#111827]">
                              {iteration.testingNotes.map((note, noteIndex) => (
                                <li key={`testing-note-${noteIndex}`} className="flex items-start gap-2">
                                  <span className="text-[#8B5CF6] text-xs mt-1">⚡</span>
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ResultActionsPanel>
    </section>
  );
}

type ImpactPillProps = {
  impact: IterationScene['impact'];
};

function ImpactPill({ impact }: ImpactPillProps) {
  const label = impact === 'high' ? 'High' : impact === 'medium' ? 'Medium' : 'Low';
  const classes =
    impact === 'high'
      ? 'bg-rose-100 text-rose-700'
      : impact === 'medium'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-emerald-100 text-emerald-700';

  return <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold', classes)}>{label} impact</span>;
}

function buildSummary(analysis: IterationAnalysis) {
  const lines: string[] = [];

  if (typeof analysis.performanceScore === 'number') {
    lines.push(`Performance score: ${Math.round(analysis.performanceScore)}`);
  }

  if (analysis.topWins?.length) {
    lines.push('What is working:');
    lines.push(...analysis.topWins.map((item, index) => `${index + 1}. ${item}`));
  }

  if (analysis.topRisks?.length) {
    lines.push('What to fix:');
    lines.push(...analysis.topRisks.map((item, index) => `${index + 1}. ${item}`));
  }

  if (analysis.iterations?.length) {
    lines.push('Iterations generated:');
    analysis.iterations.forEach((iteration) => {
      lines.push(`- ${OUTPUT_LABELS[iteration.id] ?? iteration.id}: ${iteration.headline}`);
    });
  }

  return lines.join('\n');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

type AuthPanelProps = {
  supabase: BrowserClient;
  onAuthSuccess: () => void;
  onClose: () => void;
};

function AuthModal({ open, onClose, supabase, onAuthSuccess }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => (!value ? onClose() : null)}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Create a free APSICS account</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Get 10 monthly AI iteration credits, save your creative history, and access Monday creative intelligence drops.
          </DialogDescription>
        </DialogHeader>
        <AuthPanel supabase={supabase} onAuthSuccess={onAuthSuccess} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

function AuthPanel({ supabase, onAuthSuccess, onClose }: AuthPanelProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setAuthError(null);

    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setAuthError(error.message);
          return;
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setAuthError(error.message);
          return;
        }
      }

      onAuthSuccess();
      onClose();
    } catch (authErr) {
      console.error('Auth error', authErr);
      setAuthError(authErr instanceof Error ? authErr.message : 'Authentication failed. Try again later.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('sign-in')}
          className={clsx(
            'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
            mode === 'sign-in' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('sign-up')}
          className={clsx(
            'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
            mode === 'sign-up' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          Create account
        </button>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <span className="text-xs text-gray-500">At least 8 characters.</span>
      </label>

      {authError && <p className="text-xs font-semibold text-rose-600">{authError}</p>}

      <DialogFooter>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-brand-600/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </button>
      </DialogFooter>
    </form>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, index);
  return `${size.toFixed(1)} ${units[index]}`;
}

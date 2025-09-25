'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  CheckCircle2,
  Clipboard,
  CreditCard,
  Download,
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
const SOCIAL_DOMAINS = ['facebook.com', 'instagram.com'];

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
  headline: string;
  angleSummary: string;
  script?: Array<{
    scene: string;
    description: string;
    voiceover: string;
    overlay: string;
    cta: string;
  }>;
  staticCopy?: {
    headline: string;
    body: string;
    cta: string;
    designNotes: string[];
  };
  testingNotes?: string[];
};

type IterationAnalysis = {
  performanceScore?: number;
  topWins?: string[];
  topRisks?: string[];
  summary?: string;
  scenes?: IterationScene[];
  iterations?: IterationVariant[];
  exportArtifacts?: {
    markdown?: string;
    json?: Record<string, unknown>;
  };
};

type IterationFunctionResponse = {
  analysis?: IterationAnalysis;
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

  const abortSubmission = useCallback(() => {
    setSubmitting(false);
  }, []);

  const triggerProfileReload = useCallback(() => {
    setProfileReloadKey((value) => value + 1);
  }, []);

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
      } else {
        setUser(null);
        setEmailAddress('');
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      if (session?.user) {
        setUser(session.user);
        setEmailAddress(session.user.email ?? '');
        triggerProfileReload();
      } else {
        setUser(null);
        setEmailAddress('');
        setProfileCredits(null);
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
            setError('Paste the social URL for the ad you want to iterate.');
            abortSubmission();
            return;
          }

          try {
            const parsed = new URL(trimmedUrl);
            const domainMatch = SOCIAL_DOMAINS.some((domain) => parsed.hostname.toLowerCase().includes(domain));
            if (!domainMatch) {
              setError('We currently support Facebook and Instagram ads only. TikTok and YouTube support coming soon.');
              abortSubmission();
              return;
            }
          } catch {
            setError('Enter a valid social URL including https://.');
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

        const { data, error: invokeError } = await supabase.functions.invoke<IterationFunctionResponse>(
          'analyze-and-iterate-ad',
          {
            body: payload,
          },
        );

        if (invokeError) {
          console.error('analyze-and-iterate-ad error', invokeError);
          const { statusCode, message: parsedMessage } = await extractEdgeFunctionError(invokeError);
          const effectiveMessage = parsedMessage || invokeError.message || '';

          switch (statusCode) {
            case 400:
              setError('Check the inputs and make sure the asset belongs to your brand.');
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
                setError('Create a free account to access your 10 monthly credits.');
              }
              break;
            case 403:
              setError(effectiveMessage || 'We can only analyze creative your brand owns.');
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

        if (data?.analysis) {
          setResult(data.analysis);
          setRawResult(data);
          setLastSubmissionMeta({
            companyName: formData.companyName,
            primaryPlatform: formData.primaryPlatform,
          });
        } else if (data?.status === 'processing') {
          setError('We queued your iteration job. Polling UI is not implemented yet.');
        } else {
          setError('The analysis completed without returning structured data.');
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
      supabase,
      triggerProfileReload,
      uploadAsset,
      user,
    ],
  );

  const handlePurchase = useCallback(async (tier: 'essentials' | 'studio' | 'concierge' = 'essentials') => {
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke<{ checkout_url?: string }>(
        'create-checkout-session',
        { body: { tier } },
      );

      if (invokeError) {
        console.error('create-checkout-session error', invokeError);
        setError(invokeError.message || 'We could not start the checkout process.');
        return;
      }

      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setError('Checkout session did not return a redirect URL.');
      }
    } catch (purchaseError) {
      console.error('Checkout error', purchaseError);
      setError(purchaseError instanceof Error ? purchaseError.message : 'Unexpected error while starting checkout.');
    }
  }, [supabase]);

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
              Sign in or create free account
            </button>
          )}
        <button
          type="button"
          onClick={() => handlePurchase('essentials')}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-brand-600/30 transition hover:bg-brand-700"
        >
          <CreditCard className="h-4 w-4" />
          Upgrade to Essentials
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
            Use social link
          </button>
        </div>
        <p className="text-xs text-brand-700">
Facebook and Instagram ads only. TikTok and YouTube support coming soon. We only iterate content your brand owns.
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
            Social post URL
            <input
              type="url"
              value={assetUrl}
              onChange={handleUrlChange}
              placeholder="https://www.instagram.com/p/..."
              className={clsx(
                'rounded-lg border px-4 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200',
                urlError ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-500',
              )}
            />
          </label>
          {urlError && <p className="text-xs font-semibold text-red-600">{urlError}</p>}
          <p className="text-xs text-gray-500">
            Only analyze creative your brand owns. We will block competitor assets automatically.
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
      emailAddress={emailAddress}
      onEmailAddressChange={setEmailAddress}
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
                  Upgrade to Essentials
                </button>
                <button
                  onClick={() => handlePurchase('studio')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-600 hover:text-brand-800"
                  type="button"
                >
                  <CreditCard className="h-4 w-4" />
                  Unlock Studio Founding Offer
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
  emailAddress,
  onEmailAddressChange,
  onEmailResults,
  emailSending,
  emailStatus,
  emailStatusMessage,
}: IterationResultsViewProps) {
  const summaryText = buildSummary(analysis);

  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard
        .writeText(summaryText)
        .catch((error) => console.error('Failed to copy summary', error));
    }
  }, [summaryText]);

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

  return (
    <section id="results" className="mt-10 space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-700">Iteration ready</p>
          <h2 className="text-2xl font-bold text-gray-900">Your APSICS creative intelligence report</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Clipboard className="h-4 w-4" />
            Copy summary
          </button>
          <button
            type="button"
            onClick={() => handleDownload('markdown')}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Download className="h-4 w-4" />
            Download .md
          </button>
          <button
            type="button"
            onClick={() => handleDownload('json')}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <Download className="h-4 w-4" />
            Download .json
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          {typeof analysis.performanceScore === 'number' && (
            <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Performance score</p>
              <p className="mt-2 text-3xl font-bold text-brand-900">{Math.round(analysis.performanceScore)}</p>
              <p className="mt-1 text-sm text-brand-800">
                Score benchmarked against APSICS retention, resonance, and conversion heuristics.
              </p>
            </div>
          )}

          {analysis.topWins?.length ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">What is working</p>
              <ul className="mt-2 space-y-2 text-sm text-emerald-800">
                {analysis.topWins.map((item, index) => (
                  <li key={`win-${index}`}>- {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {analysis.topRisks?.length ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">What to fix</p>
              <ul className="mt-2 space-y-2 text-sm text-rose-800">
                {analysis.topRisks.map((item, index) => (
                  <li key={`risk-${index}`}>- {item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Email this breakdown</p>
          <div className="mt-3 space-y-3 text-sm text-gray-700">
            <label className="flex flex-col gap-2 text-xs font-medium text-gray-600">
              Email address
              <input
                type="email"
                value={emailAddress}
                onChange={(event) => onEmailAddressChange(event.target.value)}
                placeholder="you@company.com"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <button
              type="button"
              onClick={onEmailResults}
              disabled={emailSending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-brand-600/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {emailSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MailIcon />}
              {emailSending ? 'Sending...' : 'Send to inbox'}
            </button>
            {emailStatusMessage && (
              <p
                className={clsx(
                  'text-xs',
                  emailStatus === 'success' ? 'text-emerald-700' : 'text-rose-700',
                )}
              >
                {emailStatusMessage}
              </p>
            )}
          </div>
        </aside>
      </div>

      {analysis.summary && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Executive summary</p>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      {analysis.scenes?.length ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm text-gray-800">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Timecode</th>
                <th className="px-4 py-3">Finding</th>
                <th className="px-4 py-3">Recommendation</th>
                <th className="px-4 py-3">Impact</th>
              </tr>
            </thead>
            <tbody>
              {analysis.scenes.map((scene, index) => (
                <tr key={`scene-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{scene.timecode}</td>
                  <td className="px-4 py-3">{scene.observation}</td>
                  <td className="px-4 py-3">{scene.recommendation}</td>
                  <td className="px-4 py-3">
                    <ImpactPill impact={scene.impact} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {analysis.iterations?.length ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Iteration packages</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {analysis.iterations.map((iteration, index) => (
              <article key={`iteration-${iteration.id}-${index}`} className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/80 p-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {OUTPUT_LABELS[iteration.id] ?? 'Iteration'}
                  </p>
                  <h4 className="text-base font-semibold text-gray-900">{iteration.headline}</h4>
                  <p className="text-sm text-gray-600">{iteration.angleSummary}</p>
                  {iteration.script?.length ? (
                    <div className="mt-3 space-y-3 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
                      {iteration.script.map((scene, sceneIndex) => (
                        <div key={`iteration-${iteration.id}-scene-${sceneIndex}`} className="space-y-1">
                          <p className="text-xs font-semibold text-gray-500">{scene.scene}</p>
                          <p><span className="font-semibold text-gray-800">On-screen:</span> {scene.description}</p>
                          <p><span className="font-semibold text-gray-800">Voiceover:</span> {scene.voiceover}</p>
                          <p><span className="font-semibold text-gray-800">Overlay:</span> {scene.overlay}</p>
                          <p><span className="font-semibold text-gray-800">CTA:</span> {scene.cta}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {iteration.staticCopy && (
                    <div className="mt-3 space-y-1 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
                      <p><span className="font-semibold text-gray-800">Headline:</span> {iteration.staticCopy.headline}</p>
                      <p><span className="font-semibold text-gray-800">Body:</span> {iteration.staticCopy.body}</p>
                      <p><span className="font-semibold text-gray-800">CTA:</span> {iteration.staticCopy.cta}</p>
                      {iteration.staticCopy.designNotes?.length ? (
                        <ul className="mt-2 space-y-1 text-xs text-gray-500">
                          {iteration.staticCopy.designNotes.map((note, noteIndex) => (
                            <li key={`design-note-${noteIndex}`}>- {note}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  )}
                </div>

                {iteration.testingNotes?.length ? (
                  <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/80 p-3 text-xs text-brand-800">
                    <p className="font-semibold text-brand-700">Testing notes</p>
                    <ul className="mt-1 space-y-1">
                      {iteration.testingNotes.map((note, noteIndex) => (
                        <li key={`testing-note-${noteIndex}`}>- {note}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

type ImpactPillProps = {
  impact: 'high' | 'medium' | 'low';
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
          <DialogTitle className="text-xl font-semibold text-gray-900">Sign in or create a free account</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Free accounts unlock 10 monthly credits and save your creative history.
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

type MailIconProps = {
  className?: string;
};

function MailIcon({ className }: MailIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('h-4 w-4', className)}
    >
      <path d="M4 4h16v16H4z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
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

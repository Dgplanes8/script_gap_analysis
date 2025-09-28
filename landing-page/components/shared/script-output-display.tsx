'use client';

import { useMemo } from 'react';
import { parseScriptOutput, type ParsedScriptSection } from '@/utils/parse-script-output';

type ScriptScene = {
  timing: string;
  description: string;
  voiceover: string;
  onScreenText: string;
  cta?: string;
};

type StaticCopy = {
  headline: string;
  subheadline: string;
  body: string;
  bullets: string[];
  cta: string;
  designNotes: string;
};

type ScriptRecommendation = {
  improvedElement: string;
  frameworkUsed: string;
  awarenessStage: string;
  rationale: string;
  testingStrategy: string;
};

type PlatformAdaptations = {
  tiktok: string;
  instagram: string;
  facebook: string;
  x: string;
  linkedin: string;
  youtube: string;
};

type ScriptGenerationData = {
  contentType: 'video' | 'static';
  script?: {
    scenes: ScriptScene[];
  };
  staticCopy?: StaticCopy;
  recommendations: ScriptRecommendation[];
  platformAdaptations: PlatformAdaptations;
};

type ThemeConfig = {
  gradientFrom: string;
  gradientTo: string;
  border: string;
  accent: string;
  iconBg: string;
  iconColor: string;
  labelColor: string;
  blockBackground: string;
  blockBorder: string;
};

type SectionMeta = {
  title: string;
  label: string;
  icon: JSX.Element;
  theme: ThemeConfig;
  fallback: string;
};

const SECTION_META: Record<ParsedScriptSection['type'], SectionMeta> = {
  hook: {
    title: 'Hook & Attention Play',
    label: 'Opening Sequence',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
      </svg>
    ),
    theme: {
      gradientFrom: '#F3F8FF',
      gradientTo: '#D0E3FF',
      border: '#3B6FD6',
      accent: '#126DFB',
      iconBg: '#126DFB',
      iconColor: '#FFFFFF',
      labelColor: '#3B6FD6',
      blockBackground: '#FFFFFFCC',
      blockBorder: '#D0E3FF',
    },
    fallback: 'Regenerate to include a clearly defined hook or intro beat for your opening seconds.',
  },
  narrative: {
    title: 'Narrative & Proof Flow',
    label: 'Story Arc',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l-1.912 5.813a2 2 0 01-1.275 1.275L3 12l5.813 1.912a2 2 0 011.275 1.275L12 21l1.912-5.813a2 2 0 011.275-1.275L21 12l-5.813-1.912a2 2 0 01-1.275-1.275L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 17v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 19h4" />
      </svg>
    ),
    theme: {
      gradientFrom: '#F0FDF4',
      gradientTo: '#D1FAE5',
      border: '#10B981',
      accent: '#047857',
      iconBg: '#10B981',
      iconColor: '#FFFFFF',
      labelColor: '#047857',
      blockBackground: '#ECFDF5',
      blockBorder: '#A7F3D0',
    },
    fallback: 'Add narrative beats, social proof, or scene-by-scene copy so production stays in sync.',
  },
  conversion: {
    title: 'Conversion Close & CTA',
    label: 'Call To Action',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m-4 8h12m-6-2v2m6 6H9m4-2v2" />
      </svg>
    ),
    theme: {
      gradientFrom: '#FEF3C7',
      gradientTo: '#FFFBEB',
      border: '#F59E0B',
      accent: '#92400E',
      iconBg: '#F59E0B',
      iconColor: '#FFFFFF',
      labelColor: '#92400E',
      blockBackground: '#FEF9C3',
      blockBorder: '#FCD34D',
    },
    fallback: 'Spell out the CTA, urgency, and next-step language needed for the conversion moment.',
  },
  production: {
    title: 'Production Notes & Overlays',
    label: 'Delivery Blueprint',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v2M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
      </svg>
    ),
    theme: {
      gradientFrom: '#F8FAFF',
      gradientTo: '#E5EDFF',
      border: '#3B6FD6',
      accent: '#111827',
      iconBg: '#3B6FD6',
      iconColor: '#FFFFFF',
      labelColor: '#3B6FD6',
      blockBackground: '#FFFFFF',
      blockBorder: '#D0E3FF',
    },
    fallback: 'No production notes detected. Layer in overlays, timing, or shot guidance before handoff.',
  },
};

function renderLine(line: string, accent: string) {
  const trimmed = line.trim();
  if (!trimmed) {
    return null;
  }

  const labelMatch = trimmed.match(/^(.*?)(:)(\s*)(.*)$/);
  if (labelMatch) {
    const [, label, colon, space, rest] = labelMatch;
    return (
      <p className="text-sm leading-relaxed text-[#374151]">
        <span className="font-semibold" style={{ color: accent }}>
          {label}
          {colon}
        </span>
        {space}
        <span>{rest}</span>
      </p>
    );
  }

  return <p className="text-sm leading-relaxed text-[#374151]">{trimmed}</p>;
}

function renderBlock(block: string, theme: ThemeConfig, index: number) {
  const lines = block.split('\n').map((line) => line.trim());
  const bulletLines = lines.filter((line) => /^[-•]/.test(line));
  const isPureList = bulletLines.length === lines.length && lines.length > 0;

  return (
    <div
      key={`script-block-${index}`}
      className="rounded-xl p-6 shadow-sm"
      style={{
        backgroundColor: theme.blockBackground,
        border: `1px solid ${theme.blockBorder}`,
      }}
    >
      {isPureList ? (
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#374151]">
          {lines.map((line, idx) => (
            <li key={`script-line-${index}-${idx}`}>{line.replace(/^[-•]\s*/, '')}</li>
          ))}
        </ul>
      ) : (
        <div className="space-y-2">
          {lines.map((line, idx) => (
            <div key={`script-line-${index}-${idx}`}>{renderLine(line, theme.accent)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function renderRecommendations(recommendations: ScriptRecommendation[]) {
  if (!recommendations?.length) return null;

  return (
    <section className="rounded-2xl border p-8 shadow-lg border-violet-300 bg-gradient-to-br from-violet-50 to-purple-50 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg bg-violet-600 text-white">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Expert Recommendations
          </p>
          <h3 className="text-xl font-semibold text-violet-900">
            Optimization Insights
          </h3>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="rounded-xl p-6 bg-white/80 border border-violet-200 shadow-sm">
            <h4 className="font-semibold text-violet-900 mb-2">{rec.improvedElement}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-violet-700">Framework:</span>
                <p className="text-gray-700 mt-1">{rec.frameworkUsed}</p>
              </div>
              <div>
                <span className="font-medium text-violet-700">Awareness Stage:</span>
                <p className="text-gray-700 mt-1">{rec.awarenessStage}</p>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-violet-700">Why this works:</span>
                <p className="text-gray-700 mt-1">{rec.rationale}</p>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-violet-700">Testing Strategy:</span>
                <p className="text-gray-700 mt-1">{rec.testingStrategy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderStructuredScript(scenes: ScriptScene[]) {
  if (!scenes?.length) return null;

  return (
    <section className="rounded-2xl border p-8 shadow-lg border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg bg-blue-600 text-white">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Video Script
          </p>
          <h3 className="text-xl font-semibold text-blue-900">
            Scene-by-Scene Breakdown
          </h3>
        </div>
      </div>
      <div className="space-y-6">
        {scenes.map((scene, index) => (
          <div key={index} className="rounded-xl p-6 bg-white/80 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-600 text-white text-sm font-bold rounded">
                Scene {index + 1}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {scene.timing}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Visual Description</h4>
                <p className="text-gray-700 leading-relaxed">{scene.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Voiceover</h4>
                <p className="text-gray-700 italic leading-relaxed">"{scene.voiceover}"</p>
              </div>
              {scene.onScreenText && (
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">On-Screen Text</h4>
                  <p className="text-gray-900 font-medium">{scene.onScreenText}</p>
                </div>
              )}
              {scene.cta && (
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Call to Action</h4>
                  <p className="text-blue-800 font-bold text-lg">{scene.cta}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderStaticCopy(staticCopy: StaticCopy) {
  return (
    <section className="rounded-2xl border p-8 shadow-lg border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg bg-green-600 text-white">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
            Static Copy
          </p>
          <h3 className="text-xl font-semibold text-green-900">
            Ad Copy Structure
          </h3>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-xl p-6 bg-white/80 border border-green-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <span className="font-medium text-green-700">Headline:</span>
              <h4 className="text-lg font-bold text-gray-900 mt-1">{staticCopy.headline}</h4>
            </div>
            <div>
              <span className="font-medium text-green-700">Subheadline:</span>
              <p className="text-gray-700 mt-1">{staticCopy.subheadline}</p>
            </div>
            <div>
              <span className="font-medium text-green-700">Body Copy:</span>
              <p className="text-gray-700 mt-1">{staticCopy.body}</p>
            </div>
            <div>
              <span className="font-medium text-green-700">Key Benefits:</span>
              <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
                {staticCopy.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium text-green-700">Call to Action:</span>
              <p className="text-gray-900 font-semibold mt-1">{staticCopy.cta}</p>
            </div>
            <div>
              <span className="font-medium text-green-700">Design Notes:</span>
              <p className="text-gray-600 text-sm mt-1">{staticCopy.designNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderPlatformAdaptations(platformAdaptations: PlatformAdaptations) {
  const platforms = [
    { key: 'tiktok' as const, name: 'TikTok', color: 'bg-pink-500', icon: '🎵' },
    { key: 'instagram' as const, name: 'Instagram', color: 'bg-purple-500', icon: '📸' },
    { key: 'facebook' as const, name: 'Facebook', color: 'bg-blue-500', icon: '👥' },
    { key: 'x' as const, name: 'X (Twitter)', color: 'bg-black', icon: '🐦' },
    { key: 'linkedin' as const, name: 'LinkedIn', color: 'bg-blue-700', icon: '💼' },
    { key: 'youtube' as const, name: 'YouTube', color: 'bg-red-500', icon: '📺' },
  ];

  return (
    <section className="rounded-2xl border p-8 shadow-lg border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg bg-orange-600 text-white">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            Platform Optimization
          </p>
          <h3 className="text-xl font-semibold text-orange-900">
            Cross-Platform Adaptations
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div key={platform.key} className="rounded-xl p-4 bg-white/80 border border-orange-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full ${platform.color} flex items-center justify-center text-white text-xs`}>
                {platform.icon}
              </div>
              <h4 className="font-semibold text-orange-900">{platform.name}</h4>
            </div>
            <p className="text-sm text-gray-700">{platformAdaptations[platform.key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ScriptOutputDisplay({
  script,
  structuredData
}: {
  script: string;
  structuredData?: ScriptGenerationData | null;
}) {
  const sections = useMemo(() => parseScriptOutput(script), [script]);

  // Debug logging
  console.log('=== ScriptOutputDisplay Debug ===');
  console.log('Script length:', script?.length);
  console.log('StructuredData:', structuredData);
  console.log('StructuredData type:', typeof structuredData);
  console.log('Has scenes:', !!(structuredData?.script?.scenes?.length));
  console.log('Has recommendations:', !!(structuredData?.recommendations?.length));
  console.log('Content type:', structuredData?.contentType);

  // Try to parse JSON from script if structuredData is null but script looks like JSON
  let parsedData = structuredData;
  if (!structuredData && script && script.trim().startsWith('{')) {
    try {
      console.log('Attempting to parse JSON from script...');
      parsedData = JSON.parse(script);
      console.log('Successfully parsed JSON from script:', parsedData);
    } catch (e) {
      console.log('Failed to parse JSON from script:', e);
    }
  }

  // If we have structured data, use the enhanced display
  if (parsedData && (parsedData.script?.scenes || parsedData.staticCopy || parsedData.recommendations)) {
    console.log('✅ Using structured display for contentType:', parsedData.contentType);
    return (
      <div className="space-y-8">
        {/* Priority 1: Expert Recommendations */}
        {!!(parsedData.recommendations?.length) && renderRecommendations(parsedData.recommendations)}

        {/* Priority 2: Structured Content */}
        {parsedData.contentType === 'video' && !!(parsedData.script?.scenes?.length) &&
          renderStructuredScript(parsedData.script.scenes)}

        {parsedData.contentType === 'static' && parsedData.staticCopy &&
          renderStaticCopy(parsedData.staticCopy)}

        {/* Priority 3: Platform Adaptations */}
        {parsedData.platformAdaptations && renderPlatformAdaptations(parsedData.platformAdaptations)}
      </div>
    );
  }

  console.log('❌ Falling back to legacy display');

  // Fallback to legacy display
  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const meta = SECTION_META[section.type];
        const hasContent = section.blocks.length > 0;

        return (
          <section
            key={section.type}
            className="rounded-2xl border p-8 shadow-lg"
            style={{
              borderColor: meta.theme.border,
              background: `linear-gradient(135deg, ${meta.theme.gradientFrom} 0%, ${meta.theme.gradientTo} 100%)`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg"
                style={{ backgroundColor: meta.theme.iconBg, color: meta.theme.iconColor }}
              >
                {meta.icon}
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: meta.theme.labelColor }}
                >
                  {meta.label}
                </p>
                <h3 className="text-xl font-semibold" style={{ color: meta.theme.accent }}>
                  {meta.title}
                </h3>
              </div>
            </div>
            <div className="space-y-4">
              {hasContent
                ? section.blocks.map((block, index) => renderBlock(block, meta.theme, index))
                : renderBlock(meta.fallback, meta.theme, 0)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default ScriptOutputDisplay;

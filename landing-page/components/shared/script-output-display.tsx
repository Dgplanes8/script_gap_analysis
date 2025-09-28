'use client';

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


function renderRecommendations(recommendations: ScriptRecommendation[]) {
  if (!recommendations?.length) return null;

  return (
    <section className="rounded-2xl border border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-[#FEF9E7] p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B] text-white shadow-lg">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92400E]">Expert Recommendations</p>
          <h3 className="text-xl font-semibold text-[#111827]">Strategic Optimization Insights</h3>
        </div>
      </div>
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="rounded-xl border border-[#FEF3C7] bg-white/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B] text-white text-sm font-bold">
                {index + 1}
              </span>
              <h4 className="text-lg font-semibold text-[#111827]">{rec.improvedElement}</h4>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-[#374151] mb-2">Framework Applied</h5>
                  <p className="text-sm text-[#111827] bg-[#FFFBEB] p-3 rounded-lg border border-[#FEF3C7]">{rec.frameworkUsed}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-[#374151] mb-2">Awareness Stage</h5>
                  <p className="text-sm text-[#111827] bg-[#FFFBEB] p-3 rounded-lg border border-[#FEF3C7]">{rec.awarenessStage}</p>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-[#374151] mb-2">Why This Works</h5>
                <p className="text-sm text-[#111827] leading-relaxed">{rec.rationale}</p>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-[#374151] mb-2">Testing Strategy</h5>
                <p className="text-sm text-[#111827] leading-relaxed bg-[#FEF9E7] p-3 rounded-lg border border-[#FEF3C7]">{rec.testingStrategy}</p>
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
  // Try to parse JSON from script if structuredData is null but script looks like JSON
  let parsedData = structuredData;
  if (!structuredData && script && script.trim().startsWith('{')) {
    try {
      parsedData = JSON.parse(script);
    } catch (e) {
      // Parsing failed, use raw script
    }
  }

  // If we have structured data, use the enhanced display
  if (parsedData && (parsedData.script?.scenes || parsedData.staticCopy || parsedData.recommendations)) {
    return (
      <div className="space-y-8">
        {/* Priority 1: Expert Recommendations */}
        {!!(parsedData.recommendations?.length) && renderRecommendations(parsedData.recommendations)}

        {/* Priority 2: Content - Video Script or Static Copy */}
        {parsedData.contentType === 'video' && !!(parsedData.script?.scenes?.length) &&
          renderStructuredScript(parsedData.script.scenes)}

        {parsedData.contentType === 'static' && parsedData.staticCopy &&
          renderStaticCopy(parsedData.staticCopy)}

        {/* Priority 3: Platform Adaptations (if available) */}
        {parsedData.platformAdaptations && renderPlatformAdaptations(parsedData.platformAdaptations)}
      </div>
    );
  }

  // Fallback to raw script display with simple formatting
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-600 text-white shadow-lg">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
              Generated Content
            </p>
            <h3 className="text-xl font-semibold text-gray-900">
              Ad Script
            </h3>
          </div>
        </div>
        <div className="rounded-xl bg-white/80 border border-gray-200 p-6">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {script}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScriptOutputDisplay;

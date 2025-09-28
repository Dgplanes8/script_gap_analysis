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

function parseTextToScenes(text: string): ScriptScene[] {
  if (!text) return [];

  // Split by timing patterns like [0-3s], [3-8s], etc.
  const sceneRegex = /\[(\d+[-–]\d+s?)\]\s*(.*?)(?=\[|\n*$)/gs;
  const scenes: ScriptScene[] = [];
  let match;

  while ((match = sceneRegex.exec(text)) !== null) {
    const timing = match[1];
    const content = match[2].trim();

    // Parse the content to extract description, voiceover, and on-screen text
    const lines = content.split('\n').filter(line => line.trim());
    let description = '';
    let voiceover = '';
    let onScreenText = '';
    let cta = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('VO:')) {
        voiceover = trimmed.replace('VO:', '').trim();
      } else if (trimmed.startsWith('On-screen:')) {
        onScreenText = trimmed.replace('On-screen:', '').trim();
      } else if (trimmed.startsWith('CTA:')) {
        cta = trimmed.replace('CTA:', '').trim();
      } else if (!trimmed.startsWith('VO:') && !trimmed.startsWith('On-screen:') && !trimmed.startsWith('CTA:')) {
        description = trimmed;
      }
    }

    scenes.push({
      timing,
      description,
      voiceover,
      onScreenText,
      cta
    });
  }

  return scenes;
}


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

  // Sort scenes by timing to ensure proper order (extract seconds from timing like "0-3s", "3-10s")
  const sortedScenes = [...scenes].sort((a, b) => {
    const getStartTime = (timing: string) => {
      const match = timing.match(/^(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
    return getStartTime(a.timing || '0') - getStartTime(b.timing || '0');
  });

  return (
    <section className="rounded-2xl border border-[#D0E3FF] bg-gradient-to-br from-[#F8FAFF] to-[#F3F8FF] p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#126DFB] text-white shadow-lg">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FD6]">Video Script</p>
          <h3 className="text-xl font-semibold text-[#111827]">Scene-by-Scene Production Guide</h3>
        </div>
      </div>
      <div className="space-y-6">
        {sortedScenes.map((scene, index) => (
          <div key={`scene-${index}-${scene.timing}`} className="rounded-xl border border-[#D0E3FF] bg-white/80 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#126DFB] text-white text-sm font-bold">
                {index + 1}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111827]">Scene {index + 1}</span>
                {scene.timing && (
                  <span className="px-3 py-1 bg-[#F8FAFF] text-[#3B6FD6] text-sm font-medium rounded-full border border-[#D0E3FF]">
                    {scene.timing}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {scene.description && (
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Visual Description</h4>
                  <p className="text-sm text-[#111827] leading-relaxed bg-[#F8FAFF] p-3 rounded-lg border border-[#D0E3FF]">{scene.description}</p>
                </div>
              )}
              {scene.voiceover && (
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Voiceover</h4>
                  <p className="text-sm text-[#111827] italic leading-relaxed">"{scene.voiceover}"</p>
                </div>
              )}
              {scene.onScreenText && (
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">On-Screen Text</h4>
                  <p className="text-sm font-semibold text-[#111827] bg-[#F3F8FF] p-3 rounded-lg border border-[#D0E3FF]">{scene.onScreenText}</p>
                </div>
              )}
              {scene.cta && (
                <div>
                  <h4 className="text-sm font-semibold text-[#374151] mb-2">Call to Action</h4>
                  <p className="text-sm font-bold text-[#126DFB] bg-[#F8FAFF] p-3 rounded-lg border border-[#D0E3FF]">{scene.cta}</p>
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
    <section className="rounded-2xl border border-[#D1FAE5] bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981] text-white shadow-lg">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#047857]">Static Copy</p>
          <h3 className="text-xl font-semibold text-[#111827]">Creative Copy Structure</h3>
        </div>
      </div>
      <div className="rounded-xl border border-[#D1FAE5] bg-white/80 p-6">
        <div className="space-y-6">
          {staticCopy.headline && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Primary Headline</h4>
              <h5 className="text-lg font-bold text-[#111827] bg-[#F0FDF4] p-3 rounded-lg border border-[#D1FAE5]">{staticCopy.headline}</h5>
            </div>
          )}
          {staticCopy.subheadline && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Supporting Subheadline</h4>
              <p className="text-sm text-[#111827] leading-relaxed bg-[#F0FDF4] p-3 rounded-lg border border-[#D1FAE5]">{staticCopy.subheadline}</p>
            </div>
          )}
          {staticCopy.body && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Body Copy</h4>
              <p className="text-sm text-[#111827] leading-relaxed">{staticCopy.body}</p>
            </div>
          )}
          {staticCopy.bullets && staticCopy.bullets.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Key Benefits</h4>
              <ul className="space-y-2">
                {staticCopy.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[#111827]">
                    <span className="text-[#10B981] text-xs mt-1">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {staticCopy.cta && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Call to Action</h4>
              <p className="text-sm font-bold text-[#10B981] bg-[#F0FDF4] p-3 rounded-lg border border-[#D1FAE5]">{staticCopy.cta}</p>
            </div>
          )}
          {staticCopy.designNotes && (
            <div>
              <h4 className="text-sm font-semibold text-[#374151] mb-2">Design & Layout Notes</h4>
              <p className="text-sm text-[#111827] leading-relaxed bg-[#ECFDF5] p-3 rounded-lg border border-[#A7F3D0]">{staticCopy.designNotes}</p>
            </div>
          )}
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

  // Filter platforms that have content
  const availablePlatforms = platforms.filter(platform =>
    platformAdaptations[platform.key] && platformAdaptations[platform.key].trim().length > 0
  );

  if (availablePlatforms.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[#FED7AA] bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EA580C] text-white shadow-lg">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2410C]">Platform Optimization</p>
          <h3 className="text-xl font-semibold text-[#111827]">Cross-Platform Adaptations</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availablePlatforms.map((platform) => (
          <div key={platform.key} className="rounded-xl border border-[#FED7AA] bg-white/80 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full ${platform.color} flex items-center justify-center text-white text-xs`}>
                {platform.icon}
              </div>
              <h4 className="font-semibold text-[#111827]">{platform.name}</h4>
            </div>
            <p className="text-sm text-[#111827] leading-relaxed">{platformAdaptations[platform.key]}</p>
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

  // Parse text script into scenes if it follows the timing pattern
  const textScenes = parseTextToScenes(script);

  if (textScenes.length > 0) {
    // Render as structured script even if from text format
    return (
      <div className="space-y-8">
        {renderStructuredScript(textScenes)}
      </div>
    );
  }

  // Final fallback for unstructured text
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-[#D0E3FF] bg-gradient-to-br from-[#F8FAFF] to-[#F3F8FF] p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#126DFB] text-white shadow-lg">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6FD6]">Generated Script</p>
            <h3 className="text-xl font-semibold text-[#111827]">Ad Script Content</h3>
          </div>
        </div>
        <div className="rounded-xl border border-[#D0E3FF] bg-white/80 p-6">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#111827]">
            {script}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScriptOutputDisplay;

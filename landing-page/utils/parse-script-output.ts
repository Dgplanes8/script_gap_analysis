export type ScriptSectionType = 'hook' | 'narrative' | 'conversion' | 'production';

export type ParsedScriptSection = {
  type: ScriptSectionType;
  blocks: string[];
};

const SECTION_ORDER: ScriptSectionType[] = ['hook', 'narrative', 'conversion', 'production'];

const HOOK_KEYWORDS = [
  'hook',
  'opening',
  'intro',
  'headline',
  'pattern break',
  'scroll',
  'attention',
  'start',
];

const CONVERSION_KEYWORDS = [
  'cta',
  'call to action',
  'offer',
  'close',
  'closing',
  'outro',
  'link in bio',
  'buy now',
  'shop now',
  'tap to',
  'click',
  'claim',
];

const PRODUCTION_KEYWORDS = [
  'visual',
  'on-screen',
  'onscreen',
  'b-roll',
  'b roll',
  'camera',
  'production',
  'shot',
  'transition',
  'scene direction',
  'stage direction',
  'sound design',
  'sfx',
  'music',
  'overlay',
  'lower third',
  'caption',
  'layout',
  'design note',
  'talent note',
  'visual cue',
  'timing',
];

const SCENE_PATTERN = /^(scene|beat|slide)\s*\d+/i;

function cleanSegment(segment: string) {
  return segment.replace(/^Script:\s*/i, '').trim();
}

function splitIntoSegments(script: string) {
  return script
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function classifySegment(segment: string, index: number, total: number): ScriptSectionType {
  const normalized = segment.toLowerCase();

  if (SCENE_PATTERN.test(segment) || normalized.startsWith('scene')) {
    return 'narrative';
  }

  if (HOOK_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return 'hook';
  }

  if (CONVERSION_KEYWORDS.some((keyword) => normalized.includes(keyword)) || index === total - 1) {
    return 'conversion';
  }

  if (PRODUCTION_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return 'production';
  }

  if (index === 0) {
    return 'hook';
  }

  return 'narrative';
}

export function parseScriptOutput(rawScript: string | null | undefined): ParsedScriptSection[] {
  const cleaned = cleanSegment(rawScript ?? '');

  if (!cleaned) {
    return SECTION_ORDER.map((type) => ({ type, blocks: [] }));
  }

  const segments = splitIntoSegments(cleaned);

  const sectionBuckets: Record<ScriptSectionType, string[]> = {
    hook: [],
    narrative: [],
    conversion: [],
    production: [],
  };

  segments.forEach((segment, index) => {
    const category = classifySegment(segment, index, segments.length);
    sectionBuckets[category].push(segment);
  });

  if (sectionBuckets.hook.length === 0 && segments.length > 0) {
    sectionBuckets.hook.push(segments[0]);
  }

  if (sectionBuckets.conversion.length === 0 && segments.length > 1) {
    sectionBuckets.conversion.push(segments[segments.length - 1]);
  }

  return SECTION_ORDER.map((type) => ({ type, blocks: sectionBuckets[type] }));
}

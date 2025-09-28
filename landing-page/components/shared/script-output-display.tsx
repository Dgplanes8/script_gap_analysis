'use client';

import { useMemo } from 'react';
import { parseScriptOutput, type ParsedScriptSection } from '@/utils/parse-script-output';

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

export function ScriptOutputDisplay({ script }: { script: string }) {
  const sections = useMemo(() => parseScriptOutput(script), [script]);

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

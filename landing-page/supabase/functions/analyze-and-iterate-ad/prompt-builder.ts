import { dirname, fromFileUrl, join } from "https://deno.land/std@0.208.0/path/mod.ts";

const baseDir = dirname(fromFileUrl(import.meta.url));
const promptsDir = join(baseDir, "prompts");

const promptCache = new Map<string, string>();
let schemaCache: Record<string, unknown> | null = null;

const OUTPUT_LABELS: Record<string, string> = {
  same: "Same format upgrade",
  video: "Video remix",
  static: "Static package",
  carousel: "Carousel package",
};

const FORMAT_PROMPT_MAP: Record<string, string> = {
  same: "format_transitions/same_format.md",
  video: "format_transitions/video_from_static.md",
  static: "format_transitions/static_from_video.md",
  carousel: "format_transitions/carousel_package.md",
};

export type OutputFormat = "same" | "video" | "static" | "carousel";

export interface PromptContext {
  companyName: string;
  brandVoice: string;
  primaryPlatform: string;
  iterationGoal: string;
  referenceUrl: string | null;
  additionalContext: string | null;
  inputMethod: "upload" | "url";
  assetUrl: string;
  assetType: "image" | "video" | "url";
  outputFormats: OutputFormat[];
}

export interface BuiltPrompt {
  systemPrompt: string;
  userPrompt: string;
  jsonSchema: Record<string, unknown>;
}

async function loadPrompt(relativePath: string): Promise<string> {
  if (promptCache.has(relativePath)) {
    return promptCache.get(relativePath)!;
  }

  const filePath = join(promptsDir, relativePath);
  const data = await Deno.readTextFile(filePath);
  const value = data.trim();
  promptCache.set(relativePath, value);
  return value;
}

async function loadSchema(): Promise<Record<string, unknown>> {
  if (schemaCache) {
    return schemaCache;
  }
  const schemaPath = join(promptsDir, "output_structure.json");
  const raw = await Deno.readTextFile(schemaPath);
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  schemaCache = parsed;
  return parsed;
}

function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function buildIterationPrompt(context: PromptContext): Promise<BuiltPrompt> {
  const systemPrompt = await loadPrompt("system.md");
  const baseAnalysis = await loadPrompt("base_analysis.md");

  const sections: string[] = [];

  const requestedFormats = context.outputFormats.map((format) => OUTPUT_LABELS[format] ?? format);
  const contextSummary = [
    `Brand: ${context.companyName}`,
    `Preferred voice: ${context.brandVoice}`,
    `Primary platform: ${context.primaryPlatform}`,
    `Iteration goal: ${context.iterationGoal}`,
    `Input method: ${context.inputMethod}`,
    `Asset type: ${context.assetType}`,
    `Asset URL: ${context.assetUrl}`,
    `Requested packages:\n${formatList(requestedFormats)}`,
    context.referenceUrl ? `Reference landing/product URL: ${context.referenceUrl}` : null,
    context.additionalContext ? `Additional marketer notes: ${context.additionalContext}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  sections.push("Project Context:\n" + contextSummary);
  sections.push(baseAnalysis);

  const platformPath = context.primaryPlatform ? `platforms/${context.primaryPlatform}.md` : null;
  if (platformPath) {
    try {
      const platformPrompt = await loadPrompt(platformPath);
      sections.push(platformPrompt);
    } catch (_error) {
      // Missing platform prompt is non-fatal; skip.
    }
  }

  const objectivePath = context.iterationGoal ? `objectives/${context.iterationGoal}.md` : null;
  if (objectivePath) {
    try {
      const objectivePrompt = await loadPrompt(objectivePath);
      sections.push(objectivePrompt);
    } catch (_error) {
      // Missing objective prompt is non-fatal.
    }
  }

  const uniqueFormats = Array.from(new Set(context.outputFormats));
  for (const format of uniqueFormats) {
    const relative = FORMAT_PROMPT_MAP[format];
    if (!relative) {
      continue;
    }

    // Only include format transitions that make sense for the asset.
    if (format === "video" && context.assetType !== "image" && context.assetType !== "url") {
      sections.push(await loadPrompt("format_transitions/same_format.md"));
      continue;
    }

    if (format === "static" && context.assetType === "image") {
      sections.push(await loadPrompt("format_transitions/same_format.md"));
      continue;
    }

    try {
      const formatPrompt = await loadPrompt(relative);
      sections.push(formatPrompt);
    } catch (_error) {
      // Non-fatal if the specific prompt is missing.
    }
  }

  const guardrails =
    "Guardrails:\n- Preserve unique product proofs and voice elements.\n- Flag any compliance or competitor conflicts explicitly under risks.\n- All outputs must be JSON adhering to the supplied schema.";

  sections.push(guardrails);

  const userPrompt = sections.join("\n\n");
  const jsonSchema = await loadSchema();

  return { systemPrompt, userPrompt, jsonSchema };
}

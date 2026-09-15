import type { LayoutConfig, SectionConfig } from '@/types/config';

const backgroundKinds = new Set(['color', 'gradient', 'image']);

export function isValidSection(section: unknown): section is SectionConfig {
  if (!section || typeof section !== 'object') return false;
  const candidate = section as Partial<SectionConfig>;
  return typeof candidate.id === 'string' && typeof candidate.type === 'string' && Boolean(candidate.background) && typeof candidate.background?.kind === 'string' && backgroundKinds.has(candidate.background.kind) && typeof candidate.background.value === 'string' && Array.isArray(candidate.items);
}

export function validateConfig(value: unknown): LayoutConfig | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<LayoutConfig>;
  if (typeof candidate.version !== 'number' || !candidate.theme || !Array.isArray(candidate.tabs) || !Array.isArray(candidate.sections)) return null;
  return { ...candidate, sections: candidate.sections.filter(isValidSection) } as LayoutConfig;
}

import { t } from 'i18next';

export type SpellType = 'alchemical' | 'elemental' | 'force' | 'informational' | 'utility';
export type SpellSubtype = 'ball' | 'directed' | 'mental-attack' | 'subconscious';
export type SpellDurationType = 'concentration' | 'permanent' | 'lvl' | 'rr-failure';
export type SpellDurationScale = 'round' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type SpellRangeType = 'self' | 'touch' | 'distance' | 'distance-level';
export type SpellTargetMode = 'target' | 'area';
export type SpellTargetType = 'person' | 'item' | 'spell' | 'gateway' | 'lock';

export const SPELL_TYPES: SpellType[] = ['alchemical', 'elemental', 'force', 'informational', 'utility'];
export const SPELL_SUBTYPES: SpellSubtype[] = ['ball', 'directed', 'mental-attack', 'subconscious'];
export const SPELL_DURATION_TYPES: SpellDurationType[] = ['concentration', 'permanent', 'lvl', 'rr-failure'];

export type Spell = {
  id: string;
  spellListId: string;
  name: string;
  level: number;
  modifiers: SpellModifiers;
  description: string | null;
  imageUrl: string | null;
};

export type SpellModifiers = {
  type: SpellType;
  subtype: SpellSubtype | null;
  range: SpellRange | null;
  duration: SpellDuration | null;
  target: SpellTarget | null;
  instant: boolean | null;
};

export type SpellRange = {
  type: SpellRangeType;
  value: number | null;
};

export type SpellDuration = {
  type: SpellDurationType;
  duration: number | null;
  durationScale: SpellDurationScale | null;
  requiredConcentration: boolean | null;
  failureScale: number | null;
};

export type SpellTarget = {
  mode: SpellTargetMode;
  types: SpellTargetType[] | null;
  count: number | null;
  modifier: string | null;
};

export type CreateSpellDto = Omit<Spell, 'id'>;

export type UpdateSpellDto = Partial<Omit<Spell, 'id'>>;

export const getSpellNameText = (spell: Spell) => {
  return spell.modifiers.instant ? `${t(spell.name)} *` : t(spell.name);
};

export const getSpellTypeText = (spell: Spell) => {
  if (!spell.modifiers?.type) return '-';
  const type = spell.modifiers.type.charAt(0).toUpperCase();
  let subtype = '';
  if (spell.modifiers.subtype) {
    subtype = spell.modifiers.subtype.charAt(0);
  }
  return `${t(type)}${t(subtype)}`;
};

export const getSpellDurationText = (spell: Spell) => {
  if (!spell.modifiers?.duration) return '-';
  if (!spell.modifiers.duration.type) {
    return spell.modifiers?.duration?.requiredConcentration === true ? 'C' : '-';
  }
  const concentration = spell.modifiers?.duration?.requiredConcentration ? ` (C)` : '';
  const duration = spell.modifiers.duration;
  switch (duration.type) {
    case 'concentration':
    case 'permanent':
      return `${t(duration.type)}${concentration}`;
    case 'lvl':
      return `${duration.duration} ${t(duration.durationScale || '')} / lvl${concentration}`;
    case 'rr-failure': {
      const scale: string = duration.failureScale ? `${duration.failureScale}` : '';
      return `${duration.duration} ${t(duration.durationScale || '')} / ${scale} failure${concentration}`;
    }
    default:
      return '-';
  }
};

export const getSpellRangeText = (spell: Spell) => {
  if (!spell.modifiers?.range) return '-';
  const range = spell.modifiers.range;
  switch (range.type) {
    case 'distance':
      return `${range.value}'`;
    case 'distance-level':
      return `${range.value}' / lvl`;
    case 'touch':
    case 'self':
      return t(range.type);
    default:
      return '-';
  }
};

export const getSpellTargetText = (spell: Spell) => {
  if (!spell.modifiers?.target) return '-';
  switch (spell.modifiers.target.mode) {
    case 'area':
      return `${spell.modifiers.target.modifier || ''}`;
    case 'target': {
      const count = spell.modifiers.target.count ? `${spell.modifiers.target.count} ` : '';
      const types = spell.modifiers.target.types ? spell.modifiers.target.types.join(', ') : '';
      return `${count}${types}`;
    }
    default:
      return '-';
  }
};

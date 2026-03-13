import { t } from 'i18next';

export type SpellType = 'alchemical' | 'elemental' | 'force' | 'informational' | 'utility';
export type SpellDurationType = 'concentration' | 'permanent' | 'lvl';
export type SpellDurationScale = 'round' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type SpellRangeType = 'self' | 'touch' | 'distance' | 'distance-level';
export type SpellTargetMode = 'target' | 'area';
export type SpellTargetType = 'person' | 'item' | 'spell' | 'gateway' | 'lock';

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
  subtype: string;
  range: SpellRange | null;
  duration: SpellDuration | null;
  target: SpellTarget | null;
  area: string | null;
};

export type SpellRange = {
  type: SpellRangeType;
  value: number | null;
};

export type SpellDuration = {
  type: SpellDurationType;
  duration: number | null;
  durationScale: SpellDurationScale | null;
};

export type SpellTarget = {
  mode: SpellTargetMode;
  types: SpellTargetType[] | null;
  count: number | null;
  modifier: string | null;
};

export type CreateSpellDto = Omit<Spell, 'id'>;

export type UpdateSpellDto = Partial<Omit<Spell, 'id'>>;

export const getSpellDurationText = (spell: Spell) => {
  if (!spell.modifiers?.duration) return '-';
  const duration = spell.modifiers.duration;
  switch (duration.type) {
    case 'concentration':
    case 'permanent':
      return t(duration.type);
    case 'lvl':
      return `${duration.duration} ${t(duration.durationScale || '')} / level`;
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
      return `${range.value}' / level`;
    case 'touch':
    case 'self':
      return t(range.type);
    default:
      return '-';
  }
};

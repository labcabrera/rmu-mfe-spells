import { Spell } from '@labcabrera-rmu/rmu-react-shared-lib';

type Translate = (key: string) => string;

/** Short texts of a spell's duration, range and target, shared by the spell view and the spell table. */
export const getSpellDurationText = (spell: Spell, t: Translate) => {
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

export const getSpellRangeText = (spell: Spell, t: Translate) => {
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

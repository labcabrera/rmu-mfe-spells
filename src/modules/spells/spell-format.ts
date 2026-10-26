import {
  Spell,
  spellAreaText,
  spellDurationText,
  spellRangeText,
  SpellResistance,
  SpellTranslate,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Short texts of a spell's duration, range, area and resistance, shared by the spell view and the spell table. */
export const getSpellDurationText = (spell: Spell, t: SpellTranslate) =>
  spellDurationText(spell.modifiers?.duration, t);

export const getSpellRangeText = (spell: Spell, t: SpellTranslate) => spellRangeText(spell.modifiers?.range, t);

export const getSpellAreaText = (spell: Spell, t: SpellTranslate) => spellAreaText(spell.modifiers?.area, t);

/** Power points a spell costs: its level unless it says otherwise (0 for the spells marked `•`). */
export const getSpellPowerPoints = (spell: Spell): number => spell.modifiers?.powerPoints ?? spell.level;

/** Book markers of a spell: `*` instantaneous, `•` no power points, `‡` cast together with others of its set. */
export const getSpellMarkers = (spell: Spell): string =>
  [
    spell.modifiers?.instant ? '*' : '',
    spell.modifiers?.powerPoints === 0 ? '•' : '',
    spell.modifiers?.setGroup ? '‡' : '',
  ].join('');

const signed = (value: number) => (value > 0 ? `+${value}` : `${value}`);

/** Resistance of a spell: its kind, the RR modifier and how the failure scales. */
export const getSpellResistanceText = (resistance: SpellResistance | null | undefined, t: SpellTranslate): string => {
  if (!resistance) return '-';
  const parts = [t(`spell-resistance-${resistance.kind}`)];
  if (resistance.modifier) parts.push(t('spell-rr-modifier-value', { value: signed(resistance.modifier) }));
  if (resistance.kind !== 'none' && resistance.scaling) parts.push(t(`spell-resistance-scaling-${resistance.scaling}`));
  return parts.join(', ');
};

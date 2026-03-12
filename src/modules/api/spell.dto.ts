export type SpellType = 'alchemical' | 'elemental' | 'force' | 'informational' | 'utility';
export type SpellDurationType = 'concentration' | 'permanent' | 'lvl';
export type SpellDurationScale = 'round' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export type Spell = {
  id: string;
  spellListId: string;
  name: string;
  level: number;
  modifiers: SpellModifiers;
  description: string | undefined;
  imageUrl: string | undefined;
};

export type SpellModifiers = {
  type: SpellType;
  subtype: string;
  duration: SpellDuration | null;
};

export type SpellDuration = {
  type: SpellDurationType;
  duration: number | null;
  durationScale: SpellDurationScale | null;
};

export type CreateSpellDto = Omit<Spell, 'id'>;

export type UpdateSpellDto = Partial<Omit<Spell, 'id'>>;

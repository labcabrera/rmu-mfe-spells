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
  type: string;
  subtype: string;
};

export type CreateSpellDto = Omit<Spell, 'id'>;

export type UpdateSpellDto = Partial<Omit<Spell, 'id'>>;

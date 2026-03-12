export type SpellList = {
  id: string;
  name: string;
  description: string | undefined;
  imageUrl: string | undefined;
};

export type CreateSpellListDto = Omit<SpellList, 'id'>;

export type UpdateSpellListDto = Partial<Omit<SpellList, 'id'>>;

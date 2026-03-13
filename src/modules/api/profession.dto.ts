export type RealmType = 'channeling' | 'essence' | 'mentalism';
export type ProfessionArchetype = 'non-spellcaster' | 'semi-spellcaster' | 'pure-spellcaster' | 'hybrid';

export interface Profession {
  id: string;
  archetype: ProfessionArchetype;
  availableRealmTypes: RealmType[];
  fixedRealmTypes: RealmType[];
  description: string;
  imageUrl?: string;
}

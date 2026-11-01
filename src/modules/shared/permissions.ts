import type { AuthContextProps } from 'react-oidc-context';
import { canEditEntity, isAdmin, type Spell, type SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

export { isAdmin };

/**
 * Who can change a spell list and add or remove its spells (spec 063): an admin, or the owner of a user list. Rulebook
 * lists are admin only. Only hides UI: the API enforces it (F-spells-28).
 */
export const canChangeSpellList = (auth: AuthContextProps, spellList: SpellList | undefined | null): boolean =>
  canEditEntity(spellList, auth);

/** Who can change a spell: the permission of its list, or its own when it is standalone (spec 063). */
export const canChangeSpell = (
  auth: AuthContextProps,
  spell: Spell | undefined | null,
  spellList: SpellList | undefined | null
): boolean => (spellList ? canEditEntity(spellList, auth) : canEditEntity(spell, auth));

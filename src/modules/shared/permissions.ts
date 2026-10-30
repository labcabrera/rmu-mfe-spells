import type { AuthContextProps } from 'react-oidc-context';
import { isAdmin, type SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

export { isAdmin };

/** Who can change a spell list and its spells: its owner or an admin (F-spells-28). */
export const canChangeSpellList = (auth: AuthContextProps, spellList: SpellList | undefined | null): boolean =>
  isAdmin(auth) || (!!spellList?.owner && spellList.owner === auth.user?.profile?.sub);

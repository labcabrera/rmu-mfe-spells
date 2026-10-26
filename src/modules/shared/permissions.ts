import type { AuthContextProps } from 'react-oidc-context';
import type { SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

const ADMIN_GROUP = 'rmu-admin';

export const isAdmin = (auth: AuthContextProps): boolean =>
  ((auth.user?.profile?.groups as string[] | undefined) || []).includes(ADMIN_GROUP);

/** Who can change a spell list and its spells: its owner or an admin (F-spells-28). */
export const canChangeSpellList = (auth: AuthContextProps, spellList: SpellList | undefined | null): boolean =>
  isAdmin(auth) || (!!spellList?.owner && spellList.owner === auth.user?.profile?.sub);

import { ReactNode } from 'react';
import { Chip } from '@mui/material';
import { EntitySourceChip, SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/** Chips of the spell list header: realms, type, profession, code, book section and source. */
export const spellListChips = (spellList: SpellList, t: TFunction): ReactNode[] => {
  const realms = spellList.realms?.length ? spellList.realms : spellList.realm ? [spellList.realm] : [];
  return [
    ...realms.map((realm) => <Chip key={`realm-${realm}`} size="small" label={t(realm)} color="primary" />),
    <Chip key="type" size="small" label={t(spellList.type)} color={spellList.type === 'evil' ? 'error' : 'primary'} />,
    ...(spellList.professionId
      ? [<Chip key="profession" size="small" label={t(spellList.professionId)} variant="outlined" />]
      : []),
    ...(spellList.code
      ? [<Chip key="code" size="small" label={`${t('code')}: ${spellList.code}`} variant="outlined" />]
      : []),
    ...(spellList.bookSection
      ? [
          <Chip
            key="book-section"
            size="small"
            label={`${t('book-section')}: ${spellList.bookSection}`}
            variant="outlined"
          />,
        ]
      : []),
    <EntitySourceChip key="source" entity={spellList} />,
  ];
};

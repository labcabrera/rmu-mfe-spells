import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Stack, Typography } from '@mui/material';
import { SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SpellListViewInfo({ spellList }: { spellList: SpellList }) {
  const { t } = useTranslation();
  const realms = spellList.realms?.length ? spellList.realms : spellList.realm ? [spellList.realm] : [];

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t(spellList.name)}
      </Typography>
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
        {realms.map((realm) => (
          <Chip key={realm} label={t(realm)} color="primary" />
        ))}
        <Chip label={t(spellList.type)} color={spellList.type === 'evil' ? 'error' : 'primary'} />
        {spellList.professionId && <Chip label={t(spellList.professionId)} variant="outlined" />}
        {spellList.code && <Chip label={`${t('code')}: ${spellList.code}`} variant="outlined" />}
        {spellList.bookSection && <Chip label={`${t('book-section')}: ${spellList.bookSection}`} variant="outlined" />}
      </Stack>
    </Stack>
  );
}

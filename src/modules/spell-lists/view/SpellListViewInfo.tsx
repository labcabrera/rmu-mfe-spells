import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SpellListViewInfo({ spellList }: { spellList?: SpellList }) {
  const { t } = useTranslation();

  if (!spellList) return <CircularProgress />;

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        {t(spellList.name)}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip label={t(spellList.realm)} color="primary" />
        <Chip label={t(spellList.type)} color="primary" />
      </Stack>
    </Stack>
  );
}

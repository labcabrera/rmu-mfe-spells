import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

export default function SpellListViewInfo({ spellList }: { spellList?: SpellList }) {
  const { t } = useTranslation();

  if (!spellList) return <CircularProgress />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Stack>
          <Typography variant="h6" gutterBottom>
            {t(spellList.name)}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={t(spellList.realm)} size='small' color='primary' />
            <Chip label={t(spellList.type)} size='small' color='primary'/>
          </Stack>
        </Stack>
      </Grid>
      {spellList.description && (
        <Grid size={12}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="body2" color="secondary" gutterBottom>
                  {t(spellList.description || '')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

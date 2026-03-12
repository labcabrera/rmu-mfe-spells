import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { SpellList } from '../../api/spell-list.dto';
import { Spell } from '../../api/spell.dto';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const SpellViewInfo: FC<{
  spell: Spell;
  spellList: SpellList;
}> = ({ spell, spellList }) => {
  if (!spell) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(spell.name)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 12 }}>
            <RmuTextCard value={spellList.name} subtitle={t('Spell list')} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body2" color="secondary" gutterBottom>
                {t(spell.description || '')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SpellViewInfo;

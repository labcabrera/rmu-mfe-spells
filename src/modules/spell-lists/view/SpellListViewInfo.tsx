import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SpellListViewInfo: FC<{
  spellList: SpellList;
}> = ({ spellList }) => {
  const { t } = useTranslation();
  if (!spellList) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(spellList.name)}
        </Typography>
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
};

export default SpellListViewInfo;

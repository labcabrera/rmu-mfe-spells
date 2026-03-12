import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { SpellList } from '../../api/spell-list.dto';

const SpellListViewInfo: FC<{
  spellList: SpellList;
}> = ({ spellList }) => {
  const navigate = useNavigate();

  if (!spellList) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(spellList.name)}
        </Typography>
      </Grid>
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
    </Grid>
  );
};

export default SpellListViewInfo;

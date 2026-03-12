import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { SpellList } from '../../api/spell-list.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const SpellListViewInfo: FC<{
  spellList: SpellList;
}> = ({ spellList }) => {
  const navigate = useNavigate();

  if (!spellList) return <p>Loading...</p>;

  const getDescriptionKey = () => {
    return spellList.id.includes('@')
      ? `spellList-${spellList.id.split('@')[0]}-description`
      : `spellList-${spellList.id}-description`;
  };

  const onCategoryClick = () => {
    navigate(`/core/spell-list-categories/view/${spellList.categoryId}`);
  };

  function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getCategoryBonus = (): string => {
    if (!spellList.bonus || spellList.bonus.length === 0) return t('none');
    return spellList.bonus.map((bonus) => capitalize(bonus)).join('+');
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(spellList.name)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <RmuTextCard
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={onCategoryClick}
              size="small"
              value={t(spellList.categoryId)}
              subtitle={t('category')}
            />
          </Grid>

          {spellList.bonus && (
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard
                subtitle={t('bonus')}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                value={getCategoryBonus()}
              />
            </Grid>
          )}

          {spellList.specialization && (
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard
                subtitle="Specialization"
                image={`${imageBaseUrl}images/generic/configuration.png`}
                value={t(spellList.specialization)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} mt={1}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
            {t(getDescriptionKey())}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SpellListViewInfo;

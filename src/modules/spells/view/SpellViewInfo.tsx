import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Grid, Paper, Typography } from '@mui/material';
import { CategorySeparator, RmuTextCard, Spell, SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SpellViewInfo: FC<{
  spell: Spell;
  spellList: SpellList;
}> = ({ spell, spellList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!spell) return <p>Loading...</p>;

  const onSpellListClick = () => {
    navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } });
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            {t(spell.name)}
          </Typography>
        </Grid>
      </Grid>

      <CategorySeparator text={t('Spell list')} />

      <Grid container spacing={1}>
        <Grid size={12}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard value={spellList.name} subtitle={t('Spell list')} onClick={() => onSpellListClick()} image={''} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CategorySeparator text={t('Spell information')} />

      <Grid container spacing={1}>
        <Grid size={12}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard value={spell.level} subtitle={t('Level')} image={''} />
            </Grid>
            {spell.modifiers.instant && (
              <Grid size={{ xs: 12, md: 3 }}>
                <RmuTextCard value={t('Instant')} subtitle={t('Cast')} image={''} />
              </Grid>
            )}
            {spell.modifiers.duration && (
              <Grid size={{ xs: 12, md: 3 }}>
                <RmuTextCard value={getSpellDurationText(spell)} subtitle={t('Duration')} image={''} />
              </Grid>
            )}
            {spell.modifiers.range && (
              <Grid size={{ xs: 12, md: 3 }}>
                <RmuTextCard value={getSpellRangeText(spell)} subtitle={t('Range')} image={''} />
              </Grid>
            )}
            {spell.modifiers.target && (
              <Grid size={{ xs: 12, md: 3 }}>
                <RmuTextCard value={getSpellTargetText(spell)} subtitle={t('Target')} image={''} />
              </Grid>
            )}
            <Grid size={{ xs: 12, md: 3 }}>
              <RmuTextCard value={t(spell.modifiers.type || '')} subtitle={t('Spell type')} image={''} />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="body1" color="primary" gutterBottom>
                  {t(spell.description || '')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellViewInfo;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { imageBaseUrl, RmuTextCard, Section, Spell, SpellList, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import { getSpellDurationText, getSpellRangeText, getSpellTargetText } from '../spell-format';

const defaultImage = `${imageBaseUrl}images/generic/configuration.png`;

export default function SpellViewInfo({ spell, spellList }: { spell: Spell; spellList: SpellList | null }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onSpellListClick = () => {
    if (!spellList) return;
    navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } });
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          {t(spell.name)}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <RmuTextCard
          value={spellList ? spellList.name : t('not-found')}
          subtitle={t('spell-list')}
          onClick={() => onSpellListClick()}
          image={spellList?.imageUrl || defaultImage}
        />
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Section title={t('information')}>
              <Stack direction={'column'} spacing={1}>
                <StatRow label={t('level')} value={`${spell.level}`} />
                <StatRow label={t('instant')} value={t(spell.modifiers.instant ? 'yes' : 'no')} />
                <StatRow label={t('duration')} value={getSpellDurationText(spell, t)} />
                <StatRow label={t('range')} value={getSpellRangeText(spell, t)} />
                <StatRow label={t('target')} value={getSpellTargetText(spell)} />
                <StatRow label={t('type')} value={t(spell.modifiers.type || '')} />
              </Stack>
            </Section>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Section title={t('description')}>
              <Typography variant="body1" color="primary" gutterBottom>
                {t(spell.description || '')}
              </Typography>
            </Section>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

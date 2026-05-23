import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { imageBaseUrl, RmuTextCard, Section, Spell, SpellList, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';

export const defaultImage = `${imageBaseUrl}images/generic/configuration.png`;

export default function SpellViewInfo({ spell, spellList }: { spell: Spell; spellList: SpellList }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (!spell) return <p>Loading...</p>;

  const onSpellListClick = () => {
    navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } });
  };

  const getSpellDurationText = (spell: Spell) => {
    if (!spell.modifiers?.duration) return '-';
    if (!spell.modifiers.duration.type) {
      return spell.modifiers?.duration?.requiredConcentration === true ? 'C' : '-';
    }
    const concentration = spell.modifiers?.duration?.requiredConcentration ? ` (C)` : '';
    const duration = spell.modifiers.duration;
    switch (duration.type) {
      case 'concentration':
      case 'permanent':
        return `${t(duration.type)}${concentration}`;
      case 'lvl':
        return `${duration.duration} ${t(duration.durationScale || '')} / lvl${concentration}`;
      case 'rr-failure': {
        const scale: string = duration.failureScale ? `${duration.failureScale}` : '';
        return `${duration.duration} ${t(duration.durationScale || '')} / ${scale} failure${concentration}`;
      }
      default:
        return '-';
    }
  };

  const getSpellRangeText = (spell: Spell) => {
    if (!spell.modifiers?.range) return '-';
    const range = spell.modifiers.range;
    switch (range.type) {
      case 'distance':
        return `${range.value}'`;
      case 'distance-level':
        return `${range.value}' / lvl`;
      case 'touch':
      case 'self':
        return t(range.type);
      default:
        return '-';
    }
  };

  const getSpellTargetText = (spell: Spell) => {
    if (!spell.modifiers?.target) return '-';
    switch (spell.modifiers.target.mode) {
      case 'area':
        return `${spell.modifiers.target.modifier || ''}`;
      case 'target': {
        const count = spell.modifiers.target.count ? `${spell.modifiers.target.count} ` : '';
        const types = spell.modifiers.target.types ? spell.modifiers.target.types.join(', ') : '';
        return `${count}${types}`;
      }
      default:
        return '-';
    }
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
          value={spellList.name}
          subtitle={t('spell-list')}
          onClick={() => onSpellListClick()}
          image={spellList.imageUrl || defaultImage}
        />
      </Grid>
      <Grid size={12}>
        <Section title={t('information')}>
          <Stack direction={'column'} spacing={1}>
            <StatRow label={t('level')} value={`${spell.level}`} />
            <StatRow label={t('instant')} value={t(spell.modifiers.instant ? 'yes' : 'no')} />
            <StatRow label={t('duration')} value={getSpellDurationText(spell)} />
            <StatRow label={t('range')} value={getSpellRangeText(spell)} />
            <StatRow label={t('target')} value={getSpellTargetText(spell)} />
            <StatRow label={t('type')} value={t(spell.modifiers.type || '')} />
          </Stack>
        </Section>
      </Grid>
      <Grid size={12}>
        <Section title={t('description')}>
          <Typography variant="body1" color="primary" gutterBottom>
            {t(spell.description || '')}
          </Typography>
        </Section>
      </Grid>
    </Grid>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Link, Stack, Typography } from '@mui/material';
import {
  fetchSpell,
  imageBaseUrl,
  RmuTextCard,
  Section,
  Spell,
  SpellAlchemyInfo,
  SpellEffectList,
  SpellList,
  StatRow,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import {
  getSpellAreaText,
  getSpellDurationText,
  getSpellPowerPoints,
  getSpellRangeText,
  getSpellResistanceText,
} from '../spell-format';

const defaultImage = `${imageBaseUrl}images/generic/configuration.png`;

export default function SpellViewInfo({ spell, spellList }: { spell: Spell; spellList: SpellList | null }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // The spell this one is a variant of: its name, or null when it cannot be read.
  const [baseSpell, setBaseSpell] = useState<Spell | null>(null);
  const modifiers = spell.modifiers || ({} as Spell['modifiers']);

  useEffect(() => {
    setBaseSpell(null);
    if (!spell.basedOn) return;
    fetchSpell(spell.basedOn, auth)
      .then(setBaseSpell)
      .catch(() => setBaseSpell(null));
  }, [spell.basedOn]);

  const onSpellListClick = () => {
    if (!spellList) return;
    navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } });
  };

  const typeText = [
    modifiers.type ? t(modifiers.type) : '',
    modifiers.subtype ? t(`spell-subtype-${modifiers.subtype}`) : '',
  ]
    .filter(Boolean)
    .join(' · ');

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
                <StatRow label={t('spell-type-code')} value={modifiers.typeCode || '-'} />
                <StatRow label={t('type')} value={typeText || '-'} />
                <StatRow label={t('power-points')} value={getSpellPowerPoints(spell)} />
                <StatRow label={t('instant')} value={t(modifiers.instant ? 'yes' : 'no')} />
                {modifiers.setGroup && <StatRow label={t('spell-set-group')} value={modifiers.setGroup} />}
                <StatRow label={t('range')} value={getSpellRangeText(spell, t)} />
                <StatRow label={t('area')} value={getSpellAreaText(spell, t)} />
                <StatRow label={t('duration')} value={getSpellDurationText(spell, t)} />
                <StatRow label={t('resistance')} value={getSpellResistanceText(modifiers.resistance, t)} />
                {spell.basedOn && (
                  <Stack direction="row" sx={{ py: 0.5, justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="secondary">
                      {t('spell-based-on')}
                    </Typography>
                    <Link
                      component={RouterLink}
                      to={`/spells/spells/view/${spell.basedOn}`}
                      state={baseSpell ? { spell: baseSpell } : undefined}
                      sx={{ fontWeight: 600 }}
                    >
                      {baseSpell ? t(baseSpell.name) : spell.basedOn}
                    </Link>
                  </Stack>
                )}
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
          <Grid size={12}>
            <Section title={t('effects')}>
              <SpellEffectList effects={spell.effects} />
            </Section>
          </Grid>
          {spell.alchemy && (
            <Grid size={{ xs: 12, lg: 4 }}>
              <Section title={t('spell-alchemy')}>
                <SpellAlchemyInfo spell={spell} bare />
              </Section>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

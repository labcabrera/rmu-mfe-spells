/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Typography } from '@mui/material';
import {
  EmptyState,
  fetchSpell,
  KeyValueList,
  KeyValueRow,
  Section,
  Spell,
  SpellAlchemyInfo,
  SpellEffectList,
  SpellList,
  useSpellName,
  useSpellText,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';
import {
  getSpellAreaText,
  getSpellDurationText,
  getSpellPowerPoints,
  getSpellRangeText,
  getSpellResistanceText,
} from '../spell-format';

/** Type and subtype of a spell ("Elemental · Ball"), empty when it has none. */
export const spellTypeText = (spell: Spell, t: TFunction) =>
  [
    spell.modifiers?.type ? t(spell.modifiers.type) : '',
    spell.modifiers?.subtype ? t(`spell-subtype-${spell.modifiers.subtype}`) : '',
  ]
    .filter(Boolean)
    .join(' · ');

export default function SpellViewInfo({ spell, spellList }: { spell: Spell; spellList: SpellList | null }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const spellName = useSpellName();
  const spellText = useSpellText(spellList?.code);
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

  const rows: KeyValueRow[] = [
    {
      label: t('spell-list'),
      value: spellList ? (
        <Link component={RouterLink} to={`/spells/spell-lists/view/${spellList.id}`} state={{ spellList }}>
          {spellName(spellList.name)}
        </Link>
      ) : (
        t('not-found')
      ),
    },
    { label: t('level'), value: `${spell.level}` },
    { label: t('spell-type-code'), value: modifiers.typeCode || '-' },
    { label: t('type'), value: spellTypeText(spell, t) || '-' },
    { label: t('power-points'), value: getSpellPowerPoints(spell) },
    { label: t('instant'), value: t(modifiers.instant ? 'yes' : 'no') },
    ...(modifiers.setGroup ? [{ label: t('spell-set-group'), value: modifiers.setGroup }] : []),
    { label: t('range'), value: getSpellRangeText(spell, t) },
    { label: t('area'), value: getSpellAreaText(spell, t) },
    { label: t('duration'), value: getSpellDurationText(spell, t) },
    { label: t('resistance'), value: getSpellResistanceText(modifiers.resistance, t) },
    ...(spell.basedOn
      ? [
          {
            label: t('spell-based-on'),
            value: (
              <Link
                component={RouterLink}
                to={`/spells/spells/view/${spell.basedOn}`}
                state={baseSpell ? { spell: baseSpell } : undefined}
              >
                {baseSpell ? spellName(baseSpell.name) : spell.basedOn}
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Section title={t('information')}>
          <KeyValueList rows={rows} />
        </Section>
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Section title={t('description')}>
          {spell.description ? (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {spellText.spell(spell.level, spell.description)}
            </Typography>
          ) : (
            <EmptyState dense title={t('no-description')} />
          )}
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
  );
}

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  EnumPicker,
  NumericInput,
  SPELL_RESISTANCE_KINDS,
  SPELL_RESISTANCE_SCALINGS,
  SpellResistance,
  SpellResistanceKind,
  SpellResistanceScaling,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { gridSize, patchModifiers, SpellFormProps } from './spell-form-utils';

/** Resistance roll a spell asks of its target: which one, its modifier and how the failure scales. */
const SpellFormResistance: FC<SpellFormProps> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const resistance = formData.modifiers?.resistance || null;

  const update = (patch: Partial<SpellResistance>) =>
    patchModifiers(formData, setFormData, { resistance: { ...(resistance as SpellResistance), ...patch } });

  const onKindChange = (kind: SpellResistanceKind | null) =>
    patchModifiers(formData, setFormData, {
      resistance: kind ? { modifier: null, scaling: 'all-or-nothing', ...resistance, kind } : null,
    });

  return (
    <>
      <Grid size={gridSize}>
        <EnumPicker
          variant="select"
          label={t('spell-resistance-kind')}
          name="spellResistanceKind"
          value={resistance?.kind}
          values={SPELL_RESISTANCE_KINDS}
          labelPrefix="spell-resistance-"
          allowAll
          allLabel={t('none')}
          onChange={(value) => onKindChange(value as SpellResistanceKind | null)}
        />
      </Grid>
      {resistance && resistance.kind !== 'none' && (
        <>
          <Grid size={gridSize}>
            <NumericInput
              label={t('spell-rr-modifier')}
              name="spellRrModifier"
              integer
              allowNegatives
              value={resistance.modifier ?? null}
              onChange={(modifier) => update({ modifier })}
            />
          </Grid>
          <Grid size={gridSize}>
            <EnumPicker
              variant="select"
              label={t('spell-resistance-scaling')}
              name="spellResistanceScaling"
              value={resistance.scaling}
              values={SPELL_RESISTANCE_SCALINGS}
              labelPrefix="spell-resistance-scaling-"
              onChange={(scaling) => update({ scaling: (scaling as SpellResistanceScaling) || 'all-or-nothing' })}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default SpellFormResistance;

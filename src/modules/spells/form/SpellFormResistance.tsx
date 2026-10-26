import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  NumericInput,
  SPELL_RESISTANCE_KINDS,
  SPELL_RESISTANCE_SCALINGS,
  SpellResistance,
  SpellResistanceKind,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellOption from '../../shared/selects/SelectSpellOption';
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
        <SelectSpellOption
          label={t('spell-resistance-kind')}
          name="spellResistanceKind"
          value={resistance?.kind}
          options={SPELL_RESISTANCE_KINDS}
          optionLabel={(option) => t(`spell-resistance-${option}`)}
          allowEmpty
          onChange={onKindChange}
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
            <SelectSpellOption
              label={t('spell-resistance-scaling')}
              name="spellResistanceScaling"
              value={resistance.scaling}
              options={SPELL_RESISTANCE_SCALINGS}
              optionLabel={(option) => t(`spell-resistance-scaling-${option}`)}
              onChange={(scaling) => update({ scaling: scaling || 'all-or-nothing' })}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default SpellFormResistance;

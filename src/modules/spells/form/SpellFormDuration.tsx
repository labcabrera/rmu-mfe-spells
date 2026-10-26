import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import {
  NumericInput,
  SPELL_DURATION_SCALES,
  SPELL_DURATION_TYPES,
  SpellDuration,
  SpellDurationType,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellOption from '../../shared/selects/SelectSpellOption';
import { gridSize, patchModifiers, SpellFormProps, textOrNull } from './spell-form-utils';

/** Types of duration measured in a number of rounds, minutes…: the ones that need a value and a scale. */
const MEASURED: SpellDurationType[] = ['fixed', 'per-level', 'per-failure'];

/** Duration of a spell (spec 028): its type, the amount and scale, the levels or RR failure per step. */
const SpellFormDuration: FC<SpellFormProps> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const duration = formData.modifiers?.duration || null;
  const measured = !!duration && MEASURED.includes(duration.type);

  const update = (patch: Partial<SpellDuration>) =>
    patchModifiers(formData, setFormData, { duration: { ...(duration as SpellDuration), ...patch } });

  const onTypeChange = (type: SpellDurationType | null) => {
    if (!type) return patchModifiers(formData, setFormData, { duration: null });
    const base: SpellDuration = {
      value: null,
      scale: null,
      perLevel: null,
      perFailure: null,
      concentration: type === 'concentration',
      raw: null,
      ...duration,
      type,
    };
    if (type === 'per-level' && !base.perLevel) base.perLevel = 1;
    if (type === 'per-failure' && !base.perFailure) base.perFailure = 1;
    patchModifiers(formData, setFormData, { duration: base });
  };

  return (
    <>
      <Grid size={gridSize}>
        <SelectSpellOption
          label={t('duration-type')}
          name="spellDurationType"
          value={duration?.type}
          options={SPELL_DURATION_TYPES}
          optionLabel={(option) => t(`spell-duration-type-${option}`)}
          allowEmpty
          onChange={onTypeChange}
        />
      </Grid>
      {duration && measured && (
        <>
          <Grid size={gridSize}>
            <NumericInput
              label={t('duration')}
              name="spellDuration"
              integer
              min={0}
              value={duration.value ?? null}
              onChange={(value) => update({ value })}
            />
          </Grid>
          <Grid size={gridSize}>
            <SelectSpellOption
              label={t('duration-scale')}
              name="spellDurationScale"
              value={duration.scale}
              options={SPELL_DURATION_SCALES}
              optionLabel={(option) => t(`spell-scale-${option}`, { count: 2 })}
              allowEmpty
              onChange={(scale) => update({ scale })}
            />
          </Grid>
        </>
      )}
      {duration?.type === 'per-level' && (
        <Grid size={gridSize}>
          <NumericInput
            label={t('spell-duration-levels-per-step')}
            name="spellDurationPerLevel"
            integer
            min={1}
            value={duration.perLevel ?? null}
            onChange={(perLevel) => update({ perLevel })}
          />
        </Grid>
      )}
      {duration?.type === 'per-failure' && (
        <Grid size={gridSize}>
          <NumericInput
            label={t('spell-duration-failure-per-step')}
            name="spellDurationPerFailure"
            integer
            min={1}
            value={duration.perFailure ?? null}
            onChange={(perFailure) => update({ perFailure })}
          />
        </Grid>
      )}
      {duration && (
        <>
          <Grid size={gridSize}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!duration.concentration}
                  onChange={(e) => update({ concentration: e.target.checked })}
                />
              }
              label={t('required-concentration')}
            />
          </Grid>
          <Grid size={gridSize}>
            <TextField
              label={t('spell-raw-text')}
              name="spellDurationRaw"
              value={duration.raw || ''}
              onChange={(e) => update({ raw: textOrNull(e.target.value) })}
              fullWidth
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default SpellFormDuration;

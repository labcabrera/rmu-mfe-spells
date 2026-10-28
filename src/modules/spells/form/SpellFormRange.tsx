import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import {
  EnumPicker,
  NumericInput,
  SPELL_RANGE_TYPES,
  SpellRange,
  SpellRangeType,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { gridSize, patchModifiers, SpellFormProps, textOrNull } from './spell-form-utils';

/** Range of a spell: its type and, for a distance, the feet, whether it grows per level and the step. */
const SpellFormRange: FC<SpellFormProps> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const range = formData.modifiers?.range || null;

  const update = (patch: Partial<SpellRange>) =>
    patchModifiers(formData, setFormData, { range: { ...(range as SpellRange), ...patch } });

  const onTypeChange = (type: SpellRangeType | null) =>
    patchModifiers(formData, setFormData, {
      range: type ? { value: null, perLevel: false, increment: null, raw: null, ...range, type } : null,
    });

  return (
    <>
      <Grid size={gridSize}>
        <EnumPicker
          variant="select"
          label={t('range-type')}
          name="spellRangeType"
          value={range?.type}
          values={SPELL_RANGE_TYPES}
          labelPrefix="spell-range-type-"
          allowAll
          allLabel={t('none')}
          onChange={(value) => onTypeChange(value as SpellRangeType | null)}
        />
      </Grid>
      {range?.type === 'distance' && (
        <>
          <Grid size={gridSize}>
            <NumericInput
              label={t('spell-range-feet')}
              name="spellRange"
              integer
              min={0}
              value={range.value ?? null}
              onChange={(value) => update({ value })}
            />
          </Grid>
          <Grid size={gridSize}>
            <NumericInput
              label={t('spell-range-increment')}
              name="spellRangeIncrement"
              integer
              min={0}
              value={range.increment ?? null}
              onChange={(increment) => update({ increment })}
            />
          </Grid>
          <Grid size={gridSize}>
            <FormControlLabel
              control={<Switch checked={!!range.perLevel} onChange={(e) => update({ perLevel: e.target.checked })} />}
              label={t('spell-per-level-label')}
            />
          </Grid>
        </>
      )}
      {range && (
        <Grid size={range.type === 'distance' ? { xs: 12, md: 8 } : gridSize}>
          <TextField
            label={t('spell-raw-text')}
            name="spellRangeRaw"
            value={range.raw || ''}
            onChange={(e) => update({ raw: textOrNull(e.target.value) })}
            fullWidth
          />
        </Grid>
      )}
    </>
  );
};

export default SpellFormRange;

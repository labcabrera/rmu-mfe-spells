import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { NumericInput, SPELL_AREA_KINDS, SpellArea, SpellAreaKind } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellOption from '../../shared/selects/SelectSpellOption';
import SelectSpellTargetType from '../../shared/selects/SelectSpellTargetType';
import { gridSize, patchModifiers, SpellFormProps, textOrNull } from './spell-form-utils';

/** Area of a spell (spec 028): its kind, how many targets or how big, the kinds of target and the book text. */
const SpellFormArea: FC<SpellFormProps> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const area = formData.modifiers?.area || null;

  const update = (patch: Partial<SpellArea>) =>
    patchModifiers(formData, setFormData, { area: { ...(area as SpellArea), ...patch } });

  const onKindChange = (kind: SpellAreaKind | null) =>
    patchModifiers(formData, setFormData, {
      area: kind
        ? { count: null, perLevel: false, radius: null, dimensions: null, targetTypes: [], raw: null, ...area, kind }
        : null,
    });

  return (
    <>
      <Grid size={gridSize}>
        <SelectSpellOption
          label={t('spell-area-kind')}
          name="spellAreaKind"
          value={area?.kind}
          options={SPELL_AREA_KINDS}
          optionLabel={(option) => t(`spell-area-kind-${option}`)}
          allowEmpty
          onChange={onKindChange}
        />
      </Grid>
      {area && (
        <>
          {(area.kind === 'targets' || area.kind === 'object') && (
            <Grid size={gridSize}>
              <NumericInput
                label={t('count')}
                name="spellAreaCount"
                integer
                min={0}
                value={area.count ?? null}
                onChange={(count) => update({ count })}
              />
            </Grid>
          )}
          {area.kind === 'radius' && (
            <Grid size={gridSize}>
              <NumericInput
                label={t('spell-area-radius-feet')}
                name="spellAreaRadius"
                integer
                min={0}
                value={area.radius ?? null}
                onChange={(radius) => update({ radius })}
              />
            </Grid>
          )}
          {area.kind === 'volume' && (
            <Grid size={gridSize}>
              <TextField
                label={t('spell-area-dimensions')}
                name="spellAreaDimensions"
                value={area.dimensions || ''}
                onChange={(e) => update({ dimensions: textOrNull(e.target.value) })}
                fullWidth
              />
            </Grid>
          )}
          <Grid size={gridSize}>
            <FormControlLabel
              control={<Switch checked={!!area.perLevel} onChange={(e) => update({ perLevel: e.target.checked })} />}
              label={t('spell-per-level-label')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SelectSpellTargetType
              label={t('target-types')}
              value={area.targetTypes || []}
              onChange={(targetTypes) => update({ targetTypes })}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label={t('spell-raw-text')}
              name="spellAreaRaw"
              value={area.raw || ''}
              onChange={(e) => update({ raw: textOrNull(e.target.value) })}
              fullWidth
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default SpellFormArea;

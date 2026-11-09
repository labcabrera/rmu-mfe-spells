/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import {
  EntityPicker,
  EnumPicker,
  fetchSpellTargetTypes,
  NumericInput,
  SPELL_AREA_KINDS,
  SpellArea,
  SpellAreaKind,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { gridSize, patchModifiers, SpellFormProps, textOrNull } from './spell-form-utils';

/** Area of a spell (spec 028): its kind, how many targets or how big, the kinds of target and the book text. */
const SpellFormArea: FC<SpellFormProps> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const area = formData.modifiers?.area || null;
  // Kinds of target of an area, from GET /v1/target-types.
  const [targetTypes, setTargetTypes] = useState<string[]>();

  useEffect(() => {
    fetchSpellTargetTypes(auth)
      .then(setTargetTypes)
      .catch((err: Error) => notify.error(err));
  }, []);

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
        <EnumPicker
          variant="select"
          label={t('spell-area-kind')}
          name="spellAreaKind"
          value={area?.kind}
          values={SPELL_AREA_KINDS}
          labelPrefix="spell-area-kind-"
          allowAll
          allLabel={t('none')}
          onChange={(value) => onKindChange(value as SpellAreaKind | null)}
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
            <EntityPicker<string>
              mode="multiple"
              variant="select"
              hideImages
              label={t('target-types')}
              name="spellAreaTargetTypes"
              options={targetTypes?.map((type) => ({
                id: type,
                label: t(`spell-target-type-${type}`, { defaultValue: type }),
              }))}
              value={area.targetTypes || []}
              onChange={(ids) => update({ targetTypes: ids })}
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

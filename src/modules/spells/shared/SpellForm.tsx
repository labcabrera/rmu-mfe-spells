import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import {
  CreateSpellDto,
  SpellDuration,
  SpellDurationType,
  SpellRange,
  SpellRangeType,
  UpdateSpellDto,
} from '../../api/spell.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellDurationScale from '../../shared/selects/SelectSpellDurationScale';
import SelectSpellDurationType from '../../shared/selects/SelectSpellDurationType';
import SelectSpellRangeType from '../../shared/selects/SelectSpellRangeType';
import SelectSpellType from '../../shared/selects/SelectSpellType';
import SpellFormTarget from './SpellFormTarget';

const SpellForm: FC<{
  formData: CreateSpellDto | UpdateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto | UpdateSpellDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData || !setFormData) return <p>Loading...</p>;

  const onSpellDurationTypeChange = (value: SpellDurationType | null) => {
    let duration: SpellDuration | null = value ? formData.modifiers!.duration : null;
    if (value && duration) {
      duration.type = value;
    } else if (value) {
      duration = { type: value, duration: null, durationScale: null };
    }
    setFormData({ ...formData, modifiers: { ...formData.modifiers, duration: duration } });
  };

  const onSpellRangeTypeChange = (value: SpellRangeType | null) => {
    let range: SpellRange | null = value ? formData.modifiers!.range : null;
    if (value && range) {
      range.type = value;
    } else if (value) {
      range = { type: value, value: null };
    }
    setFormData({ ...formData, modifiers: { ...formData.modifiers, range: range } });
  };

  const requiresDurationScale = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl';
  };

  const requiresDurationValue = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl';
  };

  return (
    <>
      <CategorySeparator text={t('Spell list information')} />
      <Grid container spacing={1}>
        <Grid size={12}>
          <TextField
            label={t('Name')}
            name="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!formData.name}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <NumericInput
            label={t('Level')}
            name="level"
            value={formData.level || null}
            onChange={(value) => setFormData({ ...formData, level: value || 1 })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectSpellType
            label={t('Type')}
            name="spellType"
            value={formData.modifiers?.type || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, type: value } })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectSpellRangeType
            label={t('Range type')}
            name="spellRangeType"
            value={formData.modifiers?.range?.type || null}
            required={false}
            allowAll={true}
            onChange={(value) => onSpellRangeTypeChange(value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {formData.modifiers?.range?.type && (
            <NumericInput
              label={t('Range')}
              name="spellRange"
              value={formData.modifiers?.range?.value || null}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  modifiers: {
                    ...formData.modifiers,
                    range: { ...formData.modifiers?.range, value: value },
                  },
                })
              }
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectSpellDurationType
            label={t('Duration type')}
            name="spellDurationType"
            value={formData.modifiers?.duration?.type || null}
            required={false}
            allowAll={true}
            onChange={(value) => onSpellDurationTypeChange(value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {requiresDurationScale() && (
            <>
              <SelectSpellDurationScale
                label={t('Duration scale')}
                name="spellDurationScale"
                value={formData.modifiers?.duration?.durationScale || null}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    modifiers: {
                      ...formData.modifiers,
                      duration: { ...formData.modifiers?.duration, durationScale: value },
                    },
                  })
                }
              />
            </>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {requiresDurationValue() && (
            <>
              <NumericInput
                label={t('Duration')}
                name="spellDuration"
                value={formData.modifiers?.duration?.duration || null}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    modifiers: {
                      ...formData.modifiers,
                      duration: { ...formData.modifiers?.duration, duration: value },
                    },
                  })
                }
              />
            </>
          )}
        </Grid>
        <SpellFormTarget formData={formData} setFormData={setFormData} />
        <Grid size={12}>
          <TextField
            label={t('Description')}
            name="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={!formData.description}
            fullWidth
            multiline
            rows={10}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellForm;

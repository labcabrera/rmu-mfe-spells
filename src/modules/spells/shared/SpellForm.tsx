import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto, SpellDuration, SpellDurationType, UpdateSpellDto } from '../../api/spell.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellDurationScale from '../../shared/selects/SelectSpellDurationScale';
import SelectSpellDurationType from '../../shared/selects/SelectSpellDurationType';
import SelectSpellSubtype from '../../shared/selects/SelectSpellSubtype';
import SelectSpellType from '../../shared/selects/SelectSpellType';
import SpellFormRange from './SpellFormRange';
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
        <Grid size={{ xs: 12, md: 4 }}>
          <NumericInput
            label={t('Level')}
            name="level"
            value={formData.level || null}
            onChange={(value) => setFormData({ ...formData, level: value || 1 })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ToggleButtonGroup
            color="primary"
            value={formData.modifiers!.instant || false}
            exclusive
            onChange={(e, value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, instant: value } })}
            aria-label="cast-type"
            size="small"
          >
            <ToggleButton value={true}>{t('Instant')}</ToggleButton>
            <ToggleButton value={false}>{t('Casted')}</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectSpellType
            label={t('Type')}
            name="spellType"
            value={formData.modifiers?.type || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, type: value } })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SelectSpellSubtype
            label={t('Subtype')}
            name="spellSubtype"
            value={formData.modifiers?.subtype || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, subtype: value } })}
          />
        </Grid>
      </Grid>
      <CategorySeparator text={t('Range')} />
      <Grid container spacing={1}>
        <SpellFormRange formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('Duration')} />
      <Grid container spacing={1}>
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
      </Grid>
      <CategorySeparator text={t('Target')} />
      <Grid container spacing={1}>
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

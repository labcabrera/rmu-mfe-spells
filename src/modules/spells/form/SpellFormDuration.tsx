import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@mui/material';
import { NumericInput, Spell, SpellDuration, SpellDurationType } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellDurationScale from '../../shared/selects/SelectSpellDurationScale';
import SelectSpellDurationType from '../../shared/selects/SelectSpellDurationType';

const gridSize = { xs: 12, md: 4 };

const SpellFormDuration: FC<{
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const requiresDurationScale = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl' || formData.modifiers?.duration?.type === 'rr-failure';
  };

  const requiresDurationValue = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl' || formData.modifiers?.duration?.type === 'rr-failure';
  };

  const requiresFailureRange = (): boolean => {
    return formData.modifiers?.duration?.type === 'rr-failure';
  };

  const onSpellDurationTypeChange = (value: SpellDurationType | null) => {
    let duration: SpellDuration | null = value ? formData.modifiers!.duration : null;
    if (value && duration) {
      duration.type = value;
    } else if (value) {
      duration = { type: value, duration: null, durationScale: null, failureScale: null, requiredConcentration: false };
    }
    setFormData({ ...formData, modifiers: { ...formData.modifiers, duration: duration } });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <Grid size={gridSize}>
        <SelectSpellDurationType
          label={t('duration-type')}
          name="spellDurationType"
          value={formData.modifiers?.duration?.type || null}
          required={false}
          allowAll={true}
          onChange={(value) => onSpellDurationTypeChange(value)}
        />
      </Grid>
      <Grid size={gridSize}>
        {requiresDurationScale() && (
          <>
            <SelectSpellDurationScale
              label={t('duration-scale')}
              name="spellDurationScale"
              value={formData.modifiers?.duration?.durationScale || null}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  modifiers: {
                    ...formData.modifiers,
                    duration: { ...formData.modifiers?.duration!, durationScale: value },
                  },
                })
              }
            />
          </>
        )}
      </Grid>
      <Grid size={gridSize}>
        {requiresDurationValue() && (
          <>
            <NumericInput
              label={t('duration')}
              name="spellDuration"
              value={formData.modifiers?.duration?.duration || null}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  modifiers: {
                    ...formData.modifiers,
                    duration: { ...formData.modifiers?.duration!, duration: value },
                  },
                })
              }
            />
          </>
        )}
      </Grid>
      {requiresFailureRange() && (
        <Grid size={gridSize}>
          <>
            <NumericInput
              label={t('Failure scale')}
              name="failureScale"
              value={formData.modifiers?.duration?.failureScale || null}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  modifiers: {
                    ...formData.modifiers,
                    duration: { ...formData.modifiers?.duration!, failureScale: value },
                  },
                })
              }
            />
          </>
        </Grid>
      )}
      <Grid size={gridSize}>
        <TextField
          select
          label={t('Required Concentration')}
          name="requiredConcentration"
          value={formData.modifiers?.duration?.requiredConcentration === true ? 'true' : 'false'}
          fullWidth
          onChange={(e) =>
            setFormData({
              ...formData,
              modifiers: {
                ...formData.modifiers,
                duration: { ...formData.modifiers?.duration!, requiredConcentration: e.target.value === 'true' },
              },
            })
          }
        >
          <MenuItem value="true">{t('yes')}</MenuItem>
          <MenuItem value="false">{t('no')}</MenuItem>
        </TextField>
      </Grid>
    </>
  );
};

export default SpellFormDuration;

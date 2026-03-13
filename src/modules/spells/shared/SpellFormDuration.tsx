import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto, SpellDuration, SpellDurationType, UpdateSpellDto } from '../../api/spell.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellDurationScale from '../../shared/selects/SelectSpellDurationScale';
import SelectSpellDurationType from '../../shared/selects/SelectSpellDurationType';

const SpellFormDuration: FC<{
  formData: CreateSpellDto | UpdateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto | UpdateSpellDto>>;
}> = ({ formData, setFormData }) => {
  const requiresDurationScale = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl';
  };

  const requiresDurationValue = (): boolean => {
    return formData.modifiers?.duration?.type === 'lvl';
  };

  const onSpellDurationTypeChange = (value: SpellDurationType | null) => {
    let duration: SpellDuration | null = value ? formData.modifiers!.duration : null;
    if (value && duration) {
      duration.type = value;
    } else if (value) {
      duration = { type: value, duration: null, durationScale: null };
    }
    setFormData({ ...formData, modifiers: { ...formData.modifiers, duration: duration } });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
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
      <Grid size={{ xs: 12, md: 4 }}>
        <ToggleButtonGroup
          color="primary"
          value={formData.modifiers?.duration?.requiredConcentration || false}
          exclusive
          onChange={(e, value) =>
            setFormData({
              ...formData,
              modifiers: {
                ...formData.modifiers,
                duration: { ...formData.modifiers?.duration, requiredConcentration: value },
              },
            })
          }
          size="small"
        >
          <ToggleButton key="requiredConcentration" value={true} aria-label="requiredConcentration">
            {t('Required Concentration')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </>
  );
};

export default SpellFormDuration;

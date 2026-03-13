import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto, SpellTargetMode, UpdateSpellDto } from '../../api/spell.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellTargetMode from '../../shared/selects/SelectSpellTargetMode';

const SpellFormTarget: FC<{
  formData: CreateSpellDto | UpdateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto | UpdateSpellDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData || !setFormData) return <p>Loading...</p>;

  const onSpellTargetModeChange = (value: SpellTargetMode | null) => {
    const target = value ? { ...formData.modifiers!.target, mode: value } : null;
    setFormData({ ...formData, modifiers: { ...formData.modifiers, target: target } });
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <SelectSpellTargetMode
          label={t('Target mode')}
          name="spellTargetMode"
          value={formData.modifiers?.target?.mode || null}
          onChange={(value) => onSpellTargetModeChange(value)}
          required={false}
          allowAll={false}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        {formData.modifiers?.target?.mode !== 'target' && (
          <TextField
            label={t('Modifier')}
            name="modifier"
            value={formData.modifiers?.target?.modifier || null}
            onChange={(e) =>
              setFormData({
                ...formData,
                modifiers: {
                  ...formData.modifiers,
                  target: { ...formData.modifiers!.target, modifier: e.target.value },
                },
              })
            }
            fullWidth
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        {formData.modifiers?.target?.mode === 'target' && (
          <NumericInput
            label={t('Count')}
            name="count"
            value={formData.modifiers?.target?.count || null}
            onChange={(value) =>
              setFormData({
                ...formData,
                modifiers: {
                  ...formData.modifiers,
                  target: { ...formData.modifiers!.target, count: value },
                },
              })
            }
          />
        )}
      </Grid>
    </>
  );
};

export default SpellFormTarget;

import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { NumericInput, Spell, SpellTarget, SpellTargetMode } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellTargetMode from '../../shared/selects/SelectSpellTargetMode';
import SelectSpellTargetType from '../../shared/selects/SelectSpellTargetType';

const SpellFormTarget: FC<{
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onSpellTargetModeChange = (value: SpellTargetMode | null) => {
    const target = value ? ({ ...formData.modifiers!.target, mode: value } as SpellTarget) : null;
    setFormData({ ...formData, modifiers: { ...formData.modifiers, target: target } });
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <SelectSpellTargetMode
          label={t('target-mode')}
          name="spellTargetMode"
          value={formData.modifiers?.target?.mode || null}
          onChange={(value) => onSpellTargetModeChange(value)}
          required={false}
          allowAll={false}
        />
      </Grid>
      {formData.modifiers?.target?.mode !== 'target' && (
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label={t('modifier')}
            name="modifier"
            value={formData.modifiers?.target?.modifier || null}
            onChange={(e) =>
              setFormData({
                ...formData,
                modifiers: {
                  ...formData.modifiers,
                  target: { ...formData.modifiers!.target, modifier: e.target.value } as SpellTarget,
                },
              })
            }
            fullWidth
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 4 }}>
        {formData.modifiers?.target?.mode === 'target' && (
          <NumericInput
            label={t('count')}
            name="count"
            value={formData.modifiers?.target?.count || null}
            onChange={(value) =>
              setFormData({
                ...formData,
                modifiers: {
                  ...formData.modifiers,
                  target: { ...formData.modifiers!.target, count: value } as SpellTarget,
                },
              })
            }
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        {formData.modifiers?.target?.mode === 'target' && (
          <SelectSpellTargetType formData={formData} setFormData={setFormData} />
        )}
      </Grid>
    </>
  );
};

export default SpellFormTarget;

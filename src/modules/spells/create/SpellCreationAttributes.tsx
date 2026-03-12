import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto } from '../../api/spell.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellType from '../../shared/inputs/SelectSpellType';

const SpellCreationAttributes: FC<{
  formData: CreateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData || !setFormData) return <p>Loading...</p>;

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
          <SelectSpellType
            label={t('Type')}
            name="spellType"
            value={formData.modifiers.type || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, type: value } })}
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

export default SpellCreationAttributes;

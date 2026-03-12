import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto } from '../../api/spell.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import { NumericInput } from '../../shared/inputs/NumericInput';

const SpellEditAttributes: FC<{
  formData: CreateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto>>;
}> = ({ formData, setFormData }) => {
  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('Skill list information')} />
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
            value={formData.level || 0}
            onChange={(value) => setFormData({ ...formData, level: value || 0 })}
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
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellEditAttributes;

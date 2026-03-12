import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateSpellDto } from '../../api/spell.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import { NumericInput } from '../../shared/inputs/NumericInput';

const SpellCreationAttributes: FC<{
  formData: CreateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();

  useEffect(() => {
    // fetchSkillCategories()
    //   .then((data) => setCategories(data))
    //   .catch((err: Error) => showError(err.message));
  }, []);

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
          <NumericInput
            label={t('Level')}
            name="level"
            value={formData.level || null}
            onChange={(value) => setFormData({ ...formData, level: value || 1 })}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellCreationAttributes;

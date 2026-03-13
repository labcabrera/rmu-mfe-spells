import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateSpellListDto } from '../../api/spell-list.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';

const SpellListEditAttributes: FC<{
  formData: CreateSpellListDto;
  setFormData: Dispatch<SetStateAction<CreateSpellListDto>>;
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
          <TextField
            label={t('Description')}
            name="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={!formData.description}
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListEditAttributes;

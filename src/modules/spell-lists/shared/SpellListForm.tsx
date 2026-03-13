import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellListDto, UpdateSpellListDto } from '../../api/spell-list.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import SelectListType from '../../shared/selects/SelectListType';
import SelectRealmType from '../../shared/selects/SelectRealmType';

const SpellListForm: FC<{
  formData: CreateSpellListDto | UpdateSpellListDto;
  setFormData: Dispatch<SetStateAction<CreateSpellListDto | UpdateSpellListDto>>;
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
          <SelectRealmType
            label={t('Realm')}
            value={formData.realm || null}
            name="realm"
            onChange={(value) => setFormData({ ...formData, realm: value })}
          />
        </Grid>
        <Grid size={12}>
          <SelectListType
            label={t('List Type')}
            value={formData.type || null}
            name="type"
            onChange={(value) => setFormData({ ...formData, type: value })}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={t('Description')}
            name="description"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            multiline
            rows={5}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListForm;

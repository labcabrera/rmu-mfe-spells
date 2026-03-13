import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchProfessions } from '../../api/profession';
import { CreateSpellListDto, ListType, UpdateSpellListDto } from '../../api/spell-list.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import SelectListType from '../../shared/selects/SelectListType';
import SelectProfession from '../../shared/selects/SelectProfession';
import SelectRealmType from '../../shared/selects/SelectRealmType';

const SpellListForm: FC<{
  formData: CreateSpellListDto | UpdateSpellListDto;
  setFormData: Dispatch<SetStateAction<CreateSpellListDto | UpdateSpellListDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [professionIds, setProfessionIds] = useState<string[]>();

  const onTypeChange = (value: ListType | null) => {
    const professionId = value === 'base' ? formData.professionId : null;
    setFormData({ ...formData, type: value!, professionId });
  };

  useEffect(() => {
    fetchProfessions('archetype!=non-spellcaster', 0, 100)
      .then((response) => setProfessionIds(response.content.map((profession) => profession.id)))
      .catch((err: Error) => showError(err.message));
  }, []);

  if (!formData || !setFormData || !professionIds) return <p>Loading...</p>;

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
            onChange={(value) => setFormData({ ...formData, realm: value! })}
          />
        </Grid>
        <Grid size={12}>
          <SelectListType
            label={t('List Type')}
            value={formData.type || null}
            name="type"
            onChange={(value) => onTypeChange(value)}
          />
        </Grid>
        {formData.type === 'base' && (
          <Grid size={12}>
            <SelectProfession
              label={t('Profession')}
              value={formData.professionId || null}
              name="profession"
              professionIds={professionIds}
              onChange={(value) => setFormData({ ...formData, professionId: value })}
            />
          </Grid>
        )}
        <Grid size={12}>
          <TextField
            label={t('Description')}
            name="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

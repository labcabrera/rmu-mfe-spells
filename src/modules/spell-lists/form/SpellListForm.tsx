import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, TextField } from '@mui/material';
import {
  CategorySeparator,
  EnumPicker,
  fetchProfessions,
  ListType,
  LoadingState,
  ProfessionPicker,
  RealmType,
  RealmTypePicker,
  SPELL_LIST_TYPES,
  SpellList,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const SpellListForm: FC<{
  formData: SpellList;
  setFormData: Dispatch<SetStateAction<SpellList>>;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [professionIds, setProfessionIds] = useState<string[]>();

  const onTypeChange = (value: ListType | null) => {
    const professionId = value === 'base' ? formData.professionId : null;
    setFormData({ ...formData, type: value!, professionId });
  };

  useEffect(() => {
    fetchProfessions('archetype!=non-spellcaster', 0, 100, auth)
      .then((response) => setProfessionIds(response.content.map((profession) => profession.id)))
      .catch((err: Error) => notify.error(err));
  }, []);

  if (!professionIds) return <LoadingState />;

  return (
    <>
      <CategorySeparator text={t('spell-list')} />
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label={t('name')}
            name="name"
            placeholder={t('name')}
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!formData.name}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          {/* One realm, or two for the base lists of a hybrid profession (spec 028). */}
          <RealmTypePicker
            mode="multiple"
            max={2}
            label={t('realms')}
            name="realms"
            value={formData.realms || []}
            onChange={(realms) => setFormData({ ...formData, realms: realms as RealmType[] })}
            error={!formData.realms?.length}
            helperText={t('spell-list-realms-help')}
          />
        </Grid>
        <Grid size={12}>
          <EnumPicker
            label={t('list-type')}
            values={SPELL_LIST_TYPES}
            value={formData.type || null}
            name="type"
            required
            onChange={(value) => onTypeChange(value as ListType | null)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label={t('code')}
            name="code"
            value={formData.code || ''}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.trim() ? e.target.value : null })}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label={t('book-section')}
            name="bookSection"
            value={formData.bookSection || ''}
            onChange={(e) => setFormData({ ...formData, bookSection: e.target.value.trim() ? e.target.value : null })}
            fullWidth
          />
        </Grid>
        {formData.type === 'base' && (
          <Grid size={12}>
            <ProfessionPicker
              label={t('profession')}
              value={formData.professionId || null}
              name="profession"
              professions={professionIds}
              required
              onChange={(value) => setFormData({ ...formData, professionId: value })}
            />
          </Grid>
        )}
        <Grid size={12}>
          <TextField
            label={t('description')}
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

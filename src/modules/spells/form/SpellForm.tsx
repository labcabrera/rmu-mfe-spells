import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@mui/material';
import { CategorySeparator, NumericInput, Spell } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSpellSubtype from '../../shared/selects/SelectSpellSubtype';
import SelectSpellType from '../../shared/selects/SelectSpellType';
import SpellFormDuration from './SpellFormDuration';
import SpellFormRange from './SpellFormRange';
import SpellFormTarget from './SpellFormTarget';

const inputSize = { xs: 12, md: 4 };

export default function SpellForm({
  formData,
  setFormData,
}: {
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}) {
  const { t } = useTranslation();

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('spell')} />
      <Grid container spacing={1}>
        <Grid size={inputSize}>
          <TextField
            label={t('name')}
            name="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!formData.name}
            fullWidth
          />
        </Grid>
        <Grid size={inputSize}>
          <NumericInput
            label={t('level')}
            name="level"
            min={1}
            max={50}
            integer
            value={formData.level || null}
            onChange={(value) => setFormData({ ...formData, level: value || 1 })}
          />
        </Grid>
        <Grid size={inputSize}>
          <TextField
            select
            label={t('cast-type')}
            name="cast-type"
            value={formData.modifiers?.instant === true ? 'true' : 'false'}
            onChange={(e) =>
              setFormData({ ...formData, modifiers: { ...formData.modifiers, instant: e.target.value === 'true' } })
            }
            fullWidth
          >
            <MenuItem value="true">{t('instant')}</MenuItem>
            <MenuItem value="false">{t('casted')}</MenuItem>
          </TextField>
        </Grid>
        <Grid size={inputSize}>
          <SelectSpellType
            label={t('type')}
            name="spellType"
            value={formData.modifiers?.type || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, type: value } })}
          />
        </Grid>
        <Grid size={inputSize}>
          <SelectSpellSubtype
            label={t('subtype')}
            name="spellSubtype"
            value={formData.modifiers?.subtype || null}
            onChange={(value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, subtype: value } })}
          />
        </Grid>
      </Grid>
      <CategorySeparator text={t('range')} />
      <Grid container spacing={1}>
        <SpellFormRange formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('duration')} />
      <Grid container spacing={1}>
        <SpellFormDuration formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('target')} />
      <Grid container spacing={1}>
        <SpellFormTarget formData={formData} setFormData={setFormData} />
        <Grid size={12}>
          <TextField
            label={t('description')}
            name="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            multiline
            rows={10}
          />
        </Grid>
      </Grid>
    </>
  );
}

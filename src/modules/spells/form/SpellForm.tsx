import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SelectSpellSubtype from '../../shared/selects/SelectSpellSubtype';
import SelectSpellType from '../../shared/selects/SelectSpellType';
import SpellFormDuration from './SpellFormDuration';
import SpellFormRange from './SpellFormRange';
import SpellFormTarget from './SpellFormTarget';
import { CategorySeparator, NumericInput, Spell } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const inputSize = {xs:12, md: 4}

const SpellForm: FC<{
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}> = ({ formData, setFormData }) => {
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
          <ToggleButtonGroup
            color="primary"
            value={formData.modifiers!.instant || false}
            exclusive
            onChange={(e, value) => setFormData({ ...formData, modifiers: { ...formData.modifiers, instant: value } })}
            aria-label="cast-type"
            size="small"
          >
            <ToggleButton value={true}>{t('instant')}</ToggleButton>
            <ToggleButton value={false}>{t('casted')}</ToggleButton>
          </ToggleButtonGroup>
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
};

export default SpellForm;

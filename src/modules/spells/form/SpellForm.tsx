import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@mui/material';
import {
  CategorySeparator,
  EnumPicker,
  NumericInput,
  Spell,
  SPELL_SUBTYPES,
  SPELL_TYPES,
  SpellSubtype,
  SpellType,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellFormArea from './SpellFormArea';
import SpellFormDuration from './SpellFormDuration';
import SpellFormEffects from './SpellFormEffects';
import SpellFormRange from './SpellFormRange';
import SpellFormResistance from './SpellFormResistance';
import { patchModifiers, textOrNull } from './spell-form-utils';

const inputSize = { xs: 12, md: 4 };

export default function SpellForm({
  formData,
  setFormData,
  effectsText,
  effectsError,
  onEffectsTextChange,
}: {
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
  effectsText: string;
  effectsError: boolean;
  onEffectsTextChange: (text: string) => void;
}) {
  const { t } = useTranslation();
  const setModifiers = (patch: Partial<Spell['modifiers']>) => patchModifiers(formData, setFormData, patch);

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
            onChange={(e) => setModifiers({ instant: e.target.value === 'true' })}
            fullWidth
          >
            <MenuItem value="true">{t('instant')}</MenuItem>
            <MenuItem value="false">{t('casted')}</MenuItem>
          </TextField>
        </Grid>
        <Grid size={inputSize}>
          <TextField
            label={t('spell-type-code')}
            name="typeCode"
            value={formData.modifiers?.typeCode || ''}
            onChange={(e) => setModifiers({ typeCode: textOrNull(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid size={inputSize}>
          <EnumPicker
            variant="select"
            label={t('type')}
            name="spellType"
            values={SPELL_TYPES}
            value={formData.modifiers?.type || null}
            required
            onChange={(value) => setModifiers({ type: value as SpellType | null })}
          />
        </Grid>
        <Grid size={inputSize}>
          <EnumPicker
            variant="select"
            label={t('subtype')}
            name="spellSubtype"
            values={SPELL_SUBTYPES}
            labelPrefix="spell-subtype-"
            value={formData.modifiers?.subtype || null}
            allowAll
            allLabel={t('none')}
            onChange={(value) => setModifiers({ subtype: value as SpellSubtype | null })}
          />
        </Grid>
        <Grid size={inputSize}>
          <NumericInput
            label={t('power-points')}
            name="powerPoints"
            min={0}
            integer
            placeholder={t('spell-power-points-default')}
            value={formData.modifiers?.powerPoints ?? null}
            onChange={(value) => setModifiers({ powerPoints: value })}
          />
        </Grid>
        <Grid size={inputSize}>
          <TextField
            label={t('spell-set-group')}
            name="setGroup"
            value={formData.modifiers?.setGroup || ''}
            onChange={(e) => setModifiers({ setGroup: textOrNull(e.target.value) })}
            fullWidth
          />
        </Grid>
      </Grid>
      <CategorySeparator text={t('range')} />
      <Grid container spacing={1}>
        <SpellFormRange formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('area')} />
      <Grid container spacing={1}>
        <SpellFormArea formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('duration')} />
      <Grid container spacing={1}>
        <SpellFormDuration formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('resistance')} />
      <Grid container spacing={1}>
        <SpellFormResistance formData={formData} setFormData={setFormData} />
      </Grid>
      <CategorySeparator text={t('effects')} />
      <SpellFormEffects text={effectsText} error={effectsError} onChange={onEffectsTextChange} />
      <CategorySeparator text={t('description')} />
      <Grid container spacing={1}>
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

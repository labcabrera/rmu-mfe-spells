import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, Grid, MenuItem, TextField } from '@mui/material';
import {
  ClearableTextField,
  fetchSpellLists,
  SPELL_TYPES,
  SpellList,
  SpellType,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';

export default function SpellListSearch({ setQueryString }: { setQueryString: Dispatch<SetStateAction<string>> }) {
  const { t } = useTranslation();
  const auth = useAuth();
  const { showError } = useError();
  const [searchName, setSearchName] = useState<string | null>(null);
  const [spellLists, setSpellLists] = useState<SpellList[]>([]);
  const [selectedSpellList, setSelectedSpellList] = useState<SpellList | null>(null);
  const [instant, setInstant] = useState<string>('');
  const [spellType, setSpellType] = useState<SpellType | null>(null);

  const buildQueryString = () => {
    const parts: string[] = [];
    if (searchName) parts.push(`name=re=${searchName}`);
    if (selectedSpellList) parts.push(`spellListId==${selectedSpellList.id}`);
    if (instant !== '') parts.push(`modifiers.instant==${instant}`);
    if (spellType) parts.push(`modifiers.type==${spellType}`);
    return parts.join(';');
  };

  useEffect(() => {
    fetchSpellLists('', 0, 100, auth)
      .then((response) => setSpellLists(response.content))
      .catch((err: Error) => showError(err.message));
  }, []);

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchName, selectedSpellList, instant, spellType]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('name')}
          value={searchName || ''}
          onChange={(e) => setSearchName(e || '')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Autocomplete
          options={spellLists}
          getOptionLabel={(option) => option.name}
          value={selectedSpellList}
          onChange={(_, newValue) => setSelectedSpellList(newValue)}
          fullWidth
          renderInput={(params) => <TextField {...params} label={t('spell-list')} />}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Autocomplete
          options={SPELL_TYPES}
          getOptionLabel={(option) => t(option)}
          value={spellType}
          onChange={(_, newValue) => setSpellType(newValue)}
          fullWidth
          renderInput={(params) => <TextField {...params} label={t('type')} />}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label={t('cast-type')}
          name="cast-type"
          value={instant}
          fullWidth
          onChange={(e) => setInstant(e.target.value)}
        >
          <MenuItem value="">{t('all')}</MenuItem>
          <MenuItem value="true">{t('instant')}</MenuItem>
          <MenuItem value="false">{t('casted')}</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}

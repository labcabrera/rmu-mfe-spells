/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import {
  fetchSpellLists,
  FilterBar,
  rsqlAnd,
  SearchField,
  SPELL_TYPES,
  SpellList,
  SpellType,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

/** Filters of the spell list, reported as an RSQL query. */
export default function SpellListFilters({ onChange }: { onChange: (rsql: string) => void }) {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [name, setName] = useState('');
  const [spellLists, setSpellLists] = useState<SpellList[]>([]);
  const [selectedSpellList, setSelectedSpellList] = useState<SpellList | null>(null);
  const [instant, setInstant] = useState<string>('');
  const [spellType, setSpellType] = useState<SpellType | null>(null);

  useEffect(() => {
    fetchSpellLists('', 0, 100, auth)
      .then((response) => setSpellLists(response.content))
      .catch(notify.error);
  }, []);

  useEffect(() => {
    onChange(
      rsqlAnd([
        ['name=re=', name],
        ['spellListId==', selectedSpellList?.id],
        ['modifiers.instant==', instant],
        ['modifiers.type==', spellType],
      ])
    );
  }, [name, selectedSpellList, instant, spellType]);

  return (
    <FilterBar>
      <SearchField value={name} onChange={setName} />
      <Autocomplete
        options={spellLists}
        getOptionLabel={(option) => option.name}
        value={selectedSpellList}
        onChange={(_, newValue) => setSelectedSpellList(newValue)}
        fullWidth
        renderInput={(params) => <TextField {...params} label={t('spell-list')} />}
      />
      <Autocomplete
        options={SPELL_TYPES}
        getOptionLabel={(option) => t(option)}
        value={spellType}
        onChange={(_, newValue) => setSpellType(newValue)}
        fullWidth
        renderInput={(params) => <TextField {...params} label={t('type')} />}
      />
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
    </FilterBar>
  );
}

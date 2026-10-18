/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import {
  FilterBar,
  fetchProfessions,
  ListType,
  RealmType,
  rsqlAnd,
  SearchField,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectListType from '../../shared/selects/SelectListType';
import SelectProfession from '../../shared/selects/SelectProfession';
import SelectRealmType from '../../shared/selects/SelectRealmType';

/** Filters of the spell list list, reported as an RSQL query. */
export default function SpellListListFilters({ onChange }: { onChange: (rsql: string) => void }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [professionIds, setProfessionIds] = useState<string[]>();
  const [name, setName] = useState('');
  const [realmType, setRealmType] = useState<RealmType | null>(null);
  const [listType, setListType] = useState<ListType | null>(null);
  const [professionId, setProfessionId] = useState<string | null>(null);

  useEffect(() => {
    onChange(
      rsqlAnd([
        ['name=re=', name],
        ['type==', listType],
        ['realm==', realmType],
        ['professionId==', professionId],
      ])
    );
  }, [name, realmType, listType, professionId]);

  useEffect(() => {
    fetchProfessions('archetype!=non-spellcaster', 0, 100, auth)
      .then((response) => setProfessionIds(response.content.map((profession) => profession.id)))
      .catch(notify.error);
  }, []);

  return (
    <FilterBar>
      <SearchField value={name} onChange={setName} />
      <SelectRealmType
        name="realm"
        label={t('realm')}
        value={realmType}
        onChange={(value) => setRealmType(value || null)}
        required={false}
        allowAll
      />
      <SelectListType
        name="type"
        label={t('type')}
        value={listType}
        onChange={(value) => setListType(value || null)}
        required={false}
        allowAll
      />
      {professionIds && (
        <SelectProfession
          name="professionId"
          label={t('profession')}
          value={professionId}
          professionIds={professionIds}
          onChange={(value) => setProfessionId(value || null)}
          required={false}
          allowAll
        />
      )}
    </FilterBar>
  );
}

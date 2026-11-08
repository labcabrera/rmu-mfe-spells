/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EntityCard,
  EntitySourceChip,
  fetchProfessions,
  fetchSpellLists,
  ListPage,
  SpellList,
  useCatalogByLabel,
  useListFilters,
  useNotify,
  useSpellName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellListListFilters, { spellListFilters } from './SpellListListFilters';

export default function SpellListListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const spellName = useSpellName();
  const navigate = useNavigate();
  const notify = useNotify();
  const [professionIds, setProfessionIds] = useState<string[]>();
  const filters = useListFilters(spellListFilters(t, spellName));
  const query = useCatalogByLabel<SpellList>({
    fetcher: (q, page, size) => fetchSpellLists(q, page, size, auth),
    rsql: filters.rsql,
    resetKey: filters.key,
    labelOf: (spellList) => spellName(spellList.name),
    labelVersion: spellName,
    match: filters.match,
    onError: notify.error,
  });

  useEffect(() => {
    fetchProfessions('archetype!=non-spellcaster', 0, 100, auth)
      .then((response) => setProfessionIds(response.content.map((profession) => profession.id)))
      .catch(notify.error);
  }, []);

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spell-lists') },
      ]}
      query={query}
      onAdd={() => navigate('/spells/spell-lists/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="spells.spell-lists"
      filters={<SpellListListFilters filters={filters} professionIds={professionIds} />}
      collection={{ modes: ['cards'], storageKey: 'spells.spell-lists' }}
      renderItem={(spellList) => (
        <EntityCard
          title={spellName(spellList.name)}
          subtitle={[t(spellList.type), ...(spellList.realms || []).map((realm) => t(realm))].join(' · ')}
          image={spellList.imageUrl || defaultImages['spell-list']}
          fallbackImages={[defaultImages['spell-list']]}
          chips={<EntitySourceChip entity={spellList} />}
          onClick={() => navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } })}
        />
      )}
    />
  );
}

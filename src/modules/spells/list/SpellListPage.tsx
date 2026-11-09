/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EntityCard,
  EntitySourceChip,
  fetchSpellLists,
  fetchSpells,
  ListPage,
  Spell,
  SpellList,
  useListFilters,
  useNotify,
  usePagedQuery,
  useSpellName,
  useSpellNameMatches,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { spellImage } from '../spell-format';
import SpellListFilters, { spellFilters } from './SpellListFilters';

// The filter needs every list (171 in the books): the API serves the lists as a catalog of up to 1000.
const SPELL_LIST_CATALOG_MAX = 1000;

export default function SpellListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const spellName = useSpellName();
  const spellNameMatches = useSpellNameMatches();
  const navigate = useNavigate();
  const notify = useNotify();
  const [spellLists, setSpellLists] = useState<SpellList[]>();
  const filters = useListFilters(spellFilters(t, spellLists ?? [], spellName, spellNameMatches));
  const query = usePagedQuery<Spell>({
    fetcher: (q, page, size) => fetchSpells(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });

  useEffect(() => {
    fetchSpellLists('', 0, SPELL_LIST_CATALOG_MAX, auth)
      .then((response) => setSpellLists(response.content))
      .catch(notify.error);
  }, []);

  const listName = (id: string) => {
    const list = spellLists?.find((each) => each.id === id);
    return list ? spellName(list.name) : undefined;
  };

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spells') },
      ]}
      query={query}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="spells.spells"
      filters={<SpellListFilters filters={filters} spellLists={spellLists} />}
      collection={{ modes: ['cards'], storageKey: 'spells.spells' }}
      renderItem={(spell) => (
        <EntityCard
          title={spellName(spell.name)}
          subtitle={listName(spell.spellListId) ?? t('spell')}
          image={spellImage(
            spell,
            spellLists?.find((each) => each.id === spell.spellListId)
          )}
          fallbackImages={[defaultImages.spell]}
          chips={<EntitySourceChip entity={spell} />}
          metrics={[
            { label: t('level'), value: spell.level },
            ...(spell.modifiers?.type ? [{ label: t('type'), value: t(spell.modifiers.type) }] : []),
          ]}
          onClick={() => navigate(`/spells/spells/view/${spell.id}`, { state: { spell } })}
        />
      )}
    />
  );
}

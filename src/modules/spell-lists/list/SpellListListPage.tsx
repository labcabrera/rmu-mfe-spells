import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  fetchSpellLists,
  ListPage,
  RmuTextCard,
  SpellList,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellListListFilters from './SpellListListFilters';

export default function SpellListListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [rsql, setRsql] = useState('');
  const query = usePagedQuery<SpellList>({
    fetcher: (q, page, size) => fetchSpellLists(q, page, size, auth),
    rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spell-lists') },
      ]}
      query={query}
      onAdd={() => navigate('/spells/spell-lists/create')}
      filters={<SpellListListFilters onChange={setRsql} />}
      renderItem={(spellList) => (
        <RmuTextCard
          value={t(spellList.name, spellList.name)}
          subtitle={t(spellList.type)}
          image={spellList.imageUrl || ''}
          onClick={() => navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } })}
        />
      )}
    />
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  fetchSpells,
  ListPage,
  RmuTextCard,
  Spell,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellListFilters from './SpellListFilters';

export default function SpellListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [rsql, setRsql] = useState('');
  const query = usePagedQuery<Spell>({
    fetcher: (q, page, size) => fetchSpells(q, page, size, auth),
    rsql,
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spells') },
      ]}
      query={query}
      filters={<SpellListFilters onChange={setRsql} />}
      renderItem={(spell) => (
        <RmuTextCard
          value={t(spell.name, spell.name)}
          subtitle={t('spell')}
          image={spell.imageUrl || ''}
          onClick={() => navigate(`/spells/spells/view/${spell.id}`, { state: { spell } })}
        />
      )}
    />
  );
}

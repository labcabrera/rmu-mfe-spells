import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress } from '@mui/material';
import {
  fetchSpells,
  LayoutBase,
  Page,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
  Spell,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { DEFAULT_SPELL_LIST_IMAGE } from '../../services/image-service';
import SpellListSearch from './SpellListSearch';

const SpellsListView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [pageData, setPageData] = useState<Page<Spell>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [queryString, setQueryString] = useState<string>('');

  const bindSpells = () => {
    fetchSpells(queryString, page, pageSize, auth)
      .then((response) => setPageData(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    bindSpells();
  }, [queryString, page, pageSize]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spells') },
      ]}
      actions={<RefreshButton onClick={bindSpells} />}
    >
      {!pageData ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SpellListSearch setQueryString={setQueryString} />
            </Grid>
            {pageData.content.map((spellList) => (
              <Grid size={{ xs: 12, md: 3 }} key={spellList.id}>
                <RmuTextCard
                  value={t(spellList.name)}
                  subtitle={t('Spell')}
                  image={spellList.imageUrl || DEFAULT_SPELL_LIST_IMAGE}
                  onClick={() => navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } })}
                />
              </Grid>
            ))}
          </Grid>
          <RmuPagination
            page={page}
            pageSize={pageSize}
            totalPages={pageData.pagination.totalPages}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </>
      )}
    </LayoutBase>
  );
};

export default SpellsListView;

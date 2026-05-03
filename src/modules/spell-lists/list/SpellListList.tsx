import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress } from '@mui/material';
import {
  AddButton,
  fetchProfessions,
  fetchSpellLists,
  LayoutBase,
  Page,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
  SpellList,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { DEFAULT_SPELL_LIST_IMAGE } from '../../services/image-service';
import SpellListListSearch from './SpellListListSearch';

const SpellListList: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [pageData, setPageData] = useState<Page<SpellList>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [queryString, setQueryString] = useState<string>('');
  const [professionIds, setProfessionIds] = useState<string[]>();

  const bindProfessions = () => {
    fetchProfessions('archetype!=non-spellcaster', 0, 100, auth)
      .then((response) => {
        setProfessionIds(response.content.map((profession) => profession.id));
      })
      .catch((err: Error) => showError(err.message));
  };

  const bindSpellLists = () => {
    fetchSpellLists(queryString, page, pageSize, auth)
      .then((response) => setPageData(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    bindSpellLists();
  }, [queryString, page]);

  useEffect(() => {
    bindProfessions();
  }, []);

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('spell-lists') }]}
      actions={[
        <RefreshButton onClick={() => bindSpellLists()} />,
        <AddButton onClick={() => navigate('/spells/spell-lists/create')} />,
      ]}
    >
      {!pageData ? (
        <CircularProgress />
      ) : (
        <>
          <SpellListListSearch setQueryString={setQueryString} professionIds={professionIds} />
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {pageData.content.map((spellList) => (
              <Grid size={{ xs: 12, md: 3 }} key={spellList.id}>
                <RmuTextCard
                  value={t(spellList.name)}
                  subtitle={t(spellList.type)}
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

export default SpellListList;

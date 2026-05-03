/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress } from '@mui/material';
import { AddButton, fetchProfessions, LayoutBase, Page, RefreshButton, RmuPagination } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchSpellLists } from '../../api/spell-list.api';
import { SpellList } from '../../api/spell-list.dto';
import { DEFAULT_SPELL_LIST_IMAGE } from '../../services/image-service';
import RmuTextCard from '../../shared/cards/RmuTextCard';
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

  // if (!spellLists || !professionIds) return <p>Loading...</p>;

  return (
    <>
      <LayoutBase breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('spell-lists') }]} actions={[
        <RefreshButton onClick={() => bindSpellLists()} />,
        <AddButton onClick={() => navigate('/spells/spell-lists/create')} />
      ]}>
        {!pageData ? (
          <CircularProgress />
        ) : (
        <>
        <SpellListListSearch setQueryString={setQueryString} professionIds={professionIds} />
        <Grid container spacing={1}>
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
        <RmuPagination page={page} pageSize={pageSize} totalPages={pageData.pagination.totalPages} setPage={setPage} setPageSize={setPageSize} />
        </>  
        )}
      </LayoutBase>
      {/* <SpellListListActions />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {spellLists.length === 0 ? <p>No skills found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
};

export default SpellListList;

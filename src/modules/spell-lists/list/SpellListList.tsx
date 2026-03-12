import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchSpellLists } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import SpellListListActions from './SpellListListActions';
import SpellListListSearch from './SpellListListSearch';

const PAGE_SIZE = 24;

const SpellListList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skills, setSkills] = useState<SpellList[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSpellLists = (queryString: string, pageNumber: number = 0) => {
    fetchSpellLists(queryString, pageNumber, PAGE_SIZE)
      .then((response) => {
        setSkills(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindSpellLists(queryString, page);
  }, [queryString, page]);

  if (!skills) return <p>Loading...</p>;

  return (
    <>
      <SpellListListActions />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SpellListListSearch setQueryString={setQueryString} />
            </Grid>
            {skills.map((spellList) => (
              <Grid size={{ xs: 12, md: 3 }} key={spellList.id}>
                <RmuTextCard
                  value={t(spellList.name)}
                  subtitle={t('Spell list')}
                  image={`${imageBaseUrl}images/generic/configuration.png`}
                  onClick={() => navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } })}
                />
              </Grid>
            ))}
          </Grid>
          {skills.length === 0 ? <p>No skills found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListList;

import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import SpellListActions from './SpellListActions';
import SpellListSearch from './SpellListSearch';
import { DEFAULT_SPELL_LIST_IMAGE } from '../../services/image-service';
import { fetchSpells } from '../../api/spell';
import { Spell } from '../../api/spell.dto';

const PAGE_SIZE = 24;

const SpellsView: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skills, setSkills] = useState<Spell[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSpells = (queryString: string, pageNumber: number = 0) => {
    fetchSpells(queryString, pageNumber, PAGE_SIZE)
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
    bindSpells(queryString, page);
  }, [queryString, page]);


  if (!skills) return <p>Loading...</p>;

  return (
    <>
      <SpellListActions />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SpellListSearch setQueryString={setQueryString}  />
            </Grid>
            {skills.map((spellList) => (
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
          {skills.length === 0 ? <p>No skills found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellsView;

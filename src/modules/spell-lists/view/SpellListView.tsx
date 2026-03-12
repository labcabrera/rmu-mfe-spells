import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSpellList } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SpellListViewActions from './SpellListViewActions';
import SpellListViewInfo from './SpellListViewInfo';

const SpellListView: FC = () => {
  const location = useLocation();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const { showError } = useError();
  const [spellList, setSpellList] = useState<SpellList | null>(null);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      fetchSpellList(spellListId)
        .then((response) => setSpellList(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [location.state, spellListId, showError]);

  if (!spellList) return <p>Loading...</p>;

  return (
    <>
      <SpellListViewActions spellList={spellList} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SpellListViewInfo spellList={spellList} />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListView;

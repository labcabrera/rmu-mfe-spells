import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSpell } from '../../api/spell';
import { fetchSpellList } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import { Spell } from '../../api/spell.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SpellViewActions from './SpellViewActions';
import SpellViewInfo from './SpellViewInfo';

const SpellView: FC = () => {
  const location = useLocation();
  const { spellId } = useParams<{ spellId?: string }>();
  const { showError } = useError();
  const [spell, setSpell] = useState<Spell>();
  const [spellList, setSpellList] = useState<SpellList>();

  const bindSpell = (spellId: string) => {
    fetchSpell(spellId)
      .then((response) => setSpell(response))
      .catch((err: Error) => showError(err.message));
  };

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId)
      .then((response) => setSpellList(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (spell) {
      bindSpellList(spell.spellListId);
    }
  }, [spell]);

  useEffect(() => {
    if (location.state && location.state.spell) {
      setSpell(location.state.spell);
    } else if (spellId) {
      bindSpell(spellId);
    }
  }, [location.state, spellId, showError]);

  if (!spell || !spellList) return <p>Loading...</p>;

  return (
    <>
      <SpellViewActions spellList={spellList} spell={spell} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SpellViewInfo spell={spell} spellList={spellList} />
        </Grid>
      </Grid>
    </>
  );
};

export default SpellView;

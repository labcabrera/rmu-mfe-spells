import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchSpells } from '../../api/spell';
import { fetchSpellList } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import { Spell } from '../../api/spell.dto';
import { DEFAULT_SPELL_LIST_IMAGE } from '../../services/image-service';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import AddButton from '../../shared/buttons/AddButton';
import CategorySeparator from '../../shared/display/CategorySeparator';
import SpellTable from '../../spells/shared/SpellTable';
import SpellListViewActions from './SpellListViewActions';
import SpellListViewInfo from './SpellListViewInfo';
import TechnicalInfo from '../../shared/display/TechnicalInfo';

const SpellListView: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const { showError } = useError();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [spells, setSpells] = useState<Spell[]>([]);

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId)
      .then((response) => setSpellList(response))
      .catch((err: Error) => showError(err.message));
  };

  const bindSpells = (spellListId: string) => {
    fetchSpells(`spellListId==${spellListId}`, 0, 100)
      .then((response) => setSpells(response.content))
      .catch((err: Error) => showError(err.message));
  };

  const onAddSpell = () => {
    navigate(`/spells/spells/create?spellListId=${spellList?.id}`, { state: { spellList } });
  };

  useEffect(() => {
    if (spellList) {
      bindSpells(spellList.id);
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      bindSpellList(spellListId);
    }
  }, [location.state, spellListId, showError]);

  if (!spellList) return <p>Loading...</p>;

  return (
    <>
      <SpellListViewActions spellList={spellList} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={spellList.imageUrl || DEFAULT_SPELL_LIST_IMAGE} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SpellListViewInfo spellList={spellList} />
          <CategorySeparator text={t('Spells')}>
            <AddButton onClick={onAddSpell} />
          </CategorySeparator>
          <SpellTable spells={spells} />
          <TechnicalInfo>
            <pre>{JSON.stringify(spellList, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListView;

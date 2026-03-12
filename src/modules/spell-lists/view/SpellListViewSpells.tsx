import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { Spell } from '../../api/spell.dto';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const SpellListViewSpells: FC<{
  spells: Spell[];
}> = ({ spells }) => {
  const navigate = useNavigate();

  const handleSpellClick = (spell: Spell) => {
    navigate(`/spells/spells/view/${spell.id}`, { state: { spell } });
  };

  if (!spells) return <p>Loading...</p>;

  if (spells.length === 0) {
    return <p>No spells in this list.</p>;
  }

  return (
    <Grid container spacing={1}>
      {spells.map((spell) => (
        <Grid key={spell.id} size={12}>
          <RmuTextCard value={spell.name} subtitle={t('Spell')} onClick={() => handleSpellClick(spell)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SpellListViewSpells;

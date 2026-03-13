import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { t } from 'i18next';
import { getSpellDurationText, getSpellRangeText, Spell } from '../../api/spell.dto';

const SpellTable: FC<{
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
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Level')}</TableCell>
            <TableCell>{t('Name')}</TableCell>
            <TableCell>{t('Type')}</TableCell>
            <TableCell>{t('Range')}</TableCell>
            <TableCell>{t('Duration')}</TableCell>
            <TableCell>{t('AoE')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spells.map((spell) => (
            <TableRow key={spell.id} hover onClick={() => handleSpellClick(spell)} sx={{ cursor: 'pointer' }}>
              <TableCell>{spell.level}</TableCell>
              <TableCell>{spell.name}</TableCell>
              <TableCell>{spell.modifiers?.type}</TableCell>
              <TableCell>{getSpellRangeText(spell)}</TableCell>
              <TableCell>{getSpellDurationText(spell)}</TableCell>
              <TableCell>{spell.modifiers?.area || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpellTable;

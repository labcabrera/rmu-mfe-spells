import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Spell } from '@labcabrera-rmu/rmu-react-shared-lib';

const SpellTable: FC<{
  spells: Spell[];
}> = ({ spells }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSpellClick = (spell: Spell) => {
    navigate(`/spells/spells/view/${spell.id}`, { state: { spell } });
  };

  const getSpellNameText = (spell: Spell) => {
    return spell.modifiers.instant ? `${t(spell.name)} *` : t(spell.name);
  };

  const getSpellTypeText = (spell: Spell) => {
    if (!spell.modifiers?.type) return '-';
    const type = spell.modifiers.type.charAt(0).toUpperCase();
    let subtype = '';
    if (spell.modifiers.subtype) {
      subtype = spell.modifiers.subtype.charAt(0);
    }
    return `${t(type)}${t(subtype)}`;
  };

  const getSpellDurationText = (spell: Spell) => {
    if (!spell.modifiers?.duration) return '-';
    if (!spell.modifiers.duration.type) {
      return spell.modifiers?.duration?.requiredConcentration === true ? 'C' : '-';
    }
    const concentration = spell.modifiers?.duration?.requiredConcentration ? ` (C)` : '';
    const duration = spell.modifiers.duration;
    switch (duration.type) {
      case 'concentration':
      case 'permanent':
        return `${t(duration.type)}${concentration}`;
      case 'lvl':
        return `${duration.duration} ${t(duration.durationScale || '')} / lvl${concentration}`;
      case 'rr-failure': {
        const scale: string = duration.failureScale ? `${duration.failureScale}` : '';
        return `${duration.duration} ${t(duration.durationScale || '')} / ${scale} failure${concentration}`;
      }
      default:
        return '-';
    }
  };

  const getSpellRangeText = (spell: Spell) => {
    if (!spell.modifiers?.range) return '-';
    const range = spell.modifiers.range;
    switch (range.type) {
      case 'distance':
        return `${range.value}'`;
      case 'distance-level':
        return `${range.value}' / lvl`;
      case 'touch':
      case 'self':
        return t(range.type);
      default:
        return '-';
    }
  };

  const getSpellTargetText = (spell: Spell) => {
    if (!spell.modifiers?.target) return '-';
    switch (spell.modifiers.target.mode) {
      case 'area':
        return `${spell.modifiers.target.modifier || ''}`;
      case 'target': {
        const count = spell.modifiers.target.count ? `${spell.modifiers.target.count} ` : '';
        const types = spell.modifiers.target.types ? spell.modifiers.target.types.join(', ') : '';
        return `${count}${types}`;
      }
      default:
        return '-';
    }
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
            <TableCell>{t('Target')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spells.map((spell) => (
            <TableRow key={spell.id} hover onClick={() => handleSpellClick(spell)} sx={{ cursor: 'pointer' }}>
              <TableCell>{spell.level}</TableCell>
              <TableCell>{getSpellNameText(spell)}</TableCell>
              <TableCell>{getSpellTypeText(spell)}</TableCell>
              <TableCell>{getSpellRangeText(spell)}</TableCell>
              <TableCell>{getSpellDurationText(spell)}</TableCell>
              <TableCell>{getSpellTargetText(spell)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpellTable;

import React, { FC, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { EmptyState, Spell } from '@labcabrera-rmu/rmu-react-shared-lib';
import { getSpellDurationText, getSpellRangeText, getSpellTargetText } from '../../spells/spell-format';

type SortField = 'level' | 'name';
type SortOrder = 'asc' | 'desc';

const SpellTable: FC<{
  spells: Spell[];
}> = ({ spells }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('level');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSpells = useMemo(() => {
    return [...spells].sort((a, b) => {
      const cmp = sortField === 'level' ? (a.level ?? 0) - (b.level ?? 0) : (a.name ?? '').localeCompare(b.name ?? '');
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [spells, sortField, sortOrder]);

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

  if (spells.length === 0) return <EmptyState />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={sortField === 'level' ? sortOrder : false}>
              <TableSortLabel
                active={sortField === 'level'}
                direction={sortField === 'level' ? sortOrder : 'asc'}
                onClick={() => handleSort('level')}
                sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {t('level')}
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={sortField === 'name' ? sortOrder : false}>
              <TableSortLabel
                active={sortField === 'name'}
                direction={sortField === 'name' ? sortOrder : 'asc'}
                onClick={() => handleSort('name')}
                sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {t('name')}
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {t('type')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {t('range')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {t('duration')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {t('target')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSpells.map((spell) => (
            <TableRow key={spell.id} hover onClick={() => handleSpellClick(spell)} sx={{ cursor: 'pointer' }}>
              <TableCell>
                <Typography variant="body1">{spell.level}</Typography>{' '}
              </TableCell>
              <TableCell>
                <Typography variant="body1">{getSpellNameText(spell)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{getSpellTypeText(spell)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{getSpellRangeText(spell, t)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{getSpellDurationText(spell, t)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{getSpellTargetText(spell)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpellTable;

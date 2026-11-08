import React, { FC, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TableSortLabel } from '@mui/material';
import { DataTable, DataTableColumn, Spell, useSpellName } from '@labcabrera-rmu/rmu-react-shared-lib';
import { getSpellAreaText, getSpellDurationText, getSpellMarkers, getSpellRangeText } from '../../spells/spell-format';

type SortField = 'level' | 'name';
type SortOrder = 'asc' | 'desc';

const SpellTable: FC<{
  spells: Spell[];
}> = ({ spells }) => {
  const { t } = useTranslation();
  const spellName = useSpellName();
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
      const cmp =
        sortField === 'level' ? (a.level ?? 0) - (b.level ?? 0) : spellName(a.name).localeCompare(spellName(b.name));
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [spells, sortField, sortOrder, spellName]);

  const handleSpellClick = (spell: Spell) => {
    navigate(`/spells/spells/view/${spell.id}`, { state: { spell } });
  };

  // Name with the book markers: * instantaneous, • no power points, ‡ cast together with its set.
  const getSpellNameText = (spell: Spell) => {
    const markers = getSpellMarkers(spell);
    return markers ? `${spellName(spell.name)} ${markers}` : spellName(spell.name);
  };

  // The type code of the book (Fm, Ed, U…), or one built from the type and subtype.
  const getSpellTypeText = (spell: Spell) => {
    if (spell.modifiers?.typeCode) return spell.modifiers.typeCode;
    if (!spell.modifiers?.type) return '-';
    const type = spell.modifiers.type.charAt(0).toUpperCase();
    let subtype = '';
    if (spell.modifiers.subtype) {
      subtype = spell.modifiers.subtype.charAt(0);
    }
    return `${t(type)}${t(subtype)}`;
  };

  const sortHeader = (field: SortField, label: string) => (
    <TableSortLabel
      active={sortField === field}
      direction={sortField === field ? sortOrder : 'asc'}
      onClick={() => handleSort(field)}
      sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
    >
      {label}
    </TableSortLabel>
  );

  const columns: DataTableColumn<Spell>[] = [
    { key: 'level', header: sortHeader('level', t('level')), render: (spell) => spell.level },
    { key: 'name', header: sortHeader('name', t('name')), render: getSpellNameText },
    { key: 'type', header: t('type'), render: getSpellTypeText },
    { key: 'range', header: t('range'), render: (spell) => getSpellRangeText(spell, t) },
    { key: 'duration', header: t('duration'), render: (spell) => getSpellDurationText(spell, t) },
    { key: 'area', header: t('area'), render: (spell) => getSpellAreaText(spell, t) },
  ];

  return (
    <DataTable
      columns={columns}
      rows={sortedSpells}
      getKey={(spell) => spell.id}
      onRowClick={handleSpellClick}
      emptyTitle={t('no-results')}
      // The sort labels live in the header: phones keep the scrollable table instead of one card per spell.
      cardsOnMobile={false}
    />
  );
};

export default SpellTable;

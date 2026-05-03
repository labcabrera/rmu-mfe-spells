import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

import { RmuBreadcrumbs, RefreshButton, EditButton, DeleteButton, deleteSpellList, Spell, SpellList } from '@labcabrera-rmu/rmu-react-shared-lib';

const SpellViewActions: FC<{
  spellList: SpellList;
  spell: Spell;
}> = ({ spellList, spell }) => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: t('Spells'), link: '/spells' },
    { name: t('View') },
  ];

  const onRefresh = () => {};

  const onEdit = () => {
    navigate(`/spells/spells/edit/${spell.id}`);
  };

  const onDelete = () => {
    deleteSpellList(spellList.id).then(() => navigate('/spells/spell-lists'));
  };

  if (!spellList) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </RmuBreadcrumbs>
  );
};

export default SpellViewActions;

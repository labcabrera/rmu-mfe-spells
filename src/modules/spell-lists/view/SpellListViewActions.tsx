import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { deleteSpellList } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import DeleteButton from '../../shared/buttons/DeleteButton';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SpellListViewActions: FC<{
  spellList: SpellList;
}> = ({ spellList }) => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { name: t('Spells'), link: '/spells' },
    { name: t('Lists'), link: '/spells/spell-lists' },
    { name: t('View') },
  ];

  const onRefresh = () => {};

  const onEdit = () => {
    navigate(`/spells/spell-lists/edit/${spellList.id}`);
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

export default SpellListViewActions;

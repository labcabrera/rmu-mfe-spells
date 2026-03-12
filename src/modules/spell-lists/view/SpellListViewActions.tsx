import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { SpellList } from '../../api/spell-list.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import EditButton from '../../shared/buttons/EditButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SpellListViewActions: FC<{
  spellList: SpellList;
}> = ({ spellList }) => {
  const navigate = useNavigate();
  const breadcrumbs = [{ name: t('Spells'), link: '/spells' }];

  const onRefresh = () => {};

  const onEdit = () => {
    navigate(`/spells/spell-lists/edit/${spellList.id}`);
  };

  if (!spellList) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <EditButton onClick={onEdit} />
    </RmuBreadcrumbs>
  );
};

export default SpellListViewActions;

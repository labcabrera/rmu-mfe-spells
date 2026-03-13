import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import AddButton from '../../shared/buttons/AddButton';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SpellListListActions: FC = () => {
  const navigate = useNavigate();
  const breadcrumbs = [{ name: t('Spells'), link: '/spells' }, { name: t('Lists') }];

  const onRefresh = () => {};

  const onCreate = () => {
    navigate('/spells/spell-lists/create');
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
      <AddButton onClick={onCreate} />
    </RmuBreadcrumbs>
  );
};

export default SpellListListActions;

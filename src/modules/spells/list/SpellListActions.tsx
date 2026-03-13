import React, { FC } from 'react';
import { t } from 'i18next';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import RefreshButton from '../../shared/buttons/RefreshButton';

const SpellListActions: FC = () => {
  const breadcrumbs = [
    { name: t('Spells'), link: '/spells' },
    { name: t('Lists'), link: '/spells/spell-lists' },
    { name: t('Spells') },
  ];

  const onRefresh = () => {};

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <RefreshButton onClick={onRefresh} />
    </RmuBreadcrumbs>
  );
};

export default SpellListActions;

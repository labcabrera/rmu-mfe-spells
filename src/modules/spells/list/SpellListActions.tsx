import React, { FC } from 'react';
import { t } from 'i18next';
import { RmuBreadcrumbs, RefreshButton } from '@labcabrera-rmu/rmu-react-shared-lib';

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

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CardGrid, EntityCard, LayoutBase } from '@labcabrera-rmu/rmu-react-shared-lib';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cards = [
    {
      value: t('spell-lists', 'Spell lists'),
      subtitle: t('manage-spell-lists', 'Manage spell lists'),
      image: 'images/generic/spells.png',
      to: '/spells/spell-lists',
    },
    {
      value: t('spells', 'Spells'),
      subtitle: t('manage-spells', 'Manage spells'),
      image: 'images/generic/spells.png',
      to: '/spells/spells',
    },
  ];

  return (
    <LayoutBase breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('spell-module') }]}>
      <CardGrid
        items={cards}
        getKey={(c) => c.to}
        renderItem={(c) => (
          <EntityCard title={c.value} description={c.subtitle} image={c.image} onClick={() => navigate(c.to)} />
        )}
      />
    </LayoutBase>
  );
};

export default HomePage;

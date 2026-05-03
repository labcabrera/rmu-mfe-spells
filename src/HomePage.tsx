import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { imageBaseUrl } from './modules/services/config';
import { LayoutBase, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cards = [
    {
      value: 'Spell lists',
      subtitle: 'Manage spell lists',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/spells/spell-lists',
    },
    {
      value: 'Spells',
      subtitle: 'Manage spells',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/spells/spells',
    },
  ];

  return (

      <LayoutBase breadcrumbs={[{ name: t('home'), link: "/" },{ name: t('spells') }]}>
          <Grid container spacing={1}>
            {cards.map((c) => (
              <Grid size={{ xs: 12, md: 3 }} key={c.value}>
                <RmuTextCard value={c.value} subtitle={c.subtitle} image={c.image} onClick={() => navigate(c.to)} />
              </Grid>
            ))}
          </Grid>
      </LayoutBase>

  );
};

export default HomePage;

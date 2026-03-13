import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { imageBaseUrl } from './modules/services/config';
import RmuBreadcrumbs from './modules/shared/breadcrumbs/RmuBreadcrumbs';
import RmuTextCard from './modules/shared/cards/RmuTextCard';

const HomePage: FC = () => {
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
    <>
      <RmuBreadcrumbs items={[{ name: 'Spells' }]} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            {cards.map((c) => (
              <Grid size={{ xs: 12, md: 3 }} key={c.value}>
                <RmuTextCard value={c.value} subtitle={c.subtitle} image={c.image} onClick={() => navigate(c.to)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;

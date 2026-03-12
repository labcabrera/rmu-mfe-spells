import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Trait } from '../../api/trait.dto';
import { getTraitImage } from '../../services/trait-image-service';
import CardListItem from './CardListItem';

const TraitCard: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const navigate = useNavigate();

  const handleTraitClick = () => {
    navigate(`/core/traits/view/${trait.id}`, { state: { trait } });
  };

  if (!trait) return <p>Loading...</p>;

  const subtitle = `${t(trait.isTalent ? t('trait') : t('flaw'))} • ${t(trait.category)} • ${trait.adquisitionCost}`;

  return (
    <CardListItem title={trait.name} subtitle={subtitle} image={getTraitImage(trait)} onClick={handleTraitClick} />
  );
};

export default TraitCard;

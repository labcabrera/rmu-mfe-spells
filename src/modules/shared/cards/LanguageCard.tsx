import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../../api/language.dto';
import CardListItem from './CardListItem';

const imageBaseUrl = process.env.RMU_MFE_ASSETS!;

const LanguageCard: FC<{
  language: Language;
}> = ({ language }) => {
  const navigate = useNavigate();

  const handleLanguageClick = () => {
    navigate(`/core/languages/view/${language.id}`, { state: { language } });
  };

  const getSubtitle = () => {
    return language.realmName;
  };

  if (!language) return <p>Loading...</p>;

  return (
    <CardListItem
      title={language.name}
      subtitle={getSubtitle()}
      image={`${imageBaseUrl}images/generic/language.png`}
      onClick={handleLanguageClick}
    />
  );
};

export default LanguageCard;

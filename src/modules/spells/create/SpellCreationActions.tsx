import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createSpellList } from '../../api/spell-list';
import { CreateSpellListDto } from '../../api/spell-list.dto';
import RmuBreadcrumbs from '../../shared/breadcrumbs/RmuBreadcrumbs';
import CancelButton from '../../shared/buttons/CancelButton';
import SaveButton from '../../shared/buttons/SaveButton';

const SpellCreationActions: FC<{
  formData: CreateSpellListDto;
  isValid?: boolean;
}> = ({ formData, isValid = false }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [
    { name: t('core'), link: '/core' },
    { name: t('spell-list-categories'), link: '/core/spell-list-categories' },
    { name: t('spell-lists'), link: '/core/spell-lists' },
    { name: t('create') },
  ];

  const handleSave = async () => {
    createSpellList(formData)
      .then((spellList) => navigate(`/spells/spell-lists/view/${spellList.id}`))
      .catch((err: Error) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/spells/spell-lists`);
  };

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBack} />
      <SaveButton onClick={handleSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default SpellCreationActions;

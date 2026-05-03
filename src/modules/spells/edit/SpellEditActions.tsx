import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateSpell } from '../../api/spell.api';
import { Spell, UpdateSpellDto } from '../../api/spell.dto';
import { RmuBreadcrumbs, CancelButton, SaveButton } from '@labcabrera-rmu/rmu-react-shared-lib';

const SpellEditActions: FC<{
  spell: Spell;
  formData: UpdateSpellDto;
  isValid?: boolean;
}> = ({ spell, formData, isValid = false }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const breadcrumbs = [{ name: t('Spells'), link: '/spells' }, { name: t('Edit') }];

  const handleSave = async () => {
    updateSpell(spell.id, formData, null)
      .then((response) => navigate(`/spells/spells/view/${response.id}`, { state: { spell: response } }))
      .catch((err: Error) => showError(err.message));
  };

  const handleBack = () => {
    navigate(`/spells/spell-lists`);
  };

  if (!spell || !formData) return <p>Loading...</p>;

  return (
    <RmuBreadcrumbs items={breadcrumbs}>
      <CancelButton onClick={handleBack} />
      <SaveButton onClick={handleSave} disabled={!isValid} />
    </RmuBreadcrumbs>
  );
};

export default SpellEditActions;

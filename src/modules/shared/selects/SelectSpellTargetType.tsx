import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  fetchSpellTargetTypes,
  Spell,
  SpellTarget,
  SpellTargetType,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectSpellTargetType: FC<{
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [targetTypes, setTargetTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchSpellTargetTypes(auth)
      .then(setTargetTypes)
      .catch((err: Error) => notify.error(err));
  }, []);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: SpellTargetType[] | null) => {
    setFormData({
      ...formData,
      modifiers: {
        ...formData.modifiers,
        target: { ...formData.modifiers!.target, types: newValue && newValue.length ? newValue : null } as SpellTarget,
      },
    });
  };

  return (
    <ToggleButtonGroup
      value={formData.modifiers?.target?.types || []}
      onChange={handleChange}
      aria-label={t('target-types')}
    >
      {targetTypes.map((targetType) => (
        <ToggleButton key={targetType} value={targetType} aria-label={targetType}>
          {targetType}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SelectSpellTargetType;

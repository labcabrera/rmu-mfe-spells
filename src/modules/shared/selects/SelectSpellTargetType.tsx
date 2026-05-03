import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSpellTargetTypes, Spell, SpellTargetType } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useAuth } from 'react-oidc-context';

const SelectSpellTargetType: FC<{
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { showError } = useError();
  const [targetTypes, setTargetTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchSpellTargetTypes(auth)
      .then(setTargetTypes)
      .catch((err: Error) => showError(err.message));
  }, []);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: SpellTargetType[] | null) => {
    setFormData({
      ...formData,
      modifiers: {
        ...formData.modifiers,
        target: { ...formData.modifiers!.target, types: newValue && newValue.length ? newValue : null },
      },
    });
  };
  if (!formData || !setFormData || !targetTypes) return <p>Loading...</p>;

  return (
    <ToggleButtonGroup
      value={formData.modifiers?.target?.types || []}
      onChange={handleChange}
      aria-label="spell-target-types"
      size="small"
    >
      {targetTypes.map((t) => (
        <ToggleButton key={t} value={t} aria-label={t}>
          {t}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default SelectSpellTargetType;

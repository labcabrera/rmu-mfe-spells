import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { fetchSpellTargetTypes } from '../../api/spell';
import { CreateSpellDto, SpellTargetType, UpdateSpellDto } from '../../api/spell.dto';
import { useError } from '../../../ErrorContext';

const SelectSpellTargetType: FC<{
  formData: CreateSpellDto | UpdateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto | UpdateSpellDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [targetTypes, setTargetTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchSpellTargetTypes()
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

import React, { FC } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { SPELL_SUBTYPES, SpellSubtype } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SelectSpellSubtype: FC<{
  label?: string;
  value: SpellSubtype | null;
  name: string;
  onChange: (value: SpellSubtype) => void;
}> = ({ label, value, name, onChange }) => {
  const { t } = useTranslation();
  
  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue === null || newValue === '') return onChange('' as SpellSubtype);
    onChange(newValue as SpellSubtype);
  };

  return (
    <div aria-label={label || name}>
      <ToggleButtonGroup
        color="primary"
        value={value === undefined || value === null ? '' : value}
        exclusive
        onChange={handleChange}
        aria-label={name}
        size="small"
      >
        {SPELL_SUBTYPES.map((opt) => (
          <ToggleButton key={opt} value={opt} aria-label={opt}>
            {t(opt)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default SelectSpellSubtype;

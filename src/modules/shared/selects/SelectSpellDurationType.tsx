import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPELL_DURATION_TYPES, SpellDurationType } from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectSpellDurationType: FC<{
  label: string;
  value: SpellDurationType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellDurationType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as SpellDurationType)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('None')}</em>
        </MenuItem>
      )}
      {SPELL_DURATION_TYPES.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSpellDurationType;

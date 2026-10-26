import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';
import { SPELL_TYPES, SpellType } from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectSpelltype: FC<{
  label: string;
  value: SpellType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as SpellType)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('all')}</em>
        </MenuItem>
      )}
      {SPELL_TYPES.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSpelltype;

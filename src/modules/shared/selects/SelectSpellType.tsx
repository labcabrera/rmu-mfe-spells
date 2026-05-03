import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { SpellType } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SelectSpelltype: FC<{
  label: string;
  value: SpellType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();
  const values = ['alchemical', 'elemental', 'force', 'informational', 'utility'];

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
          <em>{t('All')}</em>
        </MenuItem>
      )}
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSpelltype;

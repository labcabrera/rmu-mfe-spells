import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { ProfessionArchetype } from '../../api/profession.dto';

const SelectProfessionArchetype: FC<{
  label: string;
  value: ProfessionArchetype | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (archetype: ProfessionArchetype) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const values: ProfessionArchetype[] = ['non-spellcaster', 'semi-spellcaster', 'pure-spellcaster', 'hybrid'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as ProfessionArchetype)}
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

export default SelectProfessionArchetype;

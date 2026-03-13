import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { SpellRangeType } from '../../api/spell.dto';

const SelectSpellRangeType: FC<{
  label: string;
  value: SpellRangeType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellRangeType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const values = ['self', 'touch', 'distance', 'distance-level'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as SpellRangeType)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('None')}</em>
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

export default SelectSpellRangeType;

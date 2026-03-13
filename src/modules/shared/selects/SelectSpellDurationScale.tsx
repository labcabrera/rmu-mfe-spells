import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { SpellDurationScale } from '../../api/spell.dto';

const SelectSpellDurationScale: FC<{
  label: string;
  value: SpellDurationScale | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellDurationScale) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const values: SpellDurationScale[] = ['round', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as SpellDurationScale)}
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

export default SelectSpellDurationScale;

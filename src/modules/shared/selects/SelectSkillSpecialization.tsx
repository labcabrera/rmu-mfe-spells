import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectSkillSpecialization: FC<{
  value: string | null;
  label: string;
  onSpecializationChange: (value: string | null) => void;
}> = ({ label, value, onSpecializationChange }) => {
  const options = ['animals', 'weapon', 'region', 'race', 'other'];

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(e) => onSpecializationChange(e.target.value || null)}
    >
      <MenuItem>{t('none')}</MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSkillSpecialization;

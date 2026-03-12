import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectTraitCategory: FC<{
  label: string;
  value: string | null;
  name: string;
  addAllOption?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ label, value, name, onChange, addAllOption = false, required = false }) => {
  const { t } = useTranslation();

  const values = ['combat', 'discipline', 'magical', 'physical', 'racial', 'senses', 'other'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={onChange}
      error={required && !value}
    >
      {addAllOption ? (
        <MenuItem>
          <em>{t('all')}</em>
        </MenuItem>
      ) : null}
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectTraitCategory;

import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectManeuverTable: FC<{
  value: string | null;
  label: string;
  tables: string[];
  onChange: (event: string | null) => void;
}> = ({ value, label, tables, onChange }) => {
  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      onChange={(event) => onChange(event.target.value === '' ? null : event.target.value)}
      fullWidth
    >
      <MenuItem>
        <em>{t('none')}</em>
      </MenuItem>
      {tables.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option ? t(option) : t('none')}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectManeuverTable;

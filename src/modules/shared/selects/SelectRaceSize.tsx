import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectRaceSize: FC<{
  label: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, name, onChange }) => {
  const { t } = useTranslation();

  const values = ['minuscule', 'diminutive', 'tiny', 'small', 'medium', 'big', 'large', 'huge', 'gigantic', 'enormous'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      variant="outlined"
      onChange={onChange}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectRaceSize;

import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const SelectTraitSpecialization: FC<{
  label: string;
  value: string | null;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, name, onChange }) => {
  const values = [
    'none',
    'stat',
    'skill',
    'combat-skill',
    'melee-combat-skill',
    'ranged-combat-skill',
    'spell-list',
    'realm',
    'elemental-type',
    'sense',
    'language',
    'animal-type',
  ];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
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

export default SelectTraitSpecialization;

import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectRaceArchetype: FC<{
  label: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, name, onChange }) => {
  const { t } = useTranslation();

  const values = [
    'human',
    'high-human',
    'high-elf',
    'grey-elf',
    'wood-elf',
    'dwarf',
    'halfling',
    'lesser-orc',
    'orc',
    'high-orc',
    'troll',
  ];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      variant="outlined"
      onChange={onChange}
      error={!value}
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectRaceArchetype;

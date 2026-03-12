import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { t } from 'i18next';

const SelectSkill: FC<{
  label: string;
  value: string | undefined;
  name: string;
  onChange: (skillId: string | null) => void;
  skills: string[];
  required?: boolean;
}> = ({ label, value, name, onChange, required = false, skills }) => {
  const selected = skills.find((skill) => skill === (value ?? '')) ?? null;
  const handleChange = (_event: React.SyntheticEvent, newValue: string | null) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      options={skills}
      getOptionLabel={(option) => t(option)}
      value={selected}
      onChange={handleChange}
      isOptionEqualToValue={(option, val) => option === val}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} fullWidth error={required && !(value && value.length > 0)} />
      )}
    />
  );
};

export default SelectSkill;

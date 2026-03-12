import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { t } from 'i18next';
import { Trait } from '../../api/trait.dto';

const SelectTrait: FC<{
  label: string;
  category?: string;
  value: string | null;
  name: string;
  addAllOption?: boolean;
  onChange: (trait: Trait | null) => void;
  traits: Trait[];
  required?: boolean;
}> = ({ label, value, name, onChange, addAllOption = false, required = false, traits }) => {
  const allOption: Trait | null = addAllOption ? ({ id: '', name: t('all') } as Trait) : null;
  const options: Trait[] = allOption ? [allOption, ...traits] : traits;

  const selected = options.find((trait) => trait.id === (value ?? '')) ?? null;

  const handleChange = (_event: React.SyntheticEvent, newValue: Trait | null) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      value={selected}
      onChange={handleChange}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} fullWidth error={required && !(value && value.length > 0)} />
      )}
    />
  );
};

export default SelectTrait;

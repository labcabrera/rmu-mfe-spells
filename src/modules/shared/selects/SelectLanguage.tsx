import React, { FC } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { t } from 'i18next';
import { Language } from '../../api/language.dto';

const SelectLanguage: FC<{
  label: string;
  category?: string;
  value: string | undefined;
  name: string;
  addAllOption?: boolean;
  onChange: (language: Language | null) => void;
  languages: Language[];
  required?: boolean;
}> = ({ label, value, name, onChange, addAllOption = false, required = false, languages }) => {
  const allOption: Language | null = addAllOption ? ({ id: '', name: t('all') } as Language) : null;
  const options: Language[] = allOption ? [allOption, ...languages] : languages;

  const selected = options.find((language) => language.id === (value ?? '')) ?? null;

  const handleChange = (_event: React.SyntheticEvent, newValue: Language | null) => {
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

export default SelectLanguage;

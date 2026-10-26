import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

/**
 * Select of one value of a spell enumeration (range type, area kind, duration type…). `allowEmpty` adds an empty
 * option that reports null, which clears the field.
 */
export default function SelectSpellOption<T extends string>({
  label,
  name,
  value,
  options,
  optionLabel,
  required = false,
  allowEmpty = false,
  onChange,
}: {
  label: string;
  name: string;
  value: T | null | undefined;
  options: readonly T[];
  optionLabel: (option: T) => string;
  required?: boolean;
  allowEmpty?: boolean;
  onChange: (value: T | null) => void;
}) {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value ?? ''}
      fullWidth
      onChange={(event) => onChange((event.target.value as T) || null)}
      error={required && !value}
    >
      {allowEmpty && (
        <MenuItem value="">
          <em>{t('none')}</em>
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {optionLabel(option)}
        </MenuItem>
      ))}
    </TextField>
  );
}

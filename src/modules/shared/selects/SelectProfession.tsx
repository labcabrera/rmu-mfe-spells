import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';

const SelectListType: FC<{
  label: string;
  value: string | null;
  name: string;
  professionIds: string[];
  required?: boolean;
  allowAll?: boolean;
  onChange: (professionId: string) => void;
}> = ({ label, value, name, professionIds, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();
  if (!professionIds || professionIds.length === 0) return <p>Loading...</p>;

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as string)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('All')}</em>
        </MenuItem>
      )}
      {professionIds.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectListType;

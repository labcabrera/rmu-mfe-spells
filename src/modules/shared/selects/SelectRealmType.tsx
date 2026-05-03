import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { RealmType, REALM_TYPES } from '../../api/spell-list.dto';
import { useTranslation } from 'react-i18next';

const SelectRealmType: FC<{
  label: string;
  value: RealmType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (realmType: RealmType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();
  
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as RealmType)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('All')}</em>
        </MenuItem>
      )}
      {REALM_TYPES.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectRealmType;

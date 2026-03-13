import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { LIST_TYPES, ListType } from '../../api/spell-list.dto';

const SelectListType: FC<{
  label: string;
  value: ListType | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (listType: ListType) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as ListType)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('None')}</em>
        </MenuItem>
      )}
      {LIST_TYPES.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectListType;

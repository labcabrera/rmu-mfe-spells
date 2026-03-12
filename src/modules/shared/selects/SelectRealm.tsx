import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { Realm } from '../../api/realm.dto';

const SelectRealm: FC<{
  value: string;
  onChange: (value: string) => void;
  realms: Realm[];
  allowEmpty?: boolean;
}> = ({ value, onChange, realms, allowEmpty = false }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  if (!realms) return <p>Loading...</p>;

  return (
    <TextField
      select
      label={t('realm')}
      value={value === undefined || value === null || realms.length === 0 ? '' : value}
      fullWidth
      onChange={handleChange}
    >
      {allowEmpty && (
        <MenuItem value="">
          <em>{t('all')}</em>
        </MenuItem>
      )}
      {realms.map((option, index) => (
        <MenuItem key={index} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectRealm;

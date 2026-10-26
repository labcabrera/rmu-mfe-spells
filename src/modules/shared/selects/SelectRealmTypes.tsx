import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';
import { REALM_TYPES, RealmType } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Realms of a spell list (spec 028): one, or two for the base lists of a hybrid profession. */
const SelectRealmTypes: FC<{
  label: string;
  value: RealmType[];
  max?: number;
  onChange: (value: RealmType[]) => void;
}> = ({ label, value, max = 2, onChange }) => {
  const { t } = useTranslation();

  return (
    <Autocomplete
      multiple
      options={REALM_TYPES}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => t(option)}
      getOptionDisabled={(option) => value.length >= max && !value.includes(option)}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} error={value.length === 0} helperText={t('spell-list-realms-help')} />
      )}
    />
  );
};

export default SelectRealmTypes;

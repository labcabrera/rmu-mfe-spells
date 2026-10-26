/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Autocomplete, TextField } from '@mui/material';
import { fetchSpellTargetTypes, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Multi-select of the kinds of target of a spell area, from GET /v1/target-types. */
const SelectSpellTargetType: FC<{
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}> = ({ label, value, onChange }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [targetTypes, setTargetTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchSpellTargetTypes(auth)
      .then(setTargetTypes)
      .catch((err: Error) => notify.error(err));
  }, []);

  return (
    <Autocomplete
      multiple
      options={targetTypes}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => t(`spell-target-type-${option}`, { defaultValue: option })}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default SelectSpellTargetType;

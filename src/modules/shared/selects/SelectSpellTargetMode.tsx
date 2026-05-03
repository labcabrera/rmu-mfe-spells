import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { SpellTargetMode } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SelectSpellTargetMode: FC<{
  label: string;
  value: SpellTargetMode | null;
  name: string;
  required?: boolean;
  allowAll?: boolean;
  onChange: (spellType: SpellTargetMode) => void;
}> = ({ label, value, name, required = true, allowAll = false, onChange }) => {
  const { t } = useTranslation();
  const values: SpellTargetMode[] = ['target', 'area'];

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(event) => onChange(event.target.value as SpellTargetMode)}
      error={required && !value}
    >
      {allowAll && (
        <MenuItem>
          <em>{t('None')}</em>
        </MenuItem>
      )}
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSpellTargetMode;

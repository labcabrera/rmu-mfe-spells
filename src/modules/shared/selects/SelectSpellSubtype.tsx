import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, TextField } from '@mui/material';
import { SPELL_SUBTYPES, SpellSubtype } from '@labcabrera-rmu/rmu-react-shared-lib';

const SelectSpellSubtype: FC<{
  label?: string;
  value: SpellSubtype | null;
  name: string;
  onChange: (value: SpellSubtype | null) => void;
}> = ({ label, value, name, onChange }) => {
  const { t } = useTranslation();

  return (
    <TextField
      select
      label={label}
      name={name}
      value={value === undefined || value === null ? '' : value}
      fullWidth
      onChange={(e) => onChange((e.target.value as SpellSubtype) || null)}
    >
      <MenuItem value="">
        <em>{t('none')}</em>
      </MenuItem>
      {SPELL_SUBTYPES.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {t(`spell-subtype-${opt}`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSpellSubtype;

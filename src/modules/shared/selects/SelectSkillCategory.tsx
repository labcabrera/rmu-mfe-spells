import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';

const SelectSkillCategory: FC<{
  categories: SkillCategory[];
  value: string;
  label: string;
  required?: boolean;
  allowEmpty?: boolean;
  onChange: (event: ChangeEvent<{ value: string }>) => void;
}> = ({ categories, label, value, required = false, allowEmpty = false, onChange }) => {
  if (!categories) return <p>Loading...</p>;

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null || categories.length === 0 ? '' : value}
      fullWidth
      onChange={onChange}
      error={required && !value}
    >
      {allowEmpty && (
        <MenuItem value="">
          <em>{t('all')}</em>
        </MenuItem>
      )}
      {categories.map((option, index) => (
        <MenuItem key={index} value={option.id}>
          {t(option.id)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectSkillCategory;

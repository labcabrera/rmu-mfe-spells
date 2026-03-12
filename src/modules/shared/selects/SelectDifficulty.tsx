import React, { ChangeEvent, FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';
import { MANEUVER_DIFFICULTIES, ManeuverDifficulty } from '../../api/maneuver.dto';

const SelectDifficulty: FC<{
  value: string;
  label: string;
  onChange: (difficulty: ManeuverDifficulty) => void;
}> = ({ value, label, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const selectedDifficulty = MANEUVER_DIFFICULTIES.find((option) => option.id === selectedValue);
    onChange(selectedDifficulty!);
  };

  return (
    <TextField
      select
      label={label}
      value={value === undefined || value === null ? '' : value}
      onChange={handleChange}
      fullWidth
    >
      {MANEUVER_DIFFICULTIES.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {`${t(`difficulty-${option.id}`)} (${option.modifier})`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectDifficulty;

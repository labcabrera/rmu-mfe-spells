import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateSpellDto, SpellRange, SpellRangeType, UpdateSpellDto } from '../../api/spell.dto';
import { NumericInput } from '../../shared/inputs/NumericInput';
import SelectSpellRangeType from '../../shared/selects/SelectSpellRangeType';

const SpellFormRange: FC<{
  formData: CreateSpellDto | UpdateSpellDto;
  setFormData: Dispatch<SetStateAction<CreateSpellDto | UpdateSpellDto>>;
}> = ({ formData, setFormData }) => {
  const displayRangeValue = () => {
    const type = formData.modifiers?.range?.type;
    return type! && (type === 'distance' || type === 'distance-level');
  };

  const onSpellRangeTypeChange = (value: SpellRangeType | null) => {
    let range: SpellRange | null = value ? formData.modifiers!.range : null;
    if (value && range) {
      range.type = value;
    } else if (value) {
      range = { type: value, value: null };
    }
    setFormData({ ...formData, modifiers: { ...formData.modifiers, range: range } });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <SelectSpellRangeType
          label={t('Range type')}
          name="spellRangeType"
          value={formData.modifiers?.range?.type || null}
          required={false}
          allowAll={true}
          onChange={(value) => onSpellRangeTypeChange(value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        {displayRangeValue() && (
          <NumericInput
            label={t('Range')}
            name="spellRange"
            value={formData.modifiers?.range?.value || null}
            onChange={(value) =>
              setFormData({
                ...formData,
                modifiers: {
                  ...formData.modifiers,
                  range: { ...formData.modifiers?.range, value: value },
                },
              })
            }
          />
        )}
      </Grid>
    </>
  );
};

export default SpellFormRange;

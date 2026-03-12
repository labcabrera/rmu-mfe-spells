import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, TextField, Button, ButtonGroup } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { STATISTICS } from '../../api/common.dto';
import { CreateSpellListDto } from '../../api/spell-list.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';
import SelectSkillSpecialization from '../../shared/selects/SelectSkillSpecialization';

const SpellListCreationAttributes: FC<{
  formData: CreateSpellListDto;
  setFormData: Dispatch<SetStateAction<CreateSpellListDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();


  useEffect(() => {
    // fetchSkillCategories()
    //   .then((data) => setCategories(data))
    //   .catch((err: Error) => showError(err.message));
  }, []);

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <CategorySeparator text={t('skill-information')} />
      <Grid container spacing={1}>
        <Grid size={12}>
          <TextField
            label={t('skill-id')}
            name="skill-id"
            value={formData.id || ''}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            error={!formData.id}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <SelectSkillCategory
            label={t('skill-category')}
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            categories={categories}
            required
          />
        </Grid>
        <Grid size={12}>
          <StatsSelection stats={STATISTICS} formData={formData} setFormData={setFormData} />
        </Grid>
        <Grid size={12}>
          <SelectSkillSpecialization
            value={formData.specialization}
            label={t('specialization')}
            onSpecializationChange={(e) => onSpecializationChange(e)}
          />
        </Grid>
      </Grid>
    </>
  );
};

const StatsSelection: FC<{ stats: string[]; formData: any; setFormData: Dispatch<SetStateAction<any>> }> = ({
  stats,
  formData,
  setFormData,
}) => {
  const selected: string[] = Array.isArray(formData?.bonus) ? formData.bonus : [];

  const toggle = (stat: string) => {
    const has = selected.includes(stat);
    const next = has ? selected.filter((s) => s !== stat) : [...selected, stat];
    setFormData({ ...formData, bonus: next });
  };

  return (
    <ButtonGroup orientation="vertical" fullWidth aria-label="stats-button-group" sx={{ width: '100%' }}>
      {stats.map((stat) => (
        <Button
          key={stat}
          variant={selected.includes(stat) ? 'contained' : 'outlined'}
          onClick={() => toggle(stat)}
          sx={{ justifyContent: 'flex-start' }}
        >
          {stat}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SpellListCreationAttributes;

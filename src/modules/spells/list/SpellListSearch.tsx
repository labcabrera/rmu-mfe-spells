import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useTranslation } from 'react-i18next';

const SpellListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState<string | null>(null);

  const buildQueryString = () => {
    let query = '';
    if (searchName) query += `name=re=${searchName}`;
    return query;
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchName]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('Name')}
          value={searchName || ''}
          onChange={(e) => setSearchName(e || "")}
        />
      </Grid>      
    </Grid>
  );
};

export default SpellListSearch;

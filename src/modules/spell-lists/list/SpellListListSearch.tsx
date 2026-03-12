import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import ClearableTextField from '../../shared/inputs/ClearableTextField';

const SpellListListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const [searchId, setSearchId] = useState('');

  const buildQueryString = () => {
    let query = '';
    if (searchId) query += `name=re=${searchId}`;
    return query;
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchId]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('name')}
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default SpellListListSearch;

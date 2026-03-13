import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import ClearableTextField from '../../shared/inputs/ClearableTextField';
import SelectListType from '../../shared/selects/SelectListType';
import SelectRealmType from '../../shared/selects/SelectRealmType';
import { ListType, RealmType } from '../../api/spell-list.dto';

const SpellListListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [realmType, setRealmType] = useState<RealmType | null>(null);
  const [listType, setListType] = useState<ListType | null>(null);

  const buildQueryString = () => {
    let query = '';
    if (searchId) query += `name=re=${searchId}`;
    if(listType) {
      if(query) query += ';';
      query += `type==${listType}`;
    }
    if(realmType) {
      if(query) query += ';';
      query += `realm==${realmType}`;
    }
    return query;
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchId, realmType, listType]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('Name')}
          value={searchId || ''}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectRealmType
          name={'realm'}
          label={t('Realm')}
          value={realmType}
          onChange={(value) => setRealmType(value)}
          required={false}
          allowAll={true}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectListType
          name={'type'}
          label={t('Type')}
          value={listType}
          onChange={(value) => setListType(value)}
          required={false}
          allowAll={true}
        />
      </Grid>
    </Grid>
  );
};

export default SpellListListSearch;

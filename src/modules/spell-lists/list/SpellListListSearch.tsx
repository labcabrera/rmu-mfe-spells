/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import SelectListType from '../../shared/selects/SelectListType';
import SelectRealmType from '../../shared/selects/SelectRealmType';
import SelectProfession from '../../shared/selects/SelectProfession';
import { useTranslation } from 'react-i18next';
import { ClearableTextField, ListType, RealmType } from '@labcabrera-rmu/rmu-react-shared-lib';

const SpellListListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
  professionIds: string[] | undefined;
}> = ({ setQueryString, professionIds }) => {
  const { t } = useTranslation();
  const [searchId, setSearchId] = useState<string | null>(null);
  const [realmType, setRealmType] = useState<RealmType | null>(null);
  const [listType, setListType] = useState<ListType | null>(null);
  const [professionId, setProfessionId] = useState<string | null>(null);

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
    if(professionId) {
      if(query) query += ';';
      query += `professionId==${professionId}`;
    }
    return query;
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchId, realmType, listType, professionId]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('name')}
          value={searchId || ''}
          onChange={(e) => setSearchId(e || "")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectRealmType
          name={'realm'}
          label={t('realm')}
          value={realmType}
          onChange={(value) => setRealmType(value)}
          required={false}
          allowAll={true}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectListType
          name={'type'}
          label={t('type')}
          value={listType}
          onChange={(value) => setListType(value)}
          required={false}
          allowAll={true}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        {professionIds && (
        <SelectProfession
          name='professionId'
          label={t('profession')}
          value={professionId}
          professionIds={professionIds}
          onChange={(value) => setProfessionId(value)}
          required={false}
          allowAll={true}
        />
        )}
      </Grid>
    </Grid>
  );
};

export default SpellListListSearch;

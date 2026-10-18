/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  deleteSpellList,
  DetailPage,
  EditableAvatar,
  fetchSpellList,
  fetchSpells,
  Section,
  Spell,
  SpellList,
  updateSpellList,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellListViewInfo from './SpellListViewInfo';
import SpellTable from './SpellTable';

export default function SpellListViewPage() {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const state = useEntity<SpellList>(spellListId, (id) => fetchSpellList(id, auth), {
    initial: location.state?.spellList,
    onError: notify.error,
  });
  const spellList = state.entity;
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    if (!spellList) return;
    fetchSpells(`spellListId==${spellList.id}`, 0, 100, auth)
      .then((response) => setSpells(response.content))
      .catch(notify.error);
  }, [spellList]);

  const onAddSpell = (spellList: SpellList) =>
    navigate(`/spells/spells/create?spellListId=${spellList.id}`, { state: { spellList } });

  const onDelete = (spellList: SpellList) =>
    deleteSpellList(spellList.id, auth)
      .then(() => navigate('/spells/spell-lists', { replace: true }))
      .catch(notify.error);

  const onImageUpdate = (spellList: SpellList, imageUrl: string) =>
    updateSpellList(spellList.id, { imageUrl }, auth).then(state.setEntity).catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spell-lists'), link: '/spells/spell-lists' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={(spellList) => navigate(`/spells/spell-lists/edit/${spellList.id}`, { state: { spellList } })}
      onDelete={onDelete}
      leftPanel={(spellList) => (
        <>
          <EditableAvatar
            imageUrl={spellList.imageUrl || ''}
            onImageChange={(imageUrl) => onImageUpdate(spellList, imageUrl)}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {spellList.description}
          </Typography>
        </>
      )}
    >
      {(spellList) => (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Section>
              <SpellListViewInfo spellList={spellList} />
            </Section>
          </Grid>
          <Grid size={12}>
            <Section>
              <CategorySeparator text={t('spells')}>
                <AddButton onClick={() => onAddSpell(spellList)} />
              </CategorySeparator>
              <SpellTable spells={spells} />
            </Section>
          </Grid>
        </Grid>
      )}
    </DetailPage>
  );
}

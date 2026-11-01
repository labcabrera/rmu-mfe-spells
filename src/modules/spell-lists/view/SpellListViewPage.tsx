/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  AddButton,
  deleteSpellList,
  DetailPage,
  EmptyState,
  fetchSpellList,
  fetchSpells,
  ImageSelectorDialog,
  Section,
  Spell,
  SpellList,
  updateSpellList,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { canChangeSpellList } from '../../shared/permissions';
import { spellListChips } from './SpellListViewInfo';
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
  const editable = canChangeSpellList(auth, spellList);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

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
      onEdit={
        editable
          ? (spellList) => navigate(`/spells/spell-lists/edit/${spellList.id}`, { state: { spellList } })
          : undefined
      }
      onDelete={editable ? onDelete : undefined}
      hero={(spellList) => ({
        title: t(spellList.name),
        overline: t('spell-list'),
        image: spellList.imageUrl,
        ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
        chips: spellListChips(spellList, t),
      })}
    >
      {(spellList) => (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Section title={t('description')}>
              {spellList.description ? (
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {spellList.description}
                </Typography>
              ) : (
                <EmptyState dense title={t('no-description')} />
              )}
            </Section>
          </Grid>
          <Grid size={12}>
            <Section title={t('spells')} actions={editable && <AddButton onClick={() => onAddSpell(spellList)} />}>
              <SpellTable spells={spells} />
            </Section>
          </Grid>
          <ImageSelectorDialog
            value={spellList.imageUrl || undefined}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(imageUrl) => onImageUpdate(spellList, imageUrl)}
          />
        </Grid>
      )}
    </DetailPage>
  );
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  DeleteDialog,
  deleteSpellList,
  EditableAvatar,
  EditButton,
  fetchSpellList,
  fetchSpells,
  LayoutBase,
  RefreshButton,
  Section,
  Spell,
  SpellList,
  TechnicalInfo,
  updateSpellList,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SpellTable from '../../spells/form/SpellTable';
import SpellListViewInfo from './SpellListViewInfo';

export default function SpellListView() {
  const auth = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const { showError } = useError();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [spells, setSpells] = useState<Spell[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId, auth)
      .then((response) => setSpellList(response))
      .catch((err: Error) => showError(err.message));
  };

  const bindSpells = (spellListId: string) => {
    fetchSpells(`spellListId==${spellListId}`, 0, 100, auth)
      .then((response) => setSpells(response.content))
      .catch((err: Error) => showError(err.message));
  };

  const onAddSpell = () => {
    navigate(`/spells/spells/create?spellListId=${spellList?.id}`, { state: { spellList } });
  };

  const onDelete = () => {
    deleteSpellList(spellList!.id, auth).then(() => navigate('/spells/spell-lists'));
  };

  const onImageUpdate = (imageUrl: string) => {
    updateSpellList(spellList!.id, { imageUrl }, auth)
      .then((response) => setSpellList(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (spellList) {
      bindSpells(spellList.id);
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      bindSpellList(spellListId);
    }
  }, [location.state, spellListId, showError]);

  if (!spellList) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spell-lists'), link: '/spells/spell-lists' },
        { name: t('view') },
      ]}
      actions={[
        <RefreshButton
          onClick={() => {
            bindSpellList(spellList.id);
          }}
        />,
        <EditButton onClick={() => navigate(`/spells/spell-lists/edit/${spellList.id}`, { state: spellList })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
      leftPanel={
        <>
          <EditableAvatar imageUrl={spellList.imageUrl || ''} onImageChange={onImageUpdate} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {spellList.description}
          </Typography>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Section>
            <SpellListViewInfo spellList={spellList} />
          </Section>
        </Grid>
        <Grid size={12}>
          <Section>
            <CategorySeparator text={t('spells')}>
              <AddButton onClick={onAddSpell} />
            </CategorySeparator>
            <SpellTable spells={spells} />
          </Section>
        </Grid>
      </Grid>
      <TechnicalInfo>
        <pre>{JSON.stringify(spellList, null, 2)}</pre>
      </TechnicalInfo>
      <DeleteDialog
        message={'Delete confirmation'}
        open={deleteDialogOpen}
        onDelete={onDelete}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </LayoutBase>
  );
}

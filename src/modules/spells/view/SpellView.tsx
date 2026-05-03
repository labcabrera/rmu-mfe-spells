import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {
  DeleteButton,
  DeleteDialog,
  deleteSpell,
  EditableAvatar,
  EditButton,
  fetchSpell,
  fetchSpellList,
  LayoutBase,
  RefreshButton,
  Spell,
  SpellList,
  TechnicalInfo,
  updateSpellList,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getAvatarImages } from '../../services/image-service';
import SpellViewInfo from './SpellViewInfo';

export default function SpellView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { spellId } = useParams<{ spellId?: string }>();
  const { showError } = useError();
  const [spell, setSpell] = useState<Spell>();
  const [spellList, setSpellList] = useState<SpellList>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const bindSpell = (spellId: string) => {
    fetchSpell(spellId, auth)
      .then((response) => setSpell(response))
      .catch((err) => showError(err.message));
  };

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId, auth)
      .then((response) => setSpellList(response))
      .catch((err) => showError(err.message));
  };

  const updateImage = (imageUrl: string) => {
    const dto = { imageUrl };
    updateSpellList(spellList!.id, dto, auth)
      .then((response) => setSpellList(response))
      .catch((err) => showError(err.message));
  };

  const onDelete = () => {
    deleteSpell(spell!.id, auth)
      .then(() => navigate(`/spells/spell-lists/view/${spellList!.id}`, { state: spellList }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (spell) {
      bindSpellList(spell.spellListId);
    }
  }, [spell]);

  useEffect(() => {
    if (location.state && location.state.spell) {
      setSpell(location.state.spell);
    } else if (spellId) {
      bindSpell(spellId);
    }
  }, [location.state, spellId]);

  if (!spell || !spellList) return <CircularProgress />;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('spells'), link: '/spells/spells' }, { name: t('view') }]}
      actions={[
        <RefreshButton onClick={() => bindSpell(spell.id)} />,
        <EditButton onClick={() => navigate(`/spells/spells/edit/${spell!.id}`, { state: spell! })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
      leftPanel={
        <EditableAvatar
          imageUrl={spell.imageUrl || ''}
          images={getAvatarImages()}
          onImageChange={(e) => updateImage(e)}
        />
      }
    >
      <SpellViewInfo spell={spell} spellList={spellList} />
      <DeleteDialog
        message={t('confirmation-delete-message')}
        open={deleteDialogOpen}
        onDelete={() => onDelete()}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <TechnicalInfo>
        <pre>{JSON.stringify(spell, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}

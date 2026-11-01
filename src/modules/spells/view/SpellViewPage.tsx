/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  deleteSpell,
  DetailPage,
  EntityImage,
  EntitySourceChip,
  fetchSpell,
  fetchSpellList,
  Spell,
  SpellList,
  updateSpell,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { canChangeSpell } from '../../shared/permissions';
import SpellViewInfo from './SpellViewInfo';

export default function SpellViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { spellId } = useParams<{ spellId?: string }>();
  const state = useEntity<Spell>(spellId, (id) => fetchSpell(id, auth), {
    initial: location.state?.spell,
    onError: notify.error,
  });
  const spell = state.entity;
  // The spell list is optional: the page still renders when it is missing (null).
  const [spellList, setSpellList] = useState<SpellList | null>();
  // Spec 063: a spell of a list follows the list's permission; a standalone spell, its own.
  const editable = canChangeSpell(auth, spell, spell?.spellListId ? spellList : null);

  useEffect(() => {
    if (!spell) return;
    fetchSpellList(spell.spellListId, auth)
      .then(setSpellList)
      .catch((err) => {
        setSpellList(null);
        notify.error(err);
      });
  }, [spell]);

  const updateImage = (spell: Spell, imageUrl: string) =>
    updateSpell(spell.id, { imageUrl }, auth).then(state.setEntity).catch(notify.error);

  const onDelete = (spell: Spell) =>
    deleteSpell(spell.id, auth)
      .then(() =>
        spellList
          ? navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList }, replace: true })
          : navigate('/spells/spells', { replace: true })
      )
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spells'), link: '/spells/spells' },
        { name: t('view') },
      ]}
      // Wait for the spell list (or its failure) before rendering, as the page did before.
      entity={{ ...state, entity: spellList === undefined ? undefined : spell }}
      summaryTitle={(entity) => t(entity.name)}
      onEdit={editable ? (spell) => navigate(`/spells/spells/edit/${spell.id}`, { state: { spell } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      leftPanel={(spell) => (
        <>
          <EntityImage
            image={spell.imageUrl || ''}
            onImageChange={editable ? (imageUrl) => updateImage(spell, imageUrl) : undefined}
          />
          <Box sx={{ mt: 2 }}>
            <EntitySourceChip entity={spell} />
          </Box>
        </>
      )}
    >
      {(spell) => <SpellViewInfo spell={spell} spellList={spellList ?? null} />}
    </DetailPage>
  );
}

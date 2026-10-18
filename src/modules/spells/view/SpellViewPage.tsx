/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  deleteSpell,
  DetailPage,
  EditableAvatar,
  fetchSpell,
  fetchSpellList,
  Spell,
  SpellList,
  updateSpell,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
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
      onEdit={(spell) => navigate(`/spells/spells/edit/${spell.id}`, { state: { spell } })}
      onDelete={onDelete}
      leftPanel={(spell) => (
        <EditableAvatar imageUrl={spell.imageUrl || ''} onImageChange={(imageUrl) => updateImage(spell, imageUrl)} />
      )}
    >
      {(spell) => <SpellViewInfo spell={spell} spellList={spellList ?? null} />}
    </DetailPage>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip } from '@mui/material';
import {
  deleteSpell,
  DetailPage,
  EntitySourceChip,
  fetchSpell,
  fetchSpellList,
  ImageSelectorDialog,
  Spell,
  SpellList,
  StatPill,
  updateSpell,
  useEntity,
  useNotify,
  useSpellName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { canChangeSpell } from '../../shared/permissions';
import { getSpellPowerPoints, spellImage } from '../spell-format';
import SpellViewInfo, { spellTypeText } from './SpellViewInfo';

export default function SpellViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const spellName = useSpellName();
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
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
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
      onEdit={editable ? (spell) => navigate(`/spells/spells/edit/${spell.id}`, { state: { spell } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      hero={(spell) => {
        const type = spellTypeText(spell, t);
        return {
          title: spellName(spell.name),
          overline: [t('spell'), spellList ? spellName(spellList.name) : undefined].filter(Boolean).join(' · '),
          image: spellImage(spell, spellList),
          ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
          chips: [
            ...(type ? [<Chip key="type" size="small" label={type} />] : []),
            <EntitySourceChip key="source" entity={spell} />,
          ],
          pills: [
            <StatPill key="level" label={t('level')} value={spell.level} />,
            <StatPill key="pp" label={t('power-points')} value={getSpellPowerPoints(spell)} />,
          ],
        };
      }}
    >
      {(spell) => (
        <>
          <SpellViewInfo spell={spell} spellList={spellList ?? null} />
          <ImageSelectorDialog
            value={spell.imageUrl || undefined}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(imageUrl) => updateImage(spell, imageUrl)}
          />
        </>
      )}
    </DetailPage>
  );
}

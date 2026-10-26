/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  createSpell,
  EditableAvatar,
  fetchSpell,
  FormPage,
  LoadingState,
  Spell,
  TechnicalInfo,
  updateSpell,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellForm from './SpellForm';
import { formatSpellEffects, parseSpellEffects } from './SpellFormEffects';

/** Create and edit page of a spell. Creation takes the spell list from `?spellListId=` or the navigation state. */
export default function SpellFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { spellId } = useParams<{ spellId?: string }>();
  const [searchParams] = useSearchParams();
  const existing = useEntity<Spell>(mode === 'edit' ? spellId : undefined, (id) => fetchSpell(id, auth), {
    initial: location.state?.spell,
    onError: notify.error,
  });
  const [formData, setFormData] = useState<Spell>();
  const [initialData, setInitialData] = useState<string>();
  // The effects are edited as JSON text: the form data takes them each time the text is a valid array.
  const [effectsText, setEffectsText] = useState('[]');
  const [effectsError, setEffectsError] = useState(false);

  useEffect(() => {
    if (formData) return;
    let data: Spell | undefined;
    if (mode === 'create') {
      const spellListId = location.state?.spellList?.id || searchParams.get('spellListId');
      data = { modifiers: {}, effects: [], ...(spellListId ? { spellListId } : {}) } as unknown as Spell;
    } else if (existing.entity) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = existing.entity;
      data = rest as Spell;
    }
    if (data) {
      setFormData(data);
      setEffectsText(formatSpellEffects(data.effects));
      setInitialData(JSON.stringify(data));
    }
  }, [existing.entity]);

  const onEffectsTextChange = (text: string) => {
    setEffectsText(text);
    const effects = parseSpellEffects(text);
    setEffectsError(effects === null);
    if (effects && formData) setFormData({ ...formData, effects });
  };

  const onSave = () => {
    if (!formData) return;
    const effects = parseSpellEffects(effectsText);
    if (effects === null) {
      setEffectsError(true);
      notify.error(t('spell-effects-invalid-json'));
      return;
    }
    const dto = { ...formData, effects };
    // The API errors (invalid-effect, unknown-effect-status…) carry their message, shown by notify.error.
    const request = mode === 'create' ? createSpell(dto, auth) : updateSpell(spellId!, dto, auth);
    request.then((spell) => navigate(`/spells/spells/view/${spell.id}`, { state: { spell } })).catch(notify.error);
  };

  const onCancel = () => navigate(mode === 'create' ? '/spells/spells' : `/spells/spells/view/${spellId}`);

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spells'), link: '/spells/spells' },
        { name: t(mode === 'create' ? 'create' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      // The type is required (F-spells-29): tactical reads it to resolve the spell.
      saveDisabled={!formData?.name || !formData.modifiers?.type || effectsError}
      dirty={!!formData && JSON.stringify(formData) !== initialData}
      leftPanel={
        formData && (
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData ? (
        <>
          <SpellForm
            formData={formData}
            setFormData={setFormData as Dispatch<SetStateAction<Spell>>}
            effectsText={effectsText}
            effectsError={effectsError}
            onEffectsTextChange={onEffectsTextChange}
          />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </>
      ) : (
        <LoadingState variant="detail" />
      )}
    </FormPage>
  );
}

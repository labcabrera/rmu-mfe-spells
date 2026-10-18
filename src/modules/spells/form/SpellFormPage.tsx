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

  useEffect(() => {
    if (formData) return;
    let data: Spell | undefined;
    if (mode === 'create') {
      const spellListId = location.state?.spellList?.id || searchParams.get('spellListId');
      data = { modifiers: {}, ...(spellListId ? { spellListId } : {}) } as Spell;
    } else if (existing.entity) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = existing.entity;
      data = rest as Spell;
    }
    if (data) {
      setFormData(data);
      setInitialData(JSON.stringify(data));
    }
  }, [existing.entity]);

  const onSave = () => {
    if (!formData) return;
    const request = mode === 'create' ? createSpell(formData, auth) : updateSpell(spellId!, formData, auth);
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
      saveDisabled={!formData?.name}
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
          <SpellForm formData={formData} setFormData={setFormData as Dispatch<SetStateAction<Spell>>} />
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

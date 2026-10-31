/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createSpellList,
  EntityImage,
  fetchSpellList,
  FormPage,
  LoadingState,
  SpellList,
  TechnicalInfo,
  updateSpellList,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SpellListForm from './SpellListForm';

/** Create and edit page of a spell list. */
export default function SpellListFormPage({ mode }: { mode: 'create' | 'edit' }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const existing = useEntity<SpellList>(mode === 'edit' ? spellListId : undefined, (id) => fetchSpellList(id, auth), {
    initial: location.state?.spellList,
    onError: notify.error,
  });
  const [formData, setFormData] = useState<SpellList>();
  const [initialData, setInitialData] = useState<string>();

  useEffect(() => {
    if (formData) return;
    let data: SpellList | undefined;
    if (mode === 'create') data = { realms: [] } as unknown as SpellList;
    else if (existing.entity) {
      // `realm` is deprecated (spec 028): the form edits `realms`.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, realm, ...rest } = existing.entity;
      data = rest as SpellList;
    }
    if (data) {
      setFormData(data);
      setInitialData(JSON.stringify(data));
    }
  }, [existing.entity]);

  const realmCount = formData?.realms?.length ?? 0;
  const isValid =
    !!formData?.name &&
    realmCount >= 1 &&
    realmCount <= 2 &&
    !!formData.type &&
    (formData.type !== 'base' || !!formData.professionId);

  const onSave = () => {
    if (!formData) return;
    const request = mode === 'create' ? createSpellList(formData, auth) : updateSpellList(spellListId!, formData, auth);
    request
      .then((spellList) => navigate(`/spells/spell-lists/view/${spellList.id}`, { state: { spellList } }))
      .catch(notify.error);
  };

  const onCancel = () =>
    navigate(mode === 'create' ? '/spells/spell-lists' : `/spells/spell-lists/view/${spellListId}`);

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('spell-module'), link: '/spells' },
        { name: t('spell-lists'), link: '/spells/spell-lists' },
        { name: t(mode === 'create' ? 'create' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!isValid}
      dirty={!!formData && JSON.stringify(formData) !== initialData}
      leftPanel={
        formData && (
          <EntityImage
            image={formData.imageUrl || ''}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData ? (
        <>
          <SpellListForm formData={formData} setFormData={setFormData as Dispatch<SetStateAction<SpellList>>} />
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

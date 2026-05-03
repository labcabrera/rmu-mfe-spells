import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  EditableAvatar,
  fetchSpell,
  LayoutBase,
  SaveButton,
  Spell,
  TechnicalInfo,
  updateSpell,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SpellForm from '../shared/SpellForm';

export default function SpellEdit(){
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [spell, setSpell] = useState<Spell>();
  const { spellId } = useParams<{ spellId: string }>();
  const [formData, setFormData] = useState<Spell>({} as Spell);
  const [isValid, setIsValid] = useState(false);

  const bindSpell = (spellId: string) => {
    fetchSpell(spellId, auth)
      .then((response) => setSpell(response))
      .catch((err) => showError(err.message));
  };

  const onSave = () => {
    updateSpell(spell!.id, formData, auth)
      .then((response) => navigate(`/spells/spells/view/${response.id}`, { state: { spell: response } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(!!formData?.name);
  }, [formData]);

  useEffect(() => {
    if (spell) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = spell;
      setFormData(rest as Spell);
    }
  }, [spell]);

  useEffect(() => {
    if (location.state && location.state.spell) {
      setSpell(location.state.spell);
    } else if (spellId) {
      bindSpell(spellId);
    }
  }, [location.state, spellId, showError]);

  if (!spell || !formData || !setFormData) return <p>Loading...</p>;

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('spells'), link: '/spells/spells' }, { name: t('edit') }]}
      actions={[
        <CancelButton onClick={() => navigate(`/spells/spell-lists`)} />,
        <SaveButton onClick={onSave} disabled={!isValid} />,
      ]}
      leftPanel={
        <EditableAvatar
          imageUrl={formData.imageUrl || ''}
          onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          images={[]}
        />
      }
    >
      <SpellForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
};

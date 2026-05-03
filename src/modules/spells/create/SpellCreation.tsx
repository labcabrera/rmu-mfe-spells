import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  EditableAvatar,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchSpellList } from '../../api/spell-list.api';
import { SpellList } from '../../api/spell-list.dto';
import { createSpell } from '../../api/spell.api';
import { CreateSpellDto } from '../../api/spell.dto';
import SpellForm from '../shared/SpellForm';

const SpellCreation: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();

  const [formData, setFormData] = useState<CreateSpellDto>({
    spellListId: null,
    name: null,
    level: null,
    modifiers: { type: null, subtype: null },
    description: null,
    imageUrl: null,
  });
  const { spellListId } = useParams<{ spellListId?: string }>();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId, auth)
      .then((response) => setSpellList(response))
      .catch((err) => console.error(err.message));
  };

  const onSave = async () => {
    createSpell(formData, auth)
      .then((response) => navigate(`/spells/spells/view/${response.id}`, { state: { spell: response } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  useEffect(() => {
    if (spellList) {
      setFormData((prev) => ({ ...prev, spellListId: spellList.id }));
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      bindSpellList(spellListId);
    }
  }, [location.state, spellListId]);

  return (
    <LayoutBase
      breadcrumbs={[{name:t('home'), link: "/"},{name:t('spells'), link: "/spells"},{name:t('create')}]}
      actions={[
        <CancelButton onClick={() => navigate('/spells/spells')} />,
        <SaveButton onClick={() => onSave()} disabled={!isValid} />,
      ]}
      leftPanel={
        <EditableAvatar imageUrl={''} images={[]} onImageChange={function (newImageUrl: string): void {
          throw new Error('Function not implemented.');
        } } />
      }
    >
      <SpellForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
};

export default SpellCreation;

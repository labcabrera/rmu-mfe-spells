import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  EditableAvatar,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { createSpellList } from '../../api/spell-list.api';
import { CreateSpellListDto } from '../../api/spell-list.dto';
import SpellListForm from '../shared/SpellListForm';
import { getAvatarImages } from '../../services/image-service';

const SpellListCreation: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();

  const [formData, setFormData] = useState<CreateSpellListDto>({
    name: null,
    realm: null,
    type: null,
    description: null,
    imageUrl: null,
  });
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    if (!formData.realm) return false;
    if (!formData.type) return false;
    return true;
  };

  const onSave = async () => {
    createSpellList(formData, auth)
      .then((spellList) => navigate(`/spells/spell-lists/view/${spellList.id}`))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('spell-lists'), link: '/spells/spell-lists' },
          { name: t('create') },
        ]}
        actions={[
          <CancelButton onClick={() => navigate('/spells/spell-lists')} />,
          <SaveButton onClick={() => onSave} disabled={!isValid} />,
        ]}
        leftPanel={
          <EditableAvatar
            imageUrl={formData.imageUrl || ""}
            images={getAvatarImages()}
            onImageChange={(e) => setFormData({...formData, imageUrl: e}) } />
        }
      >
        <SpellListForm formData={formData} setFormData={setFormData} />
        <TechnicalInfo>
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>
    </>
  );
};

export default SpellListCreation;

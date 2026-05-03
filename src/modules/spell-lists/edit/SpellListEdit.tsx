import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  CancelButton,
  EditableAvatar,
  fetchSpellList,
  LayoutBase,
  SaveButton,
  SpellList,
  TechnicalInfo,
  updateSpellList,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SpellListForm from '../form/SpellListForm';
import { getAvatarImages } from '../../services/image-service';

const SpellListEdit: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { spellListId } = useParams<{ spellListId: string }>();
  const [spellList, setSpellList] = useState<SpellList>();
  const [formData, setFormData] = useState<SpellList>({} as SpellList);
  const [isValid, setIsValid] = useState(false);

  const onSave = () => {
    updateSpellList(spellList!.id, formData!, auth)
      .then((spellList) => navigate(`/spells/spell-lists/view/${spellList.id}`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(!!formData?.name);
  }, [formData]);

  useEffect(() => {
    if (spellList) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = spellList;
      setFormData(rest as SpellList);
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      fetchSpellList(spellListId, auth)
        .then((data) => setSpellList(data))
        .catch((err) => showError(err.message));
    }
  }, [location.state, spellListId, showError]);

  if (!spellList || !formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/' },
          { name: t('spells'), link: '/spells' },
          { name: t('lists'), link: '/spells/spell-lists' },
          { name: t('edit') },
        ]}
        actions={[
          <CancelButton onClick={() => navigate('/spells/spell-lists')} />,
          <SaveButton onClick={() => onSave()} disabled={!isValid} />,
        ]}
        leftPanel={
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
            images={getAvatarImages()}
          />
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

export default SpellListEdit;

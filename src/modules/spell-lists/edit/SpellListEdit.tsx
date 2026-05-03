import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  CancelButton,
  EditableAvatar,
  LayoutBase,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchSpellList, updateSpellList } from '../../api/spell-list.api';
import { SpellList, UpdateSpellListDto } from '../../api/spell-list.dto';
import SpellListForm from '../shared/SpellListForm';
import SpellListEditActions from './SpellListEditActions';
import { getAvatarImages } from '../../services/image-service';

const SpellListEdit: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { spellListId } = useParams<{ spellListId: string }>();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [formData, setFormData] = useState<UpdateSpellListDto>();
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
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { id, ...rest } = spellList;
      setFormData(rest);
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
          { name: t('spells-lists'), link: '/spells/spell-lists' },
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

import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSpellList } from '../../api/spell-list';
import { SpellList, UpdateSpellListDto } from '../../api/spell-list.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import SpellListForm from '../shared/SpellListForm';
import SpellListEditActions from './SpellListEditActions';

const SpellListEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { spellListId } = useParams<{ spellListId: string }>();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [formData, setFormData] = useState<UpdateSpellListDto>();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!formData?.name);
  }, [formData]);

  useEffect(() => {
    if (spellList) {
      const { id, ...rest } = spellList;
      setFormData(rest);
    }
  }, [spellList]);

  useEffect(() => {
    if (location.state && location.state.spellList) {
      setSpellList(location.state.spellList);
    } else if (spellListId) {
      fetchSpellList(spellListId)
        .then((data) => setSpellList(data))
        .catch((err: Error) => showError(err.message));
    }
  }, [location.state, spellListId, showError]);

  if (!spellList || !formData || !setFormData) return <p>Loading...</p>;

  return (
    <>
      <SpellListEditActions spellList={spellList} formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SpellListForm formData={formData} setFormData={setFormData} />
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellListEdit;

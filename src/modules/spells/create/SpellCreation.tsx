import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchSpellList } from '../../api/spell-list';
import { SpellList } from '../../api/spell-list.dto';
import { CreateSpellDto } from '../../api/spell.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import SpellForm from '../shared/SpellForm';
import SpellCreationActions from './SpellCreationActions';

const SpellCreation: FC = () => {
  const [formData, setFormData] = useState<CreateSpellDto>({
    spellListId: null,
    name: null,
    level: null,
    modifiers: { type: null, subtype: null },
    description: null,
    imageUrl: null,
  });
  const location = useLocation();
  const { spellListId } = useParams<{ spellListId?: string }>();
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  const bindSpellList = (spellListId: string) => {
    fetchSpellList(spellListId)
      .then((response) => setSpellList(response))
      .catch((err: Error) => console.error(err.message));
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
    <>
      <SpellCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          />
        </Grid>
        <Grid size={8}>
          <SpellForm formData={formData} setFormData={setFormData} />
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellCreation;

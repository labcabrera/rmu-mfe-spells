import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CreateSpellListDto } from '../../api/spell-list.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import SpellListCreationActions from './SpellListCreationActions';
import SpellListCreationAttributes from './SpellListCreationAttributes';

const SpellListCreation: FC = () => {
  const [formData, setFormData] = useState<CreateSpellListDto>({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!formData.name) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <>
      <SpellListCreationActions formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          />
        </Grid>
        <Grid size={7}>
          <SpellListCreationAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default SpellListCreation;

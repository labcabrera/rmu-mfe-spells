import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSpell } from '../../api/spell';
import { Spell, UpdateSpellDto } from '../../api/spell.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import SpellEditActions from './SpellEditActions';
import SpellEditAttributes from './SpellEditAttributes';

const SpellEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const [spell, setSpell] = useState<Spell>();
  const { spellId } = useParams<{ spellId: string }>();
  const [formData, setFormData] = useState<UpdateSpellDto>();
  const [isValid, setIsValid] = useState(false);

  const bindSpell = (spellId: string) => {
    fetchSpell(spellId)
      .then((response) => setSpell(response))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(!!formData?.name);
  }, [formData]);

  useEffect(() => {
    if (spell) {
      const { id, ...rest } = spell;
      setFormData(rest);
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
    <>
      <SpellEditActions spell={spell} formData={formData} isValid={isValid} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
          />
        </Grid>
        <Grid size={7}>
          <SpellEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default SpellEdit;

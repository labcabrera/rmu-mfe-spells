import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import SpellForm from '../shared/SpellForm';
import { useTranslation } from 'react-i18next';
import { EditableAvatar, fetchSpell, LayoutBase, Spell, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useAuth } from 'react-oidc-context';

const SpellEdit: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
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

  useEffect(() => {
    setIsValid(!!formData?.name);
  }, [formData]);

  useEffect(() => {
    if (spell) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
      <LayoutBase breadcrumbs={[{ name: t('home'), link: '/' },{ name: t('spells'), link: '/spells/spells' }, { name: t('edit') }]}>
          <SpellForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>

      </LayoutBase>
      {/* <SpellEditActions spell={spell} formData={formData} isValid={isValid} /> */}
      <Grid container spacing={2}>
        <Grid size={2}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })} images={[]}          />
        </Grid>
        <Grid size={8}>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellEdit;

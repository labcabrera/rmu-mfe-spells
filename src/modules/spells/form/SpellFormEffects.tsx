import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@mui/material';
import { SpellEffect, SpellEffectList } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Reads the text of the effects editor: the list of effects, or null when it is not a JSON array of objects. */
export const parseSpellEffects = (text: string): SpellEffect[] | null => {
  if (!text.trim()) return [];
  try {
    const value: unknown = JSON.parse(text);
    if (!Array.isArray(value)) return null;
    if (!value.every((effect) => effect && typeof effect === 'object' && !Array.isArray(effect))) return null;
    return value as SpellEffect[];
  } catch {
    return null;
  }
};

/** Pretty-printed JSON of the effects, for the editor. */
export const formatSpellEffects = (effects: SpellEffect[] | null | undefined): string =>
  JSON.stringify(effects || [], null, 2);

/**
 * Editor of the spell effects (spec 028) as a JSON array, with a live preview of the last valid text. The API checks
 * each effect and answers `invalid-effect` or `unknown-effect-status` naming the wrong field.
 */
const SpellFormEffects: FC<{
  text: string;
  error: boolean;
  onChange: (text: string) => void;
}> = ({ text, error, onChange }) => {
  const { t } = useTranslation();
  const parsed = useMemo(() => parseSpellEffects(text), [text]);
  const invalid = error || parsed === null;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label={t('effects')}
          name="effects"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          error={invalid}
          helperText={invalid ? t('spell-effects-invalid-json') : t('spell-effects-json-help')}
          fullWidth
          multiline
          minRows={12}
          slotProps={{ htmlInput: { spellCheck: false, style: { fontFamily: 'monospace', fontSize: 13 } } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t('spell-effects-preview')}
        </Typography>
        {parsed ? <SpellEffectList effects={parsed} /> : null}
      </Grid>
    </Grid>
  );
};

export default SpellFormEffects;

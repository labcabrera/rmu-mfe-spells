import { Dispatch, SetStateAction } from 'react';
import { Spell, SpellModifiers } from '@labcabrera-rmu/rmu-react-shared-lib';

export type SpellFormProps = {
  formData: Spell;
  setFormData: Dispatch<SetStateAction<Spell>>;
};

export const gridSize = { xs: 12, md: 4 };

/** Sets some fields of the spell modifiers, keeping the rest. */
export const patchModifiers = (
  formData: Spell,
  setFormData: Dispatch<SetStateAction<Spell>>,
  patch: Partial<SpellModifiers>
) => setFormData({ ...formData, modifiers: { ...formData.modifiers, ...patch } });

/** An optional text: empty is null. */
export const textOrNull = (value: string): string | null => (value.trim() ? value : null);

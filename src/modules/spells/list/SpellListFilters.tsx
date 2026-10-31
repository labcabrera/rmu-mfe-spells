import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ClearableTextField,
  EntityPicker,
  EnumPicker,
  FilterSchema,
  FilterSection,
  ListFilters,
  Spell,
  SPELL_TYPES,
  SpellList,
  SpellListPicker,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

const CAST_TYPES = ['true', 'false'];

const castTypeLabel = (value: string, t: TFunction) => t(value === 'true' ? 'instant' : 'casted');

/** Filters of the spell list (spec 046): name, spell list, type and cast type, kept in the URL. */
export const spellFilters = (t: TFunction, spellLists: SpellList[]): FilterSchema<Spell> => ({
  q: { kind: 'text', label: t('name'), toRsql: (value) => `name=re=${value}` },
  list: {
    kind: 'single',
    label: t('spell-list'),
    format: (id) => {
      const list = spellLists.find((each) => each.id === id);
      return list ? t(list.name, { defaultValue: list.name }) : id;
    },
    toRsql: (value) => `spellListId==${value}`,
  },
  type: {
    kind: 'single',
    label: t('type'),
    options: SPELL_TYPES,
    format: (value) => t(value),
    toRsql: (value) => `modifiers.type==${value}`,
  },
  instant: {
    kind: 'single',
    label: t('cast-type'),
    options: CAST_TYPES,
    format: (value) => castTypeLabel(value, t),
    toRsql: (value) => `modifiers.instant==${value}`,
  },
});

/** Sections of the side panel of the spell list. */
export default function SpellListFilters({
  filters,
  spellLists,
}: {
  filters: ListFilters<Spell>;
  spellLists: SpellList[] | undefined;
}) {
  const { t } = useTranslation();
  const single = (key: string) => ({
    value: filters.get(key) || null,
    onChange: (id: string | null) => filters.set(key, id),
    allowAll: true,
  });
  // Built outside the JSX: the i18n lint reads string arguments there as visible text.
  const bind = { list: single('list'), type: single('type'), instant: single('instant') };

  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <ClearableTextField
          label={t('name')}
          name="q"
          value={filters.get('q')}
          onChange={(value) => filters.set('q', value ?? '')}
        />
        <SpellListPicker {...bind.list} spellLists={spellLists} variant="select" />
      </FilterSection>
      <FilterSection title={t('type')}>
        <EnumPicker {...bind.type} label={t('type')} values={SPELL_TYPES} variant="select" />
        <EntityPicker<string>
          {...bind.instant}
          label={t('cast-type')}
          hideImages
          variant="select"
          options={CAST_TYPES.map((value) => ({ id: value, label: castTypeLabel(value, t) }))}
        />
      </FilterSection>
    </>
  );
}

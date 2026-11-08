import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  bindSingle,
  ENTITY_SOURCES,
  EntityPicker,
  entitySourceFilter,
  EnumPicker,
  FilterSchema,
  FilterSearchField,
  FilterSection,
  ListFilters,
  Spell,
  SPELL_TYPES,
  SpellList,
  SpellListPicker,
  spellNameRsql,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

const CAST_TYPES = ['true', 'false'];

const castTypeLabel = (value: string, t: TFunction) => t(value === 'true' ? 'instant' : 'casted');

/** Filters of the spell list (spec 046): name, spell list, type, cast type and source (spec 063), kept in the URL. */
export const spellFilters = (
  t: TFunction,
  spellLists: SpellList[],
  spellName: (name: string) => string,
  spellNameMatches: (text: string) => string[]
): FilterSchema<Spell> => ({
  // Workspace spec 088: also by the translated name, which the API does not know
  q: {
    kind: 'text',
    label: t('name'),
    toRsql: (value) => (value ? spellNameRsql(String(value), spellNameMatches(String(value))) : undefined),
  },
  list: {
    kind: 'single',
    label: t('spell-list'),
    format: (id) => {
      const list = spellLists.find((each) => each.id === id);
      return list ? spellName(list.name) : id;
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
  source: entitySourceFilter<Spell>(t),
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
  const single = (key: string) => bindSingle(filters, key);
  // Built outside the JSX: the i18n lint reads string arguments there as visible text.
  const bind = { list: single('list'), type: single('type'), instant: single('instant'), source: single('source') };

  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <FilterSearchField filters={filters} filter="q" label={t('name')} />
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
      <FilterSection title={t('entity-source')}>
        <EnumPicker {...bind.source} label={t('entity-source')} values={ENTITY_SOURCES} labelPrefix="entity-source-" />
      </FilterSection>
    </>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  bindSingle,
  EnumPicker,
  FilterSchema,
  FilterSearchField,
  FilterSection,
  ListFilters,
  regexFilter,
  ProfessionPicker,
  REALM_TYPES,
  RealmTypePicker,
  SPELL_LIST_TYPES,
  SpellList,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/** Filters of the spell list list (spec 046): name, realm, list type and profession, kept in the URL. */
export const spellListFilters = (t: TFunction): FilterSchema<SpellList> => ({
  q: regexFilter<SpellList>(t('name'), 'name'),
  realm: {
    kind: 'single',
    label: t('realm'),
    options: REALM_TYPES,
    format: (value) => t(value),
    toRsql: (value) => `realms==${value}`,
  },
  type: {
    kind: 'single',
    label: t('type'),
    options: SPELL_LIST_TYPES,
    format: (value) => t(value),
    toRsql: (value) => `type==${value}`,
  },
  profession: {
    kind: 'single',
    label: t('profession'),
    format: (value) => t(value),
    toRsql: (value) => `professionId==${value}`,
  },
});

/** Sections of the side panel of the spell list list. */
export default function SpellListListFilters({
  filters,
  professionIds,
}: {
  filters: ListFilters<SpellList>;
  professionIds: string[] | undefined;
}) {
  const { t } = useTranslation();
  const single = (key: string) => bindSingle(filters, key);
  // Built outside the JSX: the i18n lint reads string arguments there as visible text.
  const bind = { realm: single('realm'), type: single('type'), profession: single('profession') };

  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <FilterSearchField filters={filters} filter="q" label={t('name')} />
      </FilterSection>
      <FilterSection title={t('realm')}>
        <RealmTypePicker {...bind.realm} variant="select" />
      </FilterSection>
      <FilterSection title={t('type')}>
        <EnumPicker {...bind.type} label={t('type')} values={SPELL_LIST_TYPES} variant="select" />
      </FilterSection>
      {professionIds && (
        <FilterSection title={t('profession')}>
          <ProfessionPicker {...bind.profession} professions={professionIds} variant="select" />
        </FilterSection>
      )}
    </>
  );
}

import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';

// Workspace spec 091, E1: every page is its own chunk; the Suspense is in MfeRoot / the shell layout.
const HomePage = lazy(() => import('./HomePage'));
const SpellListFormPage = lazy(() => import('./modules/spell-lists/form/SpellListFormPage'));
const SpellListListPage = lazy(() => import('./modules/spell-lists/list/SpellListListPage'));
const SpellListViewPage = lazy(() => import('./modules/spell-lists/view/SpellListViewPage'));
const SpellFormPage = lazy(() => import('./modules/spells/form/SpellFormPage'));
const SpellListPage = lazy(() => import('./modules/spells/list/SpellListPage'));
const SpellViewPage = lazy(() => import('./modules/spells/view/SpellViewPage'));

const App = () => (
  <MfeRoot namespace="spells">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spell-lists" element={<SpellListListPage />} />
      <Route path="/spell-lists/create" element={<SpellListFormPage mode="create" />} />
      <Route path="/spell-lists/view/:spellListId" element={<SpellListViewPage />} />
      <Route path="/spell-lists/edit/:spellListId" element={<SpellListFormPage mode="edit" />} />
      <Route path="/spells" element={<SpellListPage />} />
      <Route path="/spells/create" element={<SpellFormPage mode="create" />} />
      <Route path="/spells/view/:spellId" element={<SpellViewPage />} />
      <Route path="/spells/edit/:spellId" element={<SpellFormPage mode="edit" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MfeRoot>
);

export default App;

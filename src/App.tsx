import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';
import HomePage from './HomePage';
import SpellListFormPage from './modules/spell-lists/form/SpellListFormPage';
import SpellListListPage from './modules/spell-lists/list/SpellListListPage';
import SpellListViewPage from './modules/spell-lists/view/SpellListViewPage';
import SpellFormPage from './modules/spells/form/SpellFormPage';
import SpellListPage from './modules/spells/list/SpellListPage';
import SpellViewPage from './modules/spells/view/SpellViewPage';

const App = () => (
  <MfeRoot>
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

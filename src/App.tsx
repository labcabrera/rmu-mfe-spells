import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ErrorProvider } from './ErrorContext';
import HomePage from './HomePage';
import './i18n';
import SpellListCreation from './modules/spell-lists/create/SpellListCreation';
import SpellListEdit from './modules/spell-lists/edit/SpellListEdit';
import SpellListList from './modules/spell-lists/list/SpellListList';
import SpellCreation from './modules/spells/create/SpellCreation';
import SpellEdit from './modules/spells/edit/SpellEdit';
import SpellView from './modules/spells/view/SpellView';
import SpellsView from './modules/spells/list/SpellsView';
import SpellListView from './modules/spell-lists/view/SpellListView';

const NotFound: FC = () => (
  <div>
    <h2>Not found</h2>
    <p>The requested route does not exist.</p>
  </div>
);

const App = () => {
  return (
    <ThemeProvider theme={useTheme()}>
      <ErrorProvider>
        <Box padding={2}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spell-lists" element={<SpellListList />} />
            <Route path="/spell-lists/create" element={<SpellListCreation />} />
            <Route path="/spell-lists/view/:spellListId" element={<SpellListView />} />
            <Route path="/spell-lists/edit/:spellListId" element={<SpellListEdit />} />
            <Route path="/spells/view/:spellId" element={<SpellView />} />
            <Route path="/spells" element={<SpellsView />} />
            <Route path="/spells/create" element={<SpellCreation />} />
            <Route path="/spells/edit/:spellId" element={<SpellEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ErrorProvider>
    </ThemeProvider>
  );
};

export default App;

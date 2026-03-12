import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import HomePage from './HomePage';
import './i18n';
import SpellListList from './modules/spell-lists/list/SpellListList';

const NotFound: FC = () => (
  <div>
    <h2>Not found</h2>
    <p>The requested route does not exist.</p>
  </div>
);

const App = () => {
  return (
    <ErrorProvider>
      <Box padding={2}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spell-lists" element={<SpellListList />} />
          {/* <Route path="/spell-lists/create" element={<RealmCreation />} />
          <Route path="/spell-lists/view/:spellListId" element={<RealmView />} />
          <Route path="/spell-lists/edit/:spellListId" element={<RealmEdit />} /> */} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </ErrorProvider>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../Header';
import Home from '../Home';
import Error from '../Error';
import NewPassword from '../NewPassword';
import './index.scss';
import ProjectPage from '../ProjectPage';
import WelcomeModal from '../WelcomeModal';
// requête axios pour avoir les datas de l'id en question. Prévoir de faire un on Select

const THEME = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={THEME}>
        <RecoilRoot>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/project/:id"
              element={(<ProjectPage />)}
            />
            <Route
              path="/users/login/reset-password/:token"
              element={(<NewPassword />)}
            />
            <Route
              path="/users/validate-inscription/:token"
              element={(<WelcomeModal />)}
            />
            <Route
              path="*"
              element={<Error />}
            />
          </Routes>
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
}

export default App;

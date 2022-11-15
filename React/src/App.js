import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // Link,
} from 'react-router-dom';

import './App.css';
import Basket from './basket/pages/Basket';
import Alternatives from './alternatives/pages/Alternatives';
import Stats from './stats/pages/stats';
import Settings from './Settings/pages/settings';
import Welcome from './welcome/Welcome';
import Intro from './welcome/Intro';
import NavBarBottom from './shared/components/NavBarBottom';
import Auth from './auth/pages/Auth';
import { AuthContext } from './shared/context/authContext';
import Camera from './camera/pages/Camera';
import ImageCamera from './camera/pages/ImageCamera';
import ImageList from './admin/pages/ImageList';
import ImageDetails from './admin/pages/ImageDetails';
import { useAuth } from './shared/hooks/authHook'
import { createTheme, ThemeProvider  } from '@mui/material/styles';






function App() {
  const { token, login, logout, userId } = useAuth();

  // change color scheme for whole application with theme and theme provider
  const theme = createTheme({
    palette: {
      primary: {
        main: "#91C788",
        contrastText: '#fff',
      },
      secondary: {
        main: '#CCD2E3',
      },
    },
  });

let routes;

if (!!token){
  routes = (
          <Routes>
            <Route path="/" element={<Basket />} />
            <Route path="alternatives/*" element={<Alternatives />} />
            <Route path="stats/*" element={<Stats />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="camera/*" element={<Camera userId={userId} />} />
            <Route path="camera/image/*" element={<ImageCamera userId={userId} />} />
            {<Route path="admin/*" element={<ImageList />} />}
            {<Route path="admin/imageDetails/*" element={<ImageDetails />} />}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
  )} else {
    routes = (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="gettingstarted/" element={<Intro />} />
        <Route path='auth/' element={<Auth />} />
        <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userId: userId, token: token, login: login, logout: logout }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <main>{routes}</main>
          {!!token && <NavBarBottom />}
        </BrowserRouter>
      </ThemeProvider>

    </AuthContext.Provider>

  );
}

export default App;
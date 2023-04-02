import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // Link,
} from 'react-router-dom';
import { Container } from '@mui/material';

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
import { navContext } from './shared/context/navContext';
import Camera from './camera/pages/Camera';
import ImageCamera from './camera/pages/ImageCamera';
import AdminPanel from './admin/pages/Admin';
import ImageList from './admin/pages/ImageList';
import ImageDetails from './admin/pages/ImageDetails';
import { useAuth } from './shared/hooks/authHook'
// import { useFindPath } from './shared/hooks/findPath-hook';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import ReactGA from "react-ga4";
import { useTrackClicks, useTrackExit } from './shared/modules/googleAnalyticsModules';


// ReactGA.initialize('G-PD6X0YP04V', {
//   debug: true,
//   gaOptions: {
//     siteSpeedSampleRate: 100,
//   }
// });

ReactGA.initialize(
  [
    {
      trackingId: 'G-PD6X0YP04V',
      gaOptions: {
        name: 'tracker1',
        siteSpeedSampleRate: 100
      }
    },
    {
      trackingId: 'GT-KV6RF3X',
      gaOptions: { 
        name: 'tracker2',
        siteSpeedSampleRate: 100 
      }
    }
  ],
  { debug: true, alwaysSendToDefaultTracker: false }
);

function App() {
  const { token, login, logout, userId } = useAuth();

  const [currentPage, setPage] = React.useState("Basket");

  // for google analytics
  // track clicks
  useTrackClicks();
  // track exit from tab
  useTrackExit();
  // add userId even if logged in because of token
  if (token) {
    ReactGA.set({ userId: userId });
    console.log("userId added");
  };

  // testing process.env -- not working; check!
  const GA4trackingId = process.env.GA_TRACKING_ID; // Replace with your Google Analytics tracking ID
  console.log(GA4trackingId);


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
            <Route path="gettingstarted/" element={<Intro />} />
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
      <navContext.Provider value={{ currentPage: currentPage, setPage: setPage }}>
      <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={!!token?{px: "1em", pb: "64px"}:{px: "1em"}} >
        <BrowserRouter>
          <main>{routes}</main>
          {!!token && <NavBarBottom />}
        </BrowserRouter>
      </Container>
      </ThemeProvider>
      </navContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
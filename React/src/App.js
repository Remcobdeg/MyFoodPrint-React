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
import NavBarBottom from './shared/components/NavBarBottom';
import Auth from './auth/pages/Auth';
import { AuthContext } from './shared/context/authContext';
import Camera from './camera/pages/Camera';
import ImageCamera from './camera/pages/ImageCamera';
import ImageList from './admin/pages/ImageList';
import { useAuth } from './shared/hooks/authHook'




function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { token, login, logout, userId } = useAuth();


  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userId: userId, token: token, login: login, logout: logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!!token ? (isAdmin ? <ImageList /> : <Basket />) : <Auth />} />
          {!!token && <Route path="alternatives/*" element={<Alternatives />} />}
          {!!token && <Route path="stats/*" element={<Stats />} />}
          {!!token && <Route path="settings/*" element={<Settings />} />}
          {!!token && <Route path="camera/*" element={<Camera userId={userId} />} />}
          {!!token && <Route path="camera/image/*" element={<ImageCamera userId={userId} />} />}
          <Route path='auth/' element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        {!!token && !isAdmin && <NavBarBottom />}
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
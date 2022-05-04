import React, {useState,useCallback} from 'react';
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
import Settings from './Settings/pages/settings';
import NavBarBottom from './shared/components/NavBarBottom';
import Auth from './auth/pages/Auth';
import {AuthContext} from './shared/context/authContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);


  const login = useCallback((uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
    }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);


  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId:userId, login: login, logout: logout}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Basket /> : <Auth /> } /> 
          {isLoggedIn && <Route path="alternatives/*" element={<Alternatives />} /> }
          {isLoggedIn && <Route path="settings/*" element={<Settings />} /> }
          <Route path='auth/' element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        {isLoggedIn && <NavBarBottom />}
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;

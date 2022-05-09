import React, {useState,useCallback,useEffect} from 'react';
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

let logoutTimer;

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();


  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    setToken(token);
    setIsLoggedIn(true);
    const newTokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 160);
    setTokenExpirationDate(newTokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: newTokenExpirationDate.toISOString()
      }));
    }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  //auto-login if valid token is available
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  //auto-logout if timer expires
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);


  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId:userId, login: login, logout: logout}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!!token ? <Basket /> : <Auth /> } /> 
          {!!token && <Route path="alternatives/*" element={<Alternatives />} /> }
          {!!token && <Route path="settings/*" element={<Settings />} /> }
          <Route path='auth/' element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        {!!token && <NavBarBottom />}
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;

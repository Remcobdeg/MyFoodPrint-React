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
import NavBarBottom from './shared/components/NavBarBottom';
import Login from './auth/pages/Login';
import {AuthContext} from './shared/context/authContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, []);


  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && <Route path="/" element={<Basket />} />}
          {!isLoggedIn && <Route path="/" element={<Login />} />}
          
          <Route path="alternatives/*" element={<Alternatives />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <NavBarBottom />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;

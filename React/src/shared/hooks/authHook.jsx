import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
  
  
    const login = useCallback((uid, token, isAdmin ,expirationDate) => {
      setUserId(uid);
      setToken(token);
      setIsLoggedIn(true);
      setIsAdmin(isAdmin);
      const newTokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 160);
      setTokenExpirationDate(newTokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token: token,
          mod: isAdmin,
          expiration: newTokenExpirationDate.toISOString()
        }));
      }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      setIsAdmin(false);
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
        login(storedData.userId, storedData.token, storedData.mod, new Date(storedData.expiration));
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

    return { token, login, logout, userId, isAdmin };
}
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import './App.css';
import Basket from './basket/pages/Basket'
import Alternatives from './alternatives/pages/Alternatives';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Basket />} />
        <Route path="alternatives/*" element={<Alternatives />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

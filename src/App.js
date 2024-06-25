import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import Aire from "./componentes/datos/Aire";
import Censo from "./componentes/datos/Censo";
import Mapa from "./componentes/datos/Mapa";
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/aire" element={isLoggedIn ? <Aire onLogout={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/censo" element={isLoggedIn ? <Censo onLogout={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/mapa" element={isLoggedIn ? <Mapa onLogout={handleLogout}/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
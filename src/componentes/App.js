import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import logo from './logo.svg';
import './App.css';

import ComponentePrueba from './componentes/Componente_prueba';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Aplicación City+ (codigo h1 App.js)</h1>
        </header>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={ComponentePrueba} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

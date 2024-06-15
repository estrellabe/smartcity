import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Profile from "./Profile";
import Aire from "./datos/Aire";
import Bicicletas from "./datos/Bicicletas";
import Censo from "./datos/Censo";
import ContaminacionAcustica from "./datos/ContaminacionAcustica";
import Contenedores from "./datos/Contenedores";
import Multas from "./datos/Multas";
import Peatones from "./datos/Peatones";
import '../App.css';
import { MapaContainer } from './MapaContainer';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Menu />} />
          <Route path="/aire" element={<Aire />} />
          <Route path="/bicicletas" element={<Bicicletas />} />
          <Route path="/censo" element={<Censo />} />
          <Route path="/acustica" element={<ContaminacionAcustica />} />
          <Route path="/contenedores" element={<Contenedores />} />
          <Route path="/multas" element={<Multas />} />
          <Route path="/peatones" element={<Peatones />} />
          <Route path="/censo" element={<Censo />} />
          <Route path="/mapa" element={<MapaContainer />} />
        </Routes>
    </Router>
  );
}

export default App;

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
import Multas from "./datos/Multas";
import '../App.css';
import Mapa from './datos/Mapa';

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
          <Route path="/multas" element={<Multas />} />
          <Route path="/censo" element={<Censo />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
    </Router>
  );
}

export default App;

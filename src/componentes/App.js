import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Profile from "./Profile";
import Aire from "./Aire";
import Bicicletas from "./Bicicletas";
import Censo from "./Censo";
import ContaminacionAcustica from "./ContaminacionAcustica";
import Contenedores from "./Contenedores";
import Multas from "./Multas";
import Peatones from "./Peatones";
import '../App.css';


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
        </Routes>
    </Router>
  );
}

export default App;

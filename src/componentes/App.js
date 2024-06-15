import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Aire from "./datos/Aire";
import Censo from "./datos/Censo";
import '../App.css';
import Mapa from './datos/Mapa';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aire" element={<Aire />} />
          <Route path="/censo" element={<Censo />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
    </Router>
  );
}

export default App;

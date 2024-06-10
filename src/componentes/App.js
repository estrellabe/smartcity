import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import '../App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Menu />} />
        </Routes>
    </Router>
  );
}

export default App;

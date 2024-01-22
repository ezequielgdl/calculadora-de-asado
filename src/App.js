import React from "react";
import Calculator from "./components/Calculator";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
        <Router>
          <div className="App">
          <Menu/>
          <Routes>
              <Route path="/" element={<Calculator />}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
          </div>
        </Router>
  );
}

export default App;

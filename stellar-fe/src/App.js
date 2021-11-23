import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Employees from './pages/companyDashboard/Employees'

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact element={Employees} />
          </Routes>  
        </Router>

        <Employees />
    </div>
  );
}

export default App;

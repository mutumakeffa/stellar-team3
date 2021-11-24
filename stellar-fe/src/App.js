import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Employees from './pages/companyDashboard/Employees'
import Wallet from './pages/wallet/Wallet'

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path='/wallet' exact component={Wallet} />
            {/* <Route path='/dashboard' exact component={Employees} /> */}
          </Switch>  
        </Router>

        <Employees />
    </div>
  );
}

export default App;

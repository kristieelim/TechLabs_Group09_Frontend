import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import StorePage from "./components/StorePage/StorePage";
import DriverPage from "./components/DiverPage/DriverPage"; 
import AdminPage_Stores from "./components/AdminPage_Stores/AdminPage_Stores";
import AdminPage_Drivers from "./components/AdminPage_Drivers/AdminPage_Drivers";
import HomePage from "./components/HomePage";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
// import { Route, Routes } from "react-router-dom"

class App extends Component{
  render(){
    return(
      <div className="App"> 
      <Navbar />  
        <div className="list">
            {/* <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/StorePage">Page for Stores</Link></li>
              <li><Link to="/DriverPage">Page for Drivers</Link></li>
              <li><Link to="/AdminPage_Stores">Page for Admins - List of Stores</Link></li>
              <li><Link to="/AdminPage_Drivers">Page for Admins - List of Drivers</Link></li>
            </ul> */}
          </div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/StorePage" element={<StorePage />} />
            <Route exact path="/DriverPage" element={<DriverPage />} />
            <Route exact path="/AdminPage_Stores" element={<AdminPage_Stores />} />
            <Route exact path="/AdminPage_Drivers" element={<AdminPage_Drivers />} />
          </Routes>
          
      </div>
    );
  }
}

export default App;

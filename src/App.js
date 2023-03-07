import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import StorePage from "./components/StorePage";
import DriverPage from "./components/DriverPage"; 
import AdminPage_Stores from "./components/AdminPage_Stores";
import AdminPage_Drivers from "./components/AdminPage_Drivers";

class App extends Component{
  render(){
    return(
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<h1>Home Page</h1>} />
            <Route exact path="StorePage" element={<h1>Page for Stores</h1>} />
            <Route exact path="DriverPage" element={<h1>Page for Drivers</h1>} />
            <Route exact path="AdminPage_Stores" element={<h1>Page for Admins - List of Stores</h1>} />
            <Route exact path="AdminPage_Drivers" element={<h1>Page for Admins - List of Drivers</h1>} />
          </Routes>
          <div className="list">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="StorePage">Page for Stores</Link></li>
              <li><Link to="DriverPage">Page for Drivers</Link></li>
              <li><Link to="AdminPage_Stores">Page for Admins - List of Stores</Link></li>
              <li><Link to="AdminPage_Drivers">Page for Admins - List of Drivers</Link></li>
            </ul>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

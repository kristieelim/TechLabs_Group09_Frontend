import React from "react"
import example from "../images/Tafel_Deutschland_logo.png"
import '../App.css';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar">
            <img src={example} className="nav--icon" />
            <h3 className="nav--logo_text">Tafel Route</h3>
            <h4 className="nav--view"> View</h4>
            <div className="list">
            <ul>
              {/* <li><Link to="HomePage">Home</Link></li>
              <li><Link to="StorePage">Page for Stores</Link></li>
              <li><Link to="DriverPage">Page for Drivers</Link></li>
              <li><Link to="AdminPage_Stores">Page for Admins - List of Stores</Link></li>
              <li><Link to="AdminPage_Drivers">Page for Admins - List of Drivers</Link></li> */}
            </ul>
          </div>
        </nav>
    )
}
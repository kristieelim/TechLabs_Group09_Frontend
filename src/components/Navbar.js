import React from "react"
import example from "../images/Tafel_Deutschland_logo.png"
import '../App.css';

export default function Navbar() {
    return (
        <nav>
            <img src={example} className="nav--icon" />
            <h3 className="nav--logo_text">Tafel Route</h3>
            <h4 className="nav--view">Restaurants View</h4>
        </nav>
    )
}
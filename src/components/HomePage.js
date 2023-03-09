import React from 'react'
import Navbar from "./Navbar"
import Main from "./Main"
import '../App.css';


export default function DriverPage() {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="container">
            <Main />
            </div>             
        </div>
    )
}
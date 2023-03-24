import React from 'react'
import Navbar from "./Navbar"
import Main from "./Main"
import '../App.css';
import Card from "./card"


export default function DriverPage() {
    return (
        <div class="image">
            <h1>Home Page</h1>
            <div className="container">
            <div className="maintext">
            Welcome to our website, where we believe that food should never go to waste 
            when there are people who are hungry. We are committed to making a difference
            in our community by connecting restaurants with excess food and drivers who 
             are willing to help distribute it to those who need it the most. Our mission 
             is simple - to create an efficient and effective system for collecting and 
             distributing food to those who have difficulty purchasing enough to avoid hunger. 
             With the help of our platform, restaurants can easily donate their excess food 
             and drivers can efficiently pick up and deliver the food to those in need. 
            
             Together, we can make a meaningful impact on reducing food waste and combating hunger in our community.
            </div>
            </div>             
        </div>
    )
}
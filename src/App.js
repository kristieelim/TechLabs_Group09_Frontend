import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import StorePage from "./components/StorePage/StorePage";
import DriverPage from "./components/DriverPage/DriverPage";
import AdminPage_Stores from "./components/AdminPage_Stores/AdminPage_Stores";
import AdminPage_Drivers from "./components/AdminPage_Drivers/AdminPage_Drivers";
import HomePage from "./components/HomePage/Blog";
import Login from "./components/Login";
import Register from "./components/RegisterPage/Register";
import VerifyOTP from "./components/VerifyOTP";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Container from '@mui/material/Container';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar />
          <Container maxWidth="lg">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Logout" element={<Logout />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/VerifyOTP" element={<VerifyOTP />} />
            <Route exact path="/StorePage" element={<StorePage />} />
            <Route exact path="/DriverPage" element={<DriverPage />} />
            <Route
              exact
              path="/AdminPage_Stores"
              element={<AdminPage_Stores />}
            />
            <Route
              exact
              path="/AdminPage_Drivers"
              element={<AdminPage_Drivers />}
            />
          </Routes>
          </Container>
      </div>
    );
  }
}

export default App;

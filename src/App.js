import React, { Component } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import StorePage from "./components/StorePage/StorePage";
import DriverPage from "./components/DriverPage/DriverPage";
import AdminPage_Stores from "./components/AdminPage_Stores/AdminPage_Stores";
import AdminPage_Drivers from "./components/AdminPage_Drivers/AdminPage_Drivers";
import Register from "./components/RegisterPage/Register";
//import Navbar from "./components/Navbar";
//import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />

          {/*
          <Route element={<RequireAuth allowedRoles={["EMPLOYEE"]}/>}>
            <Route exact path="/StorePage" element={<StorePage />} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={["DRIVER"]}/>}>
            <Route exact path="/DriverPage" element={<DriverPage />} />
          </Route>

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
          */}

          <Route element={<RequireAuth />}>
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
          </Route>

          <Route exact path="/Missing" element={<Missing />} />
          <Route exact path="/Unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    );
  }
}

export default App;

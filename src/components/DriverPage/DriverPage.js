import React, { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";

//import data from "./appointments-mock-data.json";
import Table from "react-bootstrap/Table";
import GoogleMap from "./GoogleMap2";
// import OpenMaps from '../Openmaps';
import MyMap from "../Archiv/MyMap";
import { ChakraProvider, theme } from "@chakra-ui/react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { AutoAwesome } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import points_of_interest from "./points_of_interest.json";

const APPOINTMENT_URL = "/api/appointment/";
const RESTAURANT_URL = "/api/restaurant/";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DriverPage() {
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [user, setUser] = useState(decoded);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState({});

  useEffect(() => {
    axios
      .get(APPOINTMENT_URL)
      .then((response) => {
        const filteredAppointments = response.data.data.filter(
          (appointment) => appointment.driver === user._id
        );
        setAppointments(filteredAppointments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  useEffect(() => {
    axios.get(RESTAURANT_URL).then((response) => {
      const restaurants = response.data.data;
      const names = {};
      for (const restaurant of restaurants) {
        names[restaurant._id] = restaurant.name;
      }
      setRestaurantNames(names);
    });
  }, []);

  function getRestaurantName(restaurantId) {
    return axios.get(RESTAURANT_URL + restaurantId).then((response) => {
      return response.data.name;
    });
  }

  const appointmentDates = [
    ...new Set(
      appointments.map((appointment) => appointment.pickupDateAndTime)
    ),
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="app-container">
      <h1>Driver Page</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Item>Driver Name: {user.firstName + " " + user.lastName}</Item>
          </Grid>
          <Grid item xs="auto">
            <Item>
              Collection Date:
              <select value={selectedDate} onChange={handleDateChange}>
                {appointmentDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </Item>
          </Grid>
        </Grid>
      </Box>

      {/* <MyMap /> */}

      <Table striped bordered hover width="auto">
        <thead>
          <tr>
            <th>Store</th>
            <th>Food Type</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(
              (appointment) => appointment.pickupDateAndTime === selectedDate
            )
            .map((appointment) => (
              <Fragment key={appointment._id}>
                <tr>
                  <td rowSpan={appointment.food.length + 1}>
                    {restaurantNames[appointment.restaurant]
                      ? restaurantNames[appointment.restaurant]
                      : "Loading..."}
                  </td>
                </tr>
                {appointment.food.map((f) => (
                  <tr>
                    <td>{f.name}</td>
                    <td>{f.quantity}</td>
                    <td>{f.unit}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
        </tbody>
      </Table>
      <ChakraProvider theme={theme}>
        <div>
          <GoogleMap points_of_interest={points_of_interest} />
        </div>
      </ChakraProvider>
    </div>
  );
}


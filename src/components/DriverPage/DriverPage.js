import React, { useState, useEffect, Fragment } from "react";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
//import IconButton from '@mui/material/IconButton';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import data from "./appointments-mock-data.json";
import Table from "react-bootstrap/Table";
import GoogleMap from "./GoogleMap2";
// import OpenMaps from '../Openmaps';
//import MyMap from "../Archiv/MyMap";
import { ChakraProvider, theme } from "@chakra-ui/react";
import MainFeaturedPost from '../HomePage/MainFeaturedPost';
//import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//import Box from "@mui/material/Box";
//import CssBaseline from "@mui/material/CssBaseline";
import { Container } from '@chakra-ui/react'
//import { autoBatchEnhancer } from "@reduxjs/toolkit";
//import { AutoAwesome } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import points_of_interest from "./points_of_interest.json";
//import { filter } from "lodash";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const APPOINTMENT_URL = "/api/appointment/";
const RESTAURANT_URL = "/api/restaurant/";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const title = {
  title: 'Driver Page',
  description:
    "",
  image: "https://source.unsplash.com/D-qq7W751vs/",
  imageText: '',
  linkText: '',
  imageText: '',
  linkText: '',
};

export default function DriverPage() {
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [user, setUser] = useState(decoded);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [appointmentbyDate, setAppointmentbyDate] = useState({});
  const [displayDate, setDisplayDate] = useState("2022-04-15T00:00");

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
    const currentDate = new Date(selectedDate).toDateString();
    const filteredAppointmentsbyDate = appointments.filter((appointment) => {
      const currentDate1 = new Date(
        appointment.pickupDateAndTime
      ).toDateString();
      return currentDate1 == currentDate;
    });
    console.log(filteredAppointmentsbyDate);

    const aa = filteredAppointmentsbyDate.map((appointment) => {
      return {
        lat: appointment.coordinates[0],
        lng: appointment.coordinates[1],
      };
    });
    console.log(aa);
    const res = {};
    Object.assign(res, aa);
    setAppointmentbyDate(res);
    console.log(appointmentbyDate);
    console.log(res);
  }, [selectedDate]);

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
    console.log(e.target.value);
    setSelectedDate(e.target.value);
  };

  // to convert date from ISO8601 to Human readable for dropdown display
  function parseDate(date) {
    const datenow = new Date(date);
    const parsedDate = datenow.toString();
    return <MenuItem value={date}>{parsedDate}</MenuItem>;
  }

  return (
    <div className="app-container">
      {/* <h1>Driver Page</h1> */}
      <MainFeaturedPost post={title} />
      <Grid sx={{ alignContent: "space-around" }}>
        <Grid>
          <Item fullWidth>
            <Typography variant="h6" gutterBottom>
              Driver: <b>{user.firstName + " " + user.lastName}</b>
            </Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Collection Date:
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDate}
                // defaultValue={selectedDate}
                label="Collection Date:"
                onChange={handleDateChange}
              >
                {/* {appointmentDates.map((date) => (
                  <MenuItem value={date}>{date}</MenuItem>
                ))} */}
                {appointmentDates.map(parseDate)}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid>
          <Table striped bordered hover width="fixed">
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
                  (appointment) =>
                    appointment.pickupDateAndTime === selectedDate
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
        </Grid>
        <Grid>
          <ChakraProvider>
            <Container style={{ textAlign: "center" }}>
              {/*<div style={{ position: "relative", alignItems: "center" }}>*/}
                <GoogleMap points_of_interest={appointmentbyDate} />
              {/*</div>*/}
            </Container>
          </ChakraProvider>
        </Grid>
      </Grid>
    </div>
  );
}


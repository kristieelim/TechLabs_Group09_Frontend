import React, { useState, Fragment } from "react";
import data from "./appointments-mock-data.json";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DriverPage() {
  const [appointments, setAppointments] = useState(data);

  return (
    <div className="app-container">
      <h1>Driver Page</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Item>Driver Name: {appointments[0].driverName}</Item>
          </Grid>
          <Grid item xs="auto">
            <Item>Collection Date: {appointments[0].collectionDate}</Item>
          </Grid>
        </Grid>
      </Box>

      {/* <MyMap /> */}

      <Table striped bordered hover width="auto">
        <thead>
          <tr>
            <th>Store</th>
            <th>Food Type</th>
            <th>Amount</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <Fragment>
              <tr>
                <td rowSpan={appointment.food.length + 1}>
                  {appointment.storeName}
                </td>
              </tr>
              {appointment.food.map((f) => (
                <tr>
                  <td>{f.type}</td>
                  <td>{f.amount}</td>
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


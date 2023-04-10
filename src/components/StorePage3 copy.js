import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import axios from "./api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
const theme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const APPOINTMENT_URL = "/api/appointment/";
const RESTAURANT_URL = "/api/restaurant/";

export default function StorePage3() {
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [user, setUser] = useState(decoded);
  const [restaurant, setRestaurant] = useState([]);
  const [newAppointmentDate, setNewAppointmentDate] = useState(null);
  const [foodItems, setFoodItems] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const isSubmitDisabled = !isFormValid || isSubmitted;

  const formRef = useRef(null);

  useEffect(() => {
    setIsFormValid(
      newAppointmentDate !== null &&
        foodItems.length > 0 &&
        foodItems[0].name !== ""
    );
  }, [newAppointmentDate, foodItems]);

  useEffect(() => {
    axios
      .get(RESTAURANT_URL)
      .then((response) => {
        const filteredRestaurant = response.data.data.filter((restaurant) =>
          restaurant.employees.includes(user._id)
        );
        setRestaurant(filteredRestaurant);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  const handleFoodItemChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...foodItems];
    if (name === "quantity" && isNaN(value)) {
      return;
    }
    list[index][name] = value;
    setFoodItems(list);
  };

  const handleAddFoodItem = () => {
    setFoodItems([...foodItems, { name: "", quantity: "", unit: "" }]);
  };

  const handleRemoveFoodItem = (index) => {
    const list = [...foodItems];
    list.splice(index, 1);
    setFoodItems(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentData = {
      food: foodItems,
      pickupDateAndTime: newAppointmentDate,
      driver: "642be6a09212050219ba5a1e", //Sebastian Vettel
      restaurant: restaurant[0]._id,
      coordinates: restaurant[0].coordinates,
    };

    axios
      .post(APPOINTMENT_URL, appointmentData)
      .then((response) => {
        setIsSubmitted(true);
        setMessage({
          type: "success",
          text: "New appointment added successfully.",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewAppointmentDate(null);
        setFoodItems([{ name: "", quantity: "", unit: "" }]);
        formRef.current.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
        <Grid sx={{ alignContent: "space-around" }}>
          
        <Item fullWidth>
            <Typography variant="h6" gutterBottom>
              Employee Name: <b>{user.firstName + " " + user.lastName}</b>
             
            </Typography>
            <Typography variant="h6" gutterBottom>
              {restaurant.length > 0 && <p>Store Name: <b>{restaurant[0].name}</b> </p>}
              </Typography>
          </Item>
        </Grid>
        {/* {restaurant.length > 0 && <h2>Store Name: {restaurant[0].name} </h2>} */}

      




      
    
      {/* {restaurant.length > 0 && <h2>Store Name: {restaurant[0].name} </h2>} */}
      <h3>Add New Appointment:</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="appointment-date">Select Appointment Date:</label>
          <DatePicker
            id="appointment-date"
            selected={newAppointmentDate}
            onChange={(date) => {
                setNewAppointmentDate(date.setHours(0, 0, 0, 0));
            }}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>
        <div>
          <label htmlFor="food-items" >Food Items:</label>
          {foodItems.map((item, index) => (
            <div key={index}>
              <TextField
                type="text"
                name="name"
                placeholder="Name"
                value={item.name}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
              <TextField
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
              <FormControl >
              <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
              
              <Select className="selectunit" 
                
                
                sx={{minWidth: 120 }}
                name="unit"
                value={item.unit}
                onChange={(e) => handleFoodItemChange(index, e)}
              >
                <MenuItem value="">Select Unit</MenuItem>
                <MenuItem value="KG">KG</MenuItem>
                <MenuItem value="LITER">LITER</MenuItem>
                <MenuItem value="PIECE">PIECE</MenuItem>
                <MenuItem value="BOX">BOX</MenuItem>
              </Select>
              </FormControl>
              
              {index !== 0 && (
                <Button 
                  type="button"
                  onClick={() => handleRemoveFoodItem(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
        </div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" sizetype="button" onClick={handleAddFoodItem}>
              Add Food Item
            </Button>
          <Button  variant="outlined" type="submit" disabled={isSubmitDisabled}>
            Submit
          </Button>
        </Stack>
        {message && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}
      </form>
      
    </div>
  );
}

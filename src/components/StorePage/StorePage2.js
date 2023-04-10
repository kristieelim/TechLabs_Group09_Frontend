import React, {useEffect, useState, Fragment} from 'react';
import {nanoid} from 'nanoid';
import data from "./food-data.json";
import jwt_decode from "jwt-decode";
import axios from '../api/axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReadOnlyRow from './foodReadOnlyRow';
import EditableRow from './FoodEditable';
import Table from 'react-bootstrap/Table';
import DatePicker1 from "./DatePicker";
import MainFeaturedPost from '../HomePage/MainFeaturedPost';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import 'react-datepicker/dist/react-datepicker.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';


import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import SP3 from "../StorePage3 copy"


const title = {
  title: 'Store Page',
  description:
    "",
  image: "https://source.unsplash.com/D6Tu_L3chLE/",
  imageText: '',
  linkText: '',
  imageText: '',
  linkText: '',
};



const today = dayjs();
const isInCurrentYear = (date) => date.get('year') === dayjs().get('year');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const theme = createTheme();

export default function StorePage() {
  //Code for authorization:
  //const token = localStorage.getItem("token");
  //var decoded = jwt_decode(token);
  //const [user, setUser] = useState(decoded);
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const [restaurant, setRestaurant] = useState([]);
  const [user, setUser] = useState(decoded);
  const [appointment, setAppointment] = useState([]);
  const [foods, setfoods] = useState([data]);
  const [selectedDate, setSelectedDate] = useState(null);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };



  
  useEffect(() => {
    axios.get(`/api/restaurant/`)
      .then(response => {
        const restaurant = response.data.data.filter(
            (restaurant) => restaurant._id === user._id
          );;
        setRestaurant(restaurant);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user._id]);


  useEffect(() => {
    axios.get("/api/appointment/")
      .then(response => {
        const appointment = response.data.data.filter(
          (appointment) => appointment.restaurant === restaurant._id
        );
        setAppointment(appointment);
      })
      .catch(error => {
        console.log(error);
      });
  }, [restaurant._id]);
  
  useEffect(() => {
    axios.get("/api/appointment/")
      .then(response => {
        const foods = response.data.data.map(appointment => appointment.food);
        setfoods(foods.flat());
      })
      .catch(error => {
        console.log(error);
      });
  }, [restaurant._id]);



  const [addFormData, setAddFormData] = useState({
    food: "",
    foodQuantity: 0.0,
    unit: "",

  });

  const [editFormData, setEditFormData] = useState({
    food: "",
    foodQuantity: 0.0,
    unit: "",
  });

  const [editfoodId, setEditfoodId] = useState(null);


  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    //-----------------------------------
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/your-api-endpoint', {
        date: selectedDate
      });

      console.log(response.data); // 打印后端响应数据
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddFormSubmit = (event) => {
    event.preventDefault();
  
    const newFood = {
      id: nanoid(),
      food: addFormData.food,
      foodQuantity: addFormData.foodQuantity,
      unit: addFormData.unit,
    };
  
    const restaurantId = restaurant._id;
  
    axios
      .post(`/api/appointment/${restaurantId}/food`, newFood)
      .then((response) => {
        const { data: { data: addedFood } } = response;
        setfoods([...foods, addedFood]);
        setAddFormData({
          food: "",
          foodQuantity: 0.0,
          unit: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
    

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedfood = {
      id: editfoodId,
      food: editFormData.food,
      foodQuantity: editFormData.foodQuantity,
      unit: editFormData.unit,
    };

    const newfoods = [...foods];

    const index = foods.findIndex((food) => food.id === editfoodId);

    newfoods[index] = editedfood;

    setfoods(newfoods);
    setEditfoodId(null);
  };

  const handleEditClick = (event, food) => {
    event.preventDefault();
    setEditfoodId(food.id);

    const formValues = {
      food: food.food,
      foodQuantity: food.foodQuantity,
      unit: food.unit
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditfoodId(null);
  };

  const handleDeleteClick = (foodId) => {
    const newfoods = [...foods];

    const index = foods.findIndex((food) => food.id === foodId);

    newfoods.splice(index, 1);

    setfoods(newfoods);
  };

  return (
    <section>
      
      
        <div className="app-container">
          {/* <h1>Store Page</h1> */}
          <MainFeaturedPost post={title} />

          {/* <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={22}>
              <Grid item xs="auto">
                <Item > 
                <IconButton>
                  <AccountCircleIcon fontSize="medium" variant="outlined"/>
                </IconButton>
                  Employee Name: {user.firstName + " " + user.lastName}</Item>
              </Grid>
            </Grid>
          </Box> */}
          <SP3 />
          
          
          {/* <h2>Select Date and Time</h2> */}
          {/* <div style={{ display: "inline-block" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker defaultValue={today} shouldDisableYear={isInCurrentYear} 
          // selected={selectedDate} 
          onChange={(date) => setSelectedDate(date)} 
          dateFormat="yyyy-MM-dd"
          // minDate={new Date()}
          />
            </LocalizationProvider>
        </div> */}
          {/* <DatePicker1 /> */}

          {/* 
      <div style={{ display: "inline-block", marginLeft: "10px" }}>
        <input
          type="time"
          name="time"
          required="required"
          onChange={handleAddFormChange}
        />
      </div> */}

          {/* <h2>Add Food</h2> */}
          <form onSubmit={handleAddFormSubmit}>
            {/* <TextField
              id="outlined-basic"
              label="Enter Food"
              variant="outlined"
              type="text"
              name="food"
              required="required"
              placeholder="Enter Food Name"
              onChange={handleAddFormChange}
            />

            <TextField
              id="outlined-basic"
              label="Enter Food Amount"
              variant="outlined"
              type="text"
              name="foodQuantity"
              required="required"
              placeholder="Enter Food Quantity"
              pattern="\d+(\.\d{1,2})?"
              onChange={handleAddFormChange}
            /> */}


            {/* <input
          type="text"
          name="unit"
          required="required"
          placeholder="Enter Unit"
          onChange={handleAddFormChange}
        /> */}

            {/* <select type="text"
          name="unit"
          required="required" onChange={handleAddFormChange}> 
          <option value="-">Select Unit</option>
          <option value="kg">kg</option>
          <option value="liter">liter</option>
          <option value="piece">piece</option>
          <option value="box">box</option>
        </select> */}

            {/* <FormControl  >
        <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
        <Select sx={{minWidth: 120 }}
          type="text"
          name="unit"
          label="Unit"
          required="required" 
          onChange={handleAddFormChange} 
        >
          <MenuItem value={10}>kg</MenuItem>
          <MenuItem value="liter">liter</MenuItem>
          <MenuItem value="piece">piece</MenuItem>
          <MenuItem value="box">box</MenuItem>
          
        </Select>
      </FormControl> */}

            {/* <FormControl sx={{ minWidth: 120 }}>
              <InputLabel htmlFor="demo-customized-select-native">
                Select Unit
              </InputLabel>
              <NativeSelect
                type="text"
                name="unit"
                // value={addFormData}
                label="Unit"
                required="required"
                onChange={handleAddFormChange}
                // input={<BootstrapInput />}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              >
                <option aria-label="None" value="" />
                <option value={"kg"}>kg</option>
                <option value={"liter"}>liter</option>
                <option value={"piece"}>piece</option>
                <option value={"box"}>box</option>
              </NativeSelect>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: 120, minHeight: 56 }}
            >
              Add
            </Button> */}
          </form>

          <form onSubmit={handleEditFormSubmit}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <Fragment>
                    {editfoodId === food.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        food={food}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </Table>
          </form>
        </div>
      
    </section>
  );
}
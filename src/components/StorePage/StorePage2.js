import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./food-data.json";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReadOnlyRow from "./foodReadOnlyRow";
import EditableRow from "./FoodEditable";
import Table from "react-bootstrap/Table";
import DatePicker1 from "./DatePicker";
import MainFeaturedPost from "../HomePage/MainFeaturedPost";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import "react-datepicker/dist/react-datepicker.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import OutlinedInput from "@mui/material/OutlinedInput";

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import SP3 from "../StorePage3 copy";

const title = {
  title: "Store Page",
  description: "",
  image: "https://source.unsplash.com/D6Tu_L3chLE/",
  imageText: "",
  linkText: "",
  imageText: "",
  linkText: "",
};

const today = dayjs();
const isInCurrentYear = (date) => date.get("year") === dayjs().get("year");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
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
  const [foods, setFoods] = useState([data]);
  const [selectedDate, setSelectedDate] = useState(null);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(`/api/restaurant/`)
      .then((response) => {
        console.log(user._id);
        const restaurant = response.data.data.filter(
          (restaurant) =>
            restaurant.employees.find((v) => v === user._id) !== undefined
        );
        setRestaurant(restaurant);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [user._id]);

  let appointmentFetchToken = Symbol("appointmentFetchToken");
  useEffect(() => {
    (async () => {
      let response;
      console.log("Starting appointment get");
      try {
        const my_token = Symbol("appointmentFetchToken");
        appointmentFetchToken = my_token;
        response = await axios.get("/api/appointment/");
        if (my_token !== appointmentFetchToken) return;
      } catch (error) {
        console.warn(error);
        return;
      }
      console.log("GET appointments", response, restaurant);

      const filteredAppointments = response.data.data.filter(
        (appointment) =>
          restaurant.find((v) => v._id === appointment.restaurant) !== undefined
      );
      setAppointment(filteredAppointments);
      const foods = filteredAppointments.map((appointment) => appointment.food);
      const changedFoods = foods.flat().map((v) => {
        return {
          food: v.name,
          quantity: v.quantity,
          unit: v.unit,
          _id: v._id,
        };
      });
      setFoods(changedFoods);
    })();
  }, [restaurant]);

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
      const response = await axios.post("/your-api-endpoint", {
        date: selectedDate,
      });

      console.log(response.data);
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
        const {
          data: { data: addedFood },
        } = response;
        setFoods([...foods, addedFood]);
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

    setFoods(newfoods);
    setEditfoodId(null);
  };

  const handleEditClick = (event, food) => {
    event.preventDefault();
    setEditfoodId(food.id);

    const formValues = {
      food: food.food,
      foodQuantity: food.foodQuantity,
      unit: food.unit,
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

    setFoods(newfoods);
  };

  return (
    <section>
      <div className="app-container">
        {/* <h1>Store Page</h1> */}
        <MainFeaturedPost post={title} />

        <SP3 />

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

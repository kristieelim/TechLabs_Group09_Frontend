import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import axios from "./api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      <h2>Employee Name: {user.firstName + " " + user.lastName}</h2>
      {restaurant.length > 0 && <h2>Store Name: {restaurant[0].name} </h2>}
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
          <label htmlFor="food-items">Food Items:</label>
          {foodItems.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={item.name}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
              <select
                name="unit"
                value={item.unit}
                onChange={(e) => handleFoodItemChange(index, e)}
              >
                <option value="">Select Unit</option>
                <option value="KG">KG</option>
                <option value="LITER">LITER</option>
                <option value="PIECE">PIECE</option>
                <option value="BOX">BOX</option>
              </select>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFoodItem(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddFoodItem}>
            Add Food Item
          </button>
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
        {message && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

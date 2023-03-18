import React, {useState, Fragment} from 'react';
import {nanoid} from 'nanoid';
import data from "./food-data.json";
import ReadOnlyRow from './foodReadOnlyRow';
import EditableRow from './FoodEditable';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function StorePage() {
  const [foods, setfoods] = useState(data);
  const [selectedDate, setSelectedDate] = useState(null);

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
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newfood = {
      id: nanoid(),
      food: addFormData.food,
      foodQuantity: addFormData.foodQuantity,
      unit: addFormData.unit,
    };

    const newfoods = [...foods, newfood];
    setfoods(newfoods);
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
    <div className="app-container">
      <h1>Store Page</h1>

      <h2>Select Date and Time</h2>
      <div style={{ display: "inline-block" }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
        />
      </div>
      <div style={{ display: "inline-block", marginLeft: "10px" }}>
        <input
          type="time"
          name="time"
          required="required"
          onChange={handleAddFormChange}
        />
      </div>

      <h2>Add Food</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="food"
          required="required"
          placeholder="Enter Food Name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="foodQuantity"
          required="required"
          placeholder="Enter Food Quantity"
          pattern="\d+(\.\d{1,2})?"
          onChange={handleAddFormChange}
        />
        {/* <input
          type="text"
          name="unit"
          required="required"
          placeholder="Enter Unit"
          onChange={handleAddFormChange}
        /> */}
        <select name="unit" required="required" onChange={handleAddFormChange}>
          <option value="">Select Unit</option>
          <option value="kg">kg</option>
          <option value="g">liter</option>
          <option value="lb">piece</option>
          <option value="oz">box</option>
        </select>

        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleEditFormSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
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
  );
}

import React from "react";
import { useState } from "react";

const ReadOnlyRow = ({food, handleEditClick, handleDeleteClick}) => {
    
    const [foodQuantity, setFoodQuantity] = useState(food.foodQuantity);

    const handleIncrementClick = () => {
        setFoodQuantity(prevQuantity => Number(prevQuantity) + 1);
      };
    
      const handleDecrementClick = () => {
        setFoodQuantity((prevQuantity) => Number(prevQuantity) - 1);
      };
    return (
    <tr>
      <td>{food.food}</td>
      <td>{foodQuantity}</td> 
      <td>{food.unit}</td> 
      <td>

        {/* <button
          type="button"
          onClick={handleIncrementClick }
        >
          +
        </button>
        <button
          type="button"
          onClick={ handleDecrementClick}
        >
          -
        </button> */}
        <button
          type="button"
          onClick={(event) => handleEditClick(event, food)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(food.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;


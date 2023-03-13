import React from "react";
import { useState } from "react";

const ReadOnlyRow = ({contact, handleEditClick, handleDeleteClick}) => {
    
    const [foodQuantity, setFoodQuantity] = useState(contact.foodQuantity);

    const handleIncrementClick = () => {
        setFoodQuantity(prevQuantity => Number(prevQuantity) + 1);
      };
    
      const handleDecrementClick = () => {
        setFoodQuantity((prevQuantity) => Number(prevQuantity) - 1);
      };
    return (
    <tr>
      <td>{contact.food}</td>
      <td>{foodQuantity}</td> 
      <td>

        <button
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
        </button>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;


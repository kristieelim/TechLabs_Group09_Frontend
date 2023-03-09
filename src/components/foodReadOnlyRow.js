import React from "react";

const ReadOnlyRow = ({contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.food}</td>
      <td>{contact.foodQuantity}</td> 
      <td>
        <button
          type="button"
          onClick={"increment()"}
        >
          +
        </button>
        <button
          type="button"
          onClick={"decrease()"}
        >
          -
        </button>

        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;


// function increment() {
//     contact.foodQuantity += 1
//     countEl.textContent = count
// }
import React from "react";
import Button from "@mui/material/Button";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.email}</td>
      <td>
        <Button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </Button>
        <Button type="button" onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
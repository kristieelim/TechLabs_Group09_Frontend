import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <TextField
          type="text"
          required="required"
          placeholder="First Name"
          name="firstName"
          value={editFormData.firstName}
          onChange={handleEditFormChange}
        ></TextField>
      </td>
      <td>
        <TextField
          type="text"
          required="required"
          placeholder="Last Name"
          name="lastName"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
        ></TextField>
      </td>
      <td>
        <TextField
          type="email"
          required="required"
          placeholder="Email"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></TextField>
      </td>
      <td>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
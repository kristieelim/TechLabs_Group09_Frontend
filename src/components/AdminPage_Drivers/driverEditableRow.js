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
          placeholder="Enter a name"
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></TextField>
      </td>
      <td>
        <TextField
          type="text"
          required="required"
          placeholder="Enter a phone number"
          name="phoneNumber"
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        ></TextField>
      </td>
      <td>
        <TextField
          type="email"
          required="required"
          placeholder="Enter an email address"
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
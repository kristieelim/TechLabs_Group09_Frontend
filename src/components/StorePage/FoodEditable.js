
import React from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
      {/* <TextField id="outlined-basic" label="Enter Food..." variant="outlined"> */}
        <TextField
          type="text"
          required="required"
          placeholder="Enter Food..."
          name="food"
          value={editFormData.food}
          onChange={handleEditFormChange}
        ></TextField>
      </td>

      <td>
      
        <TextField
          type="text"
          required="required"
          placeholder="Enter food quantity..."
          name="foodQuantity"
          value={editFormData.foodQuantity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        {/* <TextField
          type="text"
          required="required"
          placeholder="Enter unit..."
          name="unit"
          value={editFormData.unit}
          onChange={handleEditFormChange}
        ></TextField> */}
      
      <FormControl sx={{minWidth: 120}} >
        <InputLabel htmlFor="demo-customized-select-native">Select Unit</InputLabel>
        <NativeSelect
          type="text"
          name="unit"
          // value={addFormData}
          label="Unit"
          required="required" 
          onChange={handleEditFormChange} 
          value={editFormData.unit}
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

      </td>
      <td>
        <Button type="submit"  >Save</Button>
        <Button type="button"  onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
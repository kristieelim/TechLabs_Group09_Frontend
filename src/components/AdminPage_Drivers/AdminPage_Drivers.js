import React, {useState, useEffect, Fragment} from 'react';
import {nanoid} from 'nanoid';
//import data from "./drivers-mock-data.json";
import ReadOnlyRow from './driverReadOnlyRow';
import EditableRow from './driverEditableRow';
import Table from 'react-bootstrap/Table';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from "../api/axios" 

const USER_URL = "/api/user";

export default function AdminPage_Drivers() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setContacts(response.data.data.filter((item) => item.type === "DRIVER"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [editContactId, setEditContactId] = useState(null);

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

    const newContact = {
      _id: nanoid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      email: addFormData.email
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      _id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <h1>Admin Page - List of Drivers</h1>

      <h2>Add a driver</h2>
      <form onSubmit={handleAddFormSubmit}>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          required="required"
          placeholder="First Name"
          onChange={handleAddFormChange}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          required="required"
          placeholder="Last Name"
          onChange={handleAddFormChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email address"
          onChange={handleAddFormChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: 120, minHeight: 56 }}
        >
          Add
        </Button>
      </form>

      <form onSubmit={handleEditFormSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment key={contact._id}>
                {editContactId === contact._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
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

import React, {useState, useEffect, Fragment}  from 'react'
//import {nanoid} from 'nanoid';
//import data from "./stores-mock-data.json";
import ReadOnlyRow from './storeReadOnlyRow';
import EditableRow from './storeEditableRow';
import Table from 'react-bootstrap/Table';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from "../api/axios";

const USER_URL = "/api/user";

export default function AdminPage_Stores() {
    const [contacts, setContacts] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
    axios
      .get(USER_URL)
      .then((response) => {
        setContacts(response.data.data.filter((item) => item.type === "EMPLOYEE"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
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
      email: addFormData.email,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      type: "EMPLOYEE",
      password: addFormData.password
    };

    axios
      .post(USER_URL, newContact)
      .then((response) => {
        const addedContact = response.data.data;
        setContacts([...contacts, addedContact]);
        setAddFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setMessage({ type: "success", text: "New store employee added successfully." });

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h1>List of Store Employees</h1>

      <h2>Add a store employee</h2>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

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
          placeholder="Email"
          onChange={handleAddFormChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="string"
          name="password"
          required="required"
          placeholder="Password"
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
              <Fragment>
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

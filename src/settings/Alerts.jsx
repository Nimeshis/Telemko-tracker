import React, { useState } from "react";
import axios from "axios";
import Action from './Action'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const Alerts = ({ showForm, setShowForm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [object, setObject] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [objectGroups, setObjectGroups] = useState("");
  const [alertType, setAlertType] = useState("");
  const [text, setText] = useState("");
  const [objectGroup, setObjectGroup] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [severity, setSeverity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      address,
      phone,
      object,
      objectGroups,
      alertType,
      severity,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3000/company",
        formData
      );

      console.log("Success:", response.data);
      setName("");
      setAddress("");
      setPhone("");
      setObject("");
      setCountry("");
      setState("");
      setObjectGroups("");
      setAlertType("");
      setText("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <Dialog open={showForm} onClose={handleClose}>
      <DialogTitle>Add Alert</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Company"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="address"
          label="Branch"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div>
          <label>Based On:</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>
              <input
                type="radio"
                name="basedOn"
                value="vehicle"
                checked={!objectGroup}
                onChange={() => setObjectGroup(false)}
              />
              Vehicle
            </label>
            <label>
              <input
                type="radio"
                name="basedOn"
                value="vehicleGroup"
                checked={objectGroup}
                onChange={() => setObjectGroup(true)}
              />
              Vehicle Group
            </label>
          </div>
        </div>
        {objectGroup && (
          <TextField
            margin="dense"
            id="objectGroups"
            label="Object Group"
            type="text"
            fullWidth
            value={objectGroups}
            onChange={(e) => setObjectGroups(e.target.value)}
            required
          />
        )}
        <TextField
          margin="dense"
          id="object"
          label="Object"
          type="text"
          fullWidth
          value={object}
          onChange={(e) => setObject(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="state"
          label="Alert Name"
          type="text"
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="alertType"
          select
          label="Alert Type"
          fullWidth
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
          required
        >
          <option value="911">911</option>
          <option value="AC misuse">AC misuse</option>
          <option value="Address overstay">Address overstay</option>
          <option value="Alcohol misuse">Alcohol misuse</option>
        </TextField>
        <TextField
          margin="dense"
          id="text"
          label="Text"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div>
          <label>Valid Day(s):</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>
              <input
                type="radio"
                name="validDays"
                value="everyday"
                checked={!showDays}
                onChange={() => setShowDays(false)}
              />
              Everyday
            </label>
            <label>
              <input
                type="radio"
                name="validDays"
                value="custom"
                checked={showDays}
                onChange={() => setShowDays(true)}
              />
              Custom
            </label>
          </div>
        </div>
        {showDays && (
          <div>
            <label>Days of the Week:</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {daysOfWeek.map((day, index) => (
                <label key={index}>
                  <input type="checkbox" name="daysOfWeek" value={day} />
                  {day}
                </label>
              ))}
            </div>
          </div>
        )}
        <TextField
          margin="dense"
          id="severity"
          select
          label="Severity"
          fullWidth
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alerts;

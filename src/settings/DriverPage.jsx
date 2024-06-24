import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const DriverPage = ({ showForm, setShowForm }) => {
  const [driverName, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDriver = {
      driverName,
      address,
      phone,
      licenseNumber,
      country,
      state,
      city,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3002/driver",
        formDriver
      );

      console.log("Success:", response.data);
      setName("");
      setAddress("");
      setPhone("");
      setLicenseNumber("");
      setCountry("");
      setState("");
      setCity("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <Dialog open={showForm} onClose={handleClose}>
      <DialogTitle>Add Driver</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="driverName"
          label="Driver Name"
          type="text"
          fullWidth
          value={driverName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone Number"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="licenseNumber"
          label="License Number"
          type="text"
          fullWidth
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="country"
          label="Country"
          type="text"
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="state"
          label="State"
          type="text"
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          id="city"
          label="City"
          type="text"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
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

export default DriverPage;

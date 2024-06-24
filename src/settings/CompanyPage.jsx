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

const CompanyPage = ({ showForm, setShowForm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      address,
      phone,
      pan,
      country,
      state,
      city,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3002/company",
        formData
      );

      console.log("Success:", response.data);
      setName("");
      setAddress("");
      setPhone("");
      setPan("");
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
      <DialogTitle>Add Company</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Company Name"
          type="text"
          fullWidth
          value={name}
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
          id="pan"
          label="PAN"
          type="text"
          fullWidth
          value={pan}
          onChange={(e) => setPan(e.target.value)}
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

export default CompanyPage;

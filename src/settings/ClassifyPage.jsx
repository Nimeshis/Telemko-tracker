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

const ClassifyPage = ({ showForm, setShowForm }) => {
  const [tripStartTime, setTripStartTime] = useState("");
  const [tripEndTime, setTripEndTime] = useState("");
  const [tripLocation, setTripLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [driver, setDriver] = useState("");
  const [fuelConsumed, setFuelConsumed] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [modifyDate, setModifyDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formTrip = {
      tripStartTime,
      tripEndTime,
      tripLocation,
      distance,
      tripDuration,
      driver,
      fuelConsumed,
      status,
      note,
      modifyDate,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3002/trip",
        formTrip
      );

      console.log("Success:", response.data);

      setTripStartTime("");
      setTripEndTime("");
      setTripLocation("");
      setDistance("");
      setTripDuration("");
      setDriver("");
      setFuelConsumed("");
      setStatus("");
      setNote("");
      setModifyDate("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={showForm} onClose={() => setShowForm(false)}>
      <DialogTitle>Add Classify Trips</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="tripStartTime"
          label="Trip Start Time"
          type="datetime-local"
          fullWidth
          value={tripStartTime}
          onChange={(e) => setTripStartTime(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="tripEndTime"
          label="Trip End Time"
          type="datetime-local"
          fullWidth
          value={tripEndTime}
          onChange={(e) => setTripEndTime(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="tripLocation"
          label="Trip Location"
          type="text"
          fullWidth
          value={tripLocation}
          onChange={(e) => setTripLocation(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="distance"
          label="Distance (km)"
          type="number"
          fullWidth
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="tripDuration"
          label="Trip Duration (minutes)"
          type="number"
          fullWidth
          value={tripDuration}
          onChange={(e) => setTripDuration(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="driver"
          label="Driver"
          type="text"
          fullWidth
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="fuelConsumed"
          label="Fuel Consumed (liters)"
          type="number"
          fullWidth
          value={fuelConsumed}
          onChange={(e) => setFuelConsumed(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="note"
          label="Note"
          type="text"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="modifyDate"
          label="Modify Date"
          type="date"
          fullWidth
          value={modifyDate}
          onChange={(e) => setModifyDate(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowForm(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassifyPage;

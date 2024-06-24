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

const JobPage = ({ showForm, setShowForm }) => {
  const [jobName, setJobName] = useState("");
  const [description, setDescription] = useState("");
  const [noOfCheckpoint, setNoOfCheckpoint] = useState("");
  const [noOfSchedule, setNoOfSchedule] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [jobEndTime, setJobEndTime] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [jobStartTime, setJobStartTime] = useState("");
  const [tripType, setTripType] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDate, setJobDate] = useState("");
  const [assign, setAssign] = useState("");
  const [document, setDocument] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formJob = {
      jobName,
      description,
      noOfCheckpoint,
      noOfSchedule,
      scheduleType,
      validFrom,
      jobEndTime,
      jobStatus,
      jobStartTime,
      tripType,
      jobType,
      jobDate,
      assign,
      document,
      alert,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3002/job",
        formJob
      );

      console.log("Success:", response.data);

      setJobName("");
      setDescription("");
      setNoOfCheckpoint("");
      setNoOfSchedule("");
      setScheduleType("");
      setValidFrom("");
      setJobEndTime("");
      setJobStatus("");
      setJobStartTime("");
      setTripType("");
      setJobType("");
      setJobDate("");
      setAssign("");
      setDocument("");
      setAlert("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={showForm} onClose={() => setShowForm(false)}>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="jobName"
          label="Job Name"
          type="text"
          fullWidth
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="noOfCheckpoint"
          label="Number of Checkpoints"
          type="number"
          fullWidth
          value={noOfCheckpoint}
          onChange={(e) => setNoOfCheckpoint(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="noOfSchedule"
          label="Number of Schedules"
          type="number"
          fullWidth
          value={noOfSchedule}
          onChange={(e) => setNoOfSchedule(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="scheduleType"
          label="Schedule Type"
          type="text"
          fullWidth
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="validFrom"
          label="Valid From"
          type="date"
          fullWidth
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="jobEndTime"
          label="Job End Time"
          type="datetime-local"
          fullWidth
          value={jobEndTime}
          onChange={(e) => setJobEndTime(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="jobStatus"
          label="Job Status"
          type="text"
          fullWidth
          value={jobStatus}
          onChange={(e) => setJobStatus(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="jobStartTime"
          label="Job Start Time"
          type="datetime-local"
          fullWidth
          value={jobStartTime}
          onChange={(e) => setJobStartTime(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="tripType"
          label="Trip Type"
          type="text"
          fullWidth
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="jobType"
          label="Job Type"
          type="text"
          fullWidth
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="jobDate"
          label="Job Date"
          type="date"
          fullWidth
          value={jobDate}
          onChange={(e) => setJobDate(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="assign"
          label="Assign"
          type="text"
          fullWidth
          value={assign}
          onChange={(e) => setAssign(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="document"
          label="Document"
          type="text"
          fullWidth
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="alert"
          label="Alert"
          type="text"
          fullWidth
          value={alert}
          onChange={(e) => setAlert(e.target.value)}
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

export default JobPage;

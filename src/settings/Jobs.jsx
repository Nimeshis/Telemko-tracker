import React, { useEffect, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "../common/components/LocalizationProvider";
import PageLayout from "../common/components/PageLayout";
import SettingsMenu from "./components/SettingsMenu";
import TableShimmer from "../common/components/TableShimmer";
import SearchHeader, { filterByKeyword } from "./components/SearchHeader";
import { useRestriction } from "../common/util/permissions";
import useSettingsStyles from "./common/useSettingsStyles";
import CompanyPage from "./CompanyPage";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import JobPage from "./JobPage";

const Jobs = () => {
  const classes = useSettingsStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [showPage, setShowPage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]); // this is an array
  const limitCommands = useRestriction("limitCommands");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({}); //this is a dictionary

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://108.181.195.185:3002/job");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error feteching data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://108.181.195.185:3002/job/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEditOpen = (company) => {
    setEditData(company);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://108.181.195.185:3002/job/${editData.jobId}`,
        editData
      );
      setEditDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "jobName",
        header: "Job Name",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "noOfCheckpoint",
        header: "Number od Check points",
        size: 200,
      },
      {
        accessorKey: "noOfSchedule",
        header: "Number of Schedule",
        size: 150,
      },
      {
        accessorKey: "scheduleType",
        header: "Schedule Type",
        size: 150,
      },
      {
        accessorKey: "validFrom",
        header: "Valid From",
        size: 150,
      },
      {
        accessorKey: "jobEndTime",
        header: "Job End Time",
        size: 150,
      },
      {
        accessorKey: "jobStartTime",
        header: "Job Start Time",
        size: 150,
      },
      {
        accessorKey: "tripType",
        header: "Trip Type",
        size: 150,
      },
      {
        accessorKey: "jobType",
        header: "Job Type",
        size: 150,
      },
      {
        accessorKey: "jobDate",
        header: "Job Date",
        size: 150,
      },
      {
        accessorKey: "jobStartTime",
        header: "Job Start Time ",
        size: 150,
      },
      {
        accessorKey: "assign",
        header: "Assign",
        size: 150,
      },
      {
        accessorKey: "document",
        header: "Document",
        size: 150,
      },
      {
        accessorKey: "alert",
        header: "Alert",
        size: 150,
      },
      {
        id: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleDelete(row.original.jobId)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          ),
      },
      {
        id: "edit-actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleEditOpen(row.original)}
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          ),
      },
    ],
    [limitCommands]
  );

  const filteredItems = useMemo(
    () => items.filter(filterByKeyword(searchKeyword)),
    [items, searchKeyword]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredItems,
    state: { isLoading: loading },
  });

  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "sharedSavedCommands"]}
    >
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Jobs</h2>
      </div>
      {loading ? (
        <TableShimmer columns={limitCommands ? 3 : 6} endAction />
      ) : (
        <MaterialReactTable table={table} />
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <button
          style={{
            borderRadius: "100%",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "60px",
            height: "60px",
          }}
          disabled={limitCommands}
          onClick={() => setShowPage(true)}
        >
          +
        </button>
      </div>
      <JobPage
        showForm={showPage}
        setShowForm={(show) => {
          setShowPage(show);
          if (!show) fetchData();
        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="jobId"
            label="Job ID"
            type="number"
            fullWidth
            value={editData.jobId || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobName"
            label="Job Name"
            type="text"
            fullWidth
            value={editData.jobName || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editData.description || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="noOfCheckpoint"
            label="Number of Checkpoints"
            type="number"
            fullWidth
            value={editData.noOfCheckpoint || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="noOfSchedule"
            label="Number of Schedules"
            type="number"
            fullWidth
            value={editData.noOfSchedule || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="scheduleType"
            label="Schedule Type"
            type="text"
            fullWidth
            value={editData.scheduleType || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="validFrom"
            label="Valid From"
            type="date"
            fullWidth
            value={editData.validFrom || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobEndTime"
            label="Job End Time"
            type="datetime-local"
            fullWidth
            value={
              editData.jobEndTime
                ? new Date(editData.jobEndTime).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobStatus"
            label="Job Status"
            type="text"
            fullWidth
            value={editData.jobStatus || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobStartTime"
            label="Job Start Time"
            type="datetime-local"
            fullWidth
            value={
              editData.jobStartTime
                ? new Date(editData.jobStartTime).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tripType"
            label="Trip Type"
            type="text"
            fullWidth
            value={editData.tripType || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobType"
            label="Job Type"
            type="text"
            fullWidth
            value={editData.jobType || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="jobDate"
            label="Job Date"
            type="date"
            fullWidth
            value={editData.jobDate || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="assign"
            label="Assign"
            type="text"
            fullWidth
            value={editData.assign || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="document"
            label="Document"
            type="text"
            fullWidth
            value={editData.document || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="alert"
            label="Alert"
            type="text"
            fullWidth
            value={editData.alert || ""}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default Jobs;

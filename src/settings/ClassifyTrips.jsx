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
import { Class } from "@mui/icons-material";
import ClassifyPage from "./ClassifyPage";

const ClassifyTrips = () => {
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
      const response = await axios.get("http://108.181.195.185:3002/trip");
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
      await axios.delete(`http://108.181.195.185:3002/trip/${id}`);
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
        `http://108.181.195.185:3002/trip/${editData.tripId}`,
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
        accessorKey: "tripStartTime",
        header: "Trip Start Time",
        size: 150,
      },
      {
        accessorKey: "tripEndTime",
        header: "Trip End Time",
        size: 200,
      },
      {
        accessorKey: "tripLocation",
        header: "Trip Location",
        size: 200,
      },
      {
        accessorKey: "distance",
        header: "Distance",
        size: 150,
      },

      {
        accessorKey: "tripDuration",
        header: "Trip Duration",
        size: 150,
      },
      {
        accessorKey: "driver",
        header: "Driver",
        size: 150,
      },
      {
        accessorKey: "fuelConsumed",
        header: "Fuel Consumed",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "note",
        header: "Note",
        size: 150,
      },
      {
        id: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleDelete(row.original.tripId)}
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
        <h2>Classify Trips</h2>
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
      <ClassifyPage
        showForm={showPage}
        setShowForm={(show) => {
          setShowPage(show);
          if (!show) fetchData();
        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Trip</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="tripStartTime"
            label="Trip Start Time"
            type="datetime-local"
            fullWidth
            value={
              editData.tripStartTime
                ? new Date(editData.tripStartTime).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tripEndTime"
            label="Trip End Time"
            type="datetime-local"
            fullWidth
            value={
              editData.tripEndTime
                ? new Date(editData.tripEndTime).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tripLocation"
            label="Trip Location"
            type="text"
            fullWidth
            value={editData.tripLocation || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="distance"
            label="Distance (km)"
            type="number"
            fullWidth
            value={editData.distance || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tripDuration"
            label="Trip Duration (minutes)"
            type="number"
            fullWidth
            value={editData.tripDuration || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="driver"
            label="Driver"
            type="text"
            fullWidth
            value={editData.driver || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="fuelConsumed"
            label="Fuel Consumed (liters)"
            type="number"
            fullWidth
            value={editData.fuelConsumed || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={editData.status || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="note"
            label="Note"
            type="text"
            fullWidth
            value={editData.note || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="modifyDate"
            label="Modify Date"
            type="date"
            fullWidth
            value={editData.modifyDate || ""}
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

export default ClassifyTrips;

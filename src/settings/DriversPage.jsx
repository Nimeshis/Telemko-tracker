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
import DriverPage from "./DriverPage";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";

const DriversPage = () => {
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
      const response = await axios.get("http://108.181.195.185:3002/driver");
      setItems(response.data);
      setLoading(false);
      console.log(response.data);
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
      await axios.delete(`http://108.181.195.185:3002/driver/${id}`);
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
        `http://108.181.195.185:3002/driver/${editData.driver_id}`,
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
        accessorKey: "driverName",
        header: "Driver Name",
        size: 100,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 75,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 75,
      },
      {
        accessorKey: "licenseNumber",
        header: "License Number",
        size: 75,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 75,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 75,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 75,
      },
      // {
      //   accessorKey: "license_to_drive",
      //   header: "License to Drive",
      //   size: 75,
      // },
      // {
      //   accessorKey: "has_user",
      //   header: "Has User",
      //   size: 75,
      // },
      // {
      //   accessorKey: "username",
      //   header: "Username",
      //   size: 75,
      // },
      // {
      //   accessorKey: "password",
      //   header: "Password",
      //   size: 100,
      // },
      {
        id: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleDelete(row.original.driver_id)}
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
        <h2>Driver</h2>
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
      <DriverPage
        showForm={showPage}
        setShowForm={(show) => {
          setShowPage(show);
          if (!show) fetchData();
        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Driver</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="driverName"
            label="Driver Name"
            type="text"
            fullWidth
            value={editData.driverName || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={editData.address || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={editData.phone || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="licenseNumber"
            label="License Number"
            type="text"
            fullWidth
            value={editData.licenseNumber || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="country"
            label="Country"
            type="text"
            fullWidth
            value={editData.country || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="state"
            label="State"
            type="text"
            fullWidth
            value={editData.state || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={editData.city || ""}
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

export default DriversPage;

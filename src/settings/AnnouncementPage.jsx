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

const AnnouncementPage = () => {
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
      const response = await axios.get("http://108.181.195.185:3002/company");
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
      await axios.delete(`http://108.181.195.185:3002/company/${id}`);
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
        `http://108.181.195.185:3002/company/${editData.company_id}`,
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
        accessorKey: "company_id",
        header: "Company ID",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Company Name",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Company Address",
        size: 200,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
      },
      {
        accessorKey: "pan",
        header: "PAN",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        id: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleDelete(row.original.company_id)}
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
        <h2>Announcemnt</h2>
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
      <CompanyPage
        showForm={showPage}
        setShowForm={(show) => {
          setShowPage(show);
          if (!show) fetchData();
        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Company Name"
            type="text"
            fullWidth
            value={editData.name || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Company Address"
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
            name="pan"
            label="PAN"
            type="text"
            fullWidth
            value={editData.pan || ""}
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

export default AnnouncementPage;

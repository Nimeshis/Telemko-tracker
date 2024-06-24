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
import ExpensePage from "./ExpensePage";

const Expense = () => {
  const classes = useSettingsStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [showPage, setShowPage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const limitCommands = useRestriction("limitCommands");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://108.181.195.185:3002/expense");
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
      await axios.delete(`http://108.181.195.185:3002/expense/${id}`);
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
        `http://108.181.195.185:3002/expense/${editData.expenseId}`,
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
        accessorKey: "vehicle",
        header: "vehicle",
        size: 150,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "expenseType",
        header: "Type",
        size: 200,
      },
      {
        accessorKey: "expenseFrom",
        header: "Expense Form",
        size: 150,
      },
      {
        accessorKey: "expenseTo",
        header: "Expense To",
        size: 150,
      },
      {
        accessorKey: "expenseDate",
        header: "Expense Date",
        size: 150,
      },
      {
        accessorKey: "expenseAmount",
        header: "Expense Amount",
        size: 150,
      },
      {
        accessorKey: "expenseDescription",
        header: "Expense Description",
        size: 150,
      },
      {
        accessorKey: "referenceNumber",
        header: "Reference Number",
        size: 150,
      },
      {
        accessorKey: "billAttached",
        header: "Bill Attached",
        size: 150,
      },
      {
        id: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) =>
          !limitCommands && (
            <IconButton
              onClick={() => handleDelete(row.original.expenseId)}
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
        <h2>Expense</h2>
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
      <ExpensePage
        showForm={showPage}
        setShowForm={(show) => {
          setShowPage(show);
          if (!show) fetchData();
        }}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="vehicle"
            label="vehicle"
            type="text"
            fullWidth
            value={editData.vehicle || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={editData.category || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseType"
            label="Expense Type"
            type="text"
            fullWidth
            value={editData.expenseType || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseFrom"
            label="Expense From"
            type="date"
            fullWidth
            value={editData.expenseFrom || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseTo"
            label="Expense To"
            type="date"
            fullWidth
            value={editData.expenseTo || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseDate"
            label="Expense Date"
            type="date"
            fullWidth
            value={editData.expenseDate || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseAmount"
            label="Expense Amount"
            type="text"
            fullWidth
            value={editData.expenseAmount || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseAmount"
            label="Expense Amount"
            type="text"
            fullWidth
            value={editData.expenseAmount || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="expenseDescription"
            label="Expense Description"
            type="text"
            fullWidth
            value={editData.expenseDescription || ""}
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

export default Expense;

import React, { useEffect, useState, useMemo } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";

import { useTranslation } from "../common/components/LocalizationProvider";
import PageLayout from "../common/components/PageLayout";
import SettingsMenu from "./components/SettingsMenu";
import TableShimmer from "../common/components/TableShimmer";
import SearchHeader, { filterByKeyword } from "./components/SearchHeader";
import { useRestriction } from "../common/util/permissions";
import useSettingsStyles from "./common/useSettingsStyles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";

const TravelPage = () => {
  const classes = useSettingsStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [showPage, setShowPage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]); // this is an array
  const limitCommands = useRestriction("limitCommands");
  const [showFilter, setShowFilter] = useState(false);

  const [formDialogOpen, setFormDialogOpen] = useState(false); 
  const [formData, setFormData] = useState({
    date_from: "",
    date_to: "",
    driver: "",
    kilometers: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://108.181.195.185:3002/company");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://108.181.195.185:3002/company", formData);
      setFormData({
        date_from: "",
        date_to: "",
        driver: "",
        kilometers: "",
      });
      fetchData();
      setFormDialogOpen(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "vehicle_name",
        header: "Vehicle Name",
        size: 100,
      },
      {
        accessorKey: "driver",
        header: "Driver",
        size: 100,
      },
      {
        accessorKey: "distance",
        header: "Distance",
        size: 100,
      },
      {
        accessorKey: "running",
        header: "Running",
        size: 100,
      },
      {
        accessorKey: "idle",
        header: "Idle",
        size: 100,
      },
      {
        accessorKey: "stop",
        header: "Stop",
        size: 100,
      },
      {
        accessorKey: "max_stoppage",
        header: "Max Stoppage",
        size: 100,
      },
      {
        accessorKey: "average_speed",
        header: "Average Speed",
        size: 100,
      },
      {
        accessorKey: "max_speed",
        header: "Max Speed",
        size: 100,
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Travel Summary</h2>
        <SortIcon
          sx={{ marginLeft: "8px", cursor: "pointer" }}
          onClick={() => setShowFilter(true)}
        />
      </div>
      <Dialog open={showFilter} onClose={() => setShowFilter(false)}>
        <DialogTitle>Filter Travel Report</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date_from"
            label="Date From"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.date_from}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="date_to"
            label="Date To"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.date_to}
            onChange={handleFormChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              id="company"
              name="company"
              value={formData.driver}
              onChange={handleFormChange}
            >
              <MenuItem value="">Select company</MenuItem>
              <MenuItem value="driver1">Driver 1</MenuItem>
              <MenuItem value="driver2">Driver 2</MenuItem>
              <MenuItem value="driver3">Driver 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="branch-label">Branch</InputLabel>
            <Select
              labelId="branch-label"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleFormChange}
            >
              <MenuItem value="">Select Branch</MenuItem>
              <MenuItem value="driver1">Driver 1</MenuItem>
              <MenuItem value="driver2">Driver 2</MenuItem>
              <MenuItem value="driver3">Driver 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="driver-label">Driver</InputLabel>
            <Select
              labelId="driver-label"
              id="driver"
              name="driver"
              value={formData.driver}
              onChange={handleFormChange}
            >
              <MenuItem value="">Select Driver</MenuItem>
              <MenuItem value="driver1">Driver 1</MenuItem>
              <MenuItem value="driver2">Driver 2</MenuItem>
              <MenuItem value="driver3">Driver 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="driver-label">Driver</InputLabel>
            <Select
              labelId="driver-label"
              id="driver"
              name="driver"
              value={formData.driver}
              onChange={handleFormChange}
            >
              <MenuItem value="">Select Driver</MenuItem>
              <MenuItem value="driver1">Driver 1</MenuItem>
              <MenuItem value="driver2">Driver 2</MenuItem>
              <MenuItem value="driver3">Driver 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="driver-label">Vehicle Brand</InputLabel>
            <Select
              labelId="driver-label"
              id="brand"
              name="brand"
              value={formData.driver}
              onChange={handleFormChange}
            >
              <MenuItem value="">Select Vehicle Brand</MenuItem>
              <MenuItem value="driver1">Brand 1</MenuItem>
              <MenuItem value="driver2">Brand 2</MenuItem>
              <MenuItem value="driver3">Brand 3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="kilometers"
            label="Kilometers"
            type="text"
            fullWidth
            value={formData.kilometers}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ position: "relative" }}>
        {loading ? (
          <TableShimmer columns={limitCommands ? 3 : 6} endAction />
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <MaterialReactTable table={table} />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default TravelPage;

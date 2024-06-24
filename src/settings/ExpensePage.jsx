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

const ExpensePage = ({ showForm, setShowForm }) => {
  const [vehicle, setVehicle] = useState("");
  const [category, setCategory] = useState("");
  const [expenseType, setType] = useState("");
  const [expenseFrom, setExpenseFrom] = useState("");
  const [expenseTo, setExpenseTo] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [billAttached, setBillAttached] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formExpense = {
      vehicle,
      category,
      expenseType,
      expenseFrom,
      expenseTo,
      expenseDate,
      expenseAmount,
      expenseDescription,
      referenceNumber,
      billAttached,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3002/expense",
        formExpense
      );

      console.log("Success:", response.data);
      setVehicle("");
      setCategory("");
      setType("");
      setExpenseFrom("");
      setExpenseTo("");
      setExpenseDate("");
      setExpenseAmount("");
      setExpenseDescription("");
      setReferenceNumber("");
      setBillAttached("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={showForm} onClose={() => setShowForm(false)}>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="vehicle"
          label="Vehicle"
          type="text"
          fullWidth
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseType"
          label="Expense Type"
          type="text"
          fullWidth
          value={expenseType}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseFrom"
          label="Expense From"
          type="date"
          fullWidth
          value={expenseFrom}
          onChange={(e) => setExpenseFrom(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseTo"
          label="Expense To"
          type="date"
          fullWidth
          value={expenseTo}
          onChange={(e) => setExpenseTo(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseDate"
          label="Expense Date"
          type="date"
          fullWidth
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseAmount"
          label="Expense Amount"
          type="number"
          fullWidth
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="referenceNumber"
          label="Reference Number"
          type="text"
          fullWidth
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="expenseDescription"
          label="Expense Description"
          type="text"
          fullWidth
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          name="billAttached"
          label="Bill Attached"
          type="text"
          fullWidth
          value={billAttached}
          onChange={(e) => setBillAttached(e.target.value)}
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

export default ExpensePage;

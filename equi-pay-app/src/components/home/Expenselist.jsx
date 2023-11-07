import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DatePicker } from '@mui/x-date-pickers';

function NeedToPayFees() {
  const [feesToPay, setFeesToPay] = useState(() => {
    // Load expenses from local storage when the component mounts
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    return storedExpenses || [];
  });

  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: '',
    date: null,
    amount: 0,
    notes: '',
  });
  const [openSettleUp, setOpenSettleUp] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const addExpense = (newExpense) => {
    setFeesToPay((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];

      // Save expenses to local storage when they change
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      return updatedExpenses;
    });
  };

  const settleUp = () => {
    setFeesToPay((prevExpenses) => {
      // Remove the selected expense
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== selectedExpense.id
      );

      // Save expenses to local storage when they change
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      return updatedExpenses;
    });

    // Close the settle-up dialog
    setOpenSettleUp(false);
  };

  const handleCreateExpense = () => {
    const newExpense = {
      id: new Date().getTime(),
      title: expenseData.title,
      date: expenseData.date.toISOString().split('T')[0], // Convert the date to a string with just the date part
      amount: parseFloat(expenseData.amount),
      notes: expenseData.notes,
    };

    addExpense(newExpense);

    // Reset the form or close the create expense dialog
    setExpenseData({
      title: '',
      date: null,
      amount: 0,
      notes: '',
    });
    setOpenCreateExpense(false);
  };

  return (
    <div className="container mx-auto mt-5" style={{ maxHeight: '80vh', overflow: 'auto' }}>
      <h1 className="text-2xl font-semibold mb-4">
        Expenses
        <IconButton onClick={() => setOpenCreateExpense(true)}>
          <ReceiptIcon />
        </IconButton>
      </h1>
      <ul className="space-y-4">
        {feesToPay.map((fee) => (
          <li key={fee.id} className="flex items-center p-4 rounded-md border border-gray-200">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">{fee.title}</h2>
              <p className="text-gray-600">Date: {fee.date}</p>
            </div>
            <div className="w-1/4 text-right">
              <p className="text-lg font-semibold">${fee.amount}</p>
            </div>
            <div className="w-1/4 text-right">
              <button
                onClick={() => {
                  setSelectedExpense(fee);
                  setOpenSettleUp(true);
                }}
                className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Settle Up
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog onClose={() => setOpenCreateExpense(false)} open={openCreateExpense} fullWidth>
        <DialogTitle>Create New Expense</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-2">
              <ReceiptIcon
                style={{
                  fontSize: '150px',
                  color: '#99e0c5',
                }}
              />
            </div>
            <div className="col-span-4">
              <p className="font-bold mb-2">Expense Description</p>
              <TextField
                fullWidth
                label="Expense description"
                size="small"
                value={expenseData.title}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, title: e.target.value })
                }
              />
              <p className="font-bold mb-2 mt-4">Expense Amount</p>
              <div className="flex items-center gap-4">
                <TextField
                  type="number"
                  className="w-1/2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  label="Expense amount"
                  value={expenseData.amount}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, amount: e.target.value })
                  }
                />
                <DatePicker
                  value={expenseData.date}
                  onChange={(date) => setExpenseData({ ...expenseData, date })}
                />
              </div>
              <p className="font-bold mb-2 mt-4">Add Notes</p>
              <TextField
                rows={3}
                fullWidth
                multiline
                label="Notes (Optional)"
                value={expenseData.notes}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, notes: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <Button variant="contained" onClick={handleCreateExpense}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog onClose={() => setOpenSettleUp(false)} open={openSettleUp} fullWidth>
        <DialogTitle>Settle Up Expense</DialogTitle>
        <DialogContent>
          <p>Settle up the following expense:</p>
          <p>
            <strong>Title:</strong> {selectedExpense ? selectedExpense.title : ''}
          </p>
          <p>
            <strong>Amount:</strong> {selectedExpense ? `$${selectedExpense.amount}` : ''}
          </p>
          <p>
            <strong>Date:</strong> {selectedExpense ? selectedExpense.date : ''}
          </p>
          <TextField
            type="number"
            fullWidth
            label="Settlement Amount"
            size="small"
            value={expenseData.amount}
            onChange={(e) =>
              setExpenseData({ ...expenseData, amount: e.target.value })
            }
          />
          <div className="mt-3">
            <Button variant="contained" onClick={settleUp}>
              Settle Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NeedToPayFees;

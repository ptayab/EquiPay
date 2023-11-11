import React, {useState} from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CreateExpense from "./CreateExpense";
import ExpenseDetail from "./ExpenseDetail";

import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, InputAdornment } from "@mui/material";
function NeedToPayFees() {
    const [feesToPay, setFeesToPay] = useState([
        { title: 'Electric Bill', Date: '2023-11-15', amount: 50 },
        { title: 'Rent', Date: '2023-11-30', amount: 800 },
        { title: 'Internet Subscription', Date: '2023-11-25', amount: 60 },
      ]);

    const [openedExpense, setOpenedExpense] = useState();
    const addExpense = (newExpense) => {
        setFeesToPay([...feesToPay, newExpense]);
      };
    
      const [open, setOpen] = useState(false);
      const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(null);
    
      const handleOpenDialog = (index) => {
        setSelectedExpenseIndex(index);
        setOpen(true);
      };
    
      const handleCloseDialog = () => {
        setOpen(false);
      };
    
      const settleUp = (index) => {
        // Create a copy of the feesToPay array
        const updatedFeesToPay = [...feesToPay];
    
        // Remove the expense at the specified index
        updatedFeesToPay.splice(index, 1);
    
        // Update the state to reflect the changes
        setFeesToPay(updatedFeesToPay);
    
        // Close the dialog
        handleCloseDialog();
      };
    

    return (
        <div className="container mx-auto mt-5" style={{
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <h1 className="text-2xl font-semibold mb-4">Expenses
            <CreateExpense addExpense={addExpense} />
            </h1>
            <ul className="space-y-4">
                {feesToPay.map((fee, index) => (
                    <li key={index} className="p-4 rounded-md border border-gray-200">
                        <div className={'flex items-center'}>
                            <div className="w-1/2">
                                <h2
                                    onClick={() => {
                                        if (openedExpense !== fee.title) {
                                            setOpenedExpense(fee.title);
                                        } else {
                                            setOpenedExpense(null);
                                        }
                                    }}
                                    className="text-lg font-semibold underline cursor-pointer">{fee.title}</h2>
                                <p className="text-gray-600">Date: {fee.Date}</p>
                            </div>
                            <div className="w-1/2 text-right">
                                <p className="text-lg font-semibold">${fee.amount}</p>
                                <div className="w-1/2 text-right">
              <Button variant="contained" onClick={() => handleOpenDialog(index)}>
                Settle Up
              </Button>
            </div>
                            </div>
                        </div>
                        {openedExpense === fee.title && (
                            <div>
                                <ExpenseDetail expense={fee}/>
                            </div>
                        )}
                    </li>
                ))}
                    <Dialog onClose={handleCloseDialog} open={open} fullWidth>
        <DialogTitle>Settle Up Expense</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <h1>Payment Page</h1>
            <TextField
              label="Enter the amount to pay"
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => settleUp(selectedExpenseIndex)}
              style={{ marginTop: '10px' }}
            >
              Pay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
            </ul>
        </div>
    );
}

export default NeedToPayFees;

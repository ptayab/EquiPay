import React, {useEffect, useState} from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CreateExpense from "./CreateExpense";
import ExpenseDetail from "./ExpenseDetail";

import {IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, InputAdornment} from "@mui/material";
import {authedRequest} from "../../http";
import {useParams} from "react-router-dom";

function NeedToPayFees() {
    const [feesToPay, setFeesToPay] = useState([]);
    const [reloadExpense, setReloadExpense] = useState(true);
    const {userId, groupId} = useParams();
    const [openedExpense, setOpenedExpense] = useState();
    const [users, setUsers] = useState([]);
    const addExpense = async (newExpense) => {
        try {
            await authedRequest.post(`/api/expenses`, {
                total: newExpense.amount,
                balance: newExpense.amount,
                name: newExpense.description,
                notes: newExpense.notes,
                created_at: newExpense.created_at,
                group_id: Number(groupId),
                user_id: Number(userId)
            });
            setReloadExpense(!reloadExpense)
        } catch (err) {
            console.log(err);
        }
    };
    const [open, setOpen] = useState(false);
    const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0); // State to track the payment amount


    const handleOpenDialog = (index) => {
        setSelectedExpenseIndex(index);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        
    
    };

    const settleUp = async (index) => {
        try {
          const expenseToPay = feesToPay[index];
          const response = await authedRequest.post('/api/expenses/pay', {
            expense_id: expenseToPay.id,
            user_id: userId,
            amount: paymentAmount
          });
    
            if (response.data.message === 'Payment successful') {
                // Update local state to reflect the changes
                const updatedFeesToPay = [...feesToPay];
                updatedFeesToPay.splice(index, 1);
                setFeesToPay(updatedFeesToPay);
                handleCloseDialog();
                setPaymentAmount(0); // Reset payment amount
                setReloadExpense(!reloadExpense); // Trigger a reload if necessary
            }

            handleCloseDialog();
        } catch (error) {
            console.error('Error making payment:', error.response ? error.response.data : error.message);
            // Handle error, show error message, etc.
        }finally {
            setPaymentAmount(0); // Reset payment amount regardless of success or failure
        }
    };

    useEffect(() => {
        authedRequest.get(`/api/expenses?user_id=${userId}&group_id=${groupId}`)
            .then(res => {
                if (res && res.data) {
                    setFeesToPay(res.data)
                }
            }).catch(err => {
            console.log(err);
        })
    }, [reloadExpense, userId]);

    return (
        <div className="container mx-auto mt-5" style={{
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <h1 className="text-2xl font-semibold mb-4">Expenses
                <CreateExpense addExpense={addExpense}/>
            </h1>
            <ul className="space-y-4">
                {feesToPay.map((fee, index) => (
                    <li key={index} className="p-4 rounded-md border border-gray-200">
                        <div className={'flex items-center'}>
                            <div className="w-1/2">
                                <h2
                                    onClick={() => {
                                        if (openedExpense !== fee.name) {
                                            setOpenedExpense(fee.name);
                                        } else {
                                            setOpenedExpense(null);
                                        }
                                    }}
                                    className="text-lg font-semibold underline cursor-pointer">{fee.name}</h2>
                                <p className="text-gray-600">Date: {fee.created_at}</p>
                            </div>
                            <div className="w-1/2 text-right">
                                <p className="text-lg font-semibold">${fee.total}</p>
                                <div className="w-1/2 text-right">
                                    <Button variant="contained" onClick={() => handleOpenDialog(index)}>
                                        Settle Up
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {openedExpense === fee.name && (
                            <div>
                                <ExpenseDetail expense={fee} userId={userId} />
                            </div>
                        )}
                    </li>
                ))}
                <Dialog onClose={handleCloseDialog} open={open} fullWidth>
                    <DialogTitle>Settle Up </DialogTitle>
                    <DialogContent>
                        <div style={{textAlign: 'center'}}>
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
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                          
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => settleUp(selectedExpenseIndex)}
                                style={{marginTop: '10px'}}
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

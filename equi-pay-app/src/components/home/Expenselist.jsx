import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateExpense from "./CreateExpense";
import ExpenseDetail from "./ExpenseDetail";
import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, InputAdornment } from "@mui/material";
import { authedRequest } from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function NeedToPayFees() {
    const [feesToPay, setFeesToPay] = useState([]);
    const [reloadExpense, setReloadExpense] = useState(true);
    const { userId, groupId } = useParams();
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [openedExpense, setOpenedExpense] = useState();
    const [groupDetails, setGroupDetails] = useState({ name: '', members: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFees, setFilteredFees] = useState([]);
    const navigate = useNavigate();

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

    const handleOpenDialog = (index) => {
        setSelectedExpenseIndex(index);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const settleUp = (index) => {
        const updatedFeesToPay = [...feesToPay];
        updatedFeesToPay.splice(index, 1);
        setFeesToPay(updatedFeesToPay);
        handleCloseDialog();
    };

    const handleSearch = () => {
        const query = searchQuery.toLowerCase().trim();
        if (query === '') {
            setFilteredFees(feesToPay);
        } else {
            const filteredExpenses = feesToPay.filter(
                (fee) =>
                    fee.name.toLowerCase().includes(query) || fee.created_at.toLowerCase().includes(query)
            );
            setFilteredFees(filteredExpenses);
        }
    };
        const deleteExpense = async (expenseId) => {
        try {
            await authedRequest.delete(`/api/expenses`, { data: { id: expenseId } });
            setReloadExpense(!reloadExpense); // Trigger a re-render to update the list
        } catch (err) {
            console.log(err);
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

    useEffect(() => {
        authedRequest.get(`/api/groups/${groupId}/details`)
            .then(res => {
                if (res && res.data) {
                    setGroupDetails(res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching group details:', err);
            });
    }, [groupId]);

    useEffect(() => {
        handleSearch();
    }, [feesToPay, searchQuery]);

    return (
        <div className="container mx-auto mt-5" style={{ maxHeight: '80vh', overflow: 'auto' }}>
            <h1 className="text-2xl font-semibold mb-4">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </IconButton>
                Expenses
                <CreateExpense addExpense={addExpense} />
            </h1>
            <div className="mb-6">
                <TextField
                    label="Search Expense by Name or Date"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="mb-6">
                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                    <h2 className="text-lg font-semibold mb-2">Group Name: {groupDetails.groupName}</h2>
                    <h3 className="text-md font-semibold mb-1">Group Members:</h3>
                    <ul className="pl-4">
                        {groupDetails.members.map((member) => (
                            <li key={member.id} style={{ listStyleType: 'none', padding: '5px 0', transition: 'background-color 0.3s', cursor: 'pointer' }}>
                                {member.displayname}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ul className="space-y-4">
                {filteredFees.length === 0 && <Alert severity="warning">No Records</Alert>}
                {filteredFees.map((fee, index) => (
                    <li key={index} className="p-4 rounded-md border border-gray-200">
                        <div className={'flex items-center'}>
                            <div className="w-1/2">
                                <h4
                                    onClick={() => {
                                        if (openedExpense !== fee.name) {
                                            setOpenedExpense(fee.name);
                                        } else {
                                            setOpenedExpense(null);
                                        }
                                    }}
                                    className="text-lg font-semibold underline cursor-pointer"
                                >
                                    {fee.name}
                                </h4>
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
                                <ExpenseDetail expense={fee} />
                            </div>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteExpense(fee.id)}
                        >
                            Delete
                        </Button>
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
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={() => settleUp(selectedExpenseIndex)} style={{ marginTop: '10px' }}>
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

import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateExpense from "./CreateExpense";
import ExpenseDetail from "./ExpenseDetail";
import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, InputAdornment } from "@mui/material";
import { authedRequest } from "../../http";
import {  useParams } from "react-router-dom";
import { Alert } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import AddMember from "./AddMember";

function NeedToPayFees() {
    const navigate = useNavigate();
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
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [reloadComments, setReloadComments] = useState(true);
    const [reload, setReload] = useState(true);

    const onNewComment = (newComment) => {
        setReloadComments(prev => !prev);
    };

    const handleAddComment = async () => {
        try {
            console.log('Adding comment:', userComment);
            // Send the comment to the server
            await authedRequest.post(`/api/comments`, {
                comment: userComment,
                user_id: Number(userId),
                group_id: Number(groupId),
            });

            // Update the local state using the functional form of setComments
            setComments(prevComments => [
                ...prevComments,
                { text: userComment, user: "Current User", time: new Date().toLocaleString() }
            ]);

            // Reset the userComment state
            setUserComment('');

            // Trigger a reload of comments
            onNewComment();
        } catch (error) {
            console.error('Error adding comment:', error.response ? error.response.data : error.message);
            // Handle error, show error message, etc.
        }
    };
    
    

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

          // Check if the payment amount is greater than the owing balance
            if (paymentAmount > expenseToPay.balance) {
                // Show an error message or handle it as needed
                setErrorMessage(
                    <>
                      <div>Payment amount exceeds owing balance.</div>
                      <div>Owing balance: ${expenseToPay.balance.toFixed(2)}.</div>
                      <div>Please retry.</div>
                    </>); return;
            }

      
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

                // Reset error message
                setErrorMessage('');

                // Show the success dialog
                setShowSuccessDialog(true);

                
            }

            handleCloseDialog();
        } catch (error) {
            console.error('Error making payment:', error.response ? error.response.data : error.message);
            // Handle error, show error message, etc.
        }finally {
            setPaymentAmount(0); // Reset payment amount regardless of success or failure
        }
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
                    console.log('Expense data:', res.data); 
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
    }, [groupId,reload]);

    useEffect(() => {
        handleSearch();
    }, [feesToPay, searchQuery]);

    const handleRemind = (email) => {

        navigate(`RemindUser/${email}`)
    };


    useEffect(() => {
        // Fetch comments for the group when the component mounts or when reloadComments changes
        authedRequest.get(`/api/comments?group_id=${groupId}`)
            .then(res => {
                if (res && res.data) {
                    console.log('Comments data:', res.data);
                    setComments(res.data);
                }
            })
            .catch(err => {
                console.log('Error fetching comments:', err);
            });
    }, [groupId, reloadComments]);

    return (
        <div className="container mx-auto mt-5" style={{ maxHeight: '80vh', overflow: 'auto' }}>
            {/* Expenses header */}
            <h1 className="text-2xl font-semibold mb-4">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </IconButton>
                Expenses
                <CreateExpense addExpense={addExpense} />
            </h1>
    
            {/* Search bar */}
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
    
            {/* Group details */}
            <div className="mb-6">
                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                    <h2 className="text-lg font-semibold mb-2">Group Name: {groupDetails.groupName}</h2>
                    <h3 className="text-md font-semibold mb-1 flex items-center">Group Members:
                        <AddMember
                            onAdded={() => {
                                setReload(!reload)
                            }}
                            members={groupDetails.members || []} />
                    </h3>
                    <ul className="pl-4">
                        {groupDetails.members.map((member) => (
                            <li key={member.id} style={{ listStyleType: 'none', padding: '5px 0', transition: 'background-color 0.3s', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => handleRemind(member.email)}>
                                        🔔
                                    </IconButton>
                                    <span style={{ marginLeft: '10px' }}>{member.displayname}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
     {/* Comments Section */}
    <div style={{ flex: 1 }}>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {/* Display comments */}
        <ul className="space-y-2" style={{ paddingRight: '20px' }}>
            {comments.map((comment, index) => (
                <li key={index} className="p-2 border border-gray-200 rounded-md">
                    <div>
                        <strong>{comment.displayname}:</strong> {comment.comment}
                    </div>
                    <div className="text-gray-500">{comment.created_at}</div>
                </li>
            ))}
        </ul>

        {/* Comment input */}
        <div className="mb-6">
            <TextField
                label="Add a Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
                Add Comment
            </Button>
        </div>
    </div>
            {/* Expenses list */}
            <ul className="space-y-4">
                {/* Display a warning if there are no records */}
                {filteredFees.length === 0 && <Alert severity="warning">No Records</Alert>}
                {filteredFees.map((fee, index) => (
                    <li key={index} className="p-4 rounded-md border border-gray-200">
                        {/* Expense details */}
                        <div className={'flex items-center'}>
                            {/* Left side */}
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
    
                            {/* Right side */}
                            <div className="w-1/2 text-right">
                                <p className="text-lg font-semibold">${fee.balance}</p>
                                <div className="w-1/2 text-right">
                                    {/* Display Settle Up button if the balance is greater than 0 */}
                                    {fee.balance > 0 && (
                                        <Button variant="contained" onClick={() => handleOpenDialog(index)}>
                                            Settle Up
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
    
                        {/* Display detailed expense information if opened */}
                        {openedExpense === fee.name && (
                            <div>
                                <ExpenseDetail expense={fee} userId={userId} />
                            </div>
                        )}
    
                        {/* Delete button */}
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

                
                {/* Settle Up Dialog */}
                <Dialog onClose={handleCloseDialog} open={open} fullWidth>
                    <DialogTitle>Settle Up </DialogTitle>
                    <DialogContent>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Payment Page</h1>
    
                            {/* Display error message if exists */}
                            {errorMessage && (
                                <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
                            )}
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
                            <Button variant="contained" color="primary" onClick={() => settleUp(selectedExpenseIndex)} style={{ marginTop: '10px' }}>
                                Pay
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
    
                {/* Success Dialog */}
                <Dialog onClose={() => setShowSuccessDialog(false)} open={showSuccessDialog} fullWidth>
                    <DialogTitle>Payment Successful</DialogTitle>
                    <DialogContent>
                        <div style={{ textAlign: 'center' }}>
                            <p>Your payment was successful!</p>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowSuccessDialog(false)}
                                style={{ marginTop: '10px' }}
                            >
                                OK
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                
            </ul>
        </div>
        
        
    );
}

export default NeedToPayFees;
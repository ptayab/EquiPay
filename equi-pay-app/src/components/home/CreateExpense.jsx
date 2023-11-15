
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment, MenuItem, Select,
    TextField,
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';

function CreateExpense({ addExpense, groups }) {
    const [open, setOpen] = useState(false);
    const [expenseData, setExpenseData] = useState({
        description: '',
        amount: 100,
        notes: '',
        date: null,
        group_id: null
    });

    const handleCreateExpense = (e) => {
        e.preventDefault();
        const newExpense = {
            id: new Date().getTime(), // You can use a unique ID generation method
            description: expenseData.description,
            amount: parseFloat(expenseData.amount),
            notes: expenseData.notes,
            group_id: expenseData.group_id,
            created_at: expenseData?.date.format('YYYY-MM-DD HH:mm:ss')
        };

        // Add the expense locally by calling the prop function
        addExpense(newExpense);

        // Optionally, you can reset the form or close the dialog
        setExpenseData({
            description: '',
            amount: 100,
            notes: '',
            date: null,
            group_id: null
        });
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <ReceiptIcon />
            </IconButton>

            <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
                <DialogTitle>Create New Expense</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateExpense} >
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

                                    required
                                    fullWidth
                                    label="Expense description"
                                    size="small"
                                    value={expenseData.description}
                                    onChange={(e) =>
                                        setExpenseData({ ...expenseData, description: e.target.value })
                                    }
                                />
                                <p className="font-bold mb-2 mt-4">Expense Amount</p>
                                <div className="flex items-center gap-4">
                                    <TextField
                                        required
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
                                        onChange={e => {
                                            setExpenseData({
                                                ...expenseData,
                                                date: e
                                            })
                                        }}
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
                            <Button variant="contained" type={'submit'}>
                                Confirm
                            </Button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateExpense;

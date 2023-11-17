import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment, 
    TextField,
    Button
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DatePicker } from '@mui/x-date-pickers';
import Tesseract from 'tesseract.js';

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
            id: new Date().getTime(), // Use a unique ID generation method
            description: expenseData.description,
            amount: parseFloat(expenseData.amount),
            notes: expenseData.notes,
            group_id: expenseData.group_id,
            created_at: expenseData?.date?.format('YYYY-MM-DD HH:mm:ss')
        };

        addExpense(newExpense);
        setOpen(false);
    };
    const handleReceiptImport = (event) => {
        const image = event.target.files[0];
        if (image) {
            Tesseract.recognize(
                image,
                'eng',
                { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
                console.log("Extracted Text:", text); // Check the OCR output
    
                // Example: Extract the first line as the title
                const titleMatch = text.split('\n')[0]; // Assuming the first line is the title
                console.log("Extracted Title:", titleMatch);
    
                if (titleMatch) {
                    setExpenseData(prevState => ({
                        ...prevState,
                        description: titleMatch
                    }));
                } else {
                    console.log("Title could not be found.");
                }
            });
        }
    };
    
    

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <ReceiptIcon />
            </IconButton>

            <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
                <DialogTitle>Create New Expense</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateExpense}>
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
                                <TextField
                                    required
                                    type="number"
                                    fullWidth
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
                                <p className="font-bold mb-2 mt-4">Date</p>
                                <DatePicker
                                    value={expenseData.date}
                                    onChange={(date) =>
                                        setExpenseData({ ...expenseData, date: date })
                                    }
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptImport}
                    />

 
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

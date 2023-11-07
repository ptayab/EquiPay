// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import {Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, TextField} from "@mui/material";
// import React, {useState} from "react";
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import {DatePicker} from "@mui/x-date-pickers";
// import PayerSelector from "./PayerSelector";
// import Button from '@mui/material/Button';
// function CreateExpense() {
//     const [open, setOpen] = useState(false);
//     return (
//         <>
//             <IconButton onClick={() => {
//                 setOpen(true)
//             }}>
//                 <ReceiptLongIcon />
//             </IconButton>

//             <Dialog onClose={() => {
//                 setOpen(false)
//             }} open={open} fullWidth>
//                 <DialogTitle>
//                     Create New Expense
//                 </DialogTitle>
//                 <DialogContent>
//                     <div className={'grid grid-cols-6 gap-3'}>
//                         <div className={'col-span-2'}>
//                             <ReceiptIcon style={{
//                                 fontSize: '150px',
//                                 color: '#99e0c5'
//                             }}/>
//                         </div>
//                         <div className={'col-span-4'}>
//                             <p className={'font-bold mb-2'}>
//                                 Expense Description
//                             </p>
//                             <TextField fullWidth
//                                        label={'Expense description'}
//                                        size={'small'}/>
//                             <p className={'font-bold mb-2 mt-4'}>
//                                 Expense Amount
//                             </p>
//                             <div className={'flex items-center gap-4'}>
//                                 <TextField type={'number'}
//                                            className={'w-1/2'}
//                                            InputProps={{
//                                                startAdornment: (
//                                                    <InputAdornment position="start">
//                                                        <AttachMoneyIcon />
//                                                    </InputAdornment>
//                                                ),
//                                            }}
//                                            label={'Expense amount'}
//                                            />

//                                 <DatePicker />
//                             </div>

//                             <p className={'font-bold mb-2 mt-4'}>
//                                 Add Notes
//                             </p>
//                             <TextField
//                                 rows={3}
//                                 fullWidth
//                                 multiline
//                                 label={'Notes(Optional)'}
//                             />
//                         </div>
//                     </div>

//                     <div className={'mt-5'}>
//                         <PayerSelector />
//                     </div>
//                         <Button variant="contained">Conform</Button>
//                 </DialogContent>
//             </Dialog>

//         </>
//     )
// }
// export default CreateExpense;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DatePicker } from "@mui/x-date-pickers";
import PayerSelector from "./PayerSelector";
import Button from "@mui/material/Button";

function CreateExpense() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users
  const [expenseData, setExpenseData] = useState({
    description: "",
    amount: 0,
    notes: "",
  });

  const handleCreateExpense = () => {
    // Replace with actual values for description, amount, and notes
    const expenseDataToSend = {
      description: expenseData.description,
      amount: expenseData.amount,
      notes: expenseData.notes,
      selectedUsers: selectedUsers,
    };

    // You can send the expenseDataToSend to your backend for processing here
    console.log("Expense Data to Send:", expenseDataToSend);

    // Optionally, you can reset the form or close the dialog
    setExpenseData({
      description: "",
      amount: 0,
      notes: "",
    });
    setSelectedUsers([]);
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
          <div className={"grid grid-cols-6 gap-3"}>
            <div className={"col-span-2"}>
              <ReceiptIcon
                style={{
                  fontSize: "150px",
                  color: "#99e0c5",
                }}
              />
            </div>
            <div className={"col-span-4"}>
              <p className={"font-bold mb-2"}>Expense Description</p>
              <TextField
                fullWidth
                label={"Expense description"}
                size={"small"}
                value={expenseData.description}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, description: e.target.value })
                }
              />
              <p className={"font-bold mb-2 mt-4"}>Expense Amount</p>
              <div className={"flex items-center gap-4"}>
                <TextField
                  type={"number"}
                  className={"w-1/2"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  label={"Expense amount"}
                  value={expenseData.amount}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, amount: e.target.value })
                  }
                />
                <DatePicker />
              </div>
              <p className={"font-bold mb-2 mt-4"}>Add Notes</p>
              <TextField
                rows={3}
                fullWidth
                multiline
                label={"Notes (Optional)"}
                value={expenseData.notes}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, notes: e.target.value })
                }
              />
            </div>
          </div>
          <div className={"mt-5"}>
            {/* PayerSelector component for user selection */}
            <PayerSelector
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </div>
          <div className={"mt-3"}>
            <Button variant="contained" onClick={handleCreateExpense}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateExpense;

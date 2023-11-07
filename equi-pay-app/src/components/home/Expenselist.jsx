
// import React, { useState } from 'react';
// import { IconButton, Dialog, DialogContent, DialogTitle, TextField, InputAdornment, Button } from "@mui/material";
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import { DatePicker } from '@mui/x-date-pickers';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


// function NeedToPayFees() {
//   const [feesToPay, setFeesToPay] = useState([
//     { title: 'Electric Bill', Date: '2023-11-15', amount: 50 },
//     { title: 'Rent', Date: '2023-11-30', amount: 800 },
//     { title: 'Internet Subscription', Date: '2023-11-25', amount: 60 },
//   ]);

//   const [openCreateExpense, setOpenCreateExpense] = useState(false);
//   const [expenseData, setExpenseData] = useState({
//     description: '',
//     amount: 0,
//     notes: '',
//   });

//   const addExpense = (newExpense) => {
//     setFeesToPay([...feesToPay, newExpense]);
//   };

//   const settleUp = (index) => {
//     // You can handle the "Settle Up" action here for the expense at the given index
//     console.log('Settling up expense at index:', index);
//     // You may want to remove the expense from the list or update its status.
//   };

//   const handleCreateExpense = () => {
//     const newExpense = {
//       title: expenseData.description,
//       Date: 'YYYY-MM-DD', // Replace with the actual date
//       amount: parseFloat(expenseData.amount),
//     };

//     addExpense(newExpense);

//     // Optionally, you can reset the form or close the dialog
//     setExpenseData({
//       description: '',
//       amount: 0,
//       notes: '',
//     });
//     setOpenCreateExpense(false);
//   };

//   return (
//     <div className="container mx-auto mt-5" style={{
//       maxHeight: '80vh',
//       overflow: 'auto'
//     }}>
//       <h1 className="text-2xl font-semibold mb-4">Expenses
//         <IconButton onClick={() => setOpenCreateExpense(true)}>
//           <ReceiptLongIcon />
//         </IconButton>
//       </h1>
//       <ul className="space-y-4">
//         {feesToPay.map((fee, index) => (
//           <li key={index} className="flex items-center p-4 rounded-md border border-gray-200">
//             <div className="w-1/2">
//               <h2 className="text-lg font-semibold">{fee.title}</h2>
//               <p className="text-gray-600">Date: {fee.Date}</p>
//             </div>
//             <div className="w-1/4 text-right">
//               <p className="text-lg font-semibold">${fee.amount}</p>
//             </div>
//             <div className="w-1/4 text-right">
//               <button onClick={() => settleUp(index)} className="bg-blue-500 hover.bg-blue-700 text-white font.bold py-2 px-4 rounded">
//                 Settle Up
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Dialog onClose={() => setOpenCreateExpense(false)} open={openCreateExpense} fullWidth>
//         <DialogTitle>Create New Expense</DialogTitle>
//         <DialogContent>
//           <div className="grid grid-cols-6 gap-3">
//             <div className="col-span-2">
//               <ReceiptLongIcon
//                 style={{
//                   fontSize: '150px',
//                   color: '#99e0c5',
//                 }}
//               />
//             </div>
//             <div className="col-span-4">
//               <p className="font-bold mb-2">Expense Description</p>
//               <TextField
//                 fullWidth
//                 label="Expense description"
//                 size="small"
//                 value={expenseData.description}
//                 onChange={(e) =>
//                   setExpenseData({ ...expenseData, description: e.target.value })
//                 }
//               />
//               <p className="font-bold mb-2 mt-4">Expense Amount</p>
//               <div className="flex items-center gap-4">
//                 <TextField
//                   type="number"
//                   className="w-1/2"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <AttachMoneyIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   label="Expense amount"
//                   value={expenseData.amount}
//                   onChange={(e) =>
//                     setExpenseData({ ...expenseData, amount: e.target.value })
//                   }
//                 />
//                 <DatePicker />
//               </div>
//               <p className="font-bold mb-2 mt-4">Add Notes</p>
//               <TextField
//                 rows={3}
//                 fullWidth
//                 multiline
//                 label="Notes (Optional)"
//                 value={expenseData.notes}
//                 onChange={(e) =>
//                   setExpenseData({ ...expenseData, notes: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <div className="mt-3">
//             <Button variant="contained" onClick={handleCreateExpense}>
//               Confirm
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default NeedToPayFees;
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
  const [feesToPay, setFeesToPay] = useState([
    { title: 'Electric Bill', date: '2023-11-15', amount: 50 },
    { title: 'Rent', date: '2023-11-30', amount: 800 },
    { title: 'Internet Subscription', date: '2023-11-25', amount: 60 },
  ]);

  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: '',
    date: null,
    amount: 0,
    notes: '',
  });

  const addExpense = (newExpense) => {
    setFeesToPay([...feesToPay, newExpense]);
  };

  const settleUp = (index) => {
    // Create a copy of the feesToPay array
    const updatedFeesToPay = [...feesToPay];

    // Remove the expense at the specified index
    updatedFeesToPay.splice(index, 1);

    // Update the state to reflect the changes
    setFeesToPay(updatedFeesToPay);
  };

  const handleCreateExpense = () => {
    const newExpense = {
      id: new Date().getTime(),
      title: expenseData.title,
      date: expenseData.date.toISOString(), // Convert the date to a string
      amount: parseFloat(expenseData.amount),
      notes: expenseData.notes,
    };

    addExpense(newExpense);

    // Reset the form or close the dialog
    setExpenseData({
      title: '',
      date: null,
      amount: 0,
      notes: '',
    });
    setOpenCreateExpense(false);
  };

  return (
    <div className="container mx-auto mt-5" style={{
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <h1 className="text-2xl font-semibold mb-4">Expenses
        <IconButton onClick={() => setOpenCreateExpense(true)}>
          <ReceiptIcon />
        </IconButton>
      </h1>
      <ul className="space-y-4">
        {feesToPay.map((fee, index) => (
          <li key={index} className="flex items-center p-4 rounded-md border border-gray-200">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">{fee.title}</h2>
              <p className="text-gray-600">Date: {fee.date}</p>
            </div>
            <div className="w-1/4 text-right">
              <p className="text-lg font-semibold">${fee.amount}</p>
            </div>
            <div className="w-1/4 text-right">
              <button onClick={() => settleUp(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
    </div>
  );
}

export default NeedToPayFees;


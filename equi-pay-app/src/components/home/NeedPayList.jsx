import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {IconButton} from "@mui/material";
import CreateExpense from "./CreateExpense";
function NeedToPayFees() {
    const feesToPay = [
        { title: 'Electric Bill', dueDate: '2023-11-15', amount: 50 },
        { title: 'Rent', dueDate: '2023-11-30', amount: 800 },
        { title: 'Internet Subscription', dueDate: '2023-11-25', amount: 60 },
    ];

    return (
        <div className="container mx-auto mt-5" style={{
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <h1 className="text-2xl font-semibold mb-4">Expenses
                <CreateExpense />
            </h1>
            <ul className="space-y-4">
                {feesToPay.map((fee, index) => (
                    <li key={index} className="flex items-center p-4 rounded-md border border-gray-200">
                        <div className="w-1/2">
                            <h2 className="text-lg font-semibold">{fee.title}</h2>
                            <p className="text-gray-600">Due Date: {fee.dueDate}</p>
                        </div>
                        <div className="w-1/2 text-right">
                            <p className="text-lg font-semibold">${fee.amount}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NeedToPayFees;

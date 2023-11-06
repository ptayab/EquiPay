import React, {useState} from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {IconButton} from "@mui/material";
import CreateExpense from "./CreateExpense";
import ExpenseDetail from "./ExpenseDetail";
function NeedToPayFees() {
    const feesToPay = [
        { title: 'Electric Bill', Date: '2023-11-15', amount: 50 },
        { title: 'Rent', Date: '2023-11-30', amount: 800 },
        { title: 'Internet Subscription', Date: '2023-11-25', amount: 60 },
    ];

    const [openedExpense, setOpenedExpense] = useState();

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
                            </div>
                        </div>
                        {openedExpense === fee.title && (
                            <div>
                                <ExpenseDetail expense={fee}/>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NeedToPayFees;

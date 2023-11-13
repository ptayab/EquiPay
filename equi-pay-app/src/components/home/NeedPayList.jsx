import React, { useState, useEffect } from 'react';
import CreateExpense from "./CreateExpense";
import * as fetch from "./../../lib/fetch"
import { useParams } from 'react-router-dom';

function NeedToPayFees(callback) {
    const { userId } = useParams();
    const { profileStatus, setProfileStatus } = callback;


    const feesToPay = [
        { title: 'Electric Bill', Date: '2023-11-15', amount: 50 },
        { title: 'Rent', Date: '2023-11-30', amount: 800 },
        { title: 'Internet Subscription', Date: '2023-11-25', amount: 60 },
    ];
        const [expenses, setExpenses] = useState([]);

        // On Load
        useEffect(() => {
            const sortData = (list, field) => {
                return [...list].sort((a, b) => {
                const fieldA = String(a[field]).toLowerCase();
                const fieldB = String(b[field]).toLowerCase();
        
                if (fieldA < fieldB) return -1;
                if (fieldA > fieldB) return 1;
                return 0;
                });
            };
    
            async function fetchData() {
                try {
                    const data = await fetch.get("expenses",{ user_id: userId});
                    console.log(data)
                    setExpenses(sortData(data, 'created_at'));
    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, [userId]);

    return (
        <div className="container mx-auto mt-5" style={{
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <h1 className="text-2xl font-semibold mb-4">Expenses <CreateExpense callback={callback}/> </h1>
            <ul className="space-y-4">
                {expenses.map((fee, index) => (
                    <li key={index} className="flex items-center p-4 rounded-md border border-gray-200">
                        <div className="w-1/2">
                            <h2 className="text-lg font-semibold">{fee.name}</h2>
                            <p className="text-gray-600">Date: {fee.created_at}</p>
                        </div>
                        <div className="w-1/2 text-right">
                            <p className="text-lg font-semibold">${fee.balance}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NeedToPayFees;

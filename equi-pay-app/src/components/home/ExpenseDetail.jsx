
import ReceiptIcon from '@mui/icons-material/Receipt';
import React, {useEffect, useState} from "react";
import {Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {authedRequest} from "../../http";

function ExpenseDetail({expense,userId}) {


    const [users, setUsers] = useState([]);

    const fetchExpenseDetails = async () => {
        try {
          const response = await authedRequest.get(`/api/users/group?group_id=${expense.group_id}`);
          
          if (response && response.data) {
            const loggedInUser = response.data.find(user => user.user_id === userId);
      
            if (loggedInUser) {
              // Set the state variable 'users' with an array containing only the logged-in user
              setUsers([loggedInUser]);
            }
          }
        } catch (error) {
          console.error("Error fetching expense details:", error);
        }
      };
    
      useEffect(() => {
        if (expense && userId) {
          // Initial fetch
          fetchExpenseDetails();
    
          // Set up polling
          const pollingInterval = setInterval(() => {
            fetchExpenseDetails();
          }, 5000); // Poll every 5 seconds (adjust as needed)
    
          // Cleanup on component unmount
          return () => clearInterval(pollingInterval);
        }
      }, [expense, userId]);
    

    return (
        <div className={'p-4 grid grid-cols-4 gap-2'}>
            <div className={'col-span-1'}>
        
                <ReceiptIcon style={{
                    fontSize: '150px',
                    color: '#99e0c5'
                }}/>
            </div>
            <div className={'grid col-span-3'}>
                <h2>HEYYY</h2>
                <h1 className={'text-xl'}>
                    {expense.name} - ${expense.balance}
                </h1>
                <List>
                    {users.map(user => {
                        return (
                            <ListItem key={user.user_id}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Avatar >
                                            {user.name?.[0]}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={`${user.name} - ${user.needPay.toFixed(2)}$`}/>

                                    {/* Add conditional rendering based on whether the user is the expense creator
                                    {user.user_id === expense.user_id ? (
                                    <span>People owe you: ${user.needPay.toFixed(2)}</span>
                                    ) : (
                                    <button onClick={() => handleSettleUp(user)}>Settle Up</button>
                                    )} */}
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <div className={'col-span-4 mt-2'}>
                <h3 className={'font-bold'}>Notes</h3>
                <pre>
                    {expense.notes}
                </pre>
            </div>
        </div>
    )
}
export default ExpenseDetail;
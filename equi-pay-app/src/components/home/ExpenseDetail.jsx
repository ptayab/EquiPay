import ReceiptIcon from '@mui/icons-material/Receipt';
import React, {useEffect, useState} from "react";
import {Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {authedRequest} from "../../http";
function ExpenseDetail({expense}) {


    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (expense) {
            authedRequest.get(`/api/users/group?group_id=${expense.group_id}`)
                .then(res => {
                    if (res && res.data) {
                        const totalBalance = expense.balance;
                        const creatorShare = totalBalance / res.data.length;
                        const usersData = res.data.map(user => {
                            const needPay = user.user_id === expense.creator_id
                                ? totalBalance - creatorShare
                                : creatorShare;
                            return { ...user, needPay };
                        });
                        setUsers(usersData);
                    }
                })
                .catch(err => {
                    // Handle error
                });
        }
    }, [expense]);
    return (
        <div className={'p-4 grid grid-cols-4 gap-2'}>
            <div className={'col-span-1'}>
                <ReceiptIcon style={{
                    fontSize: '150px',
                    color: '#99e0c5'
                }}/>
            </div>
            <div className={'grid col-span-3'}>
                <h1 className={'text-xl'}>
                    {expense.name} - ${expense.total}
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

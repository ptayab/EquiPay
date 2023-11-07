
import ReceiptIcon from '@mui/icons-material/Receipt';
import React from "react";
import {Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
function ExpenseDetail({expense}) {
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
                    {expense.title} - ${expense.amount}
                </h1>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Dale - 25$'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Steezy - 25$'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Vince - 25$'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}
export default ExpenseDetail;

import ReceiptIcon from '@mui/icons-material/Receipt';
import React, {useEffect, useState} from "react";
import {Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button} from "@mui/material";
import {authedRequest} from "../../http";
function ExpenseDetail({expense}) {


    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [currentuser, setCurrentUser] = useState({});

    useEffect(() => {
        if (expense) {
            authedRequest.get(`/api/users/group?group_id=${expense.group_id}`)
                .then(res => {
                    if (res && res.data) {
                        setUsers(res.data.map(user => {
                            user.needPay = expense.balance / res.data.length;
                            return user;
                        }))
                    }
                }).catch(err => {

            })
        }

        

    }, [expense]);


    const handleAddComment = () => {
        // Add the comment to the comments array
        setComments([...comments, comment]);
        // Reset the comment state
        setComment("");
      };


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
            <div className={"col-span-4 mt-2"}>
        <h3 className={"font-bold"}>Comments</h3>
        <TextField
          id="outlined-multiline-flexible"
          label="Add a comment"
          multiline
          fullWidth
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
        {/* Display existing comments */}
        {comments.map((c, index) => (
          <div key={index}>{c}</div>
        ))}
      </div>
        </div>
    )
}
export default ExpenseDetail;
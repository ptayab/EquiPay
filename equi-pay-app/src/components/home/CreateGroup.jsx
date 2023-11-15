import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Box, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from "@mui/icons-material/Add";
import * as Fetch from "./../../lib/fetch";
import { useParams } from 'react-router-dom';

function CreateGroupDialog({ onGroupCreated }) {
    const { userId } = useParams();
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([{id: Number(userId)}]);
    const [users, setUsers] = useState([]);

    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const validationSchema = yup.object({ groupName: yup.string().required('Group Name is required') });



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
                const data = await Fetch.get("users"); 
                setUsers(sortData(data, 'displayname'));
                console.log("users", data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleUserSelection = (user) => {
        const updatedSelectedUsers = [...selectedUsers];
        if (updatedSelectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
            updatedSelectedUsers.splice(
                updatedSelectedUsers.findIndex((selectedUser) => selectedUser.id === user.id),
                1
            );
        } else {
            updatedSelectedUsers.push(user);
        }
        setSelectedUsers(updatedSelectedUsers);
    };

    const handleGroupCreation = () => {
        const request = {
            name: groupName,
            members: selectedUsers.map((user) => user.id),
        };

        Fetch.post("groups", request).then((response) => {
            if (!response) console.error('Failed to create the group');
            handleClose();
            onGroupCreated({ id: response.id, name: groupName });
        });
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Create a New Group</DialogTitle>
                <DialogContent>
                    <form>
                        {/* Input for Group Name */}
                        <TextField
                            fullWidth
                            id="groupName"
                            name="groupName"
                            label="Group Name"
                            variant="outlined"
                            margin="normal"
                            value={groupName}
                            onChange={handleGroupNameChange}
                            error={!groupName && Boolean(groupName)}
                            helperText={!groupName && 'Group Name is required'}
                        />

                        {/* Checkbox for User Selection */}
                        <div>
                            <h3>Select Users:</h3>
                            {users.map((user) => (
                                <div key={user.id}>
                                    <input
                                        type="checkbox"
                                        disabled={user.id === Number(userId)}
                                        checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                                        onChange={() => handleUserSelection(user)}
                                    />
                                    {user.displayname}
                                </div>
                            ))}
                        </div>

                        {/* Buttons for Cancel and Create */}
                        <Box display="flex" justifyContent="flex-end" marginTop="20px">
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="button" variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleGroupCreation}>
                                Create
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateGroupDialog;

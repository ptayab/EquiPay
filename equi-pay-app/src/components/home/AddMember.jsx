import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, Box, IconButton, Select, MenuItem} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from "@mui/icons-material/Add";
import {authedRequest} from "../../http";
import {useParams} from "react-router-dom";

function AddMember({members = [], onAdded}) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersName, setUsersName] = useState([]);
    const {groupId} = useParams();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object({
        selectedUsers: yup.array().min(1, "You must select at least user")
    });

    const formik = useFormik({
        initialValues: {

            selectedUsers: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
            handleClose();
            const selectedUsersIds = values.selectedUsers;
            const unJoinedUserIds = selectedUsersIds.filter(id => !members.find(member => member.id === id));

            const promises = unJoinedUserIds.map(id => {
                return authedRequest.post(`/api/groups/user`, {
                    group_id: Number(groupId),
                    user_id: id
                })
            });
            Promise.all(promises)
                .then(() => {
                    setOpen(false);
                    onAdded && onAdded();
                })
        },
    });

    useEffect(() => {
        authedRequest.get(`/api/users`)
            .then(res => {
                if (res && res.data) {
                    setUsers(res.data);
                }
            })
    }, []);

    useEffect(() => {
        formik.setFieldValue('selectedUsers', members.map(member => member.id))
    }, [members]);

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Add Members</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>

                        <Select
                            name="selectedUsers"
                            value={formik.values.selectedUsers}
                            onChange={(e, values) => {
                                const value = e.target.value;
                                formik.setFieldValue('selectedUsers', typeof value === 'string' ? value.split(',') : value);
                            }}
                            error={formik.touched.selectedUsers && Boolean(formik.errors.selectedUsers)}

                            multiple
                            label={'Select Users'}
                            fullWidth>
                            {users.map(user => {
                                return (
                                    <MenuItem
                                        disabled={members.find(member => member.id === user.id)}
                                        value={user.id} key={user.id}>
                                        {user.displayname}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <p className={'text-red-700'}>
                            {formik.touched.selectedUsers && formik.errors.selectedUsers}
                        </p>
                        <Box display="flex" justifyContent="flex-end" marginTop="20px">
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                                Add
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddMember;

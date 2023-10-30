import React, { useState } from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, Box, IconButton} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
function JoinGroup() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object({
        groupName: yup.string().required('Friend Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            groupName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
            handleClose();
        },
    });

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <GroupAddIcon />
            </IconButton>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Join Group</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="groupName"
                            name="groupName"
                            label="Group Id"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.groupName}
                            onChange={formik.handleChange}
                            error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                            helperText={formik.touched.groupName && formik.errors.groupName}
                        />
                        <Box display="flex" justifyContent="flex-end" marginTop="20px">
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                                Join
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default JoinGroup;

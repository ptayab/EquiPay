
// import React, { useState } from 'react';
// import { Button, Dialog, DialogContent, DialogTitle, TextField, Box, IconButton } from '@mui/material';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import AddIcon from "@mui/icons-material/Add";


// function CreateGroupDialog({ onGroupCreated }) {
//     //
//     //const [topic, Topic] = useState('');
//   const [groupName, GroupName] = useState('');
//   //const [message, Message] = useState('');

//   function addPost() {
//     const url = 'http://localhost:3001/addGroup';
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ groupName }),
//     };

//     fetch(url, requestOptions)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Network response was not ok.');
//       })
//       .then((groupName) => {
//         console.log('post sent!');
//         console.log(data);
//         Message('Post sent successfully.');
//       })
//       .catch((error) => {
//         console.error('There was an error!', error);
//         Message('There was an error sending your post.');
//       });
//   }

//     //
//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const validationSchema = yup.object({
//         groupName: yup.string().required('Group Name is required'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             groupName: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values) => {
//             const newGroup = {
//                 name: values.groupName,
//                 members: 0, // Initialize with 0 members or any default value
//             };

//             onGroupCreated(newGroup); // Pass the new group back to the parent component

//             handleClose();
//         },
//     });

//     return (
//         <div>
//             <IconButton onClick={handleClickOpen}>
//                 <AddIcon />
//             </IconButton>
//             <Dialog fullWidth open={open} onClose={handleClose}>
//                 <DialogTitle>Create a New Group</DialogTitle>
//                 <DialogContent>
//                     {/* <form onSubmit={formik.handleSubmit}> */}
//                     <input
//                             type="text"
//                             placeholder="DATA"
//                             value={GroupName}
//                             onChange={(e) => GroupName(e.target.value)}
//                         />
//                         {/* <TextField
//                             fullWidth
//                             id="groupName"
//                             name="groupName"
//                             label="Group Name"
//                             variant="outlined"
//                             margin="normal"
//                             value={formik.values.groupName}
//                             onChange={formik.handleChange}
//                             error={formik.touched.groupName && Boolean(formik.errors.groupName)}
//                             helperText={formik.touched.groupName && formik.errors.groupName}
//                         /> */}
//                         <Box display="flex" justifyContent="flex-end" marginTop="20px">
//                             <Button variant="outlined" color="primary" onClick={handleClose}>
//                                 Cancel
//                             </Button>
//                             <button className="add-post-button" onClick={() => { addPost(); GroupName(''); }}>send</button>
//                             {/* <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
//                                 Create
//                             </Button> */}
//                         </Box>
//                     {/* </form> */}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

// export default CreateGroupDialog;

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';

function CreateGroupDialog({ onGroupCreated }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    groupName: yup.string().required('Group Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      groupName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // You can perform API call to create a group here and handle success/failure
      // For now, we'll just display the group name in the console
      console.log('New group created:', values.groupName);

      const newGroup = {
        name: values.groupName,
        members: 0, // Initialize with 0 members or any default value
      };

      onGroupCreated(newGroup); // Pass the new group back to the parent component

      handleClose();
    },
  });

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create a New Group</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="groupName"
              name="groupName"
              label="Group Name"
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

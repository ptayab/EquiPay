import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {DatePicker} from "@mui/x-date-pickers";
import PayerSelector from "./PayerSelector";
import CloseIcon from '@mui/icons-material/Close';
function CreateExpense() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <IconButton onClick={() => {
                setOpen(true)
            }}>
                <ReceiptLongIcon />
            </IconButton>

            <Dialog onClose={() => {
                setOpen(false)
            }} open={open} fullWidth>
                <DialogTitle>
                    <Box className={'flex justify-between items-center'}>
                        Create New Expense
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <div className={'grid grid-cols-6 gap-3'}>
                        <div className={'col-span-2'}>
                            <ReceiptIcon style={{
                                fontSize: '150px',
                                color: '#99e0c5'
                            }}/>
                        </div>
                        <div className={'col-span-4'}>
                            <p className={'font-bold mb-2'}>
                                Expense Description
                            </p>
                            <TextField fullWidth
                                       label={'Expense description'}
                                       size={'small'}/>
                            <p className={'font-bold mb-2 mt-4'}>
                                Expense Amount
                            </p>
                            <div className={'flex items-center gap-4'}>
                                <TextField type={'number'}
                                           className={'w-1/2'}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <AttachMoneyIcon />
                                                   </InputAdornment>
                                               ),
                                           }}
                                           label={'Expense amount'}
                                           />

                                <DatePicker />
                            </div>

                            <p className={'font-bold mb-2 mt-4'}>
                                Add Notes
                            </p>
                            <TextField
                                rows={3}
                                fullWidth
                                multiline
                                label={'Notes(Optional)'}
                            />
                        </div>
                    </div>

                    <div className={'mt-5'}>
                        <PayerSelector />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'}>Submit</Button>
                    <Button
                        onClick={() => {
                            setOpen(false)
                        }}
                        variant={'outlined'} color={'inherit'}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
export default CreateExpense;
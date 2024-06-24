import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React from 'react'

const SimpleDialog = ({ title, message, open, handleDialogClose }) => {

    return (
        <Dialog open={open} sx={{padding: 2}}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                >
                    <Close />
                </IconButton>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={4}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContentText>{message}</DialogContentText>
            </Box>
        </Dialog>
    )
}

export default SimpleDialog;
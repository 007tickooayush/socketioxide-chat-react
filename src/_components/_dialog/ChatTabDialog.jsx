import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const ChatTabDialog = ({ dialogState, currentTab, setTabVal }) => {
    const navigate = useNavigate();

    const [accepted, setAccepted] = useState(false);

    const { isDialogOpen, setIsDialogOpen } = dialogState;
    const { id, name, isGroup, route } = currentTab;


    useEffect(() => {
        if (!accepted && !isDialogOpen) {
            navigate('/info');
            setTabVal(0);

        }
        console.log('accepted, isDialogOpen :>> ', accepted, isDialogOpen);
    }, [accepted, isDialogOpen]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setAccepted(false);
    }

    const handleAcceptance = () => {
        setAccepted(true);
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} >
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                >
                    <Close />
                </IconButton>
            </Box>
            <Box padding={4}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <DialogTitle>Join a group</DialogTitle>
                    <DialogContentText>
                        Do you want to join the group {currentTab.name} ?
                    </DialogContentText>
                    <Box padding={2} >
                        <Button variant='outlined' onClick={handleAcceptance}>Yes</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ChatTabDialog;
import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { socket } from '../../_utils/socket';

const ChatTabDialog = ({ dialogState, currentTab, setTabVal, isConnectedState }) => {
    const navigate = useNavigate();

    const [accepted, setAccepted] = useState(false);

    const { isDialogOpen, setIsDialogOpen } = dialogState;
    const { isConnected, setIsConnected } = isConnectedState;
    const { id, name, isGroup, route } = currentTab;


    useEffect(() => {

        if (!accepted && !isDialogOpen) {
            navigate('/info');
            setTabVal(0);
        }

        // console.log('accepted, isDialogOpen :>> ', accepted, isDialogOpen);
    }, [accepted, isDialogOpen, socket]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setAccepted(false);
    }

    const handleAcceptance = () => {
        setAccepted(true);
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen}> {/* onClose={handleDialogClose} */}
            {
                isConnected
                    ?
                    (
                        <>
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
                        </>
                    )
                    :
                    (
                        <>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleDialogClose}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={4}>
                                <Typography variant='h4' color={'red'}>
                                    ERROR!
                                </Typography>
                                <Typography variant='body1' align='center'>
                                    Connection to the server is not established at this instant. Press the X (Close) button in this dialog box to navigate back to the home screen.
                                </Typography>
                            </Box>
                        </>
                    )
            }
        </Dialog>
    )
}

export default ChatTabDialog;
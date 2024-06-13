import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContentText, DialogTitle, FormControl, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { socket } from '../../_utils/socket';

const ChatTabDialog = ({ dialogState, currentTabState, tabValState, isConnectedState }) => {
    const navigate = useNavigate();

    const [accepted, setAccepted] = useState(false);
    const [disabledAccept, setDisabledAccept] = useState(true);
    const [recName, setRecName] = useState('');

    const { isDialogOpen, setIsDialogOpen } = dialogState;
    const { isConnected, setIsConnected } = isConnectedState;
    const { tabVal, setTabVal } = tabValState;
    const { currentTab, setCurrentTab } = currentTabState;
    // const { id, name, isGroup, route } = currentTab; // not dependable as its not maintained in a state, passed on each update of tab selection

    useEffect(() => {

        if (!accepted && !isDialogOpen) {
            navigate('/info');
            setTabVal(0);
        }

        // console.log('accepted, isDialogOpen :>> ', accepted, isDialogOpen);
        // if (name == 'General Char') setDisabledAccept(false);
        console.log('currentTab, tabVal :>> ', currentTab, tabVal);
        // if (tabVal == 1) {
        //     setDisabledAccept(false);
        // } 
        // else {
        //     setDisabledAccept(true)
        // }

    }, [accepted, isDialogOpen, currentTab, recName, tabVal, disabledAccept]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setAccepted(false);
        setDisabledAccept(true);
        setRecName('');
    }

    const handleAcceptance = () => {
        setAccepted(true);
        setIsDialogOpen(false);
        setDisabledAccept(true);
        setRecName('');

    }

    const handleRecChange = (rec) => {
        if (rec.length > 3) {
            setDisabledAccept(false);
        }
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
                                    {
                                        // If the selected tabs are not About or General Chat Tabs
                                        (tabVal !== 0 && tabVal !== 1)
                                            ?
                                            (
                                                <>
                                                    <TextField id='recNameInput' type='text' placeholder='Reciever/Group name' onChange={(e) => handleRecChange(e.target.value)} />
                                                    <Box padding={2} >
                                                        <Button variant='outlined' onClick={handleAcceptance} disabled={disabledAccept}>Yes</Button>
                                                    </Box>
                                                </>

                                            )
                                            :
                                            (
                                                <Box padding={2} >
                                                    <Button variant='outlined' onClick={handleAcceptance}>Yes</Button>
                                                </Box>
                                            )
                                    }
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
                                    ERROR
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
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
        // console.log('navbar tab dialog mounted', tabVal);
        // console.log('currentTab :>> ', currentTab);
        if (tabVal == 1) {
            // console.log('General chat');
            setDisabledAccept(false);
        }

        return () => {
            setDisabledAccept(true);
        }
    }, [tabVal, currentTab, disabledAccept]);

    useEffect(() => {

        if (!accepted && !isDialogOpen) {
            navigate('/info');
            setTabVal(0);
        }

        // console.log('accepted, isDialogOpen :>> ', accepted, isDialogOpen);
        // if (name == 'General Char') setDisabledAccept(false);
    }, [accepted, isDialogOpen, socket, disabledAccept]);

    // useEffect(() => {
    //     if(name !== "General Chat") {

    //     }
    // }, [disabledAccept]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setAccepted(false);
    }

    const handleAcceptance = () => {
        setAccepted(true);
        setIsDialogOpen(false);
    }

    // const handleRecNameChange = (e) => {
    //     setTimeout(() => {
    //         console.log(e.target.value)
    //     }, 3000)
    // }

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
                                        (currentTab.name != "General Chat") &&
                                        <FormControl>
                                            <TextField
                                                id='recName'
                                                type='text'
                                                variant='outlined'
                                                placeholder='Provide Room/Reciever Name'
                                                onChange={(e) => setRecName(e.target.value)}
                                            />
                                        </FormControl>
                                    }
                                    <Box padding={2} >
                                        <Button variant='outlined' onClick={handleAcceptance} disabled={disabledAccept}>Yes</Button>
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
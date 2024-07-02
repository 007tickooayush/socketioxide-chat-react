import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContentText, DialogTitle, FormControl, IconButton, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { socket } from '../../_utils/socket';
import { handleSocketEvent } from '../../_utils/socketEvents';
import GeneralTabDialog from './GeneralTabDialog';
import PrivateTabDialog from './PrivateTabDialog';
import CustomTabDialog from './CustomTabDialog';
import { AppContext } from '../../_utils/context';

const ChatTabDialog = ({ dialogState, currentTabState, tabValState, isConnectedState }) => {
    const navigate = useNavigate();

    const [accepted, setAccepted] = useState(false);
    const [disabledAccept, setDisabledAccept] = useState(true);
    const [recName, setRecName] = useState('');

    const { isDialogOpen, setIsDialogOpen } = dialogState;
    const { isConnected, setIsConnected } = isConnectedState;
    const { tabVal, setTabVal } = tabValState;
    const { currentTab, setCurrentTab } = currentTabState;

    const { username } = useContext(AppContext);

    useEffect(() => {

        if (!accepted && !isDialogOpen) {
            navigate('/info');
            setTabVal(0);
        }
        // console.log('currentTab, tabVal :>> ', currentTab, tabVal);
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
        // console.log('recName :>> ', recName);
        // perform the socket room operations
        handleSocketEvent(username, recName, currentTab);
    }

    const handleRecChange = (rec) => {
        if (rec.length > 3) {
            setDisabledAccept(false);
            setRecName(rec);
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
                                    <DialogTitle>Join a conversation</DialogTitle>
                                    <DialogContentText>
                                        Do you want to join the conversation {currentTab.name} ?
                                    </DialogContentText>
                                    {/* NOTE: Using the tabVal which is the focused or selected navigation tab item is more stable as compared to using currentTab state to conditionally rendering the dialog component, as its a state with primitive datatype and more proactive updates. */}
                                    {

                                        /// FOR WHEN THE SELECTED TAB Value is 1 or the SELECTED TAB VALUE IS "Custom Chat"
                                        // currentTab.name = "Custom Chat" &&
                                        tabVal == 3 &&
                                        (
                                            <CustomTabDialog handleAcceptance={handleAcceptance} handleRecChange={handleRecChange} disabledAccept={disabledAccept} />
                                        )
                                    }
                                    {
                                        /// FOR WHEN THE SELECTED TAB Value is 1 or the SELECTED TAB VALUE IS "Private Chat"
                                        // currentTab.name == "Private Chat" &&
                                        tabVal == 2 &&
                                        (
                                            <PrivateTabDialog handleAcceptance={handleAcceptance} handleRecChange={handleRecChange} disabledAccept={disabledAccept} />
                                        )
                                    }
                                    {
                                        /// FOR WHEN THE SELECTED TAB Value is 1 or the SELECTED TAB VALUE IS "General Chat"
                                        // currentTab.name == "General Chat" &&
                                        tabVal == 1 &&
                                        (
                                            <GeneralTabDialog handleAcceptance={handleAcceptance} />
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
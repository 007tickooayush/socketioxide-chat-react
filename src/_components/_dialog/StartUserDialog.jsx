import { Box, Button, Dialog, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../_utils/context';
import { checkIsValidUsername } from '../../_utils/utilities';
import { checkUserExists } from '../../_utils/api';
import SimpleDialog from './SimpleDialog';

const StartUserDialog = () => {
    const [isSimpleOpen, setIsSimpleOpen] = useState(false);
    const [isOpenStart, setIsOpenStart] = useState(false);
    const [disabledStart, setDisabledStart] = useState(true);
    const [ownInp, setOwnInp] = useState('');

    const { ownedUsername, setOwnedUsername } = useContext(AppContext);

    useEffect(() => {
        if (localStorage.getItem('ownedUsername') === null) {
            setIsOpenStart(true);
        }
    }, [isOpenStart]);

    useEffect(() => {
        if (checkIsValidUsername(ownInp)) {
            setDisabledStart(false);
        } else {
            setDisabledStart(true);
        }
    }, [disabledStart, ownInp]);

    const handleUserChange = (user) => {
        setOwnInp(user);
    }

    const handleUserCreation = () => {
        checkUserExists(ownInp).then((res) => {
            if (!res?.exists) {
                setOwnedUsername(ownInp);
                localStorage.setItem('ownedUsername', ownInp);
                setIsOpenStart(false);
                // setIsSimpleOpen(false);
            } else {
                // alert('Username already exists');
                setIsSimpleOpen(true);
            }
        }).catch((err) => {
            console.error('Error in checking user exists :>> ', err);
        })
    }

    const handleDialogClose = () => {
        setIsSimpleOpen(false);
    }

    return (
        <>
            <SimpleDialog title='Username Allocation' message='An User Already Exists With the Provide Username!' open={isSimpleOpen} handleDialogClose={handleDialogClose} />
            <Dialog open={isOpenStart} >
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={2}>
                    <DialogTitle>Username allocation</DialogTitle>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={2}>
                        <TextField id='userInput' name='userInput' type='text' placeholder='Enter an unique username' value={ownInp} onChange={(e) => handleUserChange(e.target.value)} />
                        <DialogContentText align='center' padding={2}>Username should be more than 5 characters, should not contain any uppercase letters, and should start with an alphabet, and should be unique throughout the server.</DialogContentText>
                        <Box padding={2} >
                            <Button variant='outlined' onClick={handleUserCreation} disabled={disabledStart}>Create User</Button>
                        </Box>
                    </Box>

                </Box>
            </Dialog>
        </>
    )
}

export default StartUserDialog;
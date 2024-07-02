import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { checkUserExists } from '../../_utils/api';
import { AppContext } from '../../_utils/context';

const PrivateTabDialog = ({ handleAcceptance, handleRecChange, disabledAccept }) => {

    const [receiver, setReceiver] = useState('');

    // const {username} = useContext(AppContext);

    const handleNameChange = (name) => {
        handleRecChange(name);
        setReceiver(name);
    }

    const handleReceiver = () => {
        checkUserExists(receiver).then((data) => {
            console.log('data :>> ', data);
            // handleAcceptance();
        }).catch((error) => {
            console.error('error :>> ', error);
        });
    }

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} paddingTop={2}>
            <TextField id='recNameInput' name='recNameInput' type='text' placeholder="Receiver's owned username" onChange={(e) => handleNameChange(e.target.value)} />
            <Box padding={2} >
                <Button variant='outlined' onClick={handleReceiver} disabled={disabledAccept}>Check User</Button>
            </Box>
        </Box>
    )
}

export default PrivateTabDialog;
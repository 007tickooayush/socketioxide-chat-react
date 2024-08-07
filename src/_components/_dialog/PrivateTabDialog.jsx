import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { checkUserExists } from '../../_utils/api';
import { AppContext } from '../../_utils/context';
import { socket } from '../../_utils/socket';

const PrivateTabDialog = ({ handleAcceptance, handleRecChange, disabledAccept }) => {

    const [userExists, setUserExists] = useState(null);

    const { privateReceiver, setPrivateReceiver, ownedUsername } = useContext(AppContext);

    const handleNameChange = (name) => {
        handleRecChange(name);
        setPrivateReceiver(name);
    }

    const handleReceiver = () => {
        checkUserExists(privateReceiver).then((data) => {
            // console.log('data :>> ', data);
            if (data.exists) {

                // enter the room after 2 seconds
                setTimeout(() => {
                    socket.emit('private_joined', { in_private: true, username: ownedUsername });
                    handleAcceptance();
                }, 2000);
                setUserExists(true);
            } else {
                setUserExists(false);
            }
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
            {
                userExists === true ? <Typography color={'green'} variant='button'>User exists</Typography> : userExists === false ? <Typography color={'red'} variant='button'>User does not exist</Typography> : null
            }
        </Box>
    )
}

export default PrivateTabDialog;
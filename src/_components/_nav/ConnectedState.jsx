import { CloudOffOutlined, CloudOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { socket } from '../../_utils/socket';
import { AppContext } from '../../_utils/context';

const ConnectedState = ({ isConnectedState, isDisabled }) => {
    const { isConnected, setIsConnected } = isConnectedState;

    const { username, setUsername } = useContext(AppContext);

    useEffect(() => {
        console.log('ConnectedState username :>> ', username);
    }, [username]); //socket, isConnected, setIsConnected, username


    const handleConnectState = () => {
        setIsConnected(!isConnected);
        setUsername(null);

        if (socket.connected) {
            socket.emit('remove', { username, room: "N/A", message: `User: ${username} Disconnecting` });
        } else {
            socket.connect();
        }
        // socket.connected ? socket.disconnect() : socket.connect();
    }
    return (
        <IconButton onClick={handleConnectState} disabled={isDisabled}>
            {
                isConnected ? <CloudOutlined sx={{ color: 'green' }} /> : <CloudOffOutlined sx={{ color: 'red' }} />
            }
        </IconButton>
    )
}

export default ConnectedState;
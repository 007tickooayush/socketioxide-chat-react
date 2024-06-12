import { CloudOffOutlined, CloudOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { socket } from '../../_utils/socket';

const ConnectedState = ({ isConnectedState, setUsername, isDisabled }) => {
    const { isConnected, setIsConnected } = isConnectedState;

    const handleConnectState = () => {
        setIsConnected(!isConnected);
        setUsername(null);
        socket.connected ? socket.disconnect() : socket.connect();
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
import { CloudOffOutlined, CloudOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { socket } from '../../_utils/socket';
import { AppContext } from '../../_utils/context';

const ConnectedState = ({ isConnectedState, isDisabled }) => {
    const { isConnected, setIsConnected } = isConnectedState;

    const { username, setUsername, ownedUsername } = useContext(AppContext);

    // useEffect(() => {
    //     // TODO: socket event user_handle to be setup properly
    //     // console.log('ConnectedState username :>> ', username);
    //     // console.log('{ username: ownedUsername, generated_username: username } :>> ', { username: ownedUsername, generated_username: username });
    // }, [username, isConnected, ownedUsername]);

    const handleConnectState = () => {
        setIsConnected(!isConnected);
        setUsername(null);

        if (socket.connected) {
            socket.emit("private_left", { in_private: false, username: ownedUsername });
            socket.emit("remove", { generated_username: username, username: ownedUsername });
            socket.disconnect(); // Keep this line here as the disconnect event is not trigered by "remove" socket event
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
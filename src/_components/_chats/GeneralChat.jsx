import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'
import { socket } from '../../_utils/socket';
import MessageSendHandle from '../_messages/MessageSendHandle';

const GeneralChat = () => {

    const { username } = useOutletContext();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        console.log('General Chat Component Mounted');
        // socket.emit('join_room', { room: 'general', message: `Some user: "${username}" has joined`});
        socket.on('messages', (data) => console.log(data))

        return () => {
            socket.off('join_room');
            socket.off('messages');
        }
    }, [socket]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>General Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
            <MessageSendHandle />
        </Box>
    )
}

export default GeneralChat;
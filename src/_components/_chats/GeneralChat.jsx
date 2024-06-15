import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'
import { socket } from '../../_utils/socket';
import MessageSendHandle from '../_messages/MessageSendHandle';

const GeneralChat = () => {

    const { username } = useOutletContext();
    const [msgList, setMsgList] = useState({}); // append the messages to this list

    useEffect(() => {
        console.log('General Chat Component Mounted');
        // socket.emit('join_room', { room: 'general', message: `Some user: "${username}" has joined`});
        socket.on('messages', (data) => {
            if (!JSON.parse(localStorage.getItem('generalMessages'))) {
                localStorage.setItem('generalMessages', JSON.stringify(data));
            }
            setMsgList(JSON.parse(localStorage.getItem('generalMessages')).messages);

            console.log('messages state', data);
        });

        return () => {
            socket.off('join_room');
            socket.off('messages');
        }
    }, [socket, msgList]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>General Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
            <Box sx={{
                display: 'flex',
                overflowY: 'scroll',
                height: '60vh',
            }}>
                The text to display here
            </Box>
            <MessageSendHandle msgListState={{ msgList, setMsgList }} />
        </Box>
    )
}

export default GeneralChat;
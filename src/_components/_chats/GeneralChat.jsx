import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'
import { socket } from '../../_utils/socket';
import MessageSendHandle from '../_messages/MessageSendHandle';

const GeneralChat = () => {

    const { username } = useOutletContext();
    const [msgList, setMsgList] = useState([]); // append the messages to this list

    useEffect(() => {
        console.log('General Chat Component Mounted');
        // socket.emit('join_room', { room: 'general', message: `Some user: "${username}" has joined`});
        socket.on('messages', (data) => {
            if (!localStorage.getItem('generalMessages')) {
                localStorage.setItem('generalMessages', JSON.stringify(data));
            } else {
                setMsgList(localStorage.getItem('generalMessages'));
            }
            console.log('messages state', data);
        });

        return () => {
            socket.off('join_room');
            socket.off('messages');
        }
    }, [socket, msgList]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>General Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
            <MessageSendHandle msgListState={{ msgList, setMsgList }} />
        </Box>
    )
}

export default GeneralChat;
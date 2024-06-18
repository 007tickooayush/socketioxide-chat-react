import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'
import { socket } from '../../_utils/socket';
import MessageSendHandle from '../_messages/MessageSendHandle';
import { formatDate } from '../../_utils/utilities';
import MessageDisplayHandle from '../_messages/MessageDisplayHandle';

const GeneralChat = () => {

    const { username, msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    // Managing the state updates and socket events by parent component and handling the further actions inside Generic Display component
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
            <MessageDisplayHandle />
            <MessageSendHandle />
        </Box>
    )
}

export default GeneralChat;
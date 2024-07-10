import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../_utils/context';
import { Box, Container, Typography } from '@mui/material';
import { useOutletContext } from 'react-router';
import MessageSendHandle from '../_messages/MessageSendHandle';
import MessageDisplayHandle from '../_messages/MessageDisplayHandle';
import { socket } from '../../_utils/socket';

const CustomChat = () => {


    const { msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    const { ownedUsername, customRec, setCustomRec } = useContext(AppContext);

    useEffect(() => {
        setMsgList([]); // only set on initial render
        // reset the state whenever the user tries to interact with the custom chat again or for the first time
        return () => {
            setCustomRec(null);
        }
    }, []);
    

    useEffect(() => {
        console.log('General Chat Component Mounted');
        // socket.emit('join_room', { room: 'general', message: `Some user: "${username}" has joined`});
        socket.on('messages', (data) => {
            localStorage.setItem(`custom:${customRec}`, JSON.stringify(data));
            setMsgList(data.messages);
            console.log('custom messages state', data);
        });

        return () => {
            socket.off('join_room');
            socket.off('messages');
        }
    }, [socket, customRec, msgList]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>Custom Chat</Typography>
                <Typography variant='h6'>Connected User: {ownedUsername}</Typography>
            </Container>

            <MessageDisplayHandle />
            <MessageSendHandle room={customRec} />
        </Box>
    )
}

export default CustomChat;
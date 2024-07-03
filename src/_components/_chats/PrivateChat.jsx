import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import MessageSendHandle from '../_messages/MessageSendHandle';
import { Box, Button, Container, Typography } from '@mui/material';
import { AppContext } from '../../_utils/context';
import MessageDisplayHandle from '../_messages/MessageDisplayHandle';

const PrivateChat = () => {
    const [sentMsg, setSentMsg] = useState('');

    const { username, msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    const { privateReceiver, setPrivateReceiver } = useContext(AppContext);


    useEffect(() => {
        setMsgList([]); // only set on initial render
        // reset the state whenever the user tries to interact with the private chat again or for the first time
        return () => {
            setPrivateReceiver(null);
        }
    }, [])

    useEffect(() => {
        console.log('privateReceiver PPP:>> ', privateReceiver);

    }, [privateReceiver]);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>Private Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
            <MessageDisplayHandle />
            {/* receiver structure not completely defined yet! */}
            <MessageSendHandle room={privateReceiver} />
        </Box>
    )
}

export default PrivateChat;
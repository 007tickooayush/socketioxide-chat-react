import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../_utils/context';
import { Box, Container, Typography } from '@mui/material';
import { useOutletContext } from 'react-router';
import MessageSendHandle from '../_messages/MessageSendHandle';
import MessageDisplayHandle from '../_messages/MessageDisplayHandle';

const CustomChat = () => {


    const { msgListState } = useOutletContext();
    const { setMsgList } = msgListState;

    const { ownedUsername, customRec, setCustomRec } = useContext(AppContext);

    useEffect(() => {
        setMsgList([]); // only set on initial render
        // reset the state whenever the user tries to interact with the private chat again or for the first time
        return () => {
            setCustomRec(null);
        }
    }, []);

    useEffect(() => {
        // set the messages List for the private chat
        if(localStorage.getItem(`custom:${customRec}`)) {
            setMsgList(JSON.parse(localStorage.getItem(`custom:${customRec}`)).messages);
        }

    }, [customRec]);
    


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
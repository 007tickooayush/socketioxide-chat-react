import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import MessageSendHandle from '../_messages/MessageSendHandle';
import { Box, Button, Container, Typography } from '@mui/material';
import { AppContext } from '../../_utils/context';
import MessageDisplayHandle from '../_messages/MessageDisplayHandle';
import { socket } from '../../_utils/socket';

const PrivateChat = () => {
    const { msgListState } = useOutletContext();
    const { setMsgList } = msgListState;

    const { ownedUsername, privateReceiver, setPrivateReceiver } = useContext(AppContext);


    useEffect(() => {
        setMsgList([]); // only set on initial render
        // reset the state whenever the user tries to interact with the private chat again or for the first time
        return () => {
            setPrivateReceiver(null);
            // console.log('PrivateChat unmounted');
        }
    }, []);

    useEffect(() => {
        return () => {
            socket.emit("private_left", { in_private: false, username: ownedUsername });
        }
    }, [ownedUsername]);


    useEffect(() => {
        socket.on('joined_private', data => {
            console.log('joined_private data :>> ', data);
        });

        return () => {
            socket.off('joined_private'); 
        }
    }, [socket]);

    useEffect(() => {
        // set the messages List for the private chat
        if (localStorage.getItem(`privateMessages:${privateReceiver}`)) {
            setMsgList(JSON.parse(localStorage.getItem(`privateMessages:${privateReceiver}`)).messages);
        }

    }, [privateReceiver]);

    // useEffect(() => {
    //     // socket.on('resp', data => {
    //     //     console.log('resp data :>> ', data);

    //     // });

    //     return () => {
    //         // socket.off('resp');
    //     }
    // }, [socket])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>Private Chat</Typography>
                <Typography variant='h6'>Connected User: {ownedUsername}</Typography>
            </Container>
            <MessageDisplayHandle />
            {/* receiver structure not completely defined yet! */}
            <MessageSendHandle room={`${privateReceiver}`} />
        </Box>
    )
}

export default PrivateChat;
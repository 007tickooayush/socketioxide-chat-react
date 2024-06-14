import { Box, Button, FormControl, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { socket } from '../../_utils/socket';
import { useOutletContext } from 'react-router';

const MessageSendHandle = ({ msgListState }) => {

    const [sentMsg, setSentMsg] = useState('');
    const { msgList, setMsgList } = msgListState;

    const { username } = useOutletContext();

    useEffect(() => {
        socket.on('response', (data) => {
            

            let cachedMessagesObject = JSON.parse(localStorage.getItem('generalMessages'));
            console.log('messages :>> ', cachedMessagesObject);
            if (cachedMessagesObject) {
                console.log('response event data :>> ', data);
                cachedMessagesObject.messages.push(data);
                localStorage.setItem('generalMessages', JSON.stringify(cachedMessagesObject));
            }
            // else {
            //     cachedMessagesObject.messages.push(data);
            //     localStorage.setItem('generalMessages', JSON.stringify(cachedMessagesObject));
            // }
            setMsgList([...msgList, data]);
        });

        return () => {
            socket.off('response');
        }
    }, [socket, sentMsg, msgList]);


    // useEffect(() => {
    //     let messages = JSON.parse(localStorage.getItem('generalMessages'));
    //     messages.push(data);
    //     localStorage.setItem('generalMessages', JSON.stringify(messages));
    // }, [msg])

    const handleSendMessage = (msg) => {
        setSentMsg(msg);
        // console.log('sentMsg :>> ', sentMsg);
    };

    const handleSendSocket = () => {
        if (sentMsg) {
            socket.emit("message", { room: "general", sender: username, message: sentMsg });
            setSentMsg('');
        }
    }

    return (
        <FormControl sx={{ width: '100%' }}>
            <Grid container sx={{ placeItems: 'center' }} padding={4}>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11} paddingRight={2}>
                    <TextField id='sentMsg' label='Message' value={sentMsg} onChange={(e) => handleSendMessage(e.target.value)} fullWidth />
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1} height={'100%'}>
                    <Button variant='outlined' fullWidth sx={{ height: '100%', padding: 2 }} onClick={handleSendSocket}>Send</Button>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default MessageSendHandle;
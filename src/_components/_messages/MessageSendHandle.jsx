import { Box, Button, FormControl, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { socket } from '../../_utils/socket';
import { useOutletContext } from 'react-router';

const MessageSendHandle = () => {

    const [sentMsg, setSentMsg] = useState('');
    const [msgList, setMsgList] = useState([]); // append the messages to this list
    const { username } = useOutletContext();

    useEffect(() => {
        socket.on('response', (data) => {
            console.log('data :>> ', data);
        });

        return () => {
            socket.off('response');
        }
    }, [socket, sentMsg]);

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
            <Grid container sx={{ placeItems: 'center' }}>
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
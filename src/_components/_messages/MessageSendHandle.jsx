import { Box, Button, FormControl, Grid, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { socket } from '../../_utils/socket';
import { useOutletContext } from 'react-router';
import { AppContext } from '../../_utils/context';

const MessageSendHandle = ({ room }) => {

    const [sentMsg, setSentMsg] = useState('');

    const { msgListState, username } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    const { ownedUsername, privateReceiver } = useContext(AppContext);

    useEffect(() => {
        socket.on('response', (data) => {
            let cachedMessagesObject = JSON.parse(localStorage.getItem('generalMessages'));

            console.log('messages :>> ', cachedMessagesObject);
            if (cachedMessagesObject) {
                console.log('response event data :>> ', data);
                // cachedMessagesObject.messages.push(data);
                cachedMessagesObject.messages.unshift(data);

                // keep the truncated limit of messages to 20 inside a group
                if (cachedMessagesObject.messages.length >= 20) {
                    cachedMessagesObject.messages.pop();
                    msgList.pop();
                    setMsgList(msgList);
                }

                localStorage.setItem('generalMessages', JSON.stringify(cachedMessagesObject));
            }
            // else {
            //     cachedMessagesObject.messages.push(data);
            //     localStorage.setItem('generalMessages', JSON.stringify(cachedMessagesObject));
            // }
            setMsgList([data, ...msgList]);
        });

        socket.on('resp', (data) => {
            console.log('resp data :>> ', data);

            let cachedMessagesObject = JSON.parse(localStorage.getItem(`privateMessages:${privateReceiver}`));
            // implement same as above for the private messages as well
            if (cachedMessagesObject) {
                console.log('resp event data :>> ', data);
                // cachedMessagesObject.messages.push(data);
                cachedMessagesObject.messages.unshift(data);

                // keep the truncated limit of messages to 20 inside a group
                if (cachedMessagesObject.messages.length >= 20) {
                    cachedMessagesObject.messages.pop();
                    msgList.pop();
                    setMsgList(msgList);
                }
                localStorage.setItem(`privateMessages:${privateReceiver}`, JSON.stringify(cachedMessagesObject));
            } else {
                if(privateReceiver){
                    cachedMessagesObject = { messages: [data, ...msgList] };
                    localStorage.setItem(`privateMessages:${privateReceiver}`, JSON.stringify(cachedMessagesObject));
                }
            }
            setMsgList([data, ...msgList]);
        });

        socket.on('resp_back', data => {
            let cachedMessagesObject = JSON.parse(localStorage.getItem(`privateMessages:${privateReceiver}`));
            // implement same as above for the private messages as well
            if (cachedMessagesObject) {
                console.log('resp_back event data :>> ', data);
                // cachedMessagesObject.messages.push(data);
                cachedMessagesObject.messages.unshift(data);

                // keep the truncated limit of messages to 20 inside a group
                if (cachedMessagesObject.messages.length >= 20) {
                    cachedMessagesObject.messages.pop();
                    msgList.pop();
                    setMsgList(msgList);
                }
                localStorage.setItem(`privateMessages:${privateReceiver}`, JSON.stringify(cachedMessagesObject));
            } else {
                // if(privateReceiver){
                    cachedMessagesObject = { messages: [data, ...msgList] };
                    localStorage.setItem(`privateMessages:${privateReceiver}`, JSON.stringify(cachedMessagesObject));
                // }
            }
            setMsgList([data, ...msgList]);
        })

        return () => {
            socket.off('response');
            socket.off('resp');
            socket.off('resp_back');
        }
    }, [socket, sentMsg, msgList, ownedUsername, privateReceiver]);

    // useEffect(() => {
    //     let messages = JSON.parse(localStorage.getItem('generalMessages'));
    //     messages.push(data);
    //     localStorage.setItem('generalMessages', JSON.stringify(messages));
    // }, [msg])

    const handleSendMessage = (msg) => {
        setSentMsg(msg);
        // console.log('sentMsg :>> ', sentMsg);
    };

    // redefine the socket event for the particular room from props
    const handleSendSocket = (e) => {
        if (sentMsg) {
            if (room === 'general') {
                socket.emit("message", { room: room, sender: username, message: sentMsg });

            } else {
                socket.emit("private", { sender: ownedUsername, receiver: privateReceiver, message: sentMsg });
                // setMsgList([...msgList, { sender: ownedUsername, receiver: privateReceiver, message: sentMsg }]);
            }
            console.log('msgList :>> ', msgList);
            setSentMsg('');
        }
    }

    /**
     * 
     * @param {React.KeyboardEvent} e keyboard event object
     */
    const handleKeyPress = (e) => {
        // console.log('e.key :>> ', e.key);
        if (e.key === 'Enter' && sentMsg.trim() !== '') {
            handleSendSocket();
        }
    }

    return (
        <FormControl sx={{ width: '100%' }}>
            <Grid container sx={{ placeItems: 'start' }} padding={4}>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11} paddingRight={2} height={'100%'} textOverflow={'ellipsis'} >
                    <TextField id='sentMsg' type='text' label='Message' value={sentMsg} onChange={(e) => handleSendMessage(e.target.value)} fullWidth multiline /> {/* onKeyDown={(e) => handleKeyPress(e)} */}
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1} height={'100%'}>
                    <Button variant='outlined' fullWidth sx={{ height: '100%', padding: 2 }} onClick={(e) => handleSendSocket(e)}>Send</Button>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default MessageSendHandle;
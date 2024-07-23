import { Box, Button, FormControl, Grid, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { socket } from '../../_utils/socket';
import { useOutletContext } from 'react-router';
import { AppContext } from '../../_utils/context';
import { checkUserInPrivate } from '../../_utils/api';
import SimpleDialog from '../_dialog/SimpleDialog';

const MessageSendHandle = ({ room }) => {

    const [sentMsg, setSentMsg] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { msgListState, username } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    const { ownedUsername, privateReceiver, customRec } = useContext(AppContext);

    const handleDialogClose = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        socket.on('response', (data) => {
            let cachedMessagesObject;

            if (data.room == "general") {
                cachedMessagesObject = JSON.parse(localStorage.getItem('generalMessages'));
            } else {
                cachedMessagesObject = JSON.parse(localStorage.getItem(`custom:${customRec}`));
            }

            console.log('messages :>> ', cachedMessagesObject);
            if (cachedMessagesObject) {
                console.log('response event data :>> ', data);
                // cachedMessagesObject.messages.push(data);
                cachedMessagesObject.messages.unshift(data);

                // keep the truncated limit of messages to 20 inside a group
                if (cachedMessagesObject.messages.length >= 21) {
                    cachedMessagesObject.messages.pop();
                    msgList.pop();
                    setMsgList(msgList);
                }

            }
            if (data.room == "general") {
                localStorage.setItem('generalMessages', JSON.stringify(cachedMessagesObject));
            } else {
                localStorage.setItem(`custom:${customRec}`, JSON.stringify(cachedMessagesObject));
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
                if (cachedMessagesObject.messages.length >= 21) {
                    cachedMessagesObject.messages.pop();
                    msgList.pop();
                    setMsgList(msgList);
                }
                localStorage.setItem(`privateMessages:${privateReceiver}`, JSON.stringify(cachedMessagesObject));
            } else {
                if (privateReceiver) {
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
                if (cachedMessagesObject.messages.length >= 21) {
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
        });

        return () => {
            setIsOpen(false);
            socket.off('response');
            socket.off('resp');
            socket.off('resp_back');
        }
    }, [socket, sentMsg, msgList, ownedUsername, privateReceiver, customRec]);

    const handleSendMessage = (msg) => {
        setSentMsg(msg);
        // console.log('sentMsg :>> ', sentMsg);
    };

    // redefine the socket event for the particular room from props
    const handleSendSocket = (e) => {
        if (sentMsg) {
            if (room === 'general') {
                socket.emit("message", { room: room, sender: username, message: sentMsg });

            }
            else if (room == privateReceiver) {
                // trigger the check user api to check if the user is currently in the private window or not
                // and if not, then do not emit the socket event and provide a warning dialog
                checkUserInPrivate(privateReceiver).then((data) => {
                    // console.log('checkUserInPrivate data :>> ', data);
                    if (data?.in_private) {
                        socket.emit("private", { sender: ownedUsername, receiver: privateReceiver, message: sentMsg });
                    } else {
                        setIsOpen(true);
                        // send notification event
                        socket.emit("notify", { sender: ownedUsername, receiver: privateReceiver, message: `User: ${ownedUsername} want to send you a message!` });
                    }
                }).catch((error) => {

                    console.error('checkUserInPrivate error :>> ', error);
                });
                // setMsgList([...msgList, { sender: ownedUsername, receiver: privateReceiver, message: sentMsg }]);
            }
            else if (room == customRec) {
                socket.emit("message", { room: room, sender: ownedUsername, message: sentMsg });
            }
            console.log('msgList :>> ', msgList);
            setSentMsg('');
        }
    }

    return (
        <>
            <SimpleDialog open={isOpen} title={'Warning'} message={'User is not in the private chat window! Sending Notification to user'} handleDialogClose={handleDialogClose} />
            <FormControl sx={{ width: '100%' }}>
                <Grid container sx={{ placeItems: 'start' }} padding={4}>
                    <Grid item xl={11} lg={11} md={11} sm={11} xs={11} paddingRight={2} height={'100%'} textOverflow={'ellipsis'} >
                        <TextField id='sentMsg' type='text' label='Message' value={sentMsg} onChange={(e) => handleSendMessage(e.target.value)} fullWidth multiline /> {/* onKeyDown={(e) => handleKeyPress(e)} */}
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1} height={'100%'}>
                        <Button variant='outlined' fullWidth sx={{ height: '100%', padding: 2 }} onClick={handleSendSocket}>Send</Button>
                    </Grid>
                </Grid>

            </FormControl>
        </>
    )
}

export default MessageSendHandle;
import React, { useState } from 'react'
import { useOutletContext } from 'react-router';
import MessageSendHandle from '../_messages/MessageSendHandle';
import { Box } from '@mui/material';

const PrivateChat = () => {
    const [sentMsg, setSentMsg] = useState('');

    const { msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    const { username } = useOutletContext();

    return (
        <Box>
            PrivateChat
        </Box>
    )
}

export default PrivateChat;
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router';
import { socket } from '../../_utils/socket';
import { formatDate } from '../../_utils/utilities';

const MessageDisplayHandle = () => {

    const { username, msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;

    return (
        <Box sx={{
            display: 'flex',
            overflowY: 'scroll',
            height: '60vh',
            flexDirection: 'column',
        }}>
            {
                // Rough implementation of the MessageSendHandle component

                msgList &&
                msgList.map((msg, idx) => {
                    return (
                        <Box key={idx} display={'flex'} flexWrap={'wrap'} flexDirection={'column'} alignItems={msg.sender == username ? 'flex-end' : 'flex-start'} >
                            <Typography variant='caption' fontWeight={'bold'}>{msg.sender}</Typography>
                            <Typography variant='caption'>{formatDate(msg.date_time)}</Typography>
                            <Typography variant='h6'>{msg.message}</Typography>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default MessageDisplayHandle
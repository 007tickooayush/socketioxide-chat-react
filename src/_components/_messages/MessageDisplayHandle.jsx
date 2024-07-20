import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useOutletContext } from 'react-router';
import { socket } from '../../_utils/socket';
import { formatDate } from '../../_utils/utilities';
import { AppContext } from '../../_utils/context';

const MessageDisplayHandle = () => {

    const { username, msgListState } = useOutletContext();
    const { ownedUsername } = useContext(AppContext);
    const { msgList } = msgListState;

    return (
        <Box sx={{
            display: 'flex',
            overflowY: 'scroll',
            height: '60vh',
            flexDirection: 'column',
        }}>
            {
                msgList &&
                msgList.map((msg, idx) => {
                    return (
                        <Box key={idx} display={'flex'} flexWrap={'wrap'} flexDirection={'column'} alignItems={(msg.sender == username || msg.sender == ownedUsername) ? 'flex-end' : 'flex-start'} >
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
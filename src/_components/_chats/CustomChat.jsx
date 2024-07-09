import React, { useContext } from 'react'
import { AppContext } from '../../_utils/context';
import { Box, Container, Typography } from '@mui/material';
import { useOutletContext } from 'react-router';

const CustomChat = () => {

    
    const { username, msgListState } = useOutletContext();
    const { msgList, setMsgList } = msgListState;
    
    const {} = useContext(AppContext);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width: "100vw" }}>
                <Typography variant='h4'>Custom Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
        </Box>
    )
}

export default CustomChat;
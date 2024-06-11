import React, { useEffect } from 'react'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'
import { socket } from '../../_utils/socket';

const GeneralChat = () => {

    const { username } = useOutletContext();
    
    useEffect(() => {
        console.log('General Chat Component Mounted');
        socket.emit('join_room', { room: 'general',  });
    }, []);

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4, width:"100vw" }}>
                <Typography variant='h4'>General Chat</Typography>
                <Typography variant='h6'>Connected User: {username}</Typography>
            </Container>
        </Box>
    )
}

export default GeneralChat;
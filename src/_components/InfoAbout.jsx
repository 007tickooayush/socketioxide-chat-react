import { CloudOffOutlined } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router'
import ConnectedState from './_nav/ConnectedState';

const InfoAbout = () => {
    const { username, isConnectedState, setUsername } = useOutletContext();

    return (
        // <Container sx={{minHeight:'100%'}}>
        <>
            <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h6'>
                    About the Web application
                </Typography>
                <Typography variant='body1' align='center'>
                    This is a chatting web application that is made to deliver lightning fast messages to users communicating within the definite space.
                </Typography>
                <Typography variant='body1' align='center' >
                    {/* disable clicking here */}
                    To connect to the server click on the cloud icon <ConnectedState isConnectedState={isConnectedState} setUsername={setUsername} isDisabled={true}/> in the navigation Panel on the top. As by default the user is not connected to the server.
                </Typography>
            </Box>
        </>
        // </Container>
    )
}

export default InfoAbout;
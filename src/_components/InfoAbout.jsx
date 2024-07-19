import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router'
import ConnectedState from './_nav/ConnectedState';

const InfoAbout = () => {
    const { username, isConnectedState, setUsername } = useOutletContext();

    return (
        <Container sx={{ minHeight: '100%' }} maxWidth='100vw'>
            <Box>
                <Typography variant='body2' margin={4}>
                    {username !== null && `Weclome, ${username}! Here are some instructions to make your expereince better.`}
                </Typography>
                <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant='h6' marginBottom={2}>
                        About the Web application
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} flexWrap={'wrap'} justifyContent={'start'} alignItems={'start'} padding={2}>
                    <List>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - This is a chatting web application that is made to deliver lightning fast messages to users communicating within the definite space.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left' >
                                - To connect/disconnect to the server click on the cloud icon <ConnectedState isConnectedState={isConnectedState} setUsername={setUsername} isDisabled={true} /> in the navigation Panel on the top if you are using a desktop, else you can find it inside the navigation drawer. As by default the user is not connected to the server.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - To join a group switch the tabs by selecting from the ones available.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - The general group is universal chat group where everyone can post a message and that message would be available to all the users connected to the server via the application.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - The private group is chat group specifically for two indivuduals where the communication only occurs bewteen them and other users are not notified about the conversation.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - The custom chat group is chat group is applicable when more than two people want to indulge in a conversation, as in this chattiing group the user creates a group via a group title and that title can be used by other users to join the group.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left'>
                                - If the user tries to switch groups mid conversation, using the navigation tab after joining a group, the user will be removed from the group and redirected to default screeng.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant='body1' align='left' fontWeight={'bold'}>
                                - NOTE: The application does not display more than 20 messages inside a group if left by the user (or even if still in the room) to provide optimal performance and better user experience. Also the user has to follow the generated username id which is generated at the instant whenever the user connects/reconnects to the server, in order to interact in the "General Chat" group. As anonymity being the concern, the user does not need to provide its details to generate the username, except an unique identification title (the owned username), in order to interact with other users in the groups other than "General Chat", i.e, "Private Chat" and "Custom Chat".
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Container>
    )
}

export default InfoAbout;
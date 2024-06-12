import { CloudOffOutlined, CloudOutlined, MenuOutlined } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ConnectedState from './ConnectedState';
import UnameDisplayTag from './UnameDisplayTag';

const NavDrawer = ({ username, setUsername, tabs, isConnectedState }) => {
    const [open, setOpen] = useState(false);
    // const { isConnected, setIsConnected } = isConnectedState;
    return (
        <Box sx={{ height: '100vw' }}>
            <Drawer open={open} anchor='left' onClose={() => setOpen(false)} sx={{ padding: 4 }}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} margin={2} >
                    <UnameDisplayTag username={username} />
                    <ConnectedState isConnectedState={isConnectedState} setUsername={setUsername} />
                </Box>
                <List>
                    {
                        tabs.map((tab, index) => (
                            <ListItem key={tab.id}>
                                <ListItemButton LinkComponent={Link} to={tab.route}>
                                    <ListItemText>
                                        {/* <Link to={tab.route} style={{}}> </Link>*/}
                                        {tab.name}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <Grid container sx={{ placeItems: 'center' }}>
                <Grid item sm={8} sx={{ margin: 'auto' }}>
                    {/* <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} alignItems={'start'} justifyContent={'start'} marginBottom={4}> */}
                        <Typography variant='caption' paddingRight={1} fontWeight={'light'}> Connected User:</Typography>
                        <Typography variant='caption' fontWeight={'medium'}>{username ?? "NOT CONNECTED (OFFLINE)"}</Typography>
                    {/* </Box> */}
                </Grid>
                <Grid item sm={4} sx={{ marginLeft: 'auto' }}>
                    <IconButton onClick={() => setOpen(!open)} >
                        <MenuOutlined />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NavDrawer;
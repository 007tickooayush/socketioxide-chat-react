import { CloudOffOutlined, CloudOutlined, MenuOutlined } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import ConnectedState from './ConnectedState';
import UnameDisplayTag from './UnameDisplayTag';
import ChatTabDialog from '../_dialog/ChatTabDialog';
import { AppContext } from '../../_utils/context';

const NavDrawer = ({ tabs, dialogState, currentTabState, tabValState, isConnectedState }) => {
    const [open, setOpen] = useState(false);
    // const { isConnected, setIsConnected } = isConnectedState;
    const { isDialogOpen, setIsDialogOpen } = dialogState;
    const { currentTab, setCurrentTab } = currentTabState;
    const { tabVal, setTabVal } = tabValState;
    const { username, setUsername } = useContext(AppContext);

    // <List>
    //     {
    //         tabs.map((tab, index) => (
    //             <ListItem key={tab.id}>
    //                 <ListItemButton LinkComponent={Link} to={tab.route}>
    //                     <ListItemText>
    //                         {/* <Link to={tab.route} style={{}}> </Link>*/}
    //                         {tab.name}
    //                     </ListItemText>
    //                 </ListItemButton>
    //             </ListItem>
    //         ))
    //     }
    // </List>

    const handleTabClick = (e, tab) => {
        const { id, name, isGroup } = tab;
        if (isGroup) {
            // console.log('Join a group');
            setIsDialogOpen(true);
            setCurrentTab(tab);
        }
    }

    return (
        <Box>
            <ChatTabDialog dialogState={{ isDialogOpen, setIsDialogOpen }} currentTabState={{ currentTab, setCurrentTab }} tabValState={{ tabVal, setTabVal }} isConnectedState={isConnectedState} />
            <Drawer open={open} anchor='left' onClose={() => setOpen(false)} sx={{ padding: 4 }}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} margin={2} >
                    <UnameDisplayTag username={username} />
                    <ConnectedState isConnectedState={isConnectedState} isDisabled={false} />
                </Box>
                <Tabs value={tabVal} textColor="inherit" orientation="vertical" onChange={(e, v) => setTabVal(v)} >
                    {
                        tabs.map((tab, index) => (
                            <Tab key={tab.id} label={tab.name} LinkComponent={Link} to={tab.route} onClick={(e) => handleTabClick(e, tab)} />
                        ))
                    }
                </Tabs>
            </Drawer>
            <Grid container sx={{ placeItems: 'center' }}>
                <Grid item sm={8} sx={{ marginRight: 'auto' }}>
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
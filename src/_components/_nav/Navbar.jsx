import { Grid, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react'
import NavDrawer from './NavDrawer';
import { Link } from 'react-router-dom';
import ConnectedState from './ConnectedState';
import ChatTabDialog from '../_dialog/ChatTabDialog';
import { AppContext } from '../../_utils/context';

const Navbar = ({ tabs, isConnectedState }) => {
    const [tabVal, setTabVal] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState({});

    const { username } = useContext(AppContext);

    // Get the MUI Theme Object
    const theme = useTheme();
    // Check if the dimensions are the same
    const isSameDim = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTabClick = (e, tab) => {
        const { id, name, isGroup } = tab;
        if (isGroup) {
            // console.log('Join a group');
            setIsDialogOpen(true);
            setCurrentTab(tab);
        }
    }

    return (
        <>
            {
                isSameDim ?
                    (
                        <>
                            <NavDrawer tabs={tabs} dialogState={{ isDialogOpen, setIsDialogOpen }} currentTabState={{ currentTab, setCurrentTab }} tabValState={{ tabVal, setTabVal }} isConnectedState={isConnectedState} />
                        </>
                    )
                    :
                    (
                        <Grid container sx={{ placeItems: 'center', justifyContent: 'center' }}>
                            <ChatTabDialog dialogState={{ isDialogOpen, setIsDialogOpen }} currentTabState={{ currentTab, setCurrentTab }} tabValState={{ tabVal, setTabVal }} isConnectedState={isConnectedState} />
                            <Grid item sm={10} md={8} xl={10}>
                                <Tabs value={tabVal} textColor="inherit" onChange={(e, v) => setTabVal(v)}>
                                    {
                                        tabs.map((tab, index) => (
                                            <Tab key={tab.id} label={tab.name} LinkComponent={Link} to={tab.route} onClick={(e) => handleTabClick(e, tab)} />
                                        ))
                                    }
                                </Tabs>
                            </Grid>
                            <Grid item sm={2} md={4} xl={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ConnectedState isConnectedState={isConnectedState} isDisabled={false} />
                            </Grid>
                        </Grid>
                    )
            }
        </>
    )
}

export default Navbar;
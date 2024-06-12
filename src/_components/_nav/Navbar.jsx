import { Grid, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import NavDrawer from './NavDrawer';
import { Link } from 'react-router-dom';
import ConnectedState from './ConnectedState';

const Navbar = ({ tabs, username, setUsername, isConnectedState }) => {
    const [tabVal, setTabVal] = useState(0);

    // Get the MUI Theme Object
    const theme = useTheme();
    // Check if the dimensions are the same
    const isSameDim = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <>
            {
                isSameDim ?
                    (
                        <>
                            <NavDrawer tabs={tabs} username={username} setUsername={setUsername} isConnectedState={isConnectedState} />
                        </>
                    )
                    :
                    (
                        <Grid container sx={{ placeItems: 'center', justifyContent: 'center' }}>
                            <Grid item sm={10} md={8} xl={10}>
                                <Tabs value={tabVal} textColor="inherit" onChange={(e, v) => setTabVal(v)}>
                                    {
                                        tabs.map((tab, index) => (
                                            <Tab key={tab.id} label={tab.name} LinkComponent={Link} to={tab.route} />
                                        ))
                                    }
                                </Tabs>
                            </Grid>
                            <Grid item sm={2} md={4} xl={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ConnectedState isConnectedState={isConnectedState} setUsername={setUsername} isDisabled={false} />
                            </Grid>
                        </Grid>
                    )
            }
        </>
    )
}

export default Navbar;
import { Box, Grid, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import NavDrawer from './NavDrawer';
import { Link } from 'react-router-dom';

const Navbar = ({ tabs }) => {
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
                            <NavDrawer />
                        </>
                    )
                    :
                    (
                        <Grid container sx={{ placeItems: 'center' }}>
                            <Grid item sm={8} md={8} xl={8}>
                                <Tabs value={tabVal} textColor="inherit" onChange={(e, v) => setTabVal(v)}>
                                    {
                                        tabs.map((tab, index) => (
                                            <Tab key={tab.id} label={tab.name} LinkComponent={Link} to={tab.route} />
                                        ))
                                    }
                                </Tabs>
                            </Grid>
                            <Grid item sm={4} md={4} xl={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', borderRadius: 4, padding: 2 }}>
                                    <Typography variant='body1'>SOCKETIOXIDE</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )
            }
        </>
    )
}

export default Navbar;
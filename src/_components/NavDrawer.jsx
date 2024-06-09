import { MenuOutlined } from '@mui/icons-material';
import { Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react'

const NavDrawer = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Drawer open={open} anchor='left' onClose={() => setOpen(false)}>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>
                                Label
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Grid container sx={{placeItems: 'center'}}>
                <IconButton onClick={() => setOpen(!open)} sx={{marginLeft: 'auto'}}>
                    <MenuOutlined />
                </IconButton>
            </Grid>
        </>
    )
}

export default NavDrawer;
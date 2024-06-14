import { Box, Button, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'

const MessageSendHandle = () => {
    return (
        <FormControl sx={{ width: '100%' }}>
            <Grid container sx={{ placeItems: 'center' }}>
                <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                    <TextField id='sentMsg' label='Message' fullWidth />
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={2} xs={2} height={'100%'}>
                    <Button variant='outlined' fullWidth sx={{ height: '100%', padding: 2 }}>Send</Button>
                </Grid>
            </Grid>

        </FormControl>
    )
}

export default MessageSendHandle;
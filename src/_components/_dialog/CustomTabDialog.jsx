import { Box, Button, TextField } from '@mui/material';
import React from 'react'

const CustomTabDialog = ({ handleAcceptance, handleRecChange, disabledAccept }) => {
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} paddingTop={2}>
            <TextField id='recNameInput' name='recNameInput' type='text' placeholder='Custom Group name' onChange={(e) => handleRecChange(e.target.value)} />
            <Box padding={2} >
                <Button variant='outlined' onClick={handleAcceptance} disabled={disabledAccept}>Yes</Button>
            </Box>
        </Box>
    )
}

export default CustomTabDialog;
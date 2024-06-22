import { Box, Button } from '@mui/material';
import React from 'react'

const GeneralTabDialog = ({ handleAcceptance }) => {
    
    return (
        <Box padding={2} >
            <Button variant='outlined' onClick={handleAcceptance}>Yes</Button>
        </Box>
    )
}

export default GeneralTabDialog;
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { socket } from '../../_utils/socket';

const UnameDisplayTag = ({ username }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', borderRadius: 4, padding: 2, flexWrap: 'wrap', width: '30vw' }}>
            <Typography variant='body1' fontWeight='bold'>{username ?? 'OFFLINE'}</Typography>
        </Box>
    )
}

export default UnameDisplayTag;
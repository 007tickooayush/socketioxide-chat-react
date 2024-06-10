import { ReplayOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react'


const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const handleRetry = () => {
        // resetErrorBoundary();
        window.location.replace('/');
    }
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column" padding={4}>
            <Typography variant="h4" color="error">Some Error Occured</Typography>
            <Typography variant="body1" color="error">{error?.message}</Typography>
            
            <Button onClick={handleRetry} variant='contained' color='warning'>
                <ReplayOutlined/>
                Go to General Page
            </Button>
        </Box>
    );
}

export default ErrorFallback;

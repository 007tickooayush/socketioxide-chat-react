import { Box, Button, Typography } from '@mui/material';
import React from 'react'


const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h4" color="error">Error occurred</Typography>
            <Typography variant="body1" color="error">{error.message}</Typography>
            <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
    );
}

export default ErrorFallback;

import { Box, Button, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { AppContext } from '../../_utils/context';

const CustomTabDialog = ({ handleAcceptance, handleRecChange, disabledAccept }) => {

    const { setCustomRec } = useContext(AppContext);

    const handleCustomChange = (group) => {
        setCustomRec(group);
        handleRecChange(group);
    }

    const handleCustomJoin = () => {
        handleAcceptance();
    }

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} paddingTop={2}>
            <TextField id='recNameInput' name='recNameInput' type='text' placeholder='Custom Group Name' onChange={(e) => handleCustomChange(e.target.value)} />
            <Box padding={2} >
                <Button variant='outlined' onClick={handleCustomJoin} disabled={disabledAccept}>Validate</Button>
            </Box>
        </Box>
    )
}

export default CustomTabDialog;
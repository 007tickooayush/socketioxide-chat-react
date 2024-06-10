import React, { useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { useOutletContext } from 'react-router'

const GeneralChat = () => {

    const { count, setCount } = useOutletContext();
    
    useEffect(() => {
        console.log('General Chat Component Mounted');
    }, []);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                <Link href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </Link>
                <Link href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </Link>
            </Container>
            <Typography variant='h3'>Vite + React</Typography>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                <Button variant='outlined' onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <Typography variant='body1'>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </Typography>
            </Container>
            <Typography variant='body2'>
                Click on the Vite and React logos to learn more
            </Typography>

        </Container>
    )
}

export default GeneralChat;
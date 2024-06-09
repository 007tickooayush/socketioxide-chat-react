import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button, Container, Link, Typography } from '@mui/material'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import { labels } from '../_docs/tabs.json';

const Default = () => {
    const [count, setCount] = useState(0);
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        console.log('Default Component Mounted');
        setTabs(labels);
    }, []);


    return (
        <Box>
            <Navbar tabs={tabs} />
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

                <Outlet context={{ count, setCount }} />
            </Container>
        </Box>
    )
}

export default Default;
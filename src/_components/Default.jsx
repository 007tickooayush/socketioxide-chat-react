import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import { labels } from '../_docs/tabs.json';
import { socket } from '../_utils/socket'

const Default = () => {
    const [count, setCount] = useState(0);
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        console.log('Default Component Mounted');
        setTabs(labels);

        console.log('VITE_TEST :>> ', import.meta.env.VITE_TEST);
        console.log('APP MODE :>>', import.meta.env.MODE);
        // console.log('import.meta.env.DEV :>> ', import.meta.env.DEV);
        // console.log('import.meta.env.PROD :>> ', import.meta.env.PROD);
        socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
        });

        return () => {
            socket.off('connect');
            socket.disconnect();
        }
    }, [socket]);


    return (
        <Box>
            <Navbar tabs={tabs} />
            <Outlet context={{ count, setCount }} />
        </Box>
    )
}

export default Default;
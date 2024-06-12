import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Outlet, useNavigate } from 'react-router'
import Navbar from './_nav/Navbar'
import { labels } from '../_docs/tabs.json';
import { socket } from '../_utils/socket'
import UnameDisplayTag from './_nav/UnameDisplayTag';

const Default = () => {
    const [count, setCount] = useState(0);
    const [tabs, setTabs] = useState([]);
    const [username, setUsername] = useState(null);
    const [isConnected, setIsConnected] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        console.log('Default Component Mounted');
        setTabs(labels);

        // By default navigate to the info page
        navigate('/info');
        console.log('VITE_TEST :>> ', import.meta.env.VITE_TEST);
        console.log('APP MODE :>>', import.meta.env.MODE);
        // console.log('import.meta.env.DEV :>> ', import.meta.env.DEV);
        // console.log('import.meta.env.PROD :>> ', import.meta.env.PROD);

        // No auto-connect
        // socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected');
        });
        socket.on('username', (data) => {
            setUsername(data);
        });

        return () => {
            socket.off('connect');
            socket.off('username');

            if (socket.connected) {
                socket.disconnect();
            }
        }
    }, [socket, navigate]);


    return (
        <Box>
            <Navbar tabs={tabs} username={username} setUsername={setUsername} isConnectedState={{ isConnected, setIsConnected }} />
            <Box display={'flex'} justifyContent={'center'} marginBottom={2} paddingBottom={2}>
                <UnameDisplayTag username={username}/>
            </Box>
            <Outlet context={{ count, setCount, username, isConnectedState:{isConnected, setIsConnected}, setUsername }} />
        </Box>
    )
}

export default Default;
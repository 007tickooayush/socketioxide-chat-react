import { useContext, useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle } from '@mui/material'
import { Outlet, useNavigate } from 'react-router'
import Navbar from './_nav/Navbar'
import { labels } from '../_docs/tabs.json';
import { socket } from '../_utils/socket'
import UnameDisplayTag from './_nav/UnameDisplayTag';
import { AppContext } from '../_utils/context';
import StartUserDialog from './_dialog/StartUserDialog';
import SimpleDialog from './_dialog/SimpleDialog';
import { checkServerHealthHttp } from '../_utils/api';

const Default = () => {
    const [count, setCount] = useState(0);
    const [tabs, setTabs] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const [msgList, setMsgList] = useState([]); // messages list for the screens

    const navigate = useNavigate();

    const { username, setUsername } = useContext(AppContext);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const handleInfoClose = () => {
        setIsInfoOpen(false);
    }
    useEffect(() => {
        checkServerHealthHttp().then(res => {
            if (res?.status === 200) {
                setServerMessage('Server is Running Healthy!');
            } else {
                setServerMessage('Server is not running!');
            }
            setIsInfoOpen(true);
        })
    },[])

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
            <SimpleDialog title={"Server Health"} message={serverMessage} open={isInfoOpen} handleDialogClose={handleInfoClose} />
            <Navbar tabs={tabs} isConnectedState={{ isConnected, setIsConnected }} />
            <StartUserDialog />
            <Box display={'flex'} justifyContent={'center'} marginBottom={2} paddingBottom={2}>
                <UnameDisplayTag username={username} />
            </Box>
            <Outlet context={{ count, setCount, username, isConnectedState: { isConnected, setIsConnected }, setUsername, tabsState: { tabs, setTabs }, msgListState: { msgList, setMsgList } }} />
        </Box>
    )
}

export default Default;
import { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Outlet, useNavigate } from 'react-router'
import Navbar from './_nav/Navbar'
import { labels } from '../_docs/tabs.json';
import { socket } from '../_utils/socket'
import UnameDisplayTag from './_nav/UnameDisplayTag';
import { AppContext } from '../_utils/context';
import StartUserDialog from './_dialog/StartUserDialog';
import SimpleDialog from './_dialog/SimpleDialog';
import { checkServerHealthHttp } from '../_utils/api';
import { askPermitAndShowNotification } from '../_utils/utilities';

const Default = () => {
    const [count, setCount] = useState(0);
    const [tabs, setTabs] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const [msgList, setMsgList] = useState([]); // messages list for the screens

    const navigate = useNavigate();

    const { username, setUsername, ownedUsername, setOwnedUsername } = useContext(AppContext);
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
        });
        askPermitAndShowNotification("Welcome to the Chat App!")

        setOwnedUsername(localStorage.getItem('ownedUsername') ?? null);
        console.log('ownedUsername :>> ', localStorage.getItem('ownedUsername'));
    }, []);

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

        socket.on("notified", message => {
            if(message) {
                console.log('notification recv :>> ');
                alert(message);
                askPermitAndShowNotification(message);
            } else {
                console.log('Notification data :>> ', message); // Fixed variable reference from 'data' to 'message'
            }
        });

        // socket.on("notified", message => {
        //     if(message) {
        //         console.log('notfication recv :>> ');
        //         askPermitAndShowNotification(message)
        //         .then(() => {
        //             console.log('Notification Shown!');
        //         }).catch(err => {
        //             console.log('Notification Error! ERR:>>', err);
        //         });
        //     } else {
        //         console.log('Notification data :>> ', data);
        //     }
        // });

        return () => {
            socket.off('connect');
            socket.off('username');
            socket.off('notified');

            if (socket.connected) {
                socket.disconnect();
            }
        }
    }, [socket, navigate]);

    useEffect(() => {
        if (socket.connected) {
            console.log('!!connected!!')

            socket.emit("user_handle", { username: ownedUsername ?? username, generated_username: username, online: true });
        }
        socket.on("user_handled", (data) => {
            if (data?.owned_uname !== ownedUsername && data?.generated_uname !== username) {
                setIsInfoOpen(true);
                setServerMessage("User credentials not matching! Please try again!");
            } else {
                console.log("user_handle: User handled successfully!")
                // console.log('user_ event data :>> ', data);
            }
        });

        // success indicator for socket event "private_left"
        socket.on('left_private', data => {
            console.log('left_private data :>> ', data);
        });
        return () => {
            socket.off("user_handled");
            socket.off('left_private');
        }
    }, [isConnected, username, ownedUsername]);


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
import { io, connect } from 'socket.io-client';

const socket_URL = import.meta.env.VITE_SERVER_SOCKET_URLS ?? "ws://localhost:4040";

export const socket = io(socket_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 3,
    transports: ['websocket'],
    upgrade: false,
    extraHeaders: {
        'my-custom-header': 'abcd'
    }
});
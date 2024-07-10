import { socket } from "./socket"


export const handleSocketEvent = (username, recName, currentTab) => {
    if (socket.active) {
        if (currentTab.name == "General Chat") {
            socket.emit('join_room', { sender: username, room: "general", message: `User "${username}" has joined general room` })
        }
        if (currentTab.name == "Private Chat") {
            console.log("Private Chat",{username, recName, currentTab});
        }
        if(currentTab.name == "Custom Chat") {
            console.log("Custom Chat",{username, recName, currentTab});
            // handle custom chat socket event
            socket.emit('join_room', { sender: username, room: recName, message: `User "${username}" has joined custom room` });
        }
    }
}


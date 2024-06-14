import { socket } from "./socket"


export const handleSocketEvent = (username, recName, currentTab) => {
    if(socket.active){
        if(currentTab.name == "General Chat"){
            socket.emit('join_room', { sender: username, room: "general", message: `User "${username}" has joined general room`})
        }
    }
}


import socketIOClient from "socket.io-client";
const socket = socketIOClient("https://chat-room-hung.herokuapp.com/");

export default socket
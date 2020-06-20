import React, { useEffect, useState } from 'react';
import socket from '../utils/socket'

export default function Rooms(props) {
    const [roomList, setRoomList] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);

    console.log('props.roomStatus', props.roomStatus)



    const joinRoom = (roomId) => {
        props.leaveRoom()
        socket.emit('joinRoom', roomId);
        props.setRoomStatus(true);
    }

    const addRoom = () => {
        let name = prompt('Please enter room name')
        socket.emit('addRoom', name);
    }

    useEffect(() => {
        socket.on('room', data => { setRoomList(data) })
        socket.on('showRoom', data => setCurrentRoom(data))
        socket.on('joinNewRoom', data => joinRoom(data))
    })

    console.log(roomList);

    return (
        <div className="text-center">
            {
                roomList.map((item) => {
                    return <button className='btn btn-danger m-1' style={{ width: '95%', borderRadius: '10px', height: '60px', fontSize: '20px' }}
                        key={item._id} onClick={() => { joinRoom(item._id) }}>
                        {item && item.name.toUpperCase()} ({item.members.length})
                    </button>
                })
            }
            <button onClick={() => { addRoom() }} className='btn btn-success m-1' style={{ width: '95%', borderRadius: '10px', height: '60px', fontSize: '20px' }}>ADD ROOM</button>
        </div>
    )
}

import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Header from "./components/Header";
import Rooms from "./components/Rooms";
import socket from './utils/socket'

function App() {
  let [chatLog, setChatLog] = useState([]);
  let chatLogRef = useRef(chatLog);
  let [name, setName] = useState("");
  let [ownerId, setOwnerId] = useState("");
  let [roomStatus, setRoomStatus] = useState(false);
  let [showTime, setShowTime] = useState(false);

  const enterUserName = () => {
    let user = prompt('Enter user name');
    if (!user) return enterUserName();

    socket.emit('login', user, cb => {
      if (cb && cb.ok) return alert('Cannot login')
      else {
        console.log(cb)
        setName(cb.name);
        setOwnerId(cb._id)
      }
    })
  }

  const submitChat = (e) => {
    e.preventDefault()
    let chatInfo = {
      text: e.target.chat.value,
      name: name
    }

    socket.emit('chat', chatInfo, callback => {
      if (callback) { console.log(callback) }
    });
    e.target.chat.value = ""
  };

  const leaveRoom = () => {
    setRoomStatus(!roomStatus);
    socket.emit('leaveRoom');
    console.log('roomStatus', roomStatus);
    chatLogRef.current = [];
    setChatLog([...chatLogRef.current]);
  }

  console.log(chatLog, ownerId, name, 'roomStatus: ', roomStatus);

  useEffect(() => {

    enterUserName();

    socket.on('mess', (mess) => {
      chatLogRef.current = chatLogRef.current.concat(mess)
      setChatLog([...chatLogRef.current]);
    })
  }, [])

  return (
    <div className="container mt-3">
      {/* <Header name={name} /> */}
      <div className='row d-flex'>
        <div className='col-2 p-2' style={{ border: '3px solid blue', borderRadius: '15px', height: '95vh', backgroundColor: "white" }}>
          <Rooms setRoomStatus={setRoomStatus} roomStatus={roomStatus} leaveRoom={leaveRoom} />
        </div>
        {(roomStatus) ?

          <div className="col-10 p-5 " style={{ border: '3px solid blue', borderRadius: '15px', height: '95vh', backgroundColor: "white" }}>

            <div>
              {(chatLog.length === 1) ? <h3 className="text-center">Thank you for using Hung Nguyen Chat App</h3> : ""}
            </div>

            <div id="message-window" className="chatbox mb-2" style={{ height: '85%', width: '100%', overflow: 'auto' }}>{chatLog.map((item) => {
              if (item.user === ownerId) {
                return <div>
                  <div className="text-right text-white d-flex justify-content-end" onClick={() => setShowTime(!showTime)}>
                    <h4 style={{ borderRadius: '15px', backgroundColor: 'blue', padding: '15px' }}>{item.text}</h4>
                  </div>
                  {(showTime) ? <h6 className="text-right text-black-50">({item.createdAt.split("T")[0]})</h6> : ''}
                </div>
              }

              else if (item.user !== ownerId) {
                if (item.name === 'system') { return <h6 className="text-center text-muted ">{item.text}</h6> }
                return <div >
                  <h4 className="text-left d-flex justify-content-start">
                    <span className="text-danger" style={{ lineHeight: '100%', padding: '15px' }}>{item.name}: </span>
                    <span onClick={() => setShowTime(!showTime)} style={{ borderRadius: '15px', backgroundColor: 'lightgrey', padding: '15px', lineHeight: '100%' }}>{item.text}</span>
                    {(showTime) ? <h6 className="text-right text-black-50">({item.createdAt.split("T")[0]})</h6> : ''}
                  </h4>
                </div>
              }
            })}
            </div>

            <div className="chatlog justify-content-between" style={{ display: "flex", height: '42px', minWidth: '300px' }}>
              <button className="btn btn-light" onClick={() => { leaveRoom(ownerId) }}>Leave</button>
              <form className='d-flex justify-content-end' onSubmit={(e) => submitChat(e)} style={{ width: '100%' }}>
                <input className='ml-3 p-2' name="chat" type="text" style={{ border: "1px solid black", borderRadius: '5px', minWidth: '50%', width: '100%', height: '100%' }} />
                <button className="btn btn-primary ml-3" type="submit">Send</button>
              </form>
            </div>
          </div> : ''}
      </div>

    </div>
  );
}

export default App;

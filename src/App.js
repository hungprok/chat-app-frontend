import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('https://chat-room-hung.herokuapp.com');

function App() {
  let [chatLog, setChatLog] = useState([]);
  let chatLogRef = useRef(chatLog);
  let [name, setName] = useState("");

  useEffect(() => {

    let user = prompt('Enter user name');

    if (name === "") {
      let chatInfo = {
        text: " just joined the chat",
        name: user,
        time: Date(Date.now()).toString(),
        time2: Date.now().toString(),
        firstTime: true
      }
      socket.emit('chat', chatInfo, callback => {
        if (callback) { console.log(callback) }
      });
    }
    setName(user)
    socket.on('mess', (mess) => {
      chatLogRef.current.push(mess)
      setChatLog([...chatLogRef.current]);
    })
  }, [])

  const submitChat = (e) => {
    e.preventDefault()
    let chatInfo = {
      text: e.target.chat.value,
      name: name,
      time: Date(Date.now()).toString(),
      time2: Date.now().toString(),
      firstTime: false
    }

    socket.emit('chat', chatInfo, callback => {
      if (callback) { console.log(callback) }
    });
  };

  console.log(chatLog);

  return (
    <div>

      <div className="App container mt-3 p-5" style={{ border: '3px solid blue', borderRadius: '15px', height: '90vh', backgroundColor: "white" }}>
        {(chatLog.length === 1) ? <h3>Welcome to the chat room!<br />Have fun and dont use bad words!</h3> : ""}
        <div className="chatbox" style={{height:'90%', width:'100%',overflow:'auto'}}>{chatLog.map((item) => {
          if (item.firstTime) { return <h6 className="text-center text-muted "> {item.name} {item.text}</h6> }
          if (item.name === name) { return <div className="text-right"><h4>{item.text}</h4><h6 className="text-black-50">({item.time.split(" GMT")[0]})</h6></div> }
          else { return <div className="text-left"><h4> <span className="text-danger">{item.name}:</span> {item.text}</h4><h6 className="text-black-50">({item.time.split(" GMT")[0]})</h6></div> }
        })}
        </div>
        <div className="chatlog" style={{ position: "absolute", bottom: "10vh" }}>
          <form onSubmit={(e) => submitChat(e)} style={{width: "100vh"}}>
            <input name="chat" type="text" style={{ width: "70%", border: "1px solid black", borderRadius: '5px' }} />
            <button className="btn btn-primary ml-3" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

// window.onload=function () {
// var objDiv = document.getElementById("message-window");
//   objDiv.scrollTop = objDiv.scrollHeight; }

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'

const e = React.createElement;

// class message extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
  
// }



var messageBody = document.querySelector("#message-window");
messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
// ReactDOM.render(e(LikeButton), domContainer);

// var messageBody = document.getElementById("message-window");
// messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

// $('#messages').scrollTop($('#messages')[0].scrollHeight);

// var out = document.getElementById("message-window");
// allow 1px inaccuracy by adding 1
// var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
// if(!isScrolledToBottom)
//     out.scrollTop = out.scrollHeight - out.clientHeight;

// document.body.onload = function()
// {
//     var myDiv = document.getElementById('message-window');
//     // Pick your poison below, server sent events, websockets, AJAX, etc.
//     var messageSource = new EventSource('http://localhost:5000');
//     messageSource.onmessage = function(event)
//     {
//         // You must add border widths, padding and margins to the right.
//         var isScrolled = myDiv.scrollTop == myDiv.scrollHeight - myDiv.offsetHeight;
//         myDiv.innerHTML += event.data;
//         if(isScrolled)
//             myDiv.scrollTop = myDiv.scrollHeight;
//     };
// };
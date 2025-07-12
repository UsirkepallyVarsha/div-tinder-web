import React, { useEffect, useState, useRef } from 'react';
import clientserver from '../utils/socket';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Chat = () => {
  const { targetUserid } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userid = user?._id;
  const socketRef = useRef(null);
  const bottomRef = useRef();
const fetchChatMessages=async()=>{
const chat = await axios.get("http://localhost:3000/chat/chats/" + targetUserid, { withCredentials: true });

console.log(chat.data.messages);
const chatMessages=chat?.data?.messages.map((msg)=>{
   const date = new Date(msg.createdAt); 
  const formattedTimeDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  return{
    firstName:msg?.senderId?.firstName,
    lastName:msg?.senderId?.lastName,
    text:msg.text,
    timestamp: formattedTimeDate,
  }
});
setMessages(chatMessages);
};


useEffect(()=>{
fetchChatMessages();
},[]);
  useEffect(() => {
    if (!userid) return;

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = clientserver();
    socketRef.current = socket;

    socket.emit('joinChat', { userid, targetUserid });

    socket.on('messageReceived', ({ firstName, text }) => {
      const date = new Date(); 
      const formattedTimeDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setMessages((prev) => [...prev, { firstName, text ,timestamp:formattedTimeDate}]);
    });

    return () => {
      socket.off('messageReceived');
      socket.disconnect();
    };
  }, [userid, targetUserid]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === '') return;
  const date = new Date(); 
  const formattedTimeDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newMessage = {
      firstName: user.firstName,
      text: message,
   
timestamp:formattedTimeDate,
    };

    socketRef.current?.emit('sendMessage', {
      ...newMessage,
      userid,
      targetUserid,
    });

    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-600 mt-5 h-[70vh] flex flex-col rounded-lg shadow-md bg-white">
      <h1 className="p-4 border-b border-gray-600 text-xl font-bold bg-gray-100 rounded-t-lg text-black">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded shadow p-2 max-w-xs ${
                msg.firstName === user.firstName
                  ? 'bg-blue-100 self-end ml-auto'
                  : 'bg-gray-200 self-start mr-auto'
              }`}
            >
              <div className="font-semibold text-sm text-gray-700">
                {msg.firstName}
              </div>
              <div className="text-gray-800">{msg.text}</div>
              <div className="text-xs text-right text-gray-500">{msg.timestamp}</div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-600 flex items-center gap-2 bg-white rounded-b-lg">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

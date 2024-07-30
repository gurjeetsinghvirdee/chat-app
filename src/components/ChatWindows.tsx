import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    setSocket(socket);

    // Emit joinRoom event after socket connection is established
    socket.on('connect', () => {
      socket.emit('joinRoom', { chatRoom: 'exampleRoom' });
    });

    socket.on('loadMessages', (messages) => {
      setMessages(messages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to close the socket connection
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <strong>{message.username}</strong>: {message.message}
          <span className="text-gray-500 text-xs"> {new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
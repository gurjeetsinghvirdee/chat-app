import React, { useState } from "react";
import io from "socket.io-client";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const socket = io("http://localhost:5000");

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', { chatRoom: 'room', username: 'username', message });
        setMessage("");
    };

    return (
        
    )
}
import React, { useState } from "react";
import io from "socket.io-client";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const socket = io("http://localhost:5000");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('sendMessage', { chatRoom: 'room', username: 'username', message });
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex p-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">
                Send
            </button>
        </form>
    );
};

export default MessageInput;
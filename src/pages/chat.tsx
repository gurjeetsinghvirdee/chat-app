import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';

const Chat = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <ChatWindow />
            <MessageInput />
        </div>
    );
};

export default Chat;
import React from 'react';
import MessageInput from '../components/MessageInput';
import ChatWindow from '../components/ChatWindows';

const Chat = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <ChatWindow />
            <MessageInput />
        </div>
    );
};

export default Chat;
import React from "react";

const RequestConnection = () => {
    const handleRequest = async () => {
        try {
            const response = await fetch('/api/request-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'username', // Replace with the username of the user you want to connect with
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to request connection');
            }

            const result = await response.json();
            console.log('Connection requested successfully', result);
        }   catch (error) {
            console.error('Error requesting connection', error);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl">Request Connection with an Expert</h1>
            <button onClick={handleRequest} className="p-2 bg-green-500 text-white">
                Request
            </button>
        </div>
    );
};

export default RequestConnection;
# Chat Application with Real-Time Messaging

This project is a full-featured chat application built using Node.js, Express.js, and Mongoose, with a modern front-end developed in Next.js and TypeScript. It leverages WebSocket (Socket.io) for real-time communication and MongoDB for data persistence.

## Features

- **User Authentication:**
  - Secure registration and login using JWT (JSON Web Tokens).
  - Passwords are encrypted with bcrypt for added security.

- **Real-Time Messaging:**
  - Private chat rooms for user-expert pairs.
  - Real-time message exchange using WebSocket (Socket.io).

- **Database Integration:**
  - MongoDB is used for storing user data, chat messages, and expert availability.
  - The last 10 messages are retrieved when a user joins a chat room.

- **User Interface:**
  - Simple and clean design built with Next.js and Tailwind CSS.
  - Intuitive interface for logging in, requesting connections, and chatting with experts.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Mongoose (for MongoDB integration)
  - Socket.io (for real-time communication)
  - JWT (for user authentication)
  - bcrypt (for password encryption)

- **Frontend:**
  - Next.js (React framework)
  - TypeScript
  - Tailwind CSS (for styling)

- **Database:**
  - MongoDB
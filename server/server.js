const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const MessageSchema = new mongoose.Schema({
    chatRoom: String,
    username: String,
    message: String,
    timeStamp: Date
});

app.use(express.json());

// User login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'JWT_SECRET');
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// WebSocket connection
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ chatRoom }) => {
        socket.join(chatRoom);
        MessageSchema.find({ chatRoom }).sort({ timestamp: -1 }).limit(10).exec((err, messages) => {
            if (err) return;
            socket.emit('loadMessages', messages.reverse());
        });
    });

    socket.on('sendMessage', ({ chatRoom, username, message }) => {
        const newMessage = new Message({ chatRoom, username, message, timeStamp: new Date() });
        newMessage.save();
        io.to(chatRoom).emit('receiveMessage', newMessage);
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied');

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(500).send('Invalid token');
        req.user = decoded;
        next();
    });
};

// Protect Routes
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You have access' });
});

const ExpertSchema = new mongoose.Schema({
    username: String,
    available: { type: Boolean, default: true },
});

const Expert = mongoose.model('Expert', ExpertSchema);

// Endpoint to request connection 
app.post('/connect', authMiddleware, async (req, res) => {
    const expert = await Expert.findOne({ available: true });
    if (!expert) return res.status(404).json({ message: 'No experts available' });

    expert.available = false;
    await expert.save();

    const chatRoom = `${req.user.id}-${expert._id}`;
    res.json({ chatRoom })
});

// Endpoint to get available experts
app.get('/experts', async (req, res) => {
    const experts = await Expert.find({ available: true });
    res.json(experts);
})

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ chatRoom }) => {
        socket.join(chatRoom);
        Message.find({ chatRoom }).sort({ timestamp: -1 }).limit(10).exec((err, messages) => {
            if (err) return;
            socket.emit('loadMessages', messages.reverse());
        });
    });

    socket.on('sendMessage', ({ chatRoom, username, message }) => {
        const newMessage = new Message({ chatRoom, username, message, timestamp: new Date() });
        newMessage.save();
        io.to(chatRoom).emit('receiveMessage', newMessage);
    });
});
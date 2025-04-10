// const express = require("express");
// const mongoose = require("mongoose");
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//   },
// });

// app.use(cors());
// app.use(express.json());

// const PORT = 3000; // Make sure this matches your frontend URL

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on('send_message', (data) => {
//     console.log('Received message:', data);
//     io.to(data.room).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

const PORT = 3000; // Make sure this matches your frontend URL

// Store user socket connections
const userSockets = {}; // Format: { userId: socket.id }

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room with userId for direct communication
  socket.on('join_room', (userId) => {
    // Save the userId with their socket.id
    userSockets[userId] = socket.id;
    console.log(`User with ID ${userId} joined room: ${socket.id}`);
  });

  // Listen for incoming messages and send to specific user
  socket.on('send_message', (data) => {
    console.log('Received message:', data);

    const { recipientUserId, message } = data;

    // Check if recipient userId is connected
    if (userSockets[recipientUserId]) {
      // Send message to the specific user (recipient)
      io.to(userSockets[recipientUserId]).emit('receive_message', message);
      console.log(`Message sent to user ${recipientUserId}`);
    } else {
      console.log(`User with ID ${recipientUserId} is not connected`);
    }
  });

  // Handle disconnection and cleanup
  socket.on('disconnect', () => {
    // Clean up userSockets when a user disconnects
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User with ID ${userId} disconnected`);
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

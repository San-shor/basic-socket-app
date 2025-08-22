import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const connectedClients = new Set();

const userRooms = new Map(); // Track which room each user is in

io.on('connection', (socket) => {
  console.log('User connected', socket.id);
  connectedClients.add(socket.id);
  console.log('Total connected clients:', connectedClients.size);

  // socket.emit("msg", "Hello from server"); // send message to client

  // Send client count to all clients when someone connects
  io.emit('clients-count', connectedClients.size);

  socket.on('sendMsg', (data) => {
    console.log('Message from', socket.id, ':', data);

    const messageData = {
      message: data,
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    };

    // Check if user is in a room
    const userRoom = userRooms.get(socket.id);

    if (userRoom) {
      // Send message only to users in the same room
      console.log(`Sending message to room: ${userRoom}`);
      io.to(userRoom).emit('rcvMsg', messageData);
    } else {
      // Send message globally if not in any room (global chat)
      console.log('Sending message globally (no room)');
      io.emit('rcvMsg', messageData);
    }
  });

  // Join a room
  socket.on('join-room', (roomName) => {
    // Leave previous room if in one
    const previousRoom = userRooms.get(socket.id);
    if (previousRoom) {
      socket.leave(previousRoom);
      socket.to(previousRoom).emit('user-left', {
        message: `${socket.id} left ${previousRoom}`,
      });
    }

    // Join new room
    socket.join(roomName);
    userRooms.set(socket.id, roomName); // Track user's current room
    console.log(`${socket.id} joined ${roomName}`);

    // Let room members know someone joined
    io.to(roomName).emit('user-joined', {
      message: `${socket.id} joined ${roomName}`,
    });
  });

  // Leave a room
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName);
    userRooms.delete(socket.id); // Remove user from room tracking
    console.log(`${socket.id} left ${roomName}`);

    // Let room members know someone left
    socket.to(roomName).emit('user-left', {
      message: `${socket.id} left ${roomName}`,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);

    // Clean up user data
    const userRoom = userRooms.get(socket.id);
    if (userRoom) {
      // Notify room members that user left
      socket.to(userRoom).emit('user-left', {
        message: `${socket.id} left ${userRoom}`,
      });
      userRooms.delete(socket.id);
    }

    connectedClients.delete(socket.id);
    console.log('Total connected clients:', connectedClients.size);
    io.emit('clients-count', connectedClients.size);
  });
});

httpServer.listen(5000, () => {
  console.log('Socket.IO server listening on http://localhost:5000');
});

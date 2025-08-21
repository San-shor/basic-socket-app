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

io.on('connection', (socket) => {
  console.log('User connected', socket.id);
  connectedClients.add(socket.id);
  console.log('Total connected clients:', connectedClients.size);

  // socket.emit("msg", "Hello from server"); // send message to client

  socket.on('sendMsg', (data) => {
    console.log(data);
    // socket.emit('rcvMsg', `${data}`); // send message to individual client
    io.emit('rcvMsg', `${data}`); // send message to all clients
  });

  // Join a room
  socket.on('join-room', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} join ${roomName}`);

    //let know which room user joined
    socket
      .to(roomName)
      .emit('user-joined', { message: `${socket.id} joined ${roomName}` });
  });

  //leave a room
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName);
    console.log(`${socket.id} left ${roomName}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
    connectedClients.delete(socket.id);
    console.log('Total connected clients:', connectedClients.size);
  });
});

httpServer.listen(5000, () => {
  console.log('Socket.IO server listening on http://localhost:5000');
});

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

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  // socket.emit("msg", "Hello from server"); // send message to client
  socket.on('sendMsg', (data) => {
    console.log(data);
    socket.emit('rcvMsg', `${data}`);
  });
});

httpServer.listen(5000, () => {
  console.log('Socket.IO server listening on http://localhost:5000');
});

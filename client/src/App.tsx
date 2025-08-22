import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import type { Message, Notification } from './types';
import {
  ConnectionStatus,
  RoomControl,
  ActivityFeed,
  ChatArea,
  MessageInput,
} from './components';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const [connectedClients, setConnectedClients] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('connected to server', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
      setIsConnected(false);
    });

    socket.on('rcvMsg', (data) => {
      console.log('Received message:', data);

      // Handle both old string format and new object format
      const messageText = typeof data === 'string' ? data : data.message;
      const senderId = typeof data === 'string' ? 'unknown' : data.socketId;

      const newMsg: Message = {
        id: Date.now().toString(),
        text: messageText,
        timestamp: new Date(),
        socketId: senderId,
        isOwnMessage: senderId === socket.id,
      };

      // Only add if it's not our own message (we already add our messages when sending)
      if (!newMsg.isOwnMessage) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    socket.on('user-joined', (data) => {
      console.log('User joined:', data);
      const notification: Notification = {
        id: Date.now().toString(),
        message: data.message,
        timestamp: new Date(),
        type: 'join',
      };
      setNotifications((prev) => [...prev, notification]);
    });
    socket.on('user-left', (data) => {
      console.log('User left:', data);
      const notification: Notification = {
        id: Date.now().toString(),
        message: data.message,
        timestamp: new Date(),
        type: 'leave',
      };
      setNotifications((prev) => [...prev, notification]);
    });
    socket.on('clients-count', (count) => {
      setConnectedClients(count);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Join room function
  const joinRoom = (roomName: string) => {
    if (roomName && socketRef.current) {
      socketRef.current.emit('join-room', roomName);
      setCurrentRoom(roomName);
    }
  };

  const leaveRoom = () => {
    if (currentRoom && socketRef.current) {
      socketRef.current.emit('leave-room', currentRoom);
      setCurrentRoom('');
      setMessages([]); // Clear messages when leaving room
    }
  };

  // send message to server
  const messageSend = (messageText: string) => {
    if (socketRef.current && isConnected) {
      console.log('Sending message:', messageText);
      const ownMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        timestamp: new Date(),
        socketId: socketRef.current.id || '',
        isOwnMessage: true,
      };
      setMessages((prev) => [...prev, ownMessage]);
      socketRef.current.emit('sendMsg', messageText);
    }
  };

  return (
    <div className='max-w-5xl mx-auto bg-white min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200'>
        <h1 className='text-xl font-semibold text-gray-900'>Chat</h1>
        <ConnectionStatus
          isConnected={isConnected}
          connectedClients={connectedClients}
        />
      </div>

      <div className='flex h-[calc(100vh-73px)]'>
        {/* Sidebar */}
        <div className='w-64 border-r border-gray-200 bg-gray-50 p-4'>
          <RoomControl
            currentRoom={currentRoom}
            isConnected={isConnected}
            onJoinRoom={joinRoom}
            onLeaveRoom={leaveRoom}
          />
          <ActivityFeed notifications={notifications} />
        </div>

        {/* Chat Area */}
        <div className='flex-1 flex flex-col'>
          <ChatArea messages={messages} currentRoom={currentRoom} />
          <MessageInput isConnected={isConnected} onSendMessage={messageSend} />
        </div>
      </div>
    </div>
  );
}

export default App;

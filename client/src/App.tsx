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
      setMessages([]);
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
      setMessages([]);
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
    <div className='max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
          </div>
          <h1 className='text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
            ChatApp
          </h1>
        </div>
        <ConnectionStatus
          isConnected={isConnected}
          connectedClients={connectedClients}
        />
      </div>

      <div className='flex flex-col lg:flex-row h-[calc(100vh-73px)]'>
        {/* Sidebar */}
        <div className='lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-200/60 bg-white/50 backdrop-blur-sm p-4 lg:p-6'>
          <RoomControl
            currentRoom={currentRoom}
            isConnected={isConnected}
            onJoinRoom={joinRoom}
            onLeaveRoom={leaveRoom}
          />
          <ActivityFeed notifications={notifications} />
        </div>

        {/* Chat Area */}
        <div className='flex-1 flex flex-col bg-white/30 backdrop-blur-sm'>
          <ChatArea messages={messages} currentRoom={currentRoom} />
          <MessageInput isConnected={isConnected} onSendMessage={messageSend} />
        </div>
      </div>
    </div>
  );
}

export default App;

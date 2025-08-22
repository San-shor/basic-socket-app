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
    <div className='max-w-4xl mx-auto p-6 bg-white min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6 pb-4 border-b-2 border-blue-100'>
        <h1 className='m-0 text-3xl font-bold text-gray-800 flex items-center gap-3'>
          <span className='text-4xl'>💬</span>
          Real-time Chat
        </h1>
        <ConnectionStatus
          isConnected={isConnected}
          connectedClients={connectedClients}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Side - Room & Notifications */}
        <div className='lg:col-span-1'>
          <RoomControl
            currentRoom={currentRoom}
            isConnected={isConnected}
            onJoinRoom={joinRoom}
            onLeaveRoom={leaveRoom}
          />
          <ActivityFeed notifications={notifications} />
        </div>

        {/* Right Side - Chat */}
        <div className='lg:col-span-2'>
          <ChatArea messages={messages} currentRoom={currentRoom} />
          <MessageInput isConnected={isConnected} onSendMessage={messageSend} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default App;

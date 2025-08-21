import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  socketId: string;
  isOwnMessage: boolean;
}

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  type: 'join' | 'leave';
}

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [roomName, setRoomName] = useState('');
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
  const joinRoom = () => {
    if (roomName.trim() && socketRef.current) {
      socketRef.current.emit('join-room', roomName.trim());
      setCurrentRoom(roomName.trim());
      setRoomName('');
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
  const messageSend = () => {
    if (socketRef.current && isConnected) {
      console.log('Sending message:', inputValue);
      const ownMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        timestamp: new Date(),
        socketId: socketRef.current.id || '',
        isOwnMessage: true,
      };
      setMessages((prev) => [...prev, ownMessage]);
      socketRef.current.emit('sendMsg', inputValue);
      setInputValue('');
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
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          <div className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
            <span className='text-base'>👥</span>
            {connectedClients} Online
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Side - Room & Notifications */}
        <div className='lg:col-span-1'>
          {/* Room Join Section */}
          <div className='mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200'>
            <h3 className='mb-3 text-lg font-semibold text-gray-800 flex items-center gap-2'>
              <span className='text-xl'>🏠</span>
              Room Control
            </h3>

            {!currentRoom ? (
              <div className='space-y-3'>
                <input
                  type='text'
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder='Enter room name...'
                  className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                  onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
                />
                <button
                  onClick={joinRoom}
                  disabled={!roomName.trim() || !isConnected}
                  className='w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
                  🚪 Join Room
                </button>
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='p-3 bg-green-100 rounded-lg border border-green-300'>
                  <p className='m-0 text-green-800 text-sm font-medium'>
                    📍 Currently in: <strong>{currentRoom}</strong>
                  </p>
                </div>
                <button
                  onClick={leaveRoom}
                  className='w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors'>
                  🚪 Leave Room
                </button>
              </div>
            )}
          </div>

          {/* Notifications Panel */}
          <div className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
            <h3 className='mb-3 text-lg font-semibold text-gray-800 flex items-center gap-2'>
              <span className='text-xl'>🔔</span>
              Activity Feed
            </h3>
            <div className='space-y-2 max-h-60 overflow-y-auto'>
              {notifications.length === 0 ? (
                <p className='text-gray-500 text-sm text-center py-4'>
                  No activity yet...
                </p>
              ) : (
                notifications
                  .slice(-5)
                  .reverse()
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg text-sm ${
                        notification.type === 'join'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                      <div className='flex items-center gap-2'>
                        <span>
                          {notification.type === 'join' ? '➡️' : '⬅️'}
                        </span>
                        <span className='flex-1'>{notification.message}</span>
                      </div>
                      <div className='text-xs opacity-75 mt-1'>
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Chat */}
        <div className='lg:col-span-2'>
          {/* Messages Area */}
          <div className='mb-4 border border-gray-200 rounded-lg bg-white shadow-sm'>
            <div className='p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg'>
              <h3 className='m-0 text-lg font-semibold text-gray-800 flex items-center gap-2'>
                <span className='text-xl'>💭</span>
                {currentRoom ? `Chat - ${currentRoom}` : 'Global Chat'}
              </h3>
            </div>

            <div className='p-4 h-96 overflow-y-auto bg-gray-50'>
              {messages.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-gray-500 text-center'>
                    <span className='text-4xl mb-2 block'>📭</span>
                    No messages yet... Start a conversation!
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isOwnMessage ? 'justify-end' : 'justify-start'
                      }`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.isOwnMessage
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                        }`}>
                        <div className='text-sm font-medium'>
                          {message.text}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            message.isOwnMessage
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}>
                          {message.isOwnMessage
                            ? 'You'
                            : message.socketId.slice(-6)}{' '}
                          • {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={elementRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className='flex gap-3 items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
            <input
              type='text'
              value={inputValue}
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && messageSend()}
              disabled={!isConnected}
              placeholder={
                isConnected
                  ? 'Type your message...'
                  : 'Connect to start chatting...'
              }
              className='flex-1 p-3 border border-gray-200 rounded-lg text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500'
            />
            <button
              type='button'
              onClick={messageSend}
              disabled={!isConnected || !inputValue.trim()}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2'>
              <span>Send</span>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <line x1='22' y1='2' x2='11' y2='13'></line>
                <polygon points='22,2 15,22 11,13 2,9'></polygon>
              </svg>
            </button>
          </div>
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

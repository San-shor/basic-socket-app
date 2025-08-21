import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const socketRef = useRef<Socket | null>(null);

  const [notifications, setNotifications] = useState<string[]>([]);

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

      const msg = document.createElement('p');
      msg.textContent = data;
      elementRef.current?.appendChild(msg);
    });

    socket.on('user-joined', (data) => {
      console.log('User joined:', data);
      setNotifications((prev) => [...prev, data]);
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
    }
  };

  // send message to server
  const messageSend = () => {
    if (socketRef.current && isConnected) {
      console.log('Sending message:', inputValue);
      socketRef.current.emit('sendMsg', inputValue);
      setInputValue('');
    } else {
      console.error('Socket not connected');
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '2px solid #f0f0f0',
        }}>
        <h1
          style={{
            margin: 0,
            color: '#333',
            fontSize: '24px',
            fontWeight: '600',
          }}>
          💬 Real-time Chat
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
            color: isConnected ? '#155724' : '#721c24',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
          }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isConnected ? '#28a745' : '#dc3545',
              animation: isConnected ? 'pulse 2s infinite' : 'none',
            }}></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {/* Room Join Section */}
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Join Room</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type='text'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder='Enter room name'
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            onKeyDown={(e) => e.key === 'Enter' && joinRoom()}
          />
          <button
            onClick={joinRoom}
            disabled={!roomName.trim() || !isConnected}
            style={{
              padding: '8px 16px',
              backgroundColor:
                isConnected && roomName.trim() ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor:
                isConnected && roomName.trim() ? 'pointer' : 'not-allowed',
              fontSize: '14px',
            }}>
            Join Room
          </button>
        </div>
        {currentRoom && (
          <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
            Currently in room: <strong>{currentRoom}</strong>
          </p>
        )}
        {notifications.map((notification, index) => (
          <p
            key={index}
            style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>
            {notification}
          </p>
        ))}
      </div>

      {/* Messages Area */}
      <div
        ref={elementRef}
        style={{
          border: '2px solid #e9ecef',
          borderRadius: '8px',
          padding: '15px',
          minHeight: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          marginBottom: '20px',
          fontFamily: 'inherit',
        }}></div>

      {/* Input Area */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}>
        <input
          type='text'
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && messageSend()}
          disabled={!isConnected}
          placeholder='Type your message...'
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.2s ease',
            backgroundColor: isConnected ? 'white' : '#f8f9fa',
            color: isConnected ? '#333' : '#6c757d',
          }}
          onFocus={(e) => {
            if (isConnected) {
              e.target.style.borderColor = '#007bff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          type='button'
          onClick={messageSend}
          disabled={!isConnected || !inputValue.trim()}
          style={{
            padding: '12px 20px',
            backgroundColor:
              isConnected && inputValue.trim() ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '500',
            cursor:
              isConnected && inputValue.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (isConnected && inputValue.trim()) {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (isConnected && inputValue.trim()) {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}>
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default App;

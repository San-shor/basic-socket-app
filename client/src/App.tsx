import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

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

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    socket.on('rcvMsg', (data) => {
      console.log('Received message:', data);

      const msg = document.createElement('p');
      msg.textContent = data;
      elementRef.current?.appendChild(msg);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

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
    <div>
      <h1>Socket IO Testing</h1>
      <div
        style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: isConnected ? '#d4edda' : '#f8d7da',
          color: isConnected ? '#155724' : '#721c24',
          borderRadius: '4px',
        }}>
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
      <div
        ref={elementRef}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '200px',
          marginBottom: '10px',
        }}></div>
      <input
        type='text'
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && messageSend()}
        disabled={!isConnected}
      />
      <button type='submit' onClick={messageSend} disabled={!isConnected}>
        send
      </button>
    </div>
  );
}

export default App;

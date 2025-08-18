import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    const socket = socketRef.current;
    socket.on('connect', () => {
      console.log('connected to server', socket.id);
    });

    socket.on('rcvMsg', (data) => {
      console.log(data);

      const msg = document.createElement('p');
      msg.textContent = data;
      elementRef.current?.appendChild(msg);
    });
  }, []);

  // send message to server
  const messageSend = () => {
    socketRef.current?.emit('sendMsg', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Socket IO Testing</h1>
      <div ref={elementRef}></div>
      <input
        type='text'
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type='submit' onClick={messageSend}>
        send
      </button>
    </div>
  );
}

export default App;

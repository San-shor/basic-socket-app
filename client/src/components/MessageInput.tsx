import { useState, useRef } from 'react';

interface MessageInputProps {
  isConnected: boolean;
  onSendMessage: (message: string) => void;
}

export default function MessageInput({
  isConnected,
  onSendMessage,
}: MessageInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() && isConnected) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='flex gap-3 items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
      <input
        type='text'
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isConnected}
        placeholder={
          isConnected ? 'Type your message...' : 'Connect to start chatting...'
        }
        className='flex-1 p-3 border border-gray-200 rounded-lg text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500'
      />
      <button
        type='button'
        onClick={handleSendMessage}
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
  );
}
